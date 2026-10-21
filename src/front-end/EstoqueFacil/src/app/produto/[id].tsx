import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BackButton, Card, PrimaryButton, QuantityModal, ScreenHeader, StatusBadge } from '../../components';
import { useProducts } from '../../context/ProductsContext';
import { colors, fonts, radius, spacing, typography } from '../../theme';
import { confirmDialog, notify } from '../../utils/dialog';
import { formatBRL } from '../../utils/validators';

function InfoRow({ icon, label, value }: { icon: keyof typeof Ionicons.glyphMap; label: string; value: string }) {
  return (
    <View style={styles.infoRow} accessible accessibilityLabel={`${label}: ${value}`}>
      <Ionicons name={icon} size={18} color={colors.primaryDark} />
      <Text style={[typography.caption, { flex: 1 }]}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

export default function ProductManageScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { products, adjustQuantity, removeProduct } = useProducts();
  const [modal, setModal] = useState<'add' | 'remove' | null>(null);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.scroll}>
          <ScreenHeader left={<BackButton />} title="Item não encontrado" />
          <Text style={typography.body}>Este item não existe mais. Volte para a lista de itens.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const { street, column, bay, level } = product.location;

  function handleConfirm(qty: number) {
    if (!product) return;
    const isAdd = modal === 'add';
    adjustQuantity(product.id, isAdd ? qty : -qty);
    setModal(null);
    notify(isAdd ? 'Estoque atualizado' : 'Baixa registrada', `${isAdd ? '+' : '-'}${qty} unidade(s) de ${product.name}.`);
  }

  function handleDelete() {
    if (!product) return;
    confirmDialog(
      'Excluir item',
      `Tem certeza que deseja excluir "${product.name}"? Essa ação não pode ser desfeita.`,
      'Excluir',
      () => {
        removeProduct(product.id);
        router.back();
      },
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <ScreenHeader left={<BackButton />} title="Gerenciar item" subtitle={product.name} />

        <Card style={styles.stock}>
          <Text style={typography.caption}>Quantidade em estoque</Text>
          <Text style={styles.qty} accessibilityLabel={`${product.quantity} unidades em estoque`}>{product.quantity}</Text>
          <StatusBadge product={product} />
          <Text style={typography.caption}>Alerta de estoque baixo a partir de {product.minQuantity} unidade(s)</Text>
        </Card>

        <View style={styles.actions}>
          <View style={{ flex: 1 }}>
            <PrimaryButton title="Dar baixa" icon="remove-circle-outline" variant="outline" onPress={() => setModal('remove')} disabled={product.quantity === 0} />
          </View>
          <View style={{ flex: 1 }}>
            <PrimaryButton title="Adicionar" icon="add-circle-outline" onPress={() => setModal('add')} />
          </View>
        </View>

        <Card style={{ gap: spacing.lg }}>
          <Text style={typography.heading}>Detalhes</Text>
          <InfoRow icon="barcode-outline" label="Código" value={product.code} />
          <InfoRow icon="pricetag-outline" label="Categoria" value={product.category} />
          <InfoRow icon="cash-outline" label="Preço unitário" value={formatBRL(product.price)} />
          <InfoRow icon="wallet-outline" label="Valor em estoque" value={formatBRL(product.price * product.quantity)} />
          <InfoRow icon="location-outline" label="Localização" value={`Rua ${street}, Col. ${column}, Vão ${bay}, Nív. ${level}`} />
        </Card>

        <PrimaryButton title="Excluir item" icon="trash-outline" variant="danger" onPress={handleDelete} />
      </ScrollView>

      <QuantityModal
        visible={modal !== null}
        mode={modal ?? 'add'}
        productName={product.name}
        current={product.quantity}
        onConfirm={handleConfirm}
        onClose={() => setModal(null)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  scroll: { padding: spacing.xl, gap: spacing.xl, paddingBottom: spacing.xxl },
  stock: { alignItems: 'center', gap: 6, paddingVertical: spacing.xl },
  qty: { fontFamily: fonts.bold, fontSize: 56, lineHeight: 68, color: colors.text },
  actions: { flexDirection: 'row', gap: spacing.md },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  infoValue: { fontFamily: fonts.medium, fontSize: 13, color: colors.text, maxWidth: '55%', textAlign: 'right' },
});
