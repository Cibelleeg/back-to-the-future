import type { Assento, AssentoId, CartItem, Cinema, Filme, Produto, Sessao, SessaoId, TipoIngresso } from '../types/cinema';
import type { UserOrder, OrderStatus } from '../types/order';
import type { UserReview } from '../types/review';
import { mapAssentoDTO, mapCinemaDTO, mapComboDTO, mapFilmeDTO, mapProdutoDTO, mapSessaoDTO } from './mappers';
import type { AssentoDTO, CinemaDTO, ComboDTO, FilmeDTO, ProdutoDTO, SessaoDTO } from './mappers';
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
const LEGACY_USER_KEY = 'user_info';

export function getAuthToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setAuthToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearAuthToken(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(LEGACY_USER_KEY);
  setUserInfo(null);
}

export type UserInfo = {
  id?: number;
  name?: string;
  email: string;
  cpf?: string;
  phoneNumber?: string;
  birthDate?: string;
};

let currentUserInfo: UserInfo | null = null;

export function setUserInfo(info: UserInfo | null): void {
  localStorage.removeItem(LEGACY_USER_KEY);
  currentUserInfo = info;
  window.dispatchEvent(new Event('userinfo:updated'));
}

export function getUserInfo(): UserInfo | null {
  return currentUserInfo;
}

function authHeaders(): HeadersInit {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function errorFromResponse(res: Response): Promise<ApiError> {
  try {
    const data = await res.json() as { error?: string; mensagem?: string };
    return new ApiError(res.status, data.error ?? data.mensagem ?? `HTTP ${res.status}: ${res.statusText}`);
  } catch {
    return new ApiError(res.status, `HTTP ${res.status}: ${res.statusText}`);
  }
}


export async function login(email: string, password: string): Promise<{ token: string; name?: string; userEmail?: string; userId?: number }> {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw await errorFromResponse(res);
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
  if (!res.ok) throw await errorFromResponse(res);
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
  if (!res.ok) throw await errorFromResponse(res);
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
  if (!res.ok) throw await errorFromResponse(res);
}

export type CreateOrderPayload = {
  idUsuario: number;
  itens: Array<{
    idProduto: number | null;
    idCombo: number | null;
    quantidade: number;
    precoUnitario: number;
  }>;
};

export type CreateOrderResponse = {
  id?: string | number;
  code?: string;
};

type PedidoDTO = {
  id?: string | number;
  idPedido?: string | number;
};

type PedidoUsuarioDTO = {
  id?: string | number;
  idPedido?: string | number;
  total: number;
  status: string;
  dataPedido: string;
  itens?: Array<{
    idProduto?: number | null;
    produtoNome?: string | null;
    idCombo?: number | null;
    comboNome?: string | null;
    quantidade: number;
  }>;
  ingressos?: Array<{
    idIngresso: number;
    idSessao: number;
    idAssento: number;
    tipo: string;
    preco: number;
    status: string;
    dataEmissao: string;
    filmeTitulo?: string | null;
    cinemaNome?: string | null;
    salaNome?: string | null;
    assento?: string | null;
    dataHora?: string | null;
    idioma?: string | null;
    formato?: string | null;
  }>;
};

type AvaliacaoUsuarioDTO = {
  id: number;
  idFilme: number;
  filme: {
    titulo: string;
  };
  nota: number;
  comentario: string | null;
  createdAt: string;
};

export async function createOrder(payload: {
  sessao: Sessao;
  items: CartItem[];
  total: number;
}): Promise<CreateOrderResponse> {
  if (config.useMock) {
    return {
      id: Date.now(),
      code: `#PED-2026-${Math.floor(100000 + Math.random() * 900000)}`,
    };
  }

  const user = getUserInfo();

  if (!user?.id) {
    throw new ApiError(400, 'Dados do usuário não carregados. Abra o carrinho novamente.');
  }

  const body: CreateOrderPayload = {
    idUsuario: user.id,
    itens: payload.items.map((item) => ({
      idProduto: item.idCombo != null ? null : Number(item.idProduto),
      idCombo: item.idCombo != null ? Number(item.idCombo) : null,
      quantidade: item.quantidade,
      precoUnitario: item.preco,
    })),
  };

  const res = await fetch(`${BASE_URL}/pedidos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw await errorFromResponse(res);
  const pedido = await res.json() as PedidoDTO;
  const id = pedido.id ?? pedido.idPedido;
  return {
    id,
    code: id ? `#PED-2026-${id}` : undefined,
  };
}

export type BuyTicketResponse = {
  idIngresso: number;
  idSessao: number;
  idUsuario: number;
  idAssento: number;
  idPedido: number;
  tipo: TipoIngresso;
  preco: number;
  status: string;
  dataEmissao: string;
};

export async function buyTicket(payload: {
  sessaoId: SessaoId;
  assentoId: AssentoId;
  pedidoId: string | number;
  tipo: TipoIngresso;
}): Promise<BuyTicketResponse> {
  if (config.useMock) {
    return {
      idIngresso: Date.now(),
      idSessao: Number(payload.sessaoId),
      idUsuario: getUserInfo()?.id ?? 1,
      idAssento: Number(payload.assentoId),
      idPedido: Number(payload.pedidoId),
      tipo: payload.tipo,
      preco: 0,
      status: 'ATIVO',
      dataEmissao: new Date().toISOString(),
    };
  }

  const res = await fetch(`${BASE_URL}/sessions/${Number(payload.sessaoId)}/ingressos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify({
      idAssento: Number(payload.assentoId),
      idPedido: Number(payload.pedidoId),
      tipo: payload.tipo,
    }),
  });

  if (!res.ok) throw await errorFromResponse(res);
  return res.json() as Promise<BuyTicketResponse>;
}

export async function finalizarCompra(payload: {
  sessao: Sessao;
  assentoIds: AssentoId[];
  tipo: TipoIngresso;
  items: CartItem[];
}): Promise<CreateOrderResponse> {
  if (config.useMock) {
    return {
      id: Date.now(),
      code: `#PED-2026-${Math.floor(100000 + Math.random() * 900000)}`,
    };
  }

  const res = await fetch(`${BASE_URL}/pedidos/finalizar`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify({
      idSessao: Number(payload.sessao.idSessao),
      idAssentos: payload.assentoIds.map(Number),
      tipo: payload.tipo,
      itens: payload.items.map((item) => ({
        idProduto: item.idCombo != null ? null : Number(item.idProduto),
        idCombo: item.idCombo != null ? Number(item.idCombo) : null,
        quantidade: item.quantidade,
        precoUnitario: item.preco,
      })),
    }),
  });

  if (res.status === 404) {
    const pedido = await createOrder({
      sessao: payload.sessao,
      items: payload.items,
      total: 0,
    });
    if (!pedido.id) return pedido;

    await Promise.all(payload.assentoIds.map((assentoId) => buyTicket({
      sessaoId: payload.sessao.idSessao,
      assentoId,
      pedidoId: pedido.id!,
      tipo: payload.tipo,
    })));

    return pedido;
  }

  if (!res.ok) throw await errorFromResponse(res);
  const pedido = await res.json() as PedidoDTO;
  const id = pedido.id ?? pedido.idPedido;
  return {
    id,
    code: id ? `#PED-2026-${id}` : undefined,
  };
}


const pending = new Map<string, Promise<unknown>>();

type PaginatedResponse<T> = {
  data: T[];
};

const money = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

const dateTime = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: 'long',
  hour: '2-digit',
  minute: '2-digit',
});

const dateOnly = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
});

function orderStatus(status: string): OrderStatus {
  const normalized = status.toUpperCase();
  if (normalized.includes('CANCEL')) return 'cancelado';
  if (normalized.includes('UTILIZ')) return 'utilizado';
  return 'confirmado';
}

function plural(count: number, singular: string, pluralLabel: string): string {
  return `${count} ${count === 1 ? singular : pluralLabel}`;
}

function mapPedidoUsuarioDTO(pedido: PedidoUsuarioDTO): UserOrder {
  const id = String(pedido.id ?? pedido.idPedido ?? pedido.dataPedido);
  const ingressos = pedido.ingressos ?? [];
  const itens = pedido.itens ?? [];
  const firstTicket = ingressos[0];
  const ticketDate = firstTicket?.dataHora ? new Date(firstTicket.dataHora) : new Date(pedido.dataPedido);
  const extras = itens
    .map((item) => `${item.quantidade}x ${item.comboNome ?? item.produtoNome ?? 'Item da bomboniere'}`)
    .join(' · ');
  const roomParts = [firstTicket?.salaNome, firstTicket?.formato, firstTicket?.idioma].filter(Boolean);
  const noteParts = [
    ingressos.length ? plural(ingressos.length, 'ingresso', 'ingressos') : null,
    itens.length ? plural(itens.reduce((total, item) => total + item.quantidade, 0), 'item', 'itens') : null,
  ].filter(Boolean);

  return {
    id,
    title: firstTicket?.filmeTitulo ?? (ingressos.length ? 'Sessão de cinema' : 'Pedido de bomboniere'),
    cinema: firstTicket?.cinemaNome ?? 'CINEFESP',
    date: dateTime.format(ticketDate),
    room: roomParts.length ? roomParts.join(' · ') : 'Bomboniere',
    seats: ingressos.length ? ingressos.map((ingresso) => ingresso.assento ?? `#${ingresso.idAssento}`) : ['Sem assento'],
    extras: extras || undefined,
    status: orderStatus(pedido.status),
    total: money.format(Number(pedido.total)),
    totalNote: noteParts.join(' + ') || 'Pedido',
    code: `#PED-2026-${id}`,
  };
}

function mapAvaliacaoUsuarioDTO(review: AvaliacaoUsuarioDTO): UserReview {
  return {
    id: String(review.id),
    title: review.filme.titulo,
    rating: Number(review.nota),
    date: dateOnly.format(new Date(review.createdAt)),
    text: review.comentario ?? '',
  };
}

function apiFetch<T>(path: string): Promise<T> {
  if (!pending.has(path)) {
    const req = fetch(`${BASE_URL}${path}`, { headers: authHeaders() })
      .then(async (res) => {
        if (res.status === 401) {
          clearAuthToken();
          throw new ApiError(401, 'Sessão expirada. Faça login novamente.');
        }
        if (!res.ok) throw await errorFromResponse(res);
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
export const fetchCombos   = (): Promise<Produto[]> => apiFetch<ComboDTO[]>('/combos').then((dtos) => dtos.map(mapComboDTO));
export const fetchSessoes  = (): Promise<Sessao[]>  => apiFetch<SessaoDTO[]>('/sessions').then((dtos) => dtos.map(mapSessaoDTO));
export const fetchAssentosBySala = (idSala: number): Promise<Assento[]> =>
  apiFetch<AssentoDTO[]>(`/assentos/sala/${idSala}`).then((dtos) => dtos.map(mapAssentoDTO));

export const fetchAssentosBySessao = (idSessao: SessaoId): Promise<Assento[]> =>
  apiFetch<AssentoDTO[]>(`/assentos/sessao/${idSessao}`).then((dtos) => dtos.map(mapAssentoDTO));

export const fetchUserOrders = (): Promise<UserOrder[]> =>
  apiFetch<PedidoUsuarioDTO[]>('/pedidos/me').then((dtos) => dtos.map(mapPedidoUsuarioDTO));

export const fetchUserReviews = (): Promise<UserReview[]> =>
  apiFetch<AvaliacaoUsuarioDTO[]>('/avaliacoes/minhas').then((dtos) => dtos.map(mapAvaliacaoUsuarioDTO));
