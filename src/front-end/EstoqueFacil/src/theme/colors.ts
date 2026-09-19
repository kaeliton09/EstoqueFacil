export const colors = {
  primary: "#B1D430",
  secondary: "#1B8A9D",

  background: "#F3EAE9",
  surface: "#F3EBEA",

  text: "#1E1E1E",
  textSecondary: "#777777",

  border: "#E5E5E5",

  success: "#22C55E",
  warning: "#F59E0B",
  error: "#EF4444",

  black: "#000000",
  white: "#FFFFFF",
} as const;

export type ColorKey = keyof typeof colors;