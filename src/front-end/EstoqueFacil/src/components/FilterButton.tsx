import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colors, fonts, radius } from '../theme';

type Props = { label: string; selected?: boolean; onPress: () => void };

export function FilterButton({ label, selected, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Filtro ${label}`}
      accessibilityState={{ selected: !!selected }}
      style={({ pressed }) => [styles.chip, selected && styles.selected, pressed && !selected && styles.pressed]}
    >
      <Text style={[styles.text, selected && styles.textSelected]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    minHeight: 40, paddingHorizontal: 16, borderRadius: radius.full, justifyContent: 'center',
    backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border,
  },
  pressed: { backgroundColor: colors.primarySoft },
  selected: { backgroundColor: colors.primary, borderColor: colors.primary },
  text: { fontFamily: fonts.medium, fontSize: 13, color: colors.textMuted },
  textSelected: { color: colors.white },
});
