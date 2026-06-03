import { formataNota } from '../../../utils/formatters';
import * as S from './StarRating.styles';

interface StarRatingProps {
  rating: number;
}

export function StarRating({ rating }: StarRatingProps) {
  const stars = Math.round(rating / 2);

  return (
    <S.Wrapper>
      {'★'.repeat(stars)}
      {'☆'.repeat(5 - stars)}
      <S.Score>{formataNota(rating)}</S.Score>
    </S.Wrapper>
  );
}
