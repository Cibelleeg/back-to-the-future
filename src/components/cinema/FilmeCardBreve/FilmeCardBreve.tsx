import type { Filme } from '../../../types/cinema';
import { formataDuracao, formataData } from '../../../utils/formatters';
import { Badge } from '../../ui/Badge';
import * as S from './FilmeCardBreve.styles';

interface FilmeCardBreveProps {
  filme: Filme;
  onClick: () => void;
}

export function FilmeCardBreve({ filme, onClick }: FilmeCardBreveProps) {
  return (
    <S.Card onClick={onClick}>
      <S.Poster src={filme.poster} alt={filme.titulo} />

      <S.Classification>
        <Badge label={filme.classificacao} />
      </S.Classification>

      <S.Overlay>
        <S.OverlayTitle>{filme.titulo}</S.OverlayTitle>

        <S.Tags>
          <Badge label={filme.genero} />
          <Badge label={formataDuracao(filme.duracao)} />
        </S.Tags>

        <S.ReleaseDate>Lançamento: {formataData(filme.dataLancamento)}</S.ReleaseDate>
      </S.Overlay>
    </S.Card>
  );
}
