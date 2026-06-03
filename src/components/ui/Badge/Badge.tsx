import * as S from './Badge.styles';

interface BadgeProps {
  label: string;
  $bg?: string;
  $color?: string;
}

export function Badge({ label, $bg, $color }: BadgeProps) {
  return <S.Span $bg={$bg} $color={$color}>{label}</S.Span>;
}
