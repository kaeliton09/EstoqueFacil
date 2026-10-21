import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts, radius, typography } from '../theme';

type Props = TextInputProps & {
  label: string;
  error?: string;
  hint?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  disabled?: boolean;
};

export function InputField({ label, error, hint, icon, disabled, secureTextEntry, style, ...rest }: Props) {
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(!!secureTextEntry);

  const borderColor = error ? colors.danger : focused ? colors.primary : colors.border;

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.field, { borderColor }, focused && styles.focused, disabled && styles.disabled]}>
        {icon && <Ionicons name={icon} size={18} color={focused ? colors.primary : colors.textMuted} />}
        <TextInput
          {...rest}
          editable={!disabled}
          secureTextEntry={hidden}
          onFocus={(e) => { setFocused(true); rest.onFocus?.(e); }}
          onBlur={(e) => { setFocused(false); rest.onBlur?.(e); }}
          placeholderTextColor={colors.textMuted}
          accessibilityLabel={label}
          accessibilityState={{ disabled: !!disabled }}
          accessibilityHint={error}
          style={[styles.input, style]}
        />
        {secureTextEntry && (
          <Pressable
            onPress={() => setHidden((h) => !h)}
            hitSlop={12}
            accessibilityRole="button"
            accessibilityLabel={hidden ? 'Mostrar senha' : 'Ocultar senha'}
          >
            <Ionicons name={hidden ? 'eye-outline' : 'eye-off-outline'} size={20} color={colors.textMuted} />
          </Pressable>
        )}
      </View>
      {error ? (
        <View style={styles.msgRow} accessibilityLiveRegion="polite">
          <Ionicons name="alert-circle" size={14} color={colors.danger} />
          <Text style={[styles.msg, { color: colors.danger }]}>{error}</Text>
        </View>
      ) : hint ? (
        <Text style={styles.msg}>{hint}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { gap: 6 },
  label: typography.label,
  field: {
    minHeight: 52, flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: colors.surface, borderWidth: 1.5, borderRadius: radius.md, paddingHorizontal: 14,
  },
  focused: { backgroundColor: '#FAFFFB' },
  disabled: { backgroundColor: colors.background, opacity: 0.7 },
  input: { flex: 1, fontFamily: fonts.regular, fontSize: 15, color: colors.text, paddingVertical: 12 },
  msgRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  msg: { ...typography.caption },
});
