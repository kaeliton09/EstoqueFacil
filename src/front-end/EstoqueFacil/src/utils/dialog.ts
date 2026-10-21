import { Alert, Platform } from 'react-native';

// Alert.alert não funciona no navegador (Expo web), então usamos window.* nesse caso.
const w = globalThis as any;

export function notify(title: string, message: string) {
  if (Platform.OS === 'web') w.alert(`${title}\n${message}`);
  else Alert.alert(title, message);
}

export function confirmDialog(
  title: string,
  message: string,
  confirmLabel: string,
  onConfirm: () => void,
  destructive = true,
) {
  if (Platform.OS === 'web') {
    if (w.confirm(`${title}\n\n${message}`)) onConfirm();
    return;
  }
  Alert.alert(title, message, [
    { text: 'Cancelar', style: 'cancel' },
    { text: confirmLabel, style: destructive ? 'destructive' : 'default', onPress: onConfirm },
  ]);
}
