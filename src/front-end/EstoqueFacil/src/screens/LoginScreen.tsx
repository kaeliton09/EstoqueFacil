
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { InputField } from '../components/InputField';
import { PrimaryButton } from '../components/PrimaryButton';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

import loginIllustration from '../assets/login-illustration.png';

export function LoginScreen() {
  const { width } = useWindowDimensions();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const isSmallScreen = width < 380;

  function handleLogin() {
    const emailValue = email.trim();
    const passwordValue = password.trim();

    if (!emailValue) {
      Alert.alert(
        'E-mail obrigatório',
        'Digite seu e-mail para continuar.'
      );
      return;
    }

    if (!passwordValue) {
      Alert.alert(
        'Senha obrigatória',
        'Digite sua senha para continuar.'
      );
      return;
    }

    // Nesta etapa não existe autenticação com backend.
    // Qualquer e-mail e senha preenchidos permitem acessar o app.
    router.replace('/(tabs)');
  }

  function handleForgotPassword() {
    Alert.alert(
      'Recuperação de senha',
      'A recuperação de senha será implementada em uma etapa futura.'
    );
  }

  function handleSignUp() {
    Alert.alert(
      'Cadastro de usuário',
      'O cadastro de usuários será implementado em uma etapa futura.'
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          isSmallScreen && styles.scrollContentSmall,
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* ILUSTRAÇÃO */}
        <View style={styles.illustrationArea}>
          <Image
            source={loginIllustration}
            style={styles.illustration}
            resizeMode="contain"
          />
        </View>

        {/* TÍTULO */}
        <Text style={styles.title}>
          Login
        </Text>

        <Text style={styles.subtitle}>
          Acesse sua conta para gerenciar seu estoque
        </Text>

        {/* FORMULÁRIO */}
        <View style={styles.form}>

          {/* E-MAIL */}
          <InputField
            label="E-mail"
            placeholder="Digite seu e-mail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            leftIcon={
              <Ionicons
                name="mail-outline"
                size={20}
                color={colors.primary}
              />
            }
          />

          {/* SENHA */}
          <InputField
            label="Senha"
            placeholder="Digite sua senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            autoCorrect={false}
            leftIcon={
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color={colors.primary}
              />
            }
            rightIcon={
              <Pressable
                onPress={() =>
                  setShowPassword((current) => !current)
                }
                hitSlop={10}
              >
                <Ionicons
                  name={
                    showPassword
                      ? 'eye-off-outline'
                      : 'eye-outline'
                  }
                  size={21}
                  color={colors.primary}
                />
              </Pressable>
            }
          />

          {/* ESQUECI A SENHA */}
          <Pressable
            onPress={handleForgotPassword}
            style={styles.forgotButton}
          >
            <Text style={styles.forgotText}>
              Esqueceu a senha?
            </Text>
          </Pressable>

          {/* BOTÃO LOGIN */}
          <PrimaryButton
            title="Entrar"
            onPress={handleLogin}
          />
        </View>

        {/* DIVISOR */}
        <View style={styles.dividerContainer}>
          <View style={styles.divider} />

          <Text style={styles.dividerText}>
            ou
          </Text>

          <View style={styles.divider} />
        </View>

        {/* CADASTRO */}
        <Pressable
          onPress={handleSignUp}
          style={styles.signUpContainer}
        >
          <Text style={styles.signUpText}>
            Não tem uma conta?{' '}
            <Text style={styles.signUpHighlight}>
              Cadastre-se
            </Text>
          </Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 28,
    paddingTop: 35,
    paddingBottom: 30,
  },

  scrollContentSmall: {
    paddingTop: 20,
  },

  /* =========================
     ILUSTRAÇÃO
     ========================= */

  illustrationArea: {
  width: '100%',
  height: 210,
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 5,
},

illustration: {
  width: '100%',
  height: 210,
},

  /* =========================
     TEXTOS
     ========================= */

  title: {
    fontFamily: typography.fontFamily.extraBold,
    fontSize: 38,
    lineHeight: 46,
    color: colors.primary,
    textAlign: 'center',
    marginTop: 4,
  },

  subtitle: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 13,
    lineHeight: 19,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 25,
  },

  /* =========================
     FORMULÁRIO
     ========================= */

  form: {
    width: '100%',
    gap: 12,
  },

  forgotButton: {
    alignSelf: 'flex-end',
    marginTop: -2,
    marginBottom: 5,
  },

  forgotText: {
    fontFamily: typography.fontFamily.bold,
    fontSize: 13,
    color: colors.primary,
    textDecorationLine: 'underline',
  },

  /* =========================
     DIVISOR
     ========================= */

  dividerContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 25,
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: colors.primary,
    opacity: 0.35,
  },

  dividerText: {
    fontFamily: typography.fontFamily.medium,
    color: colors.primary,
    fontSize: 13,
    marginHorizontal: 15,
  },

  /* =========================
     CADASTRO
     ========================= */

  signUpContainer: {
    alignItems: 'center',
    paddingVertical: 5,
  },

  signUpText: {
    fontFamily: typography.fontFamily.regular,
    color: colors.text,
    fontSize: 14,
  },

  signUpHighlight: {
    fontFamily: typography.fontFamily.bold,
    color: colors.primary,
  },
});