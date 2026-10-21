import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from './Card';
import { colors, fonts, radius, typography } from '../theme';

type Props = {
  label: string;
  value: string;
  icon: keyof typeof Ionicons.glyphMap;
  tone?: 'green' | 'amber';
};

export function StatCard({ label, value, icon, tone = 'green' }: Props) {
  const bg = tone === 'amber' ? colors.warningSoft : colors.primarySoft;
  const fg = tone === 'amber' ? colors.warning : colors.primaryDark;
  return (
    <Card style={styles.card} accessible accessibilityLabel={`${label}: ${value}`}>
      <View style={[styles.icon, { backgroundColor: bg }]}>
        <Ionicons name={icon} size={20} color={fg} />
      </View>
      <Text style={styles.value}>{value}</Text>
      <Text style={typography.caption}>{label}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1, gap: 4 },
  icon: { width: 38, height: 38, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center', marginBottom: 6 },
  value: { fontFamily: fonts.bold, fontSize: 22, color: colors.text },
});
