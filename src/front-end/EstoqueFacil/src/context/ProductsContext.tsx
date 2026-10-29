import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { ApiCategory, categoryService } from "../services/categoryService";
import { ApiProduct, CreateProductDTO, productService } from "../services/productService";
import { colors } from "../theme";
import { Product } from "../types/product";

// ---------- Conversões (único lugar que conhece os dois formatos) ----------

/** Converte qualquer valor em número. Texto vazio, "29,90" ou NaN nunca viram null no JSON. */
const num = (v: unknown): number => {
  const n = Number(String(v ?? "").replace(",", "."));
  return Number.isFinite(n) ? n : 0;
};

/** backend -> app. Se o seu type Product tiver outros nomes, ajuste aqui. */
const toProduct = (p: ApiProduct): Product =>
  ({
    id: String(p.id),
    code: p.code,
    name: p.name,
    quantity: p.quantity,
    minimumQuantity: p.minimumQuantity,
    price: p.price,
    category: p.category?.name ?? "",
    // backend: address.columnName  ->  app: location.column
    location: {
      street: p.address?.street ?? "",
      column: p.address?.columnName ?? "",
      bay: p.address?.bay ?? "",
      level: p.address?.level ?? "",
    },
  }) as unknown as Product;

/** app -> backend */
const toPayload = (p: any, categoryId: number): CreateProductDTO => ({
  code: num(p.code),
  name: p.name ?? "",
  quantity: num(p.quantity),
  minimumQuantity: num(p.minimumQuantity),
  price: num(p.price),
  category: { id: categoryId },
  // app: location.column  ->  backend: address.columnName
  address: {
    street: p.location?.street ?? "",
    columnName: p.location?.column ?? "",
    bay: p.location?.bay ?? "",
    level: p.location?.level ?? "",
  },
});

// ---------- Contexto ----------

type ProductsContextData = {
  products: Product[];
  categories: string[];
  addProduct: (data: Omit<Product, "id">) => Promise<void>;
  /** delta positivo = entrada, negativo = baixa. O estoque nunca fica abaixo de 0. */
  adjustQuantity: (id: string, delta: number) => Promise<void>;
  removeProduct: (id: string) => Promise<void>;
  addCategory: (name: string) => Promise<void>;
};

const ProductsContext = createContext<ProductsContextData | null>(null);

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [apiCategories, setApiCategories] = useState<ApiCategory[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = useMemo(() => apiCategories.map((c) => c.name), [apiCategories]);

  /** Busca tudo de novo no servidor. É chamada depois de cada alteração. */
  const refresh = useCallback(async () => {
    const [cats, prods] = await Promise.all([categoryService.getAll(), productService.getAll()]);
    setApiCategories(cats);
    setProducts(prods.map(toProduct));
  }, []);

  // Ao abrir o app, carrega os dados do servidor
  useEffect(() => {
    refresh()
      .catch((e) => console.warn("[Estoque Fácil] falha ao carregar:", e))
      .finally(() => setLoading(false));
  }, [refresh]);

  /** O app usa o nome da categoria, o backend usa o id. */
  const getCategoryId = (name: string) => {
    const category = apiCategories.find((c) => c.name === name);
    if (!category) throw new Error(`Categoria "${name}" não encontrada`);
    return category.id;
  };

  const addProduct = async (data: Omit<Product, "id">) => {
    // log para conferir o que o formulário está mandando (remova depois)
    console.log("[Estoque Fácil] dados do formulário:", JSON.stringify(data));

    const payload = toPayload(data, getCategoryId((data as any).category));
    console.log("[Estoque Fácil] payload enviado:", JSON.stringify(payload));

    await productService.create(payload);
    await refresh();
  };

  const adjustQuantity = async (id: string, delta: number) => {
    const product = products.find((p) => p.id === id) as any;
    if (!product) return;
    const updated = { ...product, quantity: Math.max(0, num(product.quantity) + delta) };
    await productService.update(Number(id), toPayload(updated, getCategoryId(product.category)));
    await refresh();
  };

  const removeProduct = async (id: string) => {
    await productService.remove(Number(id));
    await refresh();
  };

  const addCategory = async (name: string) => {
    // o backend exige descrição (@NotBlank), então mandamos um texto padrão
    await categoryService.create({ name: name.trim(), description: "Sem descrição" });
    await refresh();
  };

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.background }}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  return (
    <ProductsContext.Provider
      value={{ products, categories, addProduct, adjustQuantity, removeProduct, addCategory }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error("useProducts deve ser usado dentro de <ProductsProvider>");
  return ctx;
}