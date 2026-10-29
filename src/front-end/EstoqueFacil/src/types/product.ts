export type ProductLocation = {
  street: string; // rua
  column: string; // coluna
  bay: string; // vão
  level: string; // nível
};

export type Product = {
  id: string;
  name: string;
  code: string;
  category: string;
  quantity: number;
  minQuantity: number;
  price: number;
  location: ProductLocation;
};

export type StockStatus = 'ok' | 'low' | 'out';

export function getStockStatus(p: Pick<Product, 'quantity' | 'minimumQuantity'>): StockStatus {
  if (p.quantity <= 0) return 'out';
  if (p.quantity <= p.minimumQuantity) return 'low';
  return 'ok';
}
