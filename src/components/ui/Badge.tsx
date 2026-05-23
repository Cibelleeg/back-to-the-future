import type { CSSProperties } from "react";

interface BadgeProps {
    label: string
    style?: CSSProperties
}

export function Badge({ label, style }: BadgeProps) {
    return(
        <span style={{
            fontSize: 10,
            fontWeight: 600,
            padding: "2px 7px",
            borderRadius: 4,
            letterSpacing: "0.5px",
            textTransform: "uppercase",
            ...style,
        }}>
            {label}
        </span>
    )
}