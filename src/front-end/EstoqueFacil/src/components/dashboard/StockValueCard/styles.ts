import { StyleSheet } from "react-native";

import {
  colors,
  spacing,
  typography,
} from "@/theme";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    padding: spacing.lg,
  },

  label: {
    ...typography.body,
    color: colors.black,
  },

  value: {
    ...typography.title,
    color: colors.black,
    marginTop: spacing.sm,
  },
});