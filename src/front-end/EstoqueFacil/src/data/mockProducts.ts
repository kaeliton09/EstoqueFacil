import { Product } from '../types/product';

export const CATEGORIES = ['Bebidas', 'Mercearia', 'Limpeza', 'Higiene'];

export const mockProducts: Product[] = [
  { id: '1', name: 'Arroz Branco 5kg', code: '7891000100103', category: 'Mercearia', quantity: 42, minQuantity: 10, price: 28.9, location: { street: 'A', column: '1', bay: '2', level: '1' } },
  { id: '2', name: 'Feijão Carioca 1kg', code: '7891000100202', category: 'Mercearia', quantity: 6, minQuantity: 10, price: 8.5, location: { street: 'A', column: '1', bay: '3', level: '2' } },
  { id: '3', name: 'Refrigerante Cola 2L', code: '7891000100301', category: 'Bebidas', quantity: 58, minQuantity: 20, price: 9.99, location: { street: 'B', column: '2', bay: '1', level: '1' } },
  { id: '4', name: 'Água Mineral 1,5L', code: '7891000100400', category: 'Bebidas', quantity: 0, minQuantity: 15, price: 3.2, location: { street: 'B', column: '2', bay: '2', level: '1' } },
  { id: '5', name: 'Detergente Neutro 500ml', code: '7891000100509', category: 'Limpeza', quantity: 33, minQuantity: 12, price: 2.99, location: { street: 'C', column: '1', bay: '1', level: '3' } },
  { id: '6', name: 'Sabão em Pó 1kg', code: '7891000100608', category: 'Limpeza', quantity: 9, minQuantity: 10, price: 14.8, location: { street: 'C', column: '2', bay: '4', level: '2' } },
  { id: '7', name: 'Sabonete 90g', code: '7891000100707', category: 'Higiene', quantity: 70, minQuantity: 25, price: 2.1, location: { street: 'D', column: '1', bay: '2', level: '1' } },
  { id: '8', name: 'Creme Dental 90g', code: '7891000100806', category: 'Higiene', quantity: 24, minQuantity: 10, price: 5.45, location: { street: 'D', column: '3', bay: '1', level: '2' } },
];
