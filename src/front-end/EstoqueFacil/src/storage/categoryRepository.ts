import { CATEGORIES } from '../data/mockProducts';
import { enqueue, KEYS, readJSON, writeJSON } from './storage';

export const categoryRepository = {
  /** RECUPERAR: devolve as categorias guardadas, ou as padrão na 1ª abertura. */
  async getAll(): Promise<string[]> {
    const list = await readJSON<string[] | null>(KEYS.categories, null);
    if (list && list.length > 0) return list;
    await writeJSON(KEYS.categories, CATEGORIES);
    return CATEGORIES;
  },

  /** CRIAR + ARMAZENAR */
  create(name: string): Promise<void> {
    return enqueue(async () => {
      const list = await this.getAll();
      await writeJSON(KEYS.categories, [...list, name]);
    });
  },
};
