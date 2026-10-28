import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Product } from '../types/product';
import { formatPeso } from '../utils/currency';
import { calculateSubtotal } from '../utils/calculations';
import { StockBadge } from '../components/StockBadge';
import { QuantityControl } from '../components/QuantityControl';
import {
  ArrowLeft,
  ShoppingBag,
  Star,
  ShieldCheck,
  Zap,
  ImageOff,
  Truck,
  RotateCcw,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

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
  const [recentlyAdded, setRecentlyAdded] = useState(false);

  if (!product) {
    return (
      <div className="container not-found-page">
        <div className="not-found-card">
          <div className="not-found-badge">404 • MISSING ITEM</div>
          <h2 className="not-found-title">PRODUCT NOT FOUND!</h2>
          <p className="not-found-text">
            Oops! The product with ID <code>{productId}</code> doesn’t exist or might have been removed from the catalog.
          </p>
          <Link to="/" className="btn btn--primary btn--lg">
            <ArrowLeft size={20} strokeWidth={2.5} />
            <span>RETURN TO CATALOG</span>
          </Link>
        </div>
      </div>
    );
  }

  const inCartQty = getCartQuantity(product.id);
  const isOutOfStock = product.quantity === 0;
  const remainingStock = Math.max(0, product.quantity - inCartQty);
  const canAddSelected = selectedQuantity <= remainingStock;
  const currentSubtotal = calculateSubtotal(product.price, selectedQuantity);

  // Parse specifications into individual items if separated by | or ;
  const specItems = product.specifications
    ? product.specifications.split(/[|;]/).map((s) => s.trim()).filter(Boolean)
    : [];

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
    if (isOutOfStock || !canAddSelected) return;
    onAddToCart(product, selectedQuantity);
    setRecentlyAdded(true);
    setTimeout(() => setRecentlyAdded(false), 3000);
  };

  return (
    <div className="product-details-page">
      <div className="container">
        {/* Navigation Breadcrumb */}
        <div className="back-nav-row">
          <Link to="/" className="back-link">
            <ArrowLeft size={18} strokeWidth={2.5} />
            <span>Back to All Goods</span>
          </Link>
          <span className="breadcrumb-slash">/</span>
          <span className="breadcrumb-current">{product.name}</span>
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

            {/* Guarantees Strip */}
            <div className="details-guarantees-grid">
              <div className="guarantee-box">
                <Truck size={22} className="text-cyan" />
                <span className="guarantee-title">FAST DISPATCH</span>
                <span className="guarantee-desc">Dispatched within 24 hours</span>
              </div>
              <div className="guarantee-box">
                <RotateCcw size={22} className="text-pink" />
                <span className="guarantee-title">EASY RETURNS</span>
                <span className="guarantee-desc">7-day worry-free returns</span>
              </div>
            </div>
          </div>

          {/* Right Column: Information & Controls */}
          <div className="details-content-column">
            <div className="details-meta-top">
              <span className="details-category-tag">{product.category}</span>
              <span className="details-id-tag">REF: {product.id}</span>
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
              <span className="details-rating-count">(Verified Quality Score)</span>
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
              {specItems.length > 0 ? (
                <ul className="details-spec-list">
                  {specItems.map((spec, idx) => (
                    <li key={idx} className="details-spec-item">
                      <span className="spec-bullet">✦</span>
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="details-specifications-box">
                  <p>{product.specifications}</p>
                </div>
              )}
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
                  disabled={isOutOfStock || !canAddSelected}
                  className="btn btn--primary btn--lg add-to-cart-big-btn"
                >
                  <ShoppingBag size={22} strokeWidth={2.5} />
                  <span>
                    {isOutOfStock
                      ? 'OUT OF STOCK'
                      : !canAddSelected
                      ? 'STOCK LIMIT REACHED'
                      : `ADD TO CART • ${formatPeso(currentSubtotal)}`}
                  </span>
                </button>
              </div>

              {recentlyAdded && (
                <div className="added-success-alert">
                  <CheckCircle2 size={18} className="text-green" />
                  <span>Item added to your shopping cart!</span>
                  <Link to="/cart" className="view-cart-link">View Cart & Checkout →</Link>
                </div>
              )}

              {inCartQty > 0 && !recentlyAdded && (
                <div className="details-in-cart-note">
                  <AlertCircle size={16} />
                  <span>
                    You already have <strong>{inCartQty}</strong> in your cart. (Max total stock: {product.quantity})
                  </span>
                </div>
              )}
            </div>

            <div className="details-perks-row">
              <div className="perk-item">
                <ShieldCheck size={18} className="text-green" />
                <span>100% Genuine Product</span>
              </div>
              <div className="perk-item">
                <Zap size={18} className="text-cyan" />
                <span>Instant Stock Calculation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
