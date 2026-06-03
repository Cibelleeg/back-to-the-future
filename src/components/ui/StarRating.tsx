import { colors } from "../../styles/theme";
import { formataNota } from "../../utils/formatters";

interface StarRatingProps {
    rating: number;
}

export function StarRating ({ rating }: StarRatingProps) {
    const starsFilled = Math.round(rating / 2);

    return (
        <span style={{ color: colors.star, fontSize: 12, letterSpacing: 1 }}>
            {"★".repeat(starsFilled)}
      {"☆".repeat(5 - starsFilled)}
      <span style={{ color: colors.text.muted, marginLeft: 5, fontSize: 11 }}>
        {formataNota(rating)}
      </span>
    </span>
  )
}