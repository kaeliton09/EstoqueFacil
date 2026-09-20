import { useState } from "react";
import { ScrollView, Text, View } from "react-native";

import { ProductListItem } from "@/components/product/ProductListItem";
import { SearchInput } from "@/components/ui/SearchInput";
import { FilterButton } from "@/components/ui/FilterButton";

import { styles } from "./styles";

export default function SearchScreen() {
    const [search, setSearch] = useState("");

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
        >
            <View style={styles.header}>
                <Text style={styles.title}>
                    Buscar produto
                </Text>

                <Text style={styles.subtitle}>
                    Encontre um produto pelo nome ou código
                </Text>
            </View>

            <SearchInput
                value={search}
                onChangeText={setSearch}
                placeholder="Nome ou código do produto"
            />
            <View style={styles.filtersSection}>
                <Text style={styles.filtersTitle}>
                    Filtros
                </Text>

                <View style={styles.filters}>
                    <FilterButton title="Categoria" />
                    <FilterButton title="Estoque" />
                    <FilterButton title="Local" />
                </View>

                <Text style={styles.clearFilters}>
                    Limpar filtros
                </Text>
            </View>

            <View style={styles.results}>
                <Text style={styles.resultsTitle}>
                    Produtos
                </Text>

                <ProductListItem
                    name="Teclado Mecânico"
                    code="PRD-001"
                    quantity={15}
                />

                <ProductListItem
                    name="Mouse sem fio"
                    code="PRD-002"
                    quantity={8}
                />

                <ProductListItem
                    name="Monitor 24 polegadas"
                    code="PRD-003"
                    quantity={3}
                />

                <ProductListItem
                    name="Cabo HDMI"
                    code="PRD-004"
                    quantity={25}
                />
            </View>
        </ScrollView>
    );
}