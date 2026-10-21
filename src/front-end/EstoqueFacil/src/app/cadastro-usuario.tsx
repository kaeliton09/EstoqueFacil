import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BackButton, InputField, PrimaryButton, ScreenHeader } from '../components';
import { colors, spacing, typography } from '../theme';
import { FormErrors, SignupData, validateSignup } from '../utils/validators';

const EMPTY: SignupData = { name: '', email: '', company: '', password: '', confirm: '' };

export default function CadastroUsuarioScreen() {
  const router = useRouter();
  const [form, setForm] = useState<SignupData>(EMPTY);
  const [errors, setErrors] = useState<FormErrors<keyof SignupData>>({});
  const [loading, setLoading] = useState(false);

  const set = (key: keyof SignupData) => (value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  function handleSignup() {
    const e = validateSignup(form);
    setErrors(e);
    if (Object.keys(e).length) return;
    setLoading(true);
    // Mock: nenhum dado é enviado ou salvo. Troque por chamada à API quando o backend existir.
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Conta criada', 'Agora é só entrar com seu e-mail e senha.', [
        { text: 'Ir para o login', onPress: () => router.replace('/login') },
      ]);
    }, 800);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <ScreenHeader
            left={<BackButton />}
            title="Criar conta"
            subtitle="Leva menos de um minuto"
          />

          <View style={styles.form}>
            <InputField
              label="Nome completo"
              icon="person-outline"
              placeholder="Maria da Silva"
              value={form.name}
              onChangeText={set('name')}
              error={errors.name}
              autoCapitalize="words"
              autoComplete="name"
            />
            <InputField
              label="E-mail"
              icon="mail-outline"
              placeholder="nome@empresa.com"
              value={form.email}
              onChangeText={set('email')}
              error={errors.email}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
            <InputField
              label="Nome do comércio"
              icon="storefront-outline"
              placeholder="Mercearia Bom Preço"
              value={form.company}
              onChangeText={set('company')}
              error={errors.company}
              autoCapitalize="words"
            />
            <InputField
              label="Senha"
              icon="lock-closed-outline"
              placeholder="Mínimo de 8 caracteres"
              hint="Use letras e números."
              value={form.password}
              onChangeText={set('password')}
              error={errors.password}
              secureTextEntry
              autoCapitalize="none"
            />
            <InputField
              label="Repita a senha"
              icon="shield-checkmark-outline"
              placeholder="Digite a senha novamente"
              value={form.confirm}
              onChangeText={set('confirm')}
              error={errors.confirm}
              secureTextEntry
              autoCapitalize="none"
            />

            <PrimaryButton title="Criar conta" onPress={handleSignup} loading={loading} />
          </View>

          <Text style={[typography.caption, { textAlign: 'center' }]}>
            Ao criar a conta, você concorda com os termos de uso do Estoque Fácil.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  scroll: { padding: spacing.xl, gap: spacing.xl },
  form: { gap: spacing.lg },
});
