import { useState } from "react";
import { ScrollView, Text, View } from "react-native";

import { ProductListItem } from "@/components/product/ProductListItem";
import { SearchInput } from "@/components/ui/SearchInput";
import { FilterButton } from "@/components/ui/FilterButton";
import { BackButton } from "@/components/ui/BackButton";

import { mockProducts } from "@/mocks/products";

import { styles } from "./styles";

export default function SearchScreen() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState<string | null>(null);

    const filteredProducts = mockProducts.filter((product) => {
        const matchesSearch = product.name
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesCategory =
            !category || product.category === category;

        return matchesSearch && matchesCategory;
    });

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
        >

            <View style={styles.header}>
                <View style={styles.titlePage}>
                    <BackButton />
                    <Text style={styles.title}>
                        Buscar produto
                    </Text>

                </View>

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

                {filteredProducts.map((product) => (
                    <ProductListItem
                        key={product.id}
                        name={product.name}
                        code={product.code}
                        quantity={product.quantity}
                    />
                ))}
            </View>
        </ScrollView>
    );
}