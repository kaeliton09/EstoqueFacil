import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PrimaryButton } from './PrimaryButton';
import { colors, fonts, radius, shadow, typography } from '../theme';

type Props = {
  visible: boolean;
  mode: 'add' | 'remove';
  productName: string;
  current: number;
  onConfirm: (quantity: number) => void;
  onClose: () => void;
};

export function QuantityModal({ visible, mode, productName, current, onConfirm, onClose }: Props) {
  const [value, setValue] = useState('1');
  const [error, setError] = useState<string | undefined>();
  const isAdd = mode === 'add';

  useEffect(() => {
    if (visible) { setValue('1'); setError(undefined); }
  }, [visible]);

  const n = parseInt(value, 10);
  const valid = Number.isInteger(n) && n > 0;
  const preview = valid ? (isAdd ? current + n : Math.max(0, current - n)) : current;

  const step = (d: number) => {
    setValue(String(Math.max(1, (Number.isNaN(n) ? 0 : n) + d)));
    setError(undefined);
  };

  function confirm() {
    if (!valid) return setError('Digite uma quantidade maior que zero.');
    if (!isAdd && n > current) return setError(`Você só tem ${current} unidade(s) em estoque.`);
    onConfirm(n);
  }

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose} statusBarTranslucent>
      <KeyboardAvoidingView style={styles.overlay} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} accessibilityLabel="Fechar" />
        <View style={styles.sheet} accessibilityViewIsModal>
          <Text style={typography.heading}>{isAdd ? 'Adicionar ao estoque' : 'Dar baixa no estoque'}</Text>
          <Text style={typography.caption} numberOfLines={1}>{productName}</Text>

          <View style={styles.stepper}>
            <Pressable onPress={() => step(-1)} style={styles.stepBtn} accessibilityRole="button" accessibilityLabel="Diminuir quantidade">
              <Ionicons name="remove" size={24} color={colors.text} />
            </Pressable>
            <TextInput
              value={value}
              onChangeText={(t) => { setValue(t.replace(/[^0-9]/g, '')); setError(undefined); }}
              keyboardType="number-pad"
              style={styles.input}
              selectTextOnFocus
              accessibilityLabel="Quantidade"
            />
            <Pressable onPress={() => step(1)} style={styles.stepBtn} accessibilityRole="button" accessibilityLabel="Aumentar quantidade">
              <Ionicons name="add" size={24} color={colors.text} />
            </Pressable>
          </View>

          {error ? (
            <Text style={[typography.caption, { color: colors.danger, textAlign: 'center' }]} accessibilityLiveRegion="polite">{error}</Text>
          ) : (
            <Text style={[typography.caption, { textAlign: 'center' }]}>
              Estoque atual: {current} → novo estoque: <Text style={{ fontFamily: fonts.semibold, color: colors.text }}>{preview}</Text>
            </Text>
          )}

          <View style={{ gap: 10, marginTop: 8 }}>
            <PrimaryButton title={isAdd ? 'Adicionar' : 'Dar baixa'} icon={isAdd ? 'add-circle-outline' : 'remove-circle-outline'} onPress={confirm} />
            <PrimaryButton title="Cancelar" variant="outline" onPress={onClose} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(15,23,42,0.45)', justifyContent: 'center', padding: 24 },
  sheet: { backgroundColor: colors.surface, borderRadius: radius.xl, padding: 24, gap: 12, ...shadow.card },
  stepper: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 16, marginVertical: 8 },
  stepBtn: { width: 52, height: 52, borderRadius: radius.full, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center' },
  input: { minWidth: 90, textAlign: 'center', fontFamily: fonts.bold, fontSize: 36, color: colors.text },
});
