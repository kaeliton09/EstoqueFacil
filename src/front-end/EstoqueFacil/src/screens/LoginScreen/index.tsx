import { Text, View } from "react-native";
import { useState } from "react";

import { InputField } from "@/components/ui/InputField";
import { PrimaryButton } from "@/components/ui/PrimaryButton";

import { styles } from "./styles";

export function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    console.log("Email:", email);
    console.log("Senha:", password);
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