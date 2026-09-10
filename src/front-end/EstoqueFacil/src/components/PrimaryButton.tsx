import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';

import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { radius, spacing } from '../theme/spacing';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function PrimaryButton({
  title,
  onPress,
  disabled = false,
  loading = false,
  style,
}: PrimaryButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.button,
        pressed && !isDisabled && styles.pressed,
        isDisabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={colors.white}
        />
      ) : (
        <Text style={styles.text}>
          {title}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 58,
    paddingHorizontal: spacing.xxl,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.99 }],
  },

  disabled: {
    opacity: 0.5,
  },

  text: {
    color: colors.white,
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.lg,
  },
});