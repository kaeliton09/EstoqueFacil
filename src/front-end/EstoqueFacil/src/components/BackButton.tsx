import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, radius, shadow } from '../theme';

export function BackButton({ onPress }: { onPress?: () => void }) {
  const router = useRouter();
  return (
    <Pressable
      onPress={onPress ?? (() => router.back())}
      accessibilityRole="button"
      accessibilityLabel="Voltar para a tela anterior"
      style={({ pressed }) => [styles.btn, pressed && { backgroundColor: colors.primarySoft }]}
    >
      <Ionicons name="chevron-back" size={22} color={colors.text} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: 44, height: 44, borderRadius: radius.full, alignItems: 'center', justifyContent: 'center',
    backgroundColor: colors.surface, ...shadow.card,
  },
});
