import { StarRating } from '../../../components/ui';
import type { Gate } from '../catalogoData';
import * as S from '../FilmesPage.styles';

interface GateBlockProps {
  gate: Gate;
  myStars?: number;
  upcoming?: boolean;
}

export function GateBlock({ gate, myStars, upcoming }: GateBlockProps) {
  if (gate === 'eligible') {
    return (
      <S.Gate $variant="eligible">
        <S.GateIcon $variant="eligible">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </S.GateIcon>
        <S.GateText>
          <strong>Você assistiu a este filme</strong>
          <small>Conte o que achou — sua avaliação ajuda a comunidade.</small>
        </S.GateText>
        <S.BtnPrimary>Avaliar</S.BtnPrimary>
      </S.Gate>
    );
  }

  if (gate === 'reviewed' && myStars) {
    return (
      <S.Gate $variant="reviewed">
        <S.GateIcon $variant="reviewed">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </S.GateIcon>
        <S.GateText>
          <strong>Você já avaliou este filme</strong>
          <S.MyStars>
            <StarRating rating={myStars} maxRating={5} showScore={false} size={13} />
          </S.MyStars>
        </S.GateText>
        <S.BtnGhost>Editar avaliação</S.BtnGhost>
      </S.Gate>
    );
  }

  return (
    <S.Gate $variant="locked">
      <S.GateIcon $variant="locked">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      </S.GateIcon>
      <S.GateText>
        <strong>Avaliação bloqueada</strong>
        <small>
          {upcoming
            ? 'Disponível após a estreia e sua sessão.'
            : 'Assista a este filme na CINEFESP para poder avaliá-lo.'}
        </small>
      </S.GateText>
      <S.BtnDisabled disabled>Avaliar</S.BtnDisabled>
    </S.Gate>
  );
}
