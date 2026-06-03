import type { CSSProperties } from "react";

interface BadgeProps {
  label: string;
  style?: CSSProperties;
}

export function Badge({ label, style }: BadgeProps) {
  return (
    <span className="badge" style={style}>
      {label}
    </span>
  );
}
