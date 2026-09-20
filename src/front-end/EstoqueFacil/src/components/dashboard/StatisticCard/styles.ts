import { StyleSheet } from "react-native";

import {
  colors,
  spacing,
  typography,
} from "@/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    borderRadius: 16,
    padding: spacing.lg,
  },

  label: {
    ...typography.body,
    color: colors.primary,
  },

  value: {
    ...typography.title,
    color: colors.primary,
    marginTop: spacing.sm,
  },
  title: {
  ...typography.body,
  color: colors.primary,
  flexShrink: 1,
},
});