import { Text, View } from "react-native";

import { styles } from "./styles";

interface ProductListItemProps {
  name: string;
  code: string;
  quantity: number;
}

export function ProductListItem({
  name,
  code,
  quantity,
}: ProductListItemProps) {
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>

        <Text style={styles.code}>
          Código: {code}
        </Text>
      </View>

      <View style={styles.quantityContainer}>
        <Text style={styles.quantityLabel}>
          Estoque
        </Text>

        <Text style={styles.quantity}>
          {quantity}
        </Text>
      </View>
    </View>
  );
}