import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CategoryModal, Card, FilterButton, InputField, PrimaryButton, ScreenHeader } from '../../components';
import { useProducts } from '../../context/ProductsContext';
import { colors, radius, spacing, typography } from '../../theme';
import { notify } from '../../utils/dialog';
import { FormErrors, validateProduct } from '../../utils/validators';

const EMPTY = { name: '', code: '', quantity: '', minimumQuantity: '', price: '', street: '', column: '', bay: '', level: '' };

export default function AddProductScreen() {
  const { products, categories, addProduct, addCategory } = useProducts();
  const [form, setForm] = useState(EMPTY);
  const [category, setCategory] = useState(categories[0]);
  const [categoryModal, setCategoryModal] = useState(false);
  const [errors, setErrors] = useState<FormErrors<'name' | 'code' | 'quantity' | 'price'>>({});

  const set = (key: keyof typeof EMPTY) => (v: string) => {
    setForm((f) => ({ ...f, [key]: v }));
    if (key in errors) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  function handleSave() {
    const e = validateProduct(form);
    if (!e.code && products.some((p) => p.code === form.code.trim()))
      e.code = 'Já existe um produto com esse código.';
    setErrors(e);
    if (Object.keys(e).length) return;

    addProduct({
      name: form.name.trim(),
      code: form.code.trim(),
      category,
      quantity: Number(form.quantity),
      minimumQuantity: Number(form.minimumQuantity) || 0,
      price: Number(form.price.replace(',', '.')),
      location: { street: form.street.trim(), column: form.column.trim(), bay: form.bay.trim(), level: form.level.trim() },
    });
    notify('Produto cadastrado', `${form.name} foi adicionado ao estoque. Veja na aba Itens.`);
    setForm(EMPTY);
  }

  function handleNewCategory(name: string) {
    addCategory(name);
    setCategory(name);
    setCategoryModal(false);
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <ScreenHeader title="Cadastrar produto" subtitle="Preencha os dados e a localização" />

          <Card style={styles.section}>
            <Text style={typography.heading}>Informações</Text>
            <InputField label="Nome do produto" placeholder="Ex.: Arroz Branco 5kg" value={form.name} onChangeText={set('name')} error={errors.name} />
            <View style={{ gap: 6 }}>
              <InputField
                label="Código de barras"
                icon="barcode-outline"
                placeholder="Digite os números do código"
                keyboardType="number-pad"
                value={form.code}
                onChangeText={set('code')}
                error={errors.code}
              />
              <Pressable
                onPress={() => notify('Em breve', 'A leitura pela câmera chega em uma próxima etapa.')}
                accessibilityRole="button"
                accessibilityLabel="Ler código de barras com a câmera"
                style={styles.scan}
              >
                <Ionicons name="camera-outline" size={18} color={colors.primaryDark} />
                <Text style={styles.scanText}>Ler com a câmera</Text>
              </Pressable>
            </View>

            <View style={{ gap: 6 }}>
              <Text style={typography.label}>Categoria</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
                {categories.map((c) => (
                  <FilterButton key={c} label={c} selected={category === c} onPress={() => setCategory(c)} />
                ))}
                <FilterButton label="+ Nova categoria" onPress={() => setCategoryModal(true)} />
              </ScrollView>
            </View>

            <View style={styles.pair}>
              <View style={{ flex: 1 }}>
                <InputField label="Quantidade" placeholder="0" keyboardType="number-pad" value={form.quantity} onChangeText={set('quantity')} error={errors.quantity} />
              </View>
              <View style={{ flex: 1 }}>
                <InputField label="Estoque mínimo" placeholder="5" keyboardType="number-pad" value={form.minimumQuantity} onChangeText={set('minimumQuantity')} />
              </View>
            </View>
            <InputField label="Preço (R$)" placeholder="0,00" keyboardType="decimal-pad" value={form.price} onChangeText={set('price')} error={errors.price} />
          </Card>

          <Card style={styles.section}>
            <Text style={typography.heading}>Onde fica no estoque</Text>
            <View style={styles.pair}>
              <View style={{ flex: 1 }}><InputField label="Rua" placeholder="A" value={form.street} onChangeText={set('street')} autoCapitalize="characters" /></View>
              <View style={{ flex: 1 }}><InputField label="Coluna" placeholder="1" value={form.column} onChangeText={set('column')} /></View>
            </View>
            <View style={styles.pair}>
              <View style={{ flex: 1 }}><InputField label="Vão" placeholder="2" value={form.bay} onChangeText={set('bay')} /></View>
              <View style={{ flex: 1 }}><InputField label="Nível" placeholder="1" value={form.level} onChangeText={set('level')} /></View>
            </View>
          </Card>

          <Pressable
            onPress={() => notify('Em breve', 'O envio de foto chega em uma próxima etapa.')}
            accessibilityRole="button"
            accessibilityLabel="Adicionar foto do produto"
            style={styles.photo}
          >
            <Ionicons name="image-outline" size={26} color={colors.primaryDark} />
            <Text style={styles.scanText}>Adicionar foto</Text>
          </Pressable>

          <PrimaryButton title="Cadastrar produto" icon="checkmark-circle-outline" onPress={handleSave} />
        </ScrollView>
      </KeyboardAvoidingView>

      <CategoryModal
        visible={categoryModal}
        existing={categories}
        onSave={handleNewCategory}
        onClose={() => setCategoryModal(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  scroll: { padding: spacing.xl, gap: spacing.xl, paddingBottom: spacing.xxl },
  section: { gap: spacing.lg },
  pair: { flexDirection: 'row', gap: spacing.md },
  scan: { flexDirection: 'row', alignItems: 'center', gap: 6, alignSelf: 'flex-start', paddingVertical: 6 },
  scanText: { fontFamily: 'Poppins_600SemiBold', fontSize: 13, color: colors.primaryDark },
  photo: {
    height: 96, borderRadius: radius.lg, borderWidth: 1.5, borderStyle: 'dashed', borderColor: colors.primary,
    backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center', gap: 4,
  },
});
