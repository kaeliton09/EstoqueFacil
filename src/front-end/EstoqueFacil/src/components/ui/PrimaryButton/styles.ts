import { StyleSheet } from "react-native";
import { colors, spacing, typography } from "@/theme";

export const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 52,

    backgroundColor: colors.primary,

    borderRadius: 10,

    alignItems: "center",
    justifyContent: "center",

    paddingHorizontal: spacing.lg,
  },

  text: {
    ...typography.button,
    color: colors.black,
  },
});