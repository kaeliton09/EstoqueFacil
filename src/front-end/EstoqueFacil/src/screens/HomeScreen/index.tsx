import { ScrollView, Text, View } from "react-native";

import { StockValueCard } from "@/components/dashboard/StockValueCard";
import { StatisticCard } from "@/components/dashboard/StatisticCard";

import { styles } from "./styles";
import { ProductListItem } from "@/components/product/ProductListItem";

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.greeting}>
          Olá, Kaeliton!
        </Text>

        <Text style={styles.subtitle}>
          Confira o seu estoque
        </Text>
      </View>

      <View style={styles.content}>

        <StockValueCard
          value="R$ 12.450,00"
        />

        <View style={styles.statistics}>

          <StatisticCard
            title="Itens    Cadastrados"
            value="120"
          />

          <StatisticCard
            title="Itens  com estoque baixo"
            value="12"
          />

        </View>

        <View style={styles.itemsList}>
          <ProductListItem
            name="Produto 1"
            code="123456"
            quantity={10}
          />
           <ProductListItem
            name="Produto 2"
            code="123457"
            quantity={9}
          />
          <ProductListItem
            name="Produto 1"
            code="123456"
            quantity={10}
          />
           <ProductListItem
            name="Produto 2"
            code="123457"
            quantity={9}
          />
          <ProductListItem
            name="Produto 1"
            code="123456"
            quantity={10}
          />
           <ProductListItem
            name="Produto 2"
            code="123457"
            quantity={9}
          />
          <ProductListItem
            name="Produto 1"
            code="123456"
            quantity={10}
          />
           <ProductListItem
            name="Produto 2"
            code="123457"
            quantity={9}
          />
        </View>

      </View>

    </ScrollView>
  );
}