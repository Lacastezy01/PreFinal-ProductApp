import React from 'react';
import { Product } from '../types/product';
import { ProductCard } from './ProductCard';
import { PackageOpen } from 'lucide-react';

export interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  getCartQuantity: (productId: string) => number;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onAddToCart,
  getCartQuantity
}) => {
  if (products.length === 0) {
    return (
      <div className="product-grid-empty">
        <PackageOpen size={64} strokeWidth={2} className="empty-icon" />
        <h3 className="empty-title">NO MATCHING GOODS FOUND!</h3>
        <p className="empty-text">
          Try tweaking your search keywords or pick a different category above.
        </p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          cartQuantity={getCartQuantity(product.id)}
        />
      ))}
    </div>
  );
};
