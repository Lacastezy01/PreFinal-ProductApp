import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Product } from '../types/product';
import { formatPeso } from '../utils/currency';
import { calculateSubtotal } from '../utils/calculations';
import { StockBadge } from '../components/StockBadge';
import { QuantityControl } from '../components/QuantityControl';
import { ArrowLeft, ShoppingBag, Star, ShieldCheck, Zap, ImageOff } from 'lucide-react';

export interface ProductDetailsPageProps {
  products: Product[];
  onAddToCart: (product: Product, quantity?: number) => void;
  getCartQuantity: (id: string) => number;
}

export const ProductDetailsPage: React.FC<ProductDetailsPageProps> = ({
  products,
  onAddToCart,
  getCartQuantity
}) => {
  const { productId } = useParams<{ productId: string }>();
  const product = products.find((p) => p.id === productId);

  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [imageError, setImageError] = useState(false);

  if (!product) {
    return (
      <div className="container not-found-page">
        <div className="not-found-card">
          <h2 className="not-found-title">PRODUCT NOT FOUND!</h2>
          <p className="not-found-text">
            Oops! The product with ID <code>{productId}</code> doesn't exist or might have been removed.
          </p>
          <Link to="/" className="btn btn--primary">
            <ArrowLeft size={18} strokeWidth={2.5} />
            <span>RETURN TO CATALOG</span>
          </Link>
        </div>
      </div>
    );
  }

  const inCartQty = getCartQuantity(product.id);
  const isOutOfStock = product.quantity === 0;
  const currentSubtotal = calculateSubtotal(product.price, selectedQuantity);

  const handleIncrease = () => {
    if (selectedQuantity < product.quantity) {
      setSelectedQuantity((prev) => prev + 1);
    }
  };

  const handleDecrease = () => {
    if (selectedQuantity > 1) {
      setSelectedQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    onAddToCart(product, selectedQuantity);
  };

  return (
    <div className="product-details-page">
      <div className="container">
        <div className="back-nav-row">
          <Link to="/" className="back-link">
            <ArrowLeft size={18} strokeWidth={2.5} />
            <span>Back to All Goods</span>
          </Link>
        </div>

        <div className="details-layout">
          {/* Left Column: Image with Sticker Frame */}
          <div className="details-image-column">
            <div className="details-image-frame">
              {imageError ? (
                <div className="product-image-fallback details-fallback">
                  <ImageOff size={60} strokeWidth={2} />
                  <span>Image preview unavailable</span>
                </div>
              ) : (
                <img
                  src={product.featureImage}
                  alt={product.name}
                  className="details-image"
                  onError={() => setImageError(true)}
                />
              )}
              {product.badge && <span className="details-badge">{product.badge}</span>}
            </div>
          </div>

          {/* Right Column: Information & Controls */}
          <div className="details-content-column">
            <div className="details-meta-top">
              <span className="details-category-tag">{product.category}</span>
              <span className="details-id-tag">ID: {product.id}</span>
            </div>

            <h1 className="details-title">{product.name}</h1>

            <div className="details-rating-block">
              <div className="details-stars">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={i < Math.floor(product.rating) ? 'star-filled' : 'star-empty'}
                    fill={i < Math.floor(product.rating) ? '#FFB83F' : 'none'}
                  />
                ))}
              </div>
              <span className="details-rating-score">{product.rating.toFixed(1)} / 5.0</span>
              <span className="details-rating-count">(Verified Customer Reviews)</span>
            </div>

            <div className="details-price-row">
              <div className="details-unit-price">
                <span className="details-price-label">UNIT PRICE:</span>
                <span className="details-price-val">{formatPeso(product.price)}</span>
              </div>
              <StockBadge quantity={product.quantity} />
            </div>

            <div className="details-card-section">
              <h3 className="section-mini-heading">OVERVIEW & DESCRIPTION</h3>
              <p className="details-description">{product.description}</p>
            </div>

            <div className="details-card-section">
              <h3 className="section-mini-heading">SPECIFICATIONS & TECHNICAL DETAILS</h3>
              <div className="details-specifications-box">
                <p>{product.specifications}</p>
              </div>
            </div>

            {/* Subtotal & Quantity Controls Section */}
            <div className="details-purchase-panel">
              <div className="purchase-panel-subtotal-block">
                <span className="purchase-label">Selected Subtotal:</span>
                <span className="purchase-subtotal-amount">{formatPeso(currentSubtotal)}</span>
                <span className="purchase-calc-hint">
                  ({selectedQuantity} unit{selectedQuantity > 1 ? 's' : ''} × {formatPeso(product.price)})
                </span>
              </div>

              <div className="purchase-controls-row">
                <div className="purchase-qty-group">
                  <span className="qty-label">Quantity:</span>
                  <QuantityControl
                    quantity={selectedQuantity}
                    maxStock={product.quantity}
                    onIncrease={handleIncrease}
                    onDecrease={handleDecrease}
                    disabled={isOutOfStock}
                    size="lg"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={isOutOfStock || inCartQty + selectedQuantity > product.quantity}
                  className="btn btn--primary btn--lg add-to-cart-big-btn"
                >
                  <ShoppingBag size={22} strokeWidth={2.5} />
                  <span>
                    {isOutOfStock
                      ? 'OUT OF STOCK'
                      : inCartQty + selectedQuantity > product.quantity
                      ? 'EXCEEDS STOCK'
                      : `ADD TO CART • ${formatPeso(currentSubtotal)}`}
                  </span>
                </button>
              </div>

              {inCartQty > 0 && (
                <p className="details-in-cart-note">
                  ℹ️ You currently have <strong>{inCartQty}</strong> of this item already in your cart.
                </p>
              )}
            </div>

            <div className="details-perks-row">
              <div className="perk-item">
                <ShieldCheck size={18} className="text-green" />
                <span>100% Quality Guaranteed</span>
              </div>
              <div className="perk-item">
                <Zap size={18} className="text-cyan" />
                <span>Instant Stock Computation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
