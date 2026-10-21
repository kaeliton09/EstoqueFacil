import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts, radius } from '../theme';
import { getStockStatus, Product } from '../types/product';

const STATUS = {
  ok: { label: 'Em estoque', fg: colors.primaryDark, bg: colors.primarySoft },
  low: { label: 'Estoque baixo', fg: colors.warning, bg: colors.warningSoft },
  out: { label: 'Sem estoque', fg: colors.danger, bg: colors.dangerSoft },
};

export function getStatusInfo(p: Pick<Product, 'quantity' | 'minQuantity'>) {
  return STATUS[getStockStatus(p)];
}

export function StatusBadge({ product }: { product: Pick<Product, 'quantity' | 'minQuantity'> }) {
  const s = getStatusInfo(product);
  return (
    <View style={[styles.badge, { backgroundColor: s.bg }]}>
      <Text style={[styles.text, { color: s.fg }]}>{s.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 3, borderRadius: radius.full },
  text: { fontFamily: fonts.medium, fontSize: 10 },
});
