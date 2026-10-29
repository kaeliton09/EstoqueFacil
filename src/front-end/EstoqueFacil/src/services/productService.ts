import { api } from "./api";
import { ApiCategory } from "./categoryService";

export type ApiAddress = {
  street: string;
  columnName: string;
  bay: string;
  level: string;
};

export type ApiProduct = {
  id: number;
  code: number;
  name: string;
  quantity: number;
  minimumQuantity: number;
  price: number;
  category: ApiCategory;
  address: ApiAddress;
};

export type CreateProductDTO = {
  code: number;
  name: string;
  quantity: number;
  minimumQuantity: number;
  price: number;
  category: { id: number };
  address: ApiAddress;
};

export const productService = {
  getAll: () => api<ApiProduct[]>("/products/list"),

  getLastTen: () => api<ApiProduct[]>("/products/list/last-ten"),

  getById: (id: number) => api<ApiProduct>(`/products/${id}`),

  getByCategory: (categoryId: number) =>
    api<ApiProduct[]>(`/products/category/${categoryId}`),

  create: (product: CreateProductDTO) =>
    api<ApiProduct>("/products/create", {
      method: "POST",
      body: JSON.stringify(product),
    }),

  update: (id: number, product: CreateProductDTO) =>
    api<ApiProduct>(`/products/update/${id}`, {
      method: "POST",
      body: JSON.stringify(product),
    }),

  remove: (id: number) =>
    api<void>(`/products/delete/${id}`, {
      method: "DELETE",
    }),
};