import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts, radius, shadow, typography } from '../theme';
import { Product } from '../types/product';
import { getStatusInfo, StatusBadge } from './StatusBadge';

type Props = { product: Product; onPress?: () => void };

export function ProductListItem({ product, onPress }: Props) {
  const { street, column, bay, level } = product.location;
  const status = getStatusInfo(product).label;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${product.name}, ${product.quantity} unidades, ${status}. Local: rua ${street}, coluna ${column}, vão ${bay}, nível ${level}`}
      accessibilityHint={onPress ? 'Abre a tela para gerenciar o item' : undefined}
      style={({ pressed }) => [styles.card, pressed && { opacity: 0.85 }]}
    >
      <View style={styles.thumb}>
        <Ionicons name="cube-outline" size={24} color={colors.primaryDark} />
      </View>

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{product.name}</Text>
        <Text style={typography.caption}>{product.code}</Text>
        <View style={styles.locRow}>
          <Ionicons name="location-outline" size={13} color={colors.textMuted} />
          <Text style={typography.caption}>Rua {street}, Col. {column}, Vão {bay}, Nív. {level}</Text>
        </View>
      </View>

      <View style={styles.right}>
        <Text style={styles.qty}>{product.quantity}</Text>
        <StatusBadge product={product} />
      </View>
      {onPress && <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14,
    backgroundColor: colors.surface, borderRadius: radius.lg, ...shadow.card,
  },
  thumb: { width: 48, height: 48, borderRadius: radius.md, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' },
  info: { flex: 1, gap: 2 },
  name: { fontFamily: fonts.semibold, fontSize: 15, color: colors.text },
  locRow: { flexDirection: 'row', alignItems: 'center', gap: 3, marginTop: 2 },
  right: { alignItems: 'flex-end', gap: 4 },
  qty: { fontFamily: fonts.bold, fontSize: 20, color: colors.text },
});
