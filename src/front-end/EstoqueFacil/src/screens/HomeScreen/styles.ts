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
    },

    header: {
        paddingHorizontal: spacing.screen,
        paddingTop: spacing.giant,
    },

    greeting: {
        ...typography.title,
        color: colors.text,
    },

    subtitle: {
        ...typography.body,
        color: colors.textSecondary,
        marginTop: spacing.xs,
    },

    content: {
        paddingHorizontal: spacing.screen,
        marginTop: spacing.xl,
    },
    statistics: {
        flexDirection: "row",
        gap: spacing.md,
        marginTop: spacing.lg,
    },
    title: {
        ...typography.body,
        color: colors.black,
        flexShrink: 1,
    },
    itemsList: {   
        marginTop: spacing.xl,
        marginBottom: spacing.xl,
    }
});