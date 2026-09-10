import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import {
  Product,
  ProductListItem,
} from '../components/ProductListItem';
import { InputField } from '../components/InputField';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { radius, spacing } from '../theme/spacing';

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Notebook Dell Inspiron',
    category: 'Computador',
    quantity: 15,
    minimumQuantity: 5,
    unitPrice: 3299.9,
  },
  {
    id: '2',
    name: 'MacBook Air M2',
    category: 'Computador',
    quantity: 3,
    minimumQuantity: 5,
    unitPrice: 7499.9,
  },
  {
    id: '3',
    name: 'iPhone 15',
    category: 'Dispositivo móvel',
    quantity: 22,
    minimumQuantity: 10,
    unitPrice: 5299.9,
  },
  {
    id: '4',
    name: 'Galaxy S24',
    category: 'Dispositivo móvel',
    quantity: 4,
    minimumQuantity: 8,
    unitPrice: 3999.9,
  },
  {
    id: '5',
    name: 'iPad Air',
    category: 'Tablet',
    quantity: 12,
    minimumQuantity: 5,
    unitPrice: 4299.9,
  },
  {
    id: '6',
    name: 'Galaxy Tab S9',
    category: 'Tablet',
    quantity: 2,
    minimumQuantity: 5,
    unitPrice: 3699.9,
  },
  {
    id: '7',
    name: 'Mouse Logitech MX',
    category: 'Periféricos',
    quantity: 31,
    minimumQuantity: 10,
    unitPrice: 499.9,
  },
  {
    id: '8',
    name: 'Teclado Mecânico',
    category: 'Periféricos',
    quantity: 7,
    minimumQuantity: 10,
    unitPrice: 349.9,
  },
];

const categories = [
  'Todos',
  'Computador',
  'Dispositivo móvel',
  'Tablet',
  'Periféricos',
];

export function ProductListScreen() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] =
    useState('Todos');

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search
      .trim()
      .toLowerCase();

    return mockProducts.filter((product) => {
      const matchesSearch =
        !normalizedSearch ||
        product.name
          .toLowerCase()
          .includes(normalizedSearch) ||
        product.category
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesCategory =
        selectedCategory === 'Todos' ||
        product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductListItem product={item} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View>
            <View style={styles.header}>
              <View style={styles.headerText}>
                <Text style={styles.title}>
                  Produtos
                </Text>

                <Text style={styles.subtitle}>
                  Consulte os produtos cadastrados
                </Text>
              </View>

              <View style={styles.headerIcon}>
                <Ionicons
                  name="search"
                  size={27}
                  color={colors.white}
                />
              </View>
            </View>

            <InputField
              value={search}
              onChangeText={setSearch}
              placeholder="Buscar produto..."
              icon="search-outline"
              autoCapitalize="none"
              containerStyle={styles.search}
            />

            <Text style={styles.filterTitle}>
              Filtrar por categoria
            </Text>

            <FlatList
              data={categories}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item}
              contentContainerStyle={styles.categoryList}
              renderItem={({ item }) => {
                const selected =
                  selectedCategory === item;

                return (
                  <Pressable
                    onPress={() =>
                      setSelectedCategory(item)
                    }
                    style={[
                      styles.categoryChip,
                      selected &&
                        styles.categoryChipSelected,
                    ]}
                  >
                    <Text
                      style={[
                        styles.categoryText,
                        selected &&
                          styles.categoryTextSelected,
                      ]}
                    >
                      {item}
                    </Text>
                  </Pressable>
                );
              }}
            />

            <View style={styles.resultHeader}>
              <Text style={styles.resultTitle}>
                Produtos encontrados
              </Text>

              <Text style={styles.resultCount}>
                {filteredProducts.length}
              </Text>
            </View>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name="cube-outline"
              size={48}
              color={colors.primary}
            />

            <Text style={styles.emptyTitle}>
              Nenhum produto encontrado
            </Text>

            <Text style={styles.emptyText}>
              Tente alterar sua busca ou o filtro
              selecionado.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  listContent: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    paddingBottom: spacing.huge,
  },

  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },

  headerText: {
    flex: 1,
  },

  title: {
    color: colors.primary,
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.title,
    lineHeight: 45,
  },

  subtitle: {
    marginTop: spacing.xs,
    color: colors.textSecondary,
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
  },

  headerIcon: {
    width: 58,
    height: 58,
    marginLeft: spacing.md,
    borderRadius: radius.pill,
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },

  search: {
    marginBottom: spacing.xl,
  },

  filterTitle: {
    marginBottom: spacing.sm,
    color: colors.text,
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.sm,
  },

  categoryList: {
    gap: spacing.sm,
    paddingBottom: spacing.xxl,
  },

  categoryChip: {
    minHeight: 40,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.borderLight,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },

  categoryChipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  categoryText: {
    color: colors.textSecondary,
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.sm,
  },

  categoryTextSelected: {
    color: colors.white,
  },

  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },

  resultTitle: {
    color: colors.text,
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.md,
  },

  resultCount: {
    minWidth: 30,
    height: 30,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.primarySoft,
    color: colors.primaryDark,
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.sm,
    textAlign: 'center',
    textAlignVertical: 'center',
    overflow: 'hidden',
  },

  emptyContainer: {
    minHeight: 250,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xxl,
  },

  emptyTitle: {
    marginTop: spacing.lg,
    color: colors.text,
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.lg,
    textAlign: 'center',
  },

  emptyText: {
    marginTop: spacing.sm,
    color: colors.textSecondary,
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    textAlign: 'center',
  },
});