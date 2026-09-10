// src/navigation/AppNavigator.tsx

import React from 'react';
import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import { LoginScreen } from '../screens/LoginScreen';
import { MainTabs } from './MainTabs';

export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
};

const Stack =
  createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
      />

      <Stack.Screen
        name="Main"
        component={MainTabs}
      />
    </Stack.Navigator>
  );
}