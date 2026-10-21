import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { mockProducts } from '../data/mockProducts';
import { categoryRepository } from '../storage/categoryRepository';
import { applyQuantityDelta, productRepository } from '../storage/productRepository';
import { colors } from '../theme';
import { Product } from '../types/product';

/** true = na 1ª abertura do app, grava os produtos de exemplo. false = começa vazio. */
const SEED_ON_FIRST_LAUNCH = false;

const logError = (e: unknown) => console.warn('[Estoque Fácil] falha ao gravar no aparelho:', e);

type ProductsContextData = {
  products: Product[];
  categories: string[];
  addProduct: (data: Omit<Product, 'id'>) => Product;
  /** delta positivo = entrada, negativo = baixa. O estoque nunca fica abaixo de 0. */
  adjustQuantity: (id: string, delta: number) => void;
  removeProduct: (id: string) => void;
  addCategory: (name: string) => void;
};

const ProductsContext = createContext<ProductsContextData | null>(null);

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // RECUPERAR: ao abrir o app, carrega o que estava guardado no aparelho.
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        if (SEED_ON_FIRST_LAUNCH) await productRepository.seedIfFirstLaunch(mockProducts);
        const [p, c] = await Promise.all([productRepository.getAll(), categoryRepository.getAll()]);
        if (!active) return;
        setProducts(p);
        setCategories(c);
      } catch (e) {
        logError(e);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, []);

  // Cada ação atualiza a tela na hora e grava no aparelho em seguida.
  const addProduct = useCallback((data: Omit<Product, 'id'>) => {
    const product: Product = { ...data, id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}` };
    setProducts((prev) => [product, ...prev]);
    productRepository.create(product).catch(logError);
    return product;
  }, []);

  const adjustQuantity = useCallback((id: string, delta: number) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? applyQuantityDelta(p, delta) : p)));
    productRepository.update(id, (p) => applyQuantityDelta(p, delta)).catch(logError);
  }, []);

  const removeProduct = useCallback((id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    productRepository.remove(id).catch(logError);
  }, []);

  const addCategory = useCallback((name: string) => {
    const clean = name.trim();
    setCategories((prev) => [...prev, clean]);
    categoryRepository.create(clean).catch(logError);
  }, []);

  const value = useMemo(
    () => ({ products, categories, addProduct, adjustQuantity, removeProduct, addCategory }),
    [products, categories, addProduct, adjustQuantity, removeProduct, addCategory],
  );

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error('useProducts deve ser usado dentro de <ProductsProvider>');
  return ctx;
}
