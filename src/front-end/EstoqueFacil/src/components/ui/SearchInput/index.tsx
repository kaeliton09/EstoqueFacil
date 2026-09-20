import { Ionicons } from "@expo/vector-icons";
import { TextInput, View } from "react-native";

import { colors } from "@/theme";
import { styles } from "./styles";

interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export function SearchInput({
  value,
  onChangeText,
  placeholder = "Buscar produto...",
}: SearchInputProps) {
  return (
    <View style={styles.container}>
      <Ionicons
        name="search-outline"
        size={22}
        color={colors.textSecondary}
      />

      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
      />
    </View>
  );
}