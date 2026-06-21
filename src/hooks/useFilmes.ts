import { useEffect, useMemo, useState } from 'react';
import type { Filme, Sessao } from '../types/cinema';
import { FILMES, SESSOES } from '../data/mock';
import { fetchFilmes } from '../services/api';
import { extrairGeneros, filtrarFilmesEmBreve, filtrarFilmesEmCartaz } from '../services/filmeService';
import { config } from '../config';

export function useFilmes(idCinema?: number, sessoes: Sessao[] = SESSOES) {
  const [allFilmes, setAllFilmes] = useState<Filme[]>(() => config.useMock ? FILMES : []);
  const [isLoading, setIsLoading] = useState(!config.useMock);
  const [error, setError]         = useState<string | null>(null);

  const [generoSelecionado, setGeneroSelecionado] = useState('Todos');
  const [busca, setBusca] = useState('');

  useEffect(() => {
    if (config.useMock) return;

    fetchFilmes()
      .then(setAllFilmes)
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : 'Erro ao carregar filmes.');
      })
      .finally(() => setIsLoading(false));
  }, []);

  const generos = useMemo(() => extrairGeneros(allFilmes), [allFilmes]);

  const filmesEmCartaz = useMemo(
    () => filtrarFilmesEmCartaz(allFilmes, sessoes, generoSelecionado, busca, idCinema),
    [allFilmes, sessoes, generoSelecionado, busca, idCinema],
  );

  const filmesEmBreve = useMemo(
    () => filtrarFilmesEmBreve(allFilmes, sessoes, generoSelecionado, busca, idCinema),
    [allFilmes, sessoes, generoSelecionado, busca, idCinema],
  );

  const filmeDestaque = filmesEmCartaz[0] ?? allFilmes[0] ?? null;

  return {
    filmeDestaque,
    filmesEmCartaz,
    filmesEmBreve,
    generos,
    generoSelecionado,
    setGeneroSelecionado,
    busca,
    setBusca,
    isLoading,
    error,
  };
}
