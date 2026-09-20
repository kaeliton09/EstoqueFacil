import { Text, View } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

import { InputField } from "@/components/ui/InputField";
import { PrimaryButton } from "@/components/ui/PrimaryButton";

import { styles } from "./styles";

export function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  function handleLogin() {
    if (!email || !password) {
      return;
    }

    router.replace("/(tabs)");
  }

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.title}>
          Login
        </Text>

        <Text style={styles.subtitle}>
          Entre para gerenciar seu estoque
        </Text>
      </View>

      <View style={styles.form}>

        <InputField
          label="E-mail"
          placeholder="Digite seu e-mail"
          value={email}
          onChangeText={setEmail}
        />

        <InputField
          label="Senha"
          placeholder="Digite sua senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <PrimaryButton
          title="LOGIN"
          onPress={handleLogin}
          disabled={!email || !password}
        />

      </View>

      <View>
        <Text style={styles.subtitle}>
          Não possui uma conta? Cadastre-se
        </Text>
      </View>

    </View>
  );
}