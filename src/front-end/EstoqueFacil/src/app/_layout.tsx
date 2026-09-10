// src/app/_layout.tsx

import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Stack } from 'expo-router';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
} from '@expo-google-fonts/poppins';

import { colors } from '../theme/colors';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
  });

  if (!fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.white,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ActivityIndicator
          size="large"
          color={colors.primary}
        />
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}