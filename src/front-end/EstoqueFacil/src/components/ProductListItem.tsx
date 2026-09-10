import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { radius, spacing } from '../theme/spacing';

export interface Product {
  id: string;
  name: string;
  category: string;
  quantity: number;
  minimumQuantity: number;
  unitPrice: number;
  description?: string;
}

interface ProductListItemProps {
  product: Product;
  onPress?: () => void;
}

export function ProductListItem({
  product,
  onPress,
}: ProductListItemProps) {
  const isLowStock =
    product.quantity < product.minimumQuantity;

  const formattedPrice =
    product.unitPrice.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

  return (
    <View
      style={styles.container}
      accessibilityRole={onPress ? 'button' : undefined}
    >
      <View style={styles.iconContainer}>
        <Ionicons
          name="cube-outline"
          size={25}
          color={colors.primary}
        />
      </View>

      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text
            style={styles.name}
            numberOfLines={1}
          >
            {product.name}
          </Text>

          {isLowStock && (
            <View style={styles.lowStockBadge}>
              <Text style={styles.lowStockText}>
                Estoque baixo
              </Text>
            </View>
          )}
        </View>

        <Text style={styles.category}>
          {product.category}
        </Text>

        <View style={styles.detailsRow}>
          <Text style={styles.quantity}>
            {product.quantity} un.
          </Text>

          <Text style={styles.price}>
            {formattedPrice}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: 92,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    padding: spacing.lg,
    marginBottom: spacing.md,

    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 5,
    elevation: 2,
  },

  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: radius.lg,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },

  content: {
    flex: 1,
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },

  name: {
    flex: 1,
    color: colors.text,
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.md,
  },

  category: {
    marginTop: 2,
    color: colors.textSecondary,
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
  },

  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
  },

  quantity: {
    color: colors.primaryDark,
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.sm,
  },

  price: {
    color: colors.textSecondary,
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.sm,
  },

  lowStockBadge: {
    flexShrink: 1,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: radius.pill,
    backgroundColor: '#FCE7E7',
  },

  lowStockText: {
    color: colors.danger,
    fontFamily: typography.fontFamily.semiBold,
    fontSize: 9,
  },
});