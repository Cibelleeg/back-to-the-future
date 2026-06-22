import type { Filme } from '../../types/cinema';

export type FilmeComRank = Filme & { rank: number };
export type EstadoFilme = 'cartaz' | 'breve' | 'encerrado';
export type SortKey = 'nota' | 'recentes' | 'avaliados';
export type EstadoFilter = 'todos' | EstadoFilme;
