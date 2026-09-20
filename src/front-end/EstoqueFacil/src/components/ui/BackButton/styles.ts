import { StyleSheet } from "react-native";

import { colors, spacing, typography } from "@/theme";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 48,
    alignSelf: "flex-start",
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.black,
    borderRadius: 20
    ,
  },

  text: {
    ...typography.bodyMedium,
    color: colors.primary,
  },

  pressed: {
    opacity: 0.6,
  },
});