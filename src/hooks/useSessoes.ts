import { useMemo } from 'react';
import { SESSOES } from '../data/mock';
import { agruparSessoesPorFilme } from '../services/sessaoService';

export function useSessoes(idCinema?: number) {
  const sessoesPorFilme = useMemo(() => {
    const sessoesFiltradas = idCinema
      ? SESSOES.filter((s) => s.idCinema === idCinema)
      : SESSOES;
    return agruparSessoesPorFilme(sessoesFiltradas);
  }, [idCinema]);

  return { sessoesPorFilme };
}
