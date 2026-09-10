// src/app/(tabs)/_layout.tsx

import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

export default function TabsLayout() {
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: colors.white,

        tabBarStyle: {
          height: 72,
          backgroundColor: colors.primary,
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          paddingTop: 6,
          paddingBottom: 6,
        },

        tabBarLabelStyle: {
          fontFamily: typography.fontFamily.medium,
          fontSize: 10,
        },

        tabBarHideOnKeyboard: true,

        tabBarIcon: ({ focused, color }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case 'index':
              iconName = focused
                ? 'home'
                : 'home-outline';
              break;

            case 'cadastro':
              iconName = focused
                ? 'add-circle'
                : 'add-circle-outline';
              break;

            case 'produtos':
              iconName = focused
                ? 'search'
                : 'search-outline';
              break;

            default:
              iconName = 'ellipse-outline';
          }

          return (
            <Ionicons
              name={iconName}
              size={24}
              color={color}
            />
          );
        },
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />

      <Tabs.Screen
        name="cadastro"
        options={{
          title: 'Cadastro',
        }}
      />

      <Tabs.Screen
        name="produtos"
        options={{
          title: 'Produtos',
        }}
      />
    </Tabs>
  );
}