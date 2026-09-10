import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';

import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { radius, spacing } from '../theme/spacing';

interface StatCardProps {
  value: string;
  label: string;
  backgroundColor?: string;
  textColor?: string;
  style?: StyleProp<ViewStyle>;
  valueSize?: number;
}

export function StatCard({
  value,
  label,
  backgroundColor = colors.primary,
  textColor = colors.white,
  style,
  valueSize = typography.fontSize.display,
}: StatCardProps) {
  return (
    <View
      style={[
        styles.container,
        { backgroundColor },
        style,
      ]}
    >
      <Text
        style={[
          styles.value,
          {
            color: textColor,
            fontSize: valueSize,
          },
        ]}
        numberOfLines={1}
        adjustsFontSizeToFit
      >
        {value}
      </Text>

      <Text
        style={[
          styles.label,
          {
            color: textColor,
          },
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 150,
    borderRadius: radius.xxl,
    padding: spacing.xl,
    justifyContent: 'center',
  },

  value: {
    fontFamily: typography.fontFamily.extraBold,
    lineHeight: 58,
  },

  label: {
    marginTop: spacing.xs,
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.lg,
    lineHeight: 23,
  },
});