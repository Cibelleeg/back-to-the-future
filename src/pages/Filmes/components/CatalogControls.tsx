import type { EstadoFilter, SortKey } from '../types';
import * as S from '../FilmesPage.styles';

interface CatalogControlsProps {
  sort: SortKey;
  genero: string;
  estado: EstadoFilter;
  generos: string[];
  total: number;
  onSortChange: (sort: SortKey) => void;
  onGeneroChange: (genero: string) => void;
  onEstadoChange: (estado: EstadoFilter) => void;
}

const SORT_OPTIONS: SortKey[] = ['nota', 'recentes', 'avaliados'];

function sortLabel(key: SortKey) {
  if (key === 'nota') return 'Nota';
  if (key === 'recentes') return 'Recentes';
  return 'Mais avaliados';
}

export function CatalogControls({
  sort,
  genero,
  estado,
  generos,
  total,
  onSortChange,
  onGeneroChange,
  onEstadoChange,
}: CatalogControlsProps) {
  return (
    <S.Controls>
      <S.ControlLabel>Ordenar</S.ControlLabel>
      <S.Seg>
        {SORT_OPTIONS.map(key => (
          <S.SegBtn key={key} $active={sort === key} onClick={() => onSortChange(key)}>
            {sortLabel(key)}
          </S.SegBtn>
        ))}
      </S.Seg>

      <S.SelectMini value={genero} onChange={e => onGeneroChange(e.target.value)}>
        {generos.map(g => <option key={g}>{g}</option>)}
      </S.SelectMini>

      <S.SelectMini value={estado} onChange={e => onEstadoChange(e.target.value as EstadoFilter)}>
        <option value="todos">Qualquer estado</option>
        <option value="cartaz">Em cartaz</option>
        <option value="breve">Em breve</option>
        <option value="encerrado">Encerrado</option>
      </S.SelectMini>

      <S.TotalCount>{total} filme{total !== 1 ? 's' : ''}</S.TotalCount>
    </S.Controls>
  );
}
