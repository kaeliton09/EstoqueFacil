import { StyleSheet } from "react-native";
import {
  colors,
  spacing,
  typography,
} from "@/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: colors.background,

    paddingHorizontal: spacing.screen,

    justifyContent: "center",
  },

  header: {
    alignItems: "center",

    marginBottom: spacing.xl,
  },

  title: {
    ...typography.title,

    color: colors.text,
  },

  subtitle: {
    ...typography.body,

    color: colors.textSecondary,

    marginTop: spacing.sm,

    textAlign: "center",
  },

  form: {
    width: "100%",

    gap: spacing.lg,
  },
});