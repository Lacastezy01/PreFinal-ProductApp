export type ProductCategory =
  | 'All Products'
  | 'Electronics'
  | 'Fashion'
  | 'Home & Living'
  | 'Collectibles'
  | 'Stationery';

export const CATEGORIES: ProductCategory[] = [
  'All Products',
  'Electronics',
  'Fashion',
  'Home & Living',
  'Collectibles',
  'Stationery'
];

export interface Product {
  id: string;
  name: string;
  category: Exclude<ProductCategory, 'All Products'>;
  description: string;
  specifications: string;
  rating: number; // 1.0 to 5.0
  price: number; // Unit price in PHP
  quantity: number; // Stock inventory quantity
  featureImage: string;
  badge?: string;
  createdAt?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ProductFormData {
  name: string;
  category: Exclude<ProductCategory, 'All Products'>;
  description: string;
  specifications: string;
  rating: string | number;
  price: string | number;
  quantity: string | number;
  featureImage: string;
}

export interface ValidationErrors {
  name?: string;
  category?: string;
  description?: string;
  specifications?: string;
  rating?: string;
  price?: string;
  quantity?: string;
  featureImage?: string;
}

export interface ToastNotification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}
