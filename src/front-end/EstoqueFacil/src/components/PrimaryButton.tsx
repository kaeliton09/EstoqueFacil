import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts, radius } from '../theme';

type Props = {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'outline' | 'danger';
  loading?: boolean;
  disabled?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
};

export function PrimaryButton({ title, onPress, variant = 'primary', loading, disabled, icon }: Props) {
  const inactive = disabled || loading;
  const fg = variant === 'primary' ? colors.white : variant === 'danger' ? colors.danger : colors.primary;

  return (
    <Pressable
      onPress={onPress}
      disabled={inactive}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ disabled: !!inactive, busy: !!loading }}
      style={({ pressed }) => [
        styles.base,
        variant === 'primary' && styles.filled,
        variant === 'outline' && styles.outline,
        variant === 'danger' && styles.danger,
        pressed && variant === 'primary' && styles.filledPressed,
        pressed && variant === 'outline' && { backgroundColor: colors.primarySoft },
        pressed && variant === 'danger' && { backgroundColor: colors.dangerSoft },
        inactive && styles.disabled,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={fg} />
      ) : (
        <View style={styles.row}>
          {icon && <Ionicons name={icon} size={18} color={fg} />}
          <Text style={[styles.text, { color: fg }]}>{title}</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { minHeight: 52, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 },
  filled: { backgroundColor: colors.primary },
  filledPressed: { backgroundColor: colors.primaryDark },
  outline: { backgroundColor: colors.surface, borderWidth: 1.5, borderColor: colors.primary },
  danger: { backgroundColor: colors.surface, borderWidth: 1.5, borderColor: colors.danger },
  disabled: { opacity: 0.5 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  text: { fontFamily: fonts.semibold, fontSize: 15 },
});
