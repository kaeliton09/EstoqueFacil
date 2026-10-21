import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts, typography } from '../theme';

type Props = { title: string; subtitle?: string; left?: React.ReactNode };

export function ScreenHeader({ title, subtitle, left }: Props) {
  return (
    <View style={styles.wrap}>
      {left}
      <View style={{ flex: 1 }}>
        <Text style={styles.title} accessibilityRole="header">{title}</Text>
        {subtitle ? <Text style={typography.caption}>{subtitle}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  title: { fontFamily: fonts.bold, fontSize: 24, color: colors.text },
});
