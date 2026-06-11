import type { Filme, Sessao } from '../../../types/cinema';
import { formataDuracao, formataHora } from '../../../utils/formatters';
import { Badge } from '../../ui/Badge';
import * as S from './FilmeCard.styles';

interface FilmeCardProps {
  filme: Filme;
  sessoes: Sessao[];
  onClick: () => void;
}

export function FilmeCard({ filme, sessoes, onClick }: FilmeCardProps) {
  const proximaSessao = sessoes[0];

  return (
    <S.Card onClick={onClick}>
      <S.Poster src={filme.poster} alt={filme.titulo} />

      <S.Classification>
        <Badge label={filme.classificacao} />
      </S.Classification>

      <S.Rating>★ {filme.nota}</S.Rating>

      <S.Overlay>
        <S.OverlayTitle>{filme.titulo}</S.OverlayTitle>

        <S.Tags>
          <Badge label={filme.genero} />
          <Badge label={formataDuracao(filme.duracao)} />
        </S.Tags>

        {proximaSessao && (
          <S.NextSession>
            Próxima: {formataHora(proximaSessao.dataHora)} · {proximaSessao.formato}
          </S.NextSession>
        )}

        <S.Action>Ver sessões</S.Action>
      </S.Overlay>
    </S.Card>
  );
}
