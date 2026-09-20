import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text } from "react-native";

import { colors } from "@/theme";
import { styles } from "./styles";

interface FilterButtonProps {
  title: string;
  onPress?: () => void;
}

export function FilterButton({
  title,
  onPress,
}: FilterButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Filtrar por ${title}`}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.buttonPressed,
      ]}
    >
      <Text style={styles.text}>
        {title}
      </Text>

      <Ionicons
        name="chevron-down"
        size={16}
        color={colors.primary}
      />
    </Pressable>
  );
}