import { api } from "./api";

export type ApiCategory = {
  id: number;
  name: string;
  description: string;
};

export type CreateCategoryDTO = {
  name: string;
  description: string;
};

export const categoryService = {
  getAll: () => api<ApiCategory[]>("/category/list"),

  getNames: () => api<string[]>("/category/list/names"),

  create: (category: CreateCategoryDTO) =>
    api<ApiCategory>("/category/create", {
      method: "POST",
      body: JSON.stringify(category),
    }),

  remove: (id: number) =>
    api<void>(`/category/delete/${id}`, {
      method: "DELETE",
    }),
};