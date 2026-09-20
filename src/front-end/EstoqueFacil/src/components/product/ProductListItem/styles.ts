import { StyleSheet } from "react-native";

import { colors, spacing, typography } from "@/theme";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.inputBackground,
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },

  info: {
    flex: 1,
  },

  name: {
    ...typography.bodyMedium,
    color: colors.text,
  },

  code: {
    ...typography.caption,
    color: colors.textSecondary,

    marginTop: spacing.xs,
  },

  quantityContainer: {
    alignItems: "flex-end",

    marginLeft: spacing.md,
  },

  quantityLabel: {
    ...typography.small,
    color: colors.textSecondary,
  },

  quantity: {
    ...typography.bodyMedium,
    color: colors.text,

    marginTop: spacing.xs,
  },
});