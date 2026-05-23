import type { formato } from "../types/cinema";

export const colors = {
    bg: {
        page: "#0a0a0f",
        card: "#12121a",
        surface: "#1a1a24",
    },
    accent: "#e63329",
    text: {
        primary: "#e8e6e0",
        muted: "#aaa",
        faint: "#666",
    },
    star: "#f5c842"
} as const;

export const formatColors: Record<formato, { bg: string; text: string }> = {
    IMAX: { bg: "#1a3a5c", text: "#64b5f6" },
    "4DX": { bg: "#3a1a2e", text: "#ce93d8" },
    "3D":  { bg: "#1a3a2a", text: "#81c784" },
    "2D":  { bg: "#2a2a2a", text: "#aaaaaa" },
}

export const classificacaoCores: Record<string, { bg: string; text: string }> = {
  "L":  { bg: "#1a4a2e", text: "#4caf50" },
  "10": { bg: "#1a3a4a", text: "#29b6f6" },
  "12": { bg: "#3a3a1a", text: "#ffca28" },
  "14": { bg: "#3a2a1a", text: "#ffa726" },
  "16": { bg: "#3a1a1a", text: "#ef5350" },
  "18": { bg: "#1a0000", text: "#b71c1c" },
}

export const font = {
  display: "'Bebas Neue', cursive",
  body:    "'DM Sans', sans-serif",
} as const
