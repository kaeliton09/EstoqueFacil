
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { InputField } from '../components/InputField';
import { PrimaryButton } from '../components/PrimaryButton';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

const categories = [
  'Computador',
  'Dispositivo móvel',
  'Tablet',
  'Periféricos',
  'Acessórios',
  'Outros',
];

export function ProductFormScreen() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [minimumQuantity, setMinimumQuantity] =
    useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  function handleSave() {
    if (!name.trim()) {
      Alert.alert(
        'Campo obrigatório',
        'Informe o nome do produto.'
      );
      return;
    }

    if (!category) {
      Alert.alert(
        'Campo obrigatório',
        'Selecione uma categoria.'
      );
      return;
    }

    if (!quantity.trim()) {
      Alert.alert(
        'Campo obrigatório',
        'Informe a quantidade em estoque.'
      );
      return;
    }

    if (!minimumQuantity.trim()) {
      Alert.alert(
        'Campo obrigatório',
        'Informe a quantidade mínima.'
      );
      return;
    }

    if (!price.trim()) {
      Alert.alert(
        'Campo obrigatório',
        'Informe o preço unitário.'
      );
      return;
    }

    Alert.alert(
      'Produto cadastrado',
      'O produto foi cadastrado visualmente com sucesso.',
      [
        {
          text: 'OK',
          onPress: () => {
            router.back();
          },
        },
      ]
    );
  }

  function handleCancel() {
    router.back();
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={
        Platform.OS === 'ios'
          ? 'padding'
          : undefined
      }
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Pressable
            onPress={handleCancel}
            style={styles.backButton}
            hitSlop={10}
          >
            <Ionicons
              name="arrow-back"
              size={24}
              color={colors.primary}
            />
          </Pressable>

          <View style={styles.headerTextContainer}>
            <Text style={styles.title}>
              Cadastro de Produto
            </Text>

            <Text style={styles.subtitle}>
              Adicione um novo item ao seu estoque
            </Text>
          </View>
        </View>

        {/* Formulário */}
        <View style={styles.form}>
          <InputField
            label="Nome do produto"
            placeholder="Ex.: Notebook Dell"
            value={name}
            onChangeText={setName}
            autoCapitalize="sentences"
            leftIcon={
              <Ionicons
                name="cube-outline"
                size={20}
                color={colors.primary}
              />
            }
          />

          {/* Categoria */}
          <View style={styles.categorySection}>
            <Text style={styles.fieldLabel}>
              Categoria
            </Text>

            <View style={styles.categoryContainer}>
              {categories.map((item) => {
                const selected = category === item;

                return (
                  <Pressable
                    key={item}
                    onPress={() => setCategory(item)}
                    style={[
                      styles.categoryChip,
                      selected &&
                        styles.categoryChipSelected,
                    ]}
                  >
                    <Text
                      style={[
                        styles.categoryChipText,
                        selected &&
                          styles.categoryChipTextSelected,
                      ]}
                    >
                      {item}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <InputField
            label="Quantidade em estoque"
            placeholder="Ex.: 50"
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="numeric"
            leftIcon={
              <Ionicons
                name="layers-outline"
                size={20}
                color={colors.primary}
              />
            }
          />

          <InputField
            label="Quantidade mínima"
            placeholder="Ex.: 10"
            value={minimumQuantity}
            onChangeText={setMinimumQuantity}
            keyboardType="numeric"
            leftIcon={
              <Ionicons
                name="alert-circle-outline"
                size={20}
                color={colors.primary}
              />
            }
          />

          <InputField
            label="Preço unitário"
            placeholder="Ex.: R$ 1.299,90"
            value={price}
            onChangeText={setPrice}
            keyboardType="decimal-pad"
            leftIcon={
              <Ionicons
                name="cash-outline"
                size={20}
                color={colors.primary}
              />
            }
          />

          <InputField
            label="Descrição / observações"
            placeholder="Informações adicionais sobre o produto"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            leftIcon={
              <Ionicons
                name="document-text-outline"
                size={20}
                color={colors.primary}
              />
            }
          />

          {/* Botão */}
          <View style={styles.buttonContainer}>
            <PrimaryButton
              title="Salvar produto"
              onPress={handleSave}
            />
          </View>

          <Pressable
            onPress={handleCancel}
            style={styles.cancelButton}
          >
            <Text style={styles.cancelText}>
              Cancelar
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    paddingHorizontal: 22,
    paddingTop: 25,
    paddingBottom: 35,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 28,
  },

  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 13,
  },

  headerTextContainer: {
    flex: 1,
  },

  title: {
    fontFamily: typography.fontFamily.extraBold,
    fontSize: 27,
    lineHeight: 34,
    color: colors.primary,
  },

  subtitle: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 13,
    lineHeight: 19,
    color: colors.textSecondary,
    marginTop: 3,
  },

  form: {
    width: '100%',
    gap: 14,
  },

  categorySection: {
    width: '100%',
  },

  fieldLabel: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: 14,
    color: colors.text,
    marginBottom: 9,
    marginLeft: 4,
  },

  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  categoryChip: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.white,
  },

  categoryChipSelected: {
    backgroundColor: colors.primary,
  },

  categoryChipText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: 12,
    color: colors.primary,
  },

  categoryChipTextSelected: {
    color: colors.white,
    fontFamily: typography.fontFamily.semiBold,
  },

  buttonContainer: {
    marginTop: 8,
  },

  cancelButton: {
    alignItems: 'center',
    paddingVertical: 10,
  },

  cancelText: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: 14,
    color: colors.primary,
  },
});