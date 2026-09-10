export const colors = {
  primary: '#6E8C03',
  primaryDark: '#4F6600',
  primaryMedium: '#7F9F08',
  primaryLight: '#AFC76A',
  primarySoft: '#E6EDC8',

  black: '#000000',
  white: '#FFFFFF',

  background: '#F7F7F7',
  surface: '#FFFFFF',

  text: '#111111',
  textSecondary: '#666666',
  textLight: '#999999',

  border: '#6E8C03',
  borderLight: '#D9D9D9',

  success: '#4D7C0F',
  warning: '#E08A00',
  danger: '#D64545',

  chartDark: '#3F5100',
  chartMedium: '#667A20',
  chartLight: '#93AD3D',

  transparent: 'transparent',
} as const;

export type ColorKey = keyof typeof colors;