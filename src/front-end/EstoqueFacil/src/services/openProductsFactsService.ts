/**
 * Serviço externo: Open Products Facts (https://world.openproductsfacts.org)
 * Base de produtos colaborativa e aberta. Leitura sem chave nem token.
 * Possui "bases irmãs" com a mesma API, como a Open Food Facts (alimentos).
 */
export const OPEN_PRODUCTS_FACTS = "https://world.openproductsfacts.org";
export const OPEN_FOOD_FACTS = "https://world.openfoodfacts.org";

const TIMEOUT_MS = 10000;

export type ExternalProduct = {
  barcode: string;
  name: string;
  brand: string;
  category: string;
  imageUrl?: string;
};

/** Resposta crua da API (só os campos que pedimos em `fields`). */
type ApiResponse = {
  code?: string;
  status?: number; // 1 = encontrado, 0 = não encontrado
  status_verbose?: string;
  product?: {
    product_name?: string;
    generic_name?: string;
    brands?: string;
    categories?: string;
    image_front_url?: string;
  };
};

export class InvalidBarcodeError extends Error {}
export class ProductNotFoundError extends Error {}

/** Mantém só os dígitos e valida o tamanho (EAN-8, UPC-A, EAN-13, GTIN-14). */
export function normalizeBarcode(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (digits.length < 8 || digits.length > 14) {
    throw new InvalidBarcodeError("Código de barras deve ter entre 8 e 14 dígitos");
  }
  return digits;
}

/** GET /api/v2/product/{codigo}.json */
export async function findByBarcode(
  barcode: string,
  baseUrl: string = OPEN_PRODUCTS_FACTS,
): Promise<ExternalProduct> {
  const code = normalizeBarcode(barcode);
  const fields = "code,product_name,generic_name,brands,categories,image_front_url";
  const url = `${baseUrl}/api/v2/product/${code}.json?fields=${fields}`;

  // fetch não tem timeout nativo: sem isso o app ficaria carregando para sempre
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      headers: { Accept: "application/json", "User-Agent": "EstoqueFacil/1.0 (projeto academico)" },
      signal: controller.signal,
    });

    // Quando o produto não existe a API costuma responder 404 com status 0 no corpo
    let data: ApiResponse | null = null;
    try {
      data = await res.json();
    } catch {
      data = null;
    }

    if (res.status === 404 || data?.status === 0) throw new ProductNotFoundError();
    if (!res.ok || !data?.product) throw new Error(`Erro ${res.status} ao consultar o serviço`);

    const p = data.product;
    return {
      barcode: code,
      name: (p.product_name || p.generic_name || "").trim(),
      brand: (p.brands || "").split(",")[0].trim(), // pode vir "Marca A, Marca B"
      category: (p.categories || "").split(",")[0].trim(),
      imageUrl: p.image_front_url,
    };
  } catch (e: any) {
    if (e?.name === "AbortError") throw new Error("O serviço demorou demais para responder");
    throw e;
  } finally {
    clearTimeout(timer);
  }
}