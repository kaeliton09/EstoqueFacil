import { StyleSheet } from "react-native";

import { colors, spacing, typography } from "@/theme";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingTop: spacing.giant,
    },

    content: {
        paddingHorizontal: spacing.screen,
        paddingTop: spacing.xl,
        paddingBottom: spacing.giant,
    },

    header: {
        marginBottom: spacing.lg, 
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

    results: {
        marginTop: spacing.xl,
    },

    resultsTitle: {
        ...typography.heading,
        color: colors.text,

        marginBottom: spacing.md,
    },
    filtersSection: {
        marginTop: spacing.lg,
    },

    filtersTitle: {
        ...typography.bodyMedium,
        color: colors.text,

        marginBottom: spacing.sm,
    },

    filters: {
        flexDirection: "row",
        gap: spacing.sm,
    },

    clearFilters: {
        ...typography.caption,
        color: colors.secondary,

        marginTop: spacing.sm,
    },

});