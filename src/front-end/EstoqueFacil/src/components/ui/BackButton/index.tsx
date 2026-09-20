import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text } from "react-native";
import { useRouter } from "expo-router";

import { styles } from "./styles";
import { colors } from "@/theme";

interface BackButtonProps {
  label?: string;
}

export function BackButton({
  label,
}: BackButtonProps) {
  const router = useRouter();

  function handleBack() {
    router.back();
  }

  return (
    <Pressable
      onPress={handleBack}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint="Volta para a tela anterior"
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
      ]}
    >
      <Ionicons
        name="arrow-back"
        size={22}
        color={colors.primary}
      />

      <Text style={styles.text}>
        {label}
      </Text>
    </Pressable>
  );
}