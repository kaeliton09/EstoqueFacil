import { Text, View } from "react-native";

import { styles } from "./styles";

interface StatisticCardProps {
    title: string;
    value: string;
}

export function StatisticCard({
    title,
    value,
}: StatisticCardProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {title}
      </Text>

      <Text style={styles.value}>
        {value}
      </Text>
    </View>
  );
}