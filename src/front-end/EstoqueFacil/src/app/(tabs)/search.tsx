import React, { useMemo, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FilterButton, ProductListItem, ScreenHeader, SearchInput } from '../../components';
import { useProducts } from '../../context/ProductsContext';
import { colors, spacing, typography } from '../../theme';
import { getStockStatus, StockStatus } from '../../types/product';

const FILTERS: { key: 'all' | StockStatus; label: string }[] = [
  { key: 'all', label: 'Todos' },
  { key: 'ok', label: 'Em estoque' },
  { key: 'low', label: 'Estoque baixo' },
  { key: 'out', label: 'Sem estoque' },
];

export default function SearchScreen() {
  const router = useRouter();
  const { products } = useProducts();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<'all' | StockStatus>('all');

  const data = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter(
      (p) =>
        (filter === 'all' || getStockStatus(p) === filter) &&
        (!q || p.name.toLowerCase().includes(q) || p.code.includes(q)),
    );
  }, [products, query, filter]);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <ScreenHeader title="Itens" subtitle={`${data.length} produto(s) encontrado(s)`} />
        <SearchInput value={query} onChangeText={setQuery} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
          {FILTERS.map((f) => (
            <FilterButton key={f.key} label={f.label} selected={filter === f.key} onPress={() => setFilter(f.key)} />
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={data}
        keyExtractor={(p) => p.id}
        renderItem={({ item }) => (
          <ProductListItem product={item} onPress={() => router.push(`/produto/${item.id}`)} />
        )}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="search-outline" size={40} color={colors.textMuted} />
            <Text style={typography.heading}>
              {products.length === 0 ? 'Nenhum item cadastrado' : 'Nada encontrado'}
            </Text>
            <Text style={[typography.caption, { textAlign: 'center' }]}>
              {products.length === 0
                ? 'Use a aba Cadastrar para adicionar seu primeiro produto.'
                : 'Tente outro nome ou código, ou mude o filtro.'}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: spacing.xl, paddingTop: spacing.lg, gap: spacing.lg },
  list: { padding: spacing.xl, paddingBottom: spacing.xxl, flexGrow: 1 },
  empty: { alignItems: 'center', gap: 8, paddingTop: 48 },
});
