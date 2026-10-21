import { Platform, ViewStyle } from 'react-native';

export const colors = {
  primary: '#16A34A',
  primaryDark: '#15803D',
  primarySoft: '#DCFCE7',
  background: '#F5F7F6',
  surface: '#FFFFFF',
  text: '#0F172A',
  textMuted: '#64748B',
  border: '#E2E8F0',
  danger: '#DC2626',
  dangerSoft: '#FEE2E2',
  warning: '#D97706',
  warningSoft: '#FEF3C7',
  white: '#FFFFFF',
};

export const fonts = {
  regular: 'Poppins_400Regular',
  medium: 'Poppins_500Medium',
  semibold: 'Poppins_600SemiBold',
  bold: 'Poppins_700Bold',
};

export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 };

export const radius = { sm: 8, md: 12, lg: 16, xl: 24, full: 999 };

export const typography = {
  title: { fontFamily: fonts.bold, fontSize: 26, color: colors.text },
  heading: { fontFamily: fonts.semibold, fontSize: 18, color: colors.text },
  body: { fontFamily: fonts.regular, fontSize: 14, color: colors.text },
  label: { fontFamily: fonts.medium, fontSize: 13, color: colors.text },
  caption: { fontFamily: fonts.regular, fontSize: 12, color: colors.textMuted },
};

export const shadow = {
  card: Platform.select<ViewStyle>({
    ios: {
      shadowColor: '#0F172A',
      shadowOpacity: 0.06,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 4 },
    },
    android: { elevation: 3 },
    default: {},
  }) as ViewStyle,
};
