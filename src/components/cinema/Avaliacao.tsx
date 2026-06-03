import { formataNota } from '../../utils/formatters';

interface StarRatingProps {
  rating: number;
}

export function StarRating({ rating }: StarRatingProps) {
  const stars = Math.round(rating / 2);

  return (
    <span className="star-rating">
      {"★".repeat(stars)}
      {"☆".repeat(5 - stars)}
      <span>{formataNota(rating)}</span>
    </span>
  );
}
