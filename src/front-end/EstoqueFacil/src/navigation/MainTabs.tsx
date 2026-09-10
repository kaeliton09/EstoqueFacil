// src/navigation/MainTabs.tsx

import React from 'react';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import { DashboardScreen } from '../screens/DashboardScreen';
import { ProductFormScreen } from '../screens/ProductFormScreen';
import { ProductListScreen } from '../screens/ProductListScreen';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

export type MainTabParamList = {
  Dashboard: undefined;
  ProductForm: undefined;
  ProductList: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

export function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: colors.white,

        tabBarStyle: styles.tabBar,

        tabBarLabelStyle: styles.tabBarLabel,

        tabBarHideOnKeyboard: true,

        tabBarIcon: ({ focused, color }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case 'Dashboard':
              iconName = focused
                ? 'home'
                : 'home-outline';
              break;

            case 'ProductForm':
              iconName = focused
                ? 'add-circle'
                : 'add-circle-outline';
              break;

            case 'ProductList':
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
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          title: 'Home',
        }}
      />

      <Tab.Screen
        name="ProductForm"
        component={ProductFormScreen}
        options={{
          title: 'Cadastro',
        }}
      />

      <Tab.Screen
        name="ProductList"
        component={ProductListScreen}
        options={{
          title: 'Produtos',
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 72,
    backgroundColor: colors.primary,
    borderTopWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
    paddingTop: 6,
    paddingBottom: 6,
  },

  tabBarLabel: {
    fontFamily: typography.fontFamily.medium,
    fontSize: 10,
  },
});