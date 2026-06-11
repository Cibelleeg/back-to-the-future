import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { CinemaId, Filme, FilmeId, Sessao, SessaoId } from '../types/cinema';
import { extrairGeneros, filtrarFilmesEmBreve, filtrarFilmesEmCartaz } from './filmeService';

type FilmeInput = Omit<Partial<Filme>, 'idFilme'> & { idFilme?: number };
type SessaoInput = Omit<Partial<Sessao>, 'idSessao' | 'idFilme' | 'idCinema'> & {
  idSessao?: number;
  idFilme?: number;
  idCinema?: number;
};

function filme(partial: FilmeInput): Filme {
  return {
    idFilme: (partial.idFilme ?? 1) as FilmeId,
    titulo: partial.titulo ?? 'Filme',
    sinopse: partial.sinopse ?? 'Sinopse',
    duracao: partial.duracao ?? 120,
    classificacao: partial.classificacao ?? '12',
    genero: partial.genero ?? 'Drama',
    dataLancamento: partial.dataLancamento ?? '2026-06-01',
    dataFimCartaz: partial.dataFimCartaz ?? '2026-06-30',
    poster: partial.poster ?? 'poster.jpg',
    nota: partial.nota ?? 8,
  };
}

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

describe('filmeService', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-03T10:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('filtra filmes em cartaz por periodo, genero, busca e cinema', () => {
    const filmes: Filme[] = [
      filme({ idFilme: 1, titulo: 'Missao Final', genero: 'Ação', dataLancamento: '2026-06-01', dataFimCartaz: '2026-06-20' }),
      filme({ idFilme: 2, titulo: 'Comedia do Bairro', genero: 'Comedia', dataLancamento: '2026-05-10', dataFimCartaz: '2026-05-30' }),
      filme({ idFilme: 3, titulo: 'Ação no Espaço', genero: 'Ação', dataLancamento: '2026-05-25', dataFimCartaz: '2026-06-25' }),
    ];

    const sessoes: Sessao[] = [
      sessao({ idSessao: 1, idFilme: 1, idCinema: 1 }),
      sessao({ idSessao: 2, idFilme: 3, idCinema: 2 }),
    ];

    const resultado = filtrarFilmesEmCartaz(filmes, sessoes, 'Ação', 'missao', 1);

    expect(resultado.map((f) => f.idFilme)).toEqual([1]);
  });

  it('filtra filmes em breve apenas dentro da janela de 7 dias', () => {
    const filmes: Filme[] = [
      filme({ idFilme: 1, titulo: 'Estreia Curta', dataLancamento: '2026-06-08' }),
      filme({ idFilme: 2, titulo: 'Estreia Longa', dataLancamento: '2026-06-12' }),
      filme({ idFilme: 3, titulo: 'Ja Lancou', dataLancamento: '2026-06-01' }),
    ];

    const sessoes: Sessao[] = [sessao({ idSessao: 1, idFilme: 1, idCinema: 1 })];

    const resultado = filtrarFilmesEmBreve(filmes, sessoes, 'Todos', '', 1);

    expect(resultado.map((f) => f.idFilme)).toEqual([1]);
  });

  it('retorna generos unicos mantendo Todos no inicio', () => {
    const filmes: Filme[] = [
      filme({ idFilme: 1, genero: 'Ação' }),
      filme({ idFilme: 2, genero: 'Drama' }),
      filme({ idFilme: 3, genero: 'Ação' }),
    ];

    expect(extrairGeneros(filmes)).toEqual(['Todos', 'Ação', 'Drama']);
  });
});
