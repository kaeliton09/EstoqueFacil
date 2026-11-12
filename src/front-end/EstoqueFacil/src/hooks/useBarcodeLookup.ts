import { useCallback, useState } from "react";
import {
  ExternalProduct,
  findByBarcode,
  InvalidBarcodeError,
  OPEN_FOOD_FACTS,
  OPEN_PRODUCTS_FACTS,
  ProductNotFoundError,
} from "../services/openProductsFactsService";

/** Os quatro estados exigidos pela Etapa 6 (+ "idle" antes da primeira busca). */
export type LookupState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; product: ExternalProduct }
  | { status: "empty"; message: string } // ausência de dados
  | { status: "error"; message: string };

/** Ordem da busca: primeiro produtos em geral, depois alimentos. */
const SOURCES = [OPEN_PRODUCTS_FACTS, OPEN_FOOD_FACTS];

export function useBarcodeLookup() {
  const [state, setState] = useState<LookupState>({ status: "idle" });

  const search = useCallback(async (barcode: string) => {
    setState({ status: "loading" });
    try {
      for (const baseUrl of SOURCES) {
        try {
          const product = await findByBarcode(barcode, baseUrl);
          setState({ status: "success", product });
          return product;
        } catch (e) {
          if (!(e instanceof ProductNotFoundError)) throw e; // só tenta a próxima base se não achou
        }
      }
      setState({ status: "empty", message: "Produto não encontrado. Preencha os dados manualmente." });
    } catch (e: any) {
      if (e instanceof InvalidBarcodeError) {
        setState({ status: "error", message: e.message });
      } else {
        setState({ status: "error", message: "Não foi possível consultar o serviço. Verifique a internet e tente de novo." });
      }
    }
  }, []);

  const reset = useCallback(() => setState({ status: "idle" }), []);

  return { state, search, reset };
}