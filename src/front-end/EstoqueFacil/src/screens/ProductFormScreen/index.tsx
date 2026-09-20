import { useState } from "react";
import {
  ScrollView,
  Text,
  View,
} from "react-native";

import { InputField } from "@/components/ui/InputField";
import { PrimaryButton } from "@/components/ui/PrimaryButton";

import { styles } from "./styles";
import { BackButton } from "@/components/ui/BackButton";

export default function AddProductScreen() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [quantityMin, setQuantityMin] = useState("");

  const [street, setStreet] = useState("");
  const [column, setColumn] = useState("");
  const [section, setSection] = useState("");

  function handleAddProduct() {
    console.log({
      name,
      code,
      price,
      quantity,
      quantityMin,
      street,
      column,
      section,
    });
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.header}>
        <View style={styles.titlePage}>
          <BackButton />
          <Text style={styles.title}>
            Adicionar produto
          </Text>
        </View>

          <Text style={styles.subtitle}>
            Cadastre um novo produto no seu estoque
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Informações do produto
          </Text>

          <InputField
            label="Nome do produto"
            placeholder="Digite o nome do produto"
            value={name}
            onChangeText={setName}
          />

          <InputField
            label="Código"
            placeholder="Ex: PRD-001"
            value={code}
            onChangeText={setCode}
          />

          <InputField
            label="Preço unitário"
            placeholder="Ex: R$ 10,00"
            value={price}
            onChangeText={setPrice}
          />

          <InputField
            label="Quantidade"
            placeholder="Digite a quantidade"
            value={quantity}
            onChangeText={setQuantity}
          />

          <InputField
            label="Quantidade mínima"
            placeholder="Digite a quantidade mínima"
            value={quantityMin}
            onChangeText={setQuantityMin}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Localização
          </Text>

          <View style={styles.row}>
            <View style={styles.halfInput}>
              <InputField
                label="Rua"
                placeholder="Ex: A"
                value={street}
                onChangeText={setStreet}
              />
            </View>

            <View style={styles.halfInput}>
              <InputField
                label="Coluna"
                placeholder="Ex: 02"
                value={column}
                onChangeText={setColumn}
              />
            </View>
          </View>

          <InputField
            label="Vão"
            placeholder="Ex: 03"
            value={section}
            onChangeText={setSection}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Imagem do produto
          </Text>

          <View style={styles.imagePlaceholder}>
            <Text style={styles.imageIcon}>
              +
            </Text>

            <Text style={styles.imageText}>
              Adicionar imagem
            </Text>
          </View>
        </View>

        <PrimaryButton
          title="CADASTRAR PRODUTO"
          onPress={handleAddProduct}
          disabled={!name || !code || !price || !quantity || !quantityMin}
        />
    </ScrollView>
  );
}