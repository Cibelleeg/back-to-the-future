import { formataNota } from '../../../utils/formatters';
import * as S from './StarRating.styles';

interface StarRatingProps {
  rating: number;
  maxRating?: 5 | 10;
  showScore?: boolean;
  size?: number;
  score?: string;
  className?: string;
}

export function StarRating({
  rating,
  maxRating = 10,
  showScore = true,
  size = 12,
  score,
  className,
}: StarRatingProps) {
  const stars = Math.max(0, Math.min(5, Math.round(maxRating === 10 ? rating / 2 : rating)));

  return (
    <S.Wrapper className={className} aria-label={`${stars} de 5 estrelas`}>
      {Array.from({ length: 5 }, (_, i) => (
        <S.Star key={i} $filled={i < stars} $size={size} viewBox="0 0 24 24">
          <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </S.Star>
      ))}
      {showScore && <S.Score>{score ?? formataNota(rating)}</S.Score>}
    </S.Wrapper>
  );
}
