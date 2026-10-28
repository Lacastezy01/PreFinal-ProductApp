import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types/product';
import { formatPeso } from '../utils/currency';
import { calculateSubtotal } from '../utils/calculations';
import { StockBadge } from './StockBadge';
import { ShoppingBag, Eye, Star, ImageOff } from 'lucide-react';

export interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  cartQuantity?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  cartQuantity = 0
}) => {
  const [imageError, setImageError] = useState(false);
  const isOutOfStock = product.quantity === 0;
  const isMaxInCart = cartQuantity >= product.quantity;

  // Subtotal for current product stock: price * available stock
  const inventorySubtotal = calculateSubtotal(product.price, product.quantity);
  // Subtotal for item in cart (if present):
  const cartSubtotal = cartQuantity > 0 ? calculateSubtotal(product.price, cartQuantity) : 0;

  return (
    <article className="product-card">
      {/* Category Pill Tag */}
      <div className="product-card-top-tag">
        <span className="product-category-tag">{product.category}</span>
        {product.badge && <span className="product-special-badge">{product.badge}</span>}
      </div>

      {/* Product Image Frame */}
      <div className="product-image-container">
        {imageError ? (
          <div className="product-image-fallback">
            <ImageOff size={40} strokeWidth={2} />
            <span>Image not available</span>
          </div>
        ) : (
          <img
            src={product.featureImage}
            alt={product.name}
            className="product-image"
            onError={() => setImageError(true)}
            loading="lazy"
          />
        )}
      </div>

      {/* Content Info */}
      <div className="product-info">
        <div className="product-rating-row">
          <div className="product-stars">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < Math.floor(product.rating) ? 'star-filled' : 'star-empty'}
                fill={i < Math.floor(product.rating) ? '#FFB83F' : 'none'}
              />
            ))}
          </div>
          <span className="product-rating-text">{product.rating.toFixed(1)}</span>
        </div>

        <h3 className="product-name">
          <Link to={`/products/${product.id}`}>{product.name}</Link>
        </h3>

        <p className="product-description-snippet">{product.description}</p>

        {/* Pricing & Stock Meta */}
        <div className="product-meta-block">
          <div className="product-price-wrapper">
            <span className="price-label">UNIT PRICE</span>
            <span className="product-price">{formatPeso(product.price)}</span>
          </div>

          <StockBadge quantity={product.quantity} />
        </div>

        {/* Subtotal Calculation Display Required by PDF */}
        <div className="product-subtotal-panel">
          <div className="subtotal-item">
            <span className="subtotal-item-label">Stock Value:</span>
            <span className="subtotal-item-val">{formatPeso(inventorySubtotal)}</span>
          </div>
          {cartQuantity > 0 && (
            <div className="subtotal-item subtotal-item--cart">
              <span className="subtotal-item-label">In Cart ({cartQuantity}):</span>
              <span className="subtotal-item-val highlight">{formatPeso(cartSubtotal)}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="product-card-actions">
          <Link
            to={`/products/${product.id}`}
            className="btn btn--outline btn--sm"
            aria-label={`View details for ${product.name}`}
          >
            <Eye size={16} strokeWidth={2.5} />
            <span>Details</span>
          </Link>
          <button
            type="button"
            onClick={() => onAddToCart(product)}
            disabled={isOutOfStock || isMaxInCart}
            className="btn btn--primary btn--sm"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingBag size={16} strokeWidth={2.5} />
            <span>{isOutOfStock ? 'Sold Out' : isMaxInCart ? 'Max in Cart' : 'Add to Cart'}</span>
          </button>
        </div>
      </div>
    </article>
  );
};
