import { StyleSheet } from "react-native";

import { colors, spacing, typography } from "@/theme";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: spacing.md,
  },

  label: {
    ...typography.bodyMedium,
    color: colors.text,
    marginBottom: spacing.xs,
  },

  input: {
    minHeight: 52,
    width: "100%",

    backgroundColor: colors.inputBackground,

    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,

    paddingHorizontal: spacing.md,

    ...typography.body,
    color: colors.text,
  },

  inputFocused: {
    borderWidth: 2,
    borderColor: colors.primary,
  },

  inputError: {
    borderWidth: 2,
    borderColor: colors.error,
  },

  inputDisabled: {
    backgroundColor: "#EDEDED",
    borderColor: colors.border,
    color: colors.textSecondary,
  },

  error: {
    ...typography.caption,
    color: colors.error,
    marginTop: spacing.xs,
  },
});