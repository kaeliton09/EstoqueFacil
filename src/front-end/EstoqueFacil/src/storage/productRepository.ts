import { Product } from '../types/product';
import { enqueue, KEYS, readJSON, writeJSON } from './storage';

/** Regra de negócio usada tanto na tela (estado) quanto no armazenamento. */
export function applyQuantityDelta(p: Product, delta: number): Product {
  return { ...p, quantity: Math.max(0, p.quantity + delta) };
}

export const productRepository = {
  /** RECUPERAR: lê todos os produtos guardados no aparelho. */
  getAll(): Promise<Product[]> {
    return readJSON<Product[]>(KEYS.products, []);
  },

  /** CRIAR + ARMAZENAR: adiciona o produto ao início da lista e grava. */
  create(product: Product): Promise<void> {
    return enqueue(async () => {
      const list = await this.getAll();
      await writeJSON(KEYS.products, [product, ...list]);
    });
  },

  /** ATUALIZAR: aplica uma função de alteração ao produto com o id informado. */
  update(id: string, updater: (p: Product) => Product): Promise<void> {
    return enqueue(async () => {
      const list = await this.getAll();
      await writeJSON(KEYS.products, list.map((p) => (p.id === id ? updater(p) : p)));
    });
  },

  /** REMOVER: tira o produto da lista e grava. */
  remove(id: string): Promise<void> {
    return enqueue(async () => {
      const list = await this.getAll();
      await writeJSON(KEYS.products, list.filter((p) => p.id !== id));
    });
  },

  /** Grava os dados de exemplo apenas na 1ª abertura do app (se habilitado). */
  seedIfFirstLaunch(seed: Product[]): Promise<void> {
    return enqueue(async () => {
      const done = await readJSON<boolean>(KEYS.seeded, false);
      if (done) return;
      const list = await this.getAll();
      if (list.length === 0) await writeJSON(KEYS.products, seed);
      await writeJSON(KEYS.seeded, true);
    });
  },
};
