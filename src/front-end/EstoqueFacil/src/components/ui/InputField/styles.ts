import { StyleSheet } from "react-native";
import { colors, spacing, typography } from "@/theme";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: spacing.sm,
  },

  label: {
    ...typography.bodyMedium,
    color: colors.text,
  },

  input: {
    height: 52,
    width: "100%",

    backgroundColor: colors.inputBackground,

    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,

    paddingHorizontal: spacing.md,

    ...typography.body,
    color: colors.text,
  },
});