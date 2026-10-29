const API_URL = process.env.EXPO_PUBLIC_API_URL;

/** Função base: todas as chamadas ao backend passam por aqui. */
export async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
  });

  if (!res.ok) throw new Error(`Erro ${res.status} em ${path}`);

  // O DELETE devolve corpo vazio, então não dá para chamar res.json() direto
  const text = await res.text();
  return (text ? JSON.parse(text) : undefined) as T;
}