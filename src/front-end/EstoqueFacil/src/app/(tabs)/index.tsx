import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, ProductListItem, ScreenHeader, StatCard } from '../../components';
import { useProducts } from '../../context/ProductsContext';
import { colors, fonts, radius, spacing, typography } from '../../theme';
import { getStockStatus } from '../../types/product';
import { formatBRL } from '../../utils/validators';

export default function HomeScreen() {
  const router = useRouter();
  const { products, categories } = useProducts();

  const { lowItems, totalValue, byCategory, maxCat } = useMemo(() => {
    const lowItems = products.filter((p) => getStockStatus(p) !== 'ok');
    const totalValue = products.reduce((s, p) => s + p.price * p.quantity, 0);
    const byCategory = categories.map((c) => ({
      name: c,
      count: products.filter((p) => p.category === c).reduce((s, p) => s + p.quantity, 0),
    }));
    return { lowItems, totalValue, byCategory, maxCat: Math.max(...byCategory.map((c) => c.count), 1) };
  }, [products, categories]);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <ScreenHeader title="Olá!" subtitle="Veja como está seu estoque hoje" />

        <View style={styles.hero} accessible accessibilityLabel={`Valor total em estoque: ${formatBRL(totalValue)}`}>
          <Text style={styles.heroLabel}>Valor total em estoque</Text>
          <Text style={styles.heroValue}>{formatBRL(totalValue)}</Text>
        </View>

        <View style={styles.row}>
          <StatCard label="Produtos cadastrados" value={String(products.length)} icon="cube-outline" />
          <StatCard label="Precisam de reposição" value={String(lowItems.length)} icon="alert-circle-outline" tone="amber" />
        </View>

        <Card style={{ gap: spacing.md }}>
          <Text style={typography.heading}>Unidades por categoria</Text>
          {byCategory.map((c) => (
            <View key={c.name} style={{ gap: 4 }} accessible accessibilityLabel={`${c.name}: ${c.count} unidades`}>
              <View style={styles.catRow}>
                <Text style={typography.label}>{c.name}</Text>
                <Text style={typography.caption}>{c.count}</Text>
              </View>
              <View style={styles.track}>
                <View style={[styles.fill, { width: `${(c.count / maxCat) * 100}%` }]} />
              </View>
            </View>
          ))}
        </Card>

        <View style={{ gap: spacing.md }}>
          <Text style={typography.heading}>Precisam de atenção</Text>
          {lowItems.length === 0 ? (
            <Text style={typography.caption}>Tudo certo: nenhum item com estoque baixo.</Text>
          ) : (
            lowItems.map((p) => (
              <ProductListItem key={p.id} product={p} onPress={() => router.push(`/produto/${p.id}`)} />
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  scroll: { padding: spacing.xl, gap: spacing.xl, paddingBottom: spacing.xxl },
  hero: { backgroundColor: colors.primary, borderRadius: radius.xl, padding: spacing.xl, gap: 4 },
  heroLabel: { fontFamily: fonts.medium, fontSize: 13, color: '#DCFCE7' },
  heroValue: { fontFamily: fonts.bold, fontSize: 34, color: colors.white },
  row: { flexDirection: 'row', gap: spacing.md },
  catRow: { flexDirection: 'row', justifyContent: 'space-between' },
  track: { height: 8, borderRadius: radius.full, backgroundColor: colors.primarySoft, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: radius.full, backgroundColor: colors.primary },
});
