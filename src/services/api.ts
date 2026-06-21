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

export function getAuthToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setAuthToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearAuthToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

function authHeaders(): HeadersInit {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}


export async function login(email: string, password: string): Promise<string> {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new ApiError(res.status, `HTTP ${res.status}: ${res.statusText}`);
  const data = await res.json() as { token: string };
  return data.token;
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


export const fetchFilmes   = (): Promise<Filme[]>   => apiFetch<FilmeDTO[]>('/movies').then((dtos) => dtos.map(mapFilmeDTO));
export const fetchCinemas  = (): Promise<Cinema[]>  => apiFetch<CinemaDTO[]>('/cinemas').then((dtos) => dtos.map(mapCinemaDTO));
export const fetchProdutos = (): Promise<Produto[]> => apiFetch<ProdutoDTO[]>('/products').then((dtos) => dtos.map(mapProdutoDTO));
export const fetchSessoes  = (): Promise<Sessao[]>  => apiFetch<SessaoDTO[]>('/sessions').then((dtos) => dtos.map(mapSessaoDTO));
