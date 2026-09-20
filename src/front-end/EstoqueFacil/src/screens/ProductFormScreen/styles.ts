import { StyleSheet } from "react-native";

import { colors, spacing, typography } from "@/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: spacing.giant,
  },

    titlePage: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.sm,
    },

  content: {
    paddingHorizontal: spacing.screen,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxl,
  },

  header: {
    marginBottom: spacing.xl,
  },

  title: {
    ...typography.title,
    color: colors.text,
  },

  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },

  section: {
    marginBottom: spacing.xl,
  },

  sectionTitle: {
    ...typography.heading,
    color: colors.text,
    marginBottom: spacing.md,
  },

  row: {
    flexDirection: "row",
    gap: spacing.md,
  },

  halfInput: {
    flex: 1,
  },

  imagePlaceholder: {
    height: 140,

    backgroundColor: colors.surface,

    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: "dashed",
    borderRadius: 12,

    alignItems: "center",
    justifyContent: "center",
  },

  imageIcon: {
    fontSize: 32,
    color: colors.secondary,
    marginBottom: spacing.xs,
  },

  imageText: {
    ...typography.body,
    color: colors.textSecondary,
  },
});