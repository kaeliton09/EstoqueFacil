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
    <Pressable style={styles.container} onPress={onPress}>
      <Text style={styles.text}>
        {title}
      </Text>

      <Ionicons
        name="chevron-down"
        size={16}
        color={colors.text}
      />
    </Pressable>
  );
}