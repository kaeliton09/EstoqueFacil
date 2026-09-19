import { Text, TextInput, View } from "react-native";
import { styles } from "./styles";

interface InputFieldProps {
  label: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  value: string;
  onChangeText: (text: string) => void;
}

export function InputField({
  label,
  placeholder,
  secureTextEntry = false,
  value,
  onChangeText,
}: InputFieldProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#777777"
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}