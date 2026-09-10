import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';

export type BottomNavItem = {
  key: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  activeIcon?: keyof typeof Ionicons.glyphMap;
};

interface BottomNavBarProps {
  items?: BottomNavItem[];
  activeKey: string;
  onItemPress: (key: string) => void;
}

const defaultItems: BottomNavItem[] = [
  {
    key: 'home',
    label: 'Home',
    icon: 'home-outline',
    activeIcon: 'home',
  },
  {
    key: 'products',
    label: 'Cadastro',
    icon: 'add-circle-outline',
    activeIcon: 'add-circle',
  },
  {
    key: 'search',
    label: 'Produtos',
    icon: 'search-outline',
    activeIcon: 'search',
  },
];

export function BottomNavBar({
  items = defaultItems,
  activeKey,
  onItemPress,
}: BottomNavBarProps) {
  return (
    <View style={styles.container}>
      {items.map((item) => {
        const isActive = item.key === activeKey;

        return (
          <Pressable
            key={item.key}
            onPress={() => onItemPress(item.key)}
            style={({ pressed }) => [
              styles.item,
              pressed && styles.pressed,
            ]}
            accessibilityRole="tab"
            accessibilityState={{
              selected: isActive,
            }}
          >
            <Ionicons
              name={
                isActive
                  ? item.activeIcon ?? item.icon
                  : item.icon
              }
              size={24}
              color={colors.white}
            />

            <Text
              style={[
                styles.label,
                isActive && styles.activeLabel,
              ]}
            >
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: 72,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.sm,
    paddingBottom: spacing.sm,
    paddingTop: spacing.sm,
  },

  item: {
    flex: 1,
    minHeight: 58,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },

  pressed: {
    opacity: 0.7,
  },

  label: {
    marginTop: 3,
    color: colors.white,
    fontFamily: typography.fontFamily.regular,
    fontSize: 10,
  },

  activeLabel: {
    fontFamily: typography.fontFamily.semiBold,
  },
});