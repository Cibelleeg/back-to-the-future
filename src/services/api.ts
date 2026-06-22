import type { Cinema, Filme, Produto, Sessao } from '../types/cinema';
import { mapCinemaDTO, mapFilmeDTO, mapProdutoDTO, mapSessaoDTO } from './mappers';
import type { CinemaDTO, FilmeDTO, ProdutoDTO, SessaoDTO } from './mappers';
import { config } from '../config';

const BASE_URL = config.apiUrl;


export class ApiError extends Error {
  readonly status: number;
  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}


const TOKEN_KEY = 'auth_token';
const USER_KEY  = 'user_info';

export function getAuthToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setAuthToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearAuthToken(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export type UserInfo = {
  id?: number;
  name?: string;
  email: string;
  cpf?: string;
  phoneNumber?: string;
  birthDate?: string;
};

export function setUserInfo(info: UserInfo): void {
  localStorage.setItem(USER_KEY, JSON.stringify(info));
  window.dispatchEvent(new Event('userinfo:updated'));
}

export function getUserInfo(): UserInfo | null {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) as UserInfo : null;
  } catch {
    return null;
  }
}

function authHeaders(): HeadersInit {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}


export async function login(email: string, password: string): Promise<{ token: string; name?: string; userEmail?: string; userId?: number }> {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new ApiError(res.status, `HTTP ${res.status}: ${res.statusText}`);
  const data = await res.json() as { token: string; user?: { id?: number; name?: string | null; email?: string } };
  return {
    token: data.token,
    name: data.user?.name ?? undefined,
    userEmail: data.user?.email,
    userId: data.user?.id,
  };
}

export async function updateUserProfile(
  id: number,
  data: { name?: string; cpf?: string; phoneNumber?: string; birthDate?: string },
): Promise<UserInfo> {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new ApiError(res.status, `HTTP ${res.status}: ${res.statusText}`);
  const { user } = await res.json() as {
    user: { id: number; name: string | null; email: string; cpf: string | null; phoneNumber: string | null; birthDate: string | null };
  };
  return {
    id: user.id,
    name: user.name ?? undefined,
    email: user.email,
    cpf: user.cpf ?? undefined,
    phoneNumber: user.phoneNumber ?? undefined,
    birthDate: user.birthDate ?? undefined,
  };
}

export async function fetchMe(): Promise<UserInfo> {
  const res = await fetch(`${BASE_URL}/users/me`, { headers: authHeaders() });
  if (!res.ok) throw new ApiError(res.status, `HTTP ${res.status}: ${res.statusText}`);
  const u = await res.json() as { id: number; name: string | null; email: string; cpf: string | null; phoneNumber: string | null; birthDate: string | null };
  return {
    id: u.id,
    name: u.name ?? undefined,
    email: u.email,
    cpf: u.cpf ?? undefined,
    phoneNumber: u.phoneNumber ?? undefined,
    birthDate: u.birthDate ?? undefined,
  };
}

export async function register(name: string, email: string, password: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  if (!res.ok) throw new ApiError(res.status, `HTTP ${res.status}: ${res.statusText}`);
}


const pending = new Map<string, Promise<unknown>>();

type PaginatedResponse<T> = {
  data: T[];
};

function apiFetch<T>(path: string): Promise<T> {
  if (!pending.has(path)) {
    const req = fetch(`${BASE_URL}${path}`, { headers: authHeaders() })
      .then((res) => {
        if (res.status === 401) {
          clearAuthToken();
          throw new ApiError(401, 'Sessão expirada. Faça login novamente.');
        }
        if (!res.ok) throw new ApiError(res.status, `HTTP ${res.status}: ${res.statusText}`);
        return res.json() as T;
      })
      .finally(() => pending.delete(path));
    pending.set(path, req);
  }
  return pending.get(path)! as Promise<T>;
}


export const fetchFilmes   = (): Promise<Filme[]>   => apiFetch<PaginatedResponse<FilmeDTO>>('/filmes').then((page) => page.data.map(mapFilmeDTO));
export const fetchCinemas  = (): Promise<Cinema[]>  => apiFetch<CinemaDTO[]>('/cinemas').then((dtos) => dtos.map(mapCinemaDTO));
export const fetchProdutos = (): Promise<Produto[]> => apiFetch<ProdutoDTO[]>('/products').then((dtos) => dtos.map(mapProdutoDTO));
export const fetchSessoes  = (): Promise<Sessao[]>  => apiFetch<SessaoDTO[]>('/sessions').then((dtos) => dtos.map(mapSessaoDTO));
