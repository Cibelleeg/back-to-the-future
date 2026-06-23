import type { Filme } from '../../types/cinema';
import type { EstadoFilme } from './types';
export const ESTADO_LABEL: Record<EstadoFilme, string> = {
  cartaz: 'Em cartaz',
  breve: 'Em breve',
  encerrado: 'Encerrado',
};

export function getEstado(filme: Filme): EstadoFilme {
  const now = new Date().setHours(0, 0, 0, 0);
  const lancamento = new Date(filme.dataLancamento).setHours(0, 0, 0, 0);
  const fimCartaz = new Date(filme.dataFimCartaz).setHours(0, 0, 0, 0);

  if (lancamento > now) return 'breve';
  if (fimCartaz >= now) return 'cartaz';
  return 'encerrado';
}
