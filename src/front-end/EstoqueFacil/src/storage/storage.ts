import AsyncStorage from '@react-native-async-storage/async-storage';

export const KEYS = {
  products: '@estoquefacil:products',
  categories: '@estoquefacil:categories',
  seeded: '@estoquefacil:seeded',
};

/** Lê um valor guardado. Se não existir ou estiver corrompido, devolve o fallback. */
export async function readJSON<T>(key: string, fallback: T): Promise<T> {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

/** Converte para texto JSON e grava no aparelho. */
export async function writeJSON(key: string, value: unknown): Promise<void> {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

/**
 * Fila de escrita: operações de "ler → alterar → gravar" rodam uma de cada vez,
 * evitando que duas ações seguidas (ex.: dar baixa duas vezes rápido) se sobrescrevam.
 */
let queue: Promise<unknown> = Promise.resolve();
export function enqueue<T>(task: () => Promise<T>): Promise<T> {
  const run = queue.then(task, task);
  queue = run.catch(() => undefined);
  return run;
}
