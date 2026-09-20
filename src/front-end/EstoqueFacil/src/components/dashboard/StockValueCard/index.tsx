import { Text, View } from "react-native";

import { styles } from "./styles";

interface StockValueCardProps {
  value: string;
}

export function StockValueCard({
  value,
}: StockValueCardProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        Valor em estoque
      </Text>

      <Text style={styles.value}>
        {value}
      </Text>
    </View>
  );
}