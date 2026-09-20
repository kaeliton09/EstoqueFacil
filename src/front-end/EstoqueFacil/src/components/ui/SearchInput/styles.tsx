import { StyleSheet } from "react-native";

import { colors, spacing, typography } from "@/theme";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: colors.inputBackground,

    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,

    paddingHorizontal: spacing.md,
    height: 52,
  },

  input: {
    flex: 1,

    marginLeft: spacing.sm,

    ...typography.body,

    color: colors.text,
  },
});