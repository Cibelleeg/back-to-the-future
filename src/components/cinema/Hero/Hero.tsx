import type { Filme } from '../../../types/cinema';
import { colors } from '../../../styles/theme';
import { Badge } from '../../ui/Badge';
import { ButtonGlass } from '../../../styles/shared';
import * as S from './Hero.styles';

interface HeroProps {
  filme: Filme;
  onShowSessions: () => void;
}

export function Hero({ filme, onShowSessions }: HeroProps) {
  return (
    <S.Section>
      <S.BackgroundImage src={filme.poster} alt="" />
      <S.Gradient />

      <S.Content>
        <Badge label="Em destaque" $bg={colors.badge.destaque.bg} $color={colors.badge.destaque.text} />
        <S.Title>{filme.titulo}</S.Title>
        <S.Synopsis>{filme.sinopse}</S.Synopsis>
        <S.Actions>
          <S.ButtonPrimaryLarge onClick={onShowSessions}>
            <i className="fa-solid fa-ticket" /> Ver sessões
          </S.ButtonPrimaryLarge>
          <ButtonGlass>
            <i className="fa-solid fa-play" /> Trailer
          </ButtonGlass>
        </S.Actions>
      </S.Content>
    </S.Section>
  );
}
