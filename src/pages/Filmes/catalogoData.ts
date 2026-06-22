import { CATALOGO_EXTRA_BY_FILME, DEFAULT_CATALOGO_EXTRA } from './mocks/catalogoExtra';

export type Gate = 'eligible' | 'locked' | 'reviewed';

export interface Review {
  id?: string | number;
  who: string;
  stars: number;
  date: string;
  text: string;
}

export interface MinhaAvaliacao {
  id: string | number;
  nota: number;
  comentario: string | null;
  createdAt: string;
}

export interface CatalogoExtra {
  count: number;
  dist: { 5: number; 4: number; 3: number; 2: number; 1: number };
  gate: Gate;
  myStars?: number;
  myReview?: MinhaAvaliacao | null;
  motivo?: string | null;
  reviews: Review[];
}

export function getCatalogoExtra(idFilme: number): CatalogoExtra {
  return CATALOGO_EXTRA_BY_FILME[idFilme] ?? DEFAULT_CATALOGO_EXTRA;
}
