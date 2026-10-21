import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { InputField } from './InputField';
import { PrimaryButton } from './PrimaryButton';
import { colors, radius, shadow, typography } from '../theme';

type Props = {
  visible: boolean;
  existing: string[];
  onSave: (name: string) => void;
  onClose: () => void;
};

export function CategoryModal({ visible, existing, onSave, onClose }: Props) {
  const [name, setName] = useState('');
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    if (visible) { setName(''); setError(undefined); }
  }, [visible]);

  function save() {
    const clean = name.trim();
    if (clean.length < 2) return setError('Digite um nome com pelo menos 2 letras.');
    if (existing.some((c) => c.toLowerCase() === clean.toLowerCase()))
      return setError('Essa categoria já existe.');
    onSave(clean);
  }

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose} statusBarTranslucent>
      <KeyboardAvoidingView style={styles.overlay} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} accessibilityLabel="Fechar" />
        <View style={styles.sheet} accessibilityViewIsModal>
          <Text style={typography.heading}>Nova categoria</Text>
          <InputField
            label="Nome da categoria"
            icon="pricetag-outline"
            placeholder="Ex.: Frios"
            value={name}
            onChangeText={(t) => { setName(t); setError(undefined); }}
            error={error}
            maxLength={24}
            autoCapitalize="sentences"
            autoFocus
          />
          <View style={{ gap: 10, marginTop: 4 }}>
            <PrimaryButton title="Criar categoria" icon="checkmark-circle-outline" onPress={save} />
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
});
