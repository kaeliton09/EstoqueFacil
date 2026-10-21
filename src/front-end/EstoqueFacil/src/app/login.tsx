import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { InputField, PrimaryButton } from '../components';
import { colors, fonts, radius, spacing, typography } from '../theme';
import { FormErrors, validateLogin } from '../utils/validators';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<FormErrors<'email' | 'password'>>({});
  const [loading, setLoading] = useState(false);

  function handleLogin() {
    const e = validateLogin(email, password);
    setErrors(e);
    if (Object.keys(e).length) return;
    setLoading(true);
    // Fluxo de demonstração: troque por chamada real à API na etapa de backend.
    setTimeout(() => {
      setLoading(false);
      router.replace('/(tabs)');
    }, 700);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <View style={styles.brand}>
            <View style={styles.logo}>
              <Ionicons name="cube" size={34} color={colors.white} />
            </View>
            <Text style={styles.appName}>Estoque Fácil</Text>
            <Text style={[typography.body, { color: colors.textMuted, textAlign: 'center' }]}>
              Saiba o que você tem e onde está guardado.
            </Text>
          </View>

          <View style={styles.form}>
            <InputField
              label="E-mail"
              icon="mail-outline"
              placeholder="nome@empresa.com"
              value={email}
              onChangeText={setEmail}
              error={errors.email}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
            <InputField
              label="Senha"
              icon="lock-closed-outline"
              placeholder="Sua senha"
              value={password}
              onChangeText={setPassword}
              error={errors.password}
              secureTextEntry
              autoCapitalize="none"
            />
            <Pressable accessibilityRole="button" accessibilityLabel="Esqueci minha senha" style={{ alignSelf: 'flex-end' }}>
              <Text style={styles.link}>Esqueci a senha</Text>
            </Pressable>

            <PrimaryButton title="Entrar" onPress={handleLogin} loading={loading} />
          </View>

          <View style={styles.footer}>
            <Text style={typography.body}>Ainda não tem conta?</Text>
            <Pressable
              onPress={() => router.push('/cadastro-usuario')}
              accessibilityRole="button"
              accessibilityLabel="Criar uma conta"
              hitSlop={10}
            >
              <Text style={[styles.link, { fontSize: 14 }]}>Criar conta</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  scroll: { flexGrow: 1, justifyContent: 'center', padding: spacing.xl, gap: spacing.xxl },
  brand: { alignItems: 'center', gap: 8 },
  logo: { width: 72, height: 72, borderRadius: radius.xl, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  appName: { fontFamily: fonts.bold, fontSize: 28, color: colors.text },
  form: { gap: spacing.lg },
  link: { fontFamily: fonts.semibold, fontSize: 13, color: colors.primaryDark },
  footer: { flexDirection: 'row', justifyContent: 'center', gap: 6 },
});
