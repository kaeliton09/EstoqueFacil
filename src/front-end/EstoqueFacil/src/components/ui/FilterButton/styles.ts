import { StyleSheet } from "react-native";

import { colors, spacing, typography } from "@/theme";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: colors.secondary,

    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16
    ,

    paddingHorizontal: spacing.md,
    height: 42,

    gap: spacing.xs,
  },

  text: {
    ...typography.caption,
    color: colors.text,
  },
});