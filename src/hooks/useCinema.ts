import { useState } from 'react';
import type { Cinema } from '../types/cinema';
import { CINEMAS } from '../data/mock';

export function useCinema() {
  const [cinemaSelecionado, setCinemaSelecionado] = useState<Cinema | null>(null);

  return {
    cinemas: CINEMAS,
    cinemaSelecionado,
    setCinemaSelecionado,
  };
}
