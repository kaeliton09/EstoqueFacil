import React, { useState } from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { radius, spacing } from '../theme/spacing';

interface InputFieldProps extends TextInputProps {
  label?: string;
  error?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  isPassword?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

export function InputField({
  label,
  error,
  icon,
  isPassword = false,
  containerStyle,
  style,
  ...textInputProps
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  const secureTextEntry = isPassword && !showPassword;

  return (
    <View style={[styles.wrapper, containerStyle]}>
      {label && (
        <Text style={styles.label}>
          {label}
        </Text>
      )}

      <View
        style={[
          styles.inputContainer,
          error && styles.inputContainerError,
          textInputProps.multiline && styles.multilineContainer,
        ]}
      >
        {icon && (
          <Ionicons
            name={icon}
            size={21}
            color={colors.primary}
            style={styles.leftIcon}
          />
        )}

        <TextInput
          {...textInputProps}
          secureTextEntry={secureTextEntry}
          placeholderTextColor={colors.textLight}
          style={[
            styles.input,
            textInputProps.multiline && styles.multilineInput,
            style,
          ]}
        />

        {isPassword && (
          <Ionicons
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            size={22}
            color={colors.primary}
            onPress={() => setShowPassword((current) => !current)}
            style={styles.rightIcon}
          />
        )}
      </View>

      {error && (
        <Text style={styles.error}>
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },

  label: {
    marginBottom: spacing.sm,
    color: colors.text,
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.sm,
  },

  inputContainer: {
    minHeight: 54,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.pill,
    backgroundColor: colors.white,
    paddingHorizontal: spacing.lg,
  },

  multilineContainer: {
    minHeight: 120,
    alignItems: 'flex-start',
    borderRadius: radius.lg,
    paddingVertical: spacing.md,
  },

  input: {
    flex: 1,
    minHeight: 52,
    color: colors.text,
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    paddingVertical: 0,
  },

  multilineInput: {
    minHeight: 95,
    textAlignVertical: 'top',
  },

  leftIcon: {
    marginRight: spacing.sm,
  },

  rightIcon: {
    marginLeft: spacing.sm,
  },

  inputContainerError: {
    borderColor: colors.danger,
  },

  error: {
    marginTop: spacing.xs,
    marginLeft: spacing.md,
    color: colors.danger,
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.xs,
  },
});