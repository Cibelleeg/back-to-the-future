import { describe, expect, it } from 'vitest';
import type { CinemaId, FilmeId, Sessao, SessaoId } from '../types/cinema';
import { agruparSessoesPorFilme } from './sessaoService';

type SessaoInput = Omit<Partial<Sessao>, 'idSessao' | 'idFilme' | 'idCinema'> & {
  idSessao?: number;
  idFilme?: number;
  idCinema?: number;
};

function sessao(partial: SessaoInput): Sessao {
  return {
    idSessao: (partial.idSessao ?? 1) as SessaoId,
    idFilme: (partial.idFilme ?? 1) as FilmeId,
    idCinema: (partial.idCinema ?? 1) as CinemaId,
    dataHora: partial.dataHora ?? '2026-06-03T20:00:00',
    idioma: partial.idioma ?? 'Dublado',
    formato: partial.formato ?? '2D',
    precoBase: partial.precoBase ?? 30,
    sala: partial.sala ?? { nome: 'Sala 1', tipo: 'Convencional' },
  };
}

describe('sessaoService', () => {
  it('agrupa sessoes por id de filme', () => {
    const sessoes: Sessao[] = [
      sessao({ idSessao: 1, idFilme: 10 }),
      sessao({ idSessao: 2, idFilme: 10 }),
      sessao({ idSessao: 3, idFilme: 20 }),
    ];

    const agrupado = agruparSessoesPorFilme(sessoes);

    expect(Object.keys(agrupado)).toEqual(['10', '20']);
    expect(agrupado[10].map((s) => s.idSessao)).toEqual([1, 2]);
    expect(agrupado[20].map((s) => s.idSessao)).toEqual([3]);
  });
});
