import type { Sessao } from '../types/cinema';

export function agruparSessoesPorFilme(sessoes: Sessao[]): Record<number, Sessao[]> {
  return sessoes.reduce<Record<number, Sessao[]>>((acc, sessao) => {
    acc[sessao.idFilme] = [...(acc[sessao.idFilme] ?? []), sessao];
    return acc;
  }, {});
}
