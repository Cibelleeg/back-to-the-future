import { useEffect, useState } from 'react';
import type { Cinema } from '../types/cinema';
import { CINEMAS } from '../data/mock';
import { fetchCinemas } from '../services/api';
import { config } from '../config';

export function useCinema() {
  const [cinemas, setCinemas]                     = useState<Cinema[]>(() => config.useMock ? CINEMAS : []);
  const [cinemaSelecionado, setCinemaSelecionado] = useState<Cinema | null>(null);
  const [isLoading, setIsLoading]                 = useState(!config.useMock);
  const [error, setError]                         = useState<string | null>(null);

  useEffect(() => {
    if (config.useMock) return;

    fetchCinemas()
      .then(setCinemas)
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : 'Erro ao carregar cinemas.');
      })
      .finally(() => setIsLoading(false));
  }, []);

  return { cinemas, cinemaSelecionado, setCinemaSelecionado, isLoading, error };
}
