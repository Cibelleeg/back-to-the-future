import { useEffect, useMemo, useState } from 'react';
import type { Sessao } from '../types/cinema';
import { SESSOES } from '../data/mock';
import { config } from '../config';
import { fetchSessoes } from '../services/api';
import { agruparSessoesPorFilme } from '../services/sessaoService';

export function useSessoes(idCinema?: number) {
  const [allSessoes, setAllSessoes] = useState<Sessao[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (config.useMock) {
      setAllSessoes(SESSOES);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    fetchSessoes()
      .then(setAllSessoes)
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : 'Erro ao carregar sessões.');
      })
      .finally(() => setIsLoading(false));
  }, []);

  const sessoesPorFilme = useMemo(() => {
    const filtradas = idCinema
      ? allSessoes.filter((s) => s.idCinema === idCinema)
      : allSessoes;
    return agruparSessoesPorFilme(filtradas);
  }, [allSessoes, idCinema]);

  return { sessoes: allSessoes, sessoesPorFilme, isLoading, error };
}
