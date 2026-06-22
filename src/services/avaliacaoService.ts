import { config } from '../config';
import { ApiError, clearAuthToken, getAuthToken } from './api';
import type { CatalogoExtra, Gate, Review } from '../pages/Filmes/catalogoData';

const BASE_URL = config.apiUrl;

type DistribuicaoDTO = Record<'1' | '2' | '3' | '4' | '5', number>;

export interface MinhaAvaliacaoDTO {
  id: string | number;
  nota: number;
  comentario: string | null;
  createdAt: string;
}

export interface ElegibilidadeDTO {
  podeAvaliar: boolean;
  jaAvaliou: boolean;
  motivo: string | null;
  minhaAvaliacao: MinhaAvaliacaoDTO | null;
}

export interface FilmeDetalheAvaliacoesDTO {
  id: string | number;
  media: number;
  notaPonderada: number;
  totalAvaliacoes: number;
  distribuicao: DistribuicaoDTO;
  elegibilidade?: ElegibilidadeDTO | null;
}

export interface AvaliacaoDTO {
  id: string | number;
  usuario?: { nome?: string | null } | null;
  nota: number;
  comentario: string | null;
  createdAt: string;
}

export interface AvaliacoesPageDTO {
  data: AvaliacaoDTO[];
  page: number;
  total: number;
}

export interface ReviewPayload {
  nota: number;
  comentario?: string | null;
}

function authHeaders(): HeadersInit {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function apiRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: {
      ...authHeaders(),
      ...(init.body ? { 'Content-Type': 'application/json' } : {}),
      ...init.headers,
    },
  });

  if (res.status === 401) {
    clearAuthToken();
    throw new ApiError(401, 'Sessão expirada. Faça login novamente.');
  }

  if (!res.ok) {
    let message = `HTTP ${res.status}: ${res.statusText}`;
    try {
      const body = await res.json() as { mensagem?: string; message?: string; error?: string; erro?: string };
      message = body.mensagem ?? body.message ?? body.error ?? body.erro ?? message;
    } catch {
      // resposta sem JSON
    }
    throw new ApiError(res.status, message);
  }

  if (res.status === 204) return undefined as T;
  return await res.json() as T;
}

function gateFromElegibilidade(elegibilidade?: ElegibilidadeDTO | null): Gate {
  if (!elegibilidade) return 'locked';
  if (elegibilidade.jaAvaliou) return 'reviewed';
  if (elegibilidade.podeAvaliar) return 'eligible';
  return 'locked';
}

export function mapAvaliacaoDTO(dto: AvaliacaoDTO): Review {
  return {
    id: dto.id,
    who: dto.usuario?.nome || 'Usuário CINEFESP',
    stars: dto.nota,
    date: new Date(dto.createdAt).toLocaleDateString('pt-BR'),
    text: dto.comentario || 'Sem comentário.',
  };
}

export function mapFilmeDetalheAvaliacoes(
  detalhe: FilmeDetalheAvaliacoesDTO,
  avaliacoes: AvaliacaoDTO[],
): CatalogoExtra {
  const elegibilidade = detalhe.elegibilidade ?? null;
  const minhaAvaliacao = elegibilidade?.minhaAvaliacao ?? null;

  return {
    count: detalhe.totalAvaliacoes,
    dist: {
      5: detalhe.distribuicao['5'] ?? 0,
      4: detalhe.distribuicao['4'] ?? 0,
      3: detalhe.distribuicao['3'] ?? 0,
      2: detalhe.distribuicao['2'] ?? 0,
      1: detalhe.distribuicao['1'] ?? 0,
    },
    gate: gateFromElegibilidade(elegibilidade),
    myStars: minhaAvaliacao?.nota,
    myReview: minhaAvaliacao,
    motivo: elegibilidade?.motivo ?? null,
    reviews: avaliacoes.map(mapAvaliacaoDTO),
  };
}

export async function fetchFilmeDetalheAvaliacoes(idFilme: number): Promise<CatalogoExtra> {
  const [detalhe, avaliacoes] = await Promise.all([
    apiRequest<FilmeDetalheAvaliacoesDTO>(`/filmes/${idFilme}`),
    apiRequest<AvaliacoesPageDTO>(`/filmes/${idFilme}/avaliacoes`),
  ]);

  return mapFilmeDetalheAvaliacoes(detalhe, avaliacoes.data);
}

export function criarAvaliacaoFilme(idFilme: number, payload: ReviewPayload): Promise<AvaliacaoDTO> {
  return apiRequest<AvaliacaoDTO>(`/filmes/${idFilme}/avaliacoes`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function atualizarAvaliacao(idAvaliacao: string | number, payload: ReviewPayload): Promise<AvaliacaoDTO> {
  return apiRequest<AvaliacaoDTO>(`/avaliacoes/${idAvaliacao}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

export function excluirAvaliacao(idAvaliacao: string | number): Promise<void> {
  return apiRequest<void>(`/avaliacoes/${idAvaliacao}`, { method: 'DELETE' });
}
