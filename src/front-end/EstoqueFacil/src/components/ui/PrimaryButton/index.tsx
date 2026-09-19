import { Pressable, Text } from "react-native";
import { styles } from "./styles";

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
}

export function PrimaryButton({
  title,
  onPress,
}: PrimaryButtonProps) {
  return (
    <Pressable
      style={styles.button}
      onPress={onPress}
    >
      <Text style={styles.text}>
        {title}
      </Text>
    </Pressable>
  );
}