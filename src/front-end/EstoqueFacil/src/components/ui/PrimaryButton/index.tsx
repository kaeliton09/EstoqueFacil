import { Pressable, Text } from "react-native";

import { styles } from "./styles";

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

export function PrimaryButton({
  title,
  onPress,
  disabled = false,
}: PrimaryButtonProps) {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ disabled: disabled,}}
      style={({ pressed }) => [
        styles.button,

        pressed && !disabled && styles.buttonPressed,

        disabled && styles.buttonDisabled,
      ]}
    >
      <Text
        style={[
          styles.text,
          disabled && styles.textDisabled,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}