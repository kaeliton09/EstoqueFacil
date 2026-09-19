import { TextStyle } from "react-native";

export const typography: Record<string, TextStyle> = {
  title: {
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 30,
  },

  heading: {
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 26,
  },

  body: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 22,
  },

  bodyMedium: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 22,
  },

  caption: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 18,
  },

  small: {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 16,
  },

  button: {
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 20,
  },
};