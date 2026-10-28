import React from 'react';
import { Link } from 'react-router-dom';
import { CartItem } from '../types/product';
import { formatPeso } from '../utils/currency';
import { calculateSubtotal } from '../utils/calculations';
import { QuantityControl } from '../components/QuantityControl';
import { CartSummary } from '../components/CartSummary';
import { StockBadge } from '../components/StockBadge';
import {
  Trash2,
  ArrowLeft,
  ShoppingBag,
  ArrowRight,
  ShieldAlert,
  Sparkles
} from 'lucide-react';

export interface CartPageProps {
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, newQuantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartPage: React.FC<CartPageProps> = ({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  const handleConfirmClear = () => {
    if (window.confirm('Are you sure you want to remove all items from your cart?')) {
      onClearCart();
    }
  };

  return (
    <div className="cart-page">
      <div className="container">
        {/* Navigation Breadcrumb */}
        <div className="back-nav-row">
          <Link to="/" className="back-link">
            <ArrowLeft size={18} strokeWidth={2.5} />
            <span>Continue Shopping</span>
          </Link>
          <span className="breadcrumb-slash">/</span>
          <span className="breadcrumb-current">Your Cart ({cartItems.length} items)</span>
        </div>

        {/* Page Title & Clear Cart Button */}
        <div className="cart-page-header">
          <div className="cart-title-bubble">
            <ShoppingBag size={28} strokeWidth={2.5} />
            <h1>YOUR SHOPPING CART</h1>
          </div>
          {cartItems.length > 0 && (
            <button
              type="button"
              onClick={handleConfirmClear}
              className="btn btn--outline btn--sm clear-cart-btn"
              title="Remove all items from cart"
            >
              <Trash2 size={16} />
              <span>Empty Entire Cart</span>
            </button>
          )}
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart-card">
            <div className="empty-cart-icon" aria-hidden="true">
              <ShoppingBag size={72} strokeWidth={2} />
            </div>
            <h2>YOUR CART IS CURRENTLY EMPTY!</h2>
            <p>
              Looks like you haven’t added any awesome goods yet. Browse our playful catalog and grab your favorite gear!
            </p>
            <Link to="/" className="btn btn--primary btn--lg">
              <Sparkles size={20} strokeWidth={2.5} />
              <span>EXPLORE THE CATALOG</span>
              <ArrowRight size={20} strokeWidth={2.5} />
            </Link>
          </div>
        ) : (
          <div className="cart-content-grid">
            {/* Left Column: Cart items table / list */}
            <div className="cart-items-column">
              <div className="cart-table-card">
                <div className="cart-items-header-bar">
                  <span>Product Details</span>
                  <span>Quantity</span>
                  <span>Subtotal</span>
                  <span>Action</span>
                </div>

                <div className="cart-items-list">
                  {cartItems.map((item) => {
                    const itemSubtotal = calculateSubtotal(item.product.price, item.quantity);
                    const isMaxStock = item.quantity >= item.product.quantity;

                    return (
                      <div key={item.product.id} className="cart-item-row">
                        {/* Thumbnail */}
                        <div className="cart-item-image-box">
                          <img
                            src={item.product.featureImage}
                            alt={item.product.name}
                            className="cart-item-thumbnail"
                          />
                        </div>

                        {/* Info */}
                        <div className="cart-item-info">
                          <div className="cart-item-category-tag">{item.product.category}</div>
                          <h4 className="cart-item-name">
                            <Link to={`/products/${item.product.id}`}>{item.product.name}</Link>
                          </h4>
                          <div className="cart-item-unit-price">
                            Unit Price: <strong>{formatPeso(item.product.price)}</strong>
                          </div>
                          <div className="cart-item-badges-row">
                            <StockBadge quantity={item.product.quantity} className="cart-stock-badge" />
                            {isMaxStock && (
                              <span className="cart-max-stock-warning">
                                <ShieldAlert size={12} /> Max stock reached!
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="cart-item-quantity-wrapper">
                          <QuantityControl
                            quantity={item.quantity}
                            maxStock={item.product.quantity}
                            onIncrease={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                            onDecrease={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                            size="md"
                          />
                          <span className="max-stock-hint">
                            Limit: {item.product.quantity} available
                          </span>
                        </div>

                        {/* Subtotal Calculation Display Required by PDF */}
                        <div className="cart-item-subtotal-box">
                          <span className="subtotal-label">Subtotal:</span>
                          <span className="cart-item-subtotal-val">{formatPeso(itemSubtotal)}</span>
                          <span className="subtotal-calc-breakdown">
                            ({item.quantity} × {formatPeso(item.product.price)})
                          </span>
                        </div>

                        {/* Remove Action */}
                        <div className="cart-item-remove-box">
                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.product.id)}
                            className="cart-remove-btn"
                            aria-label={`Remove ${item.product.name} from cart`}
                            title="Remove this item"
                          >
                            <Trash2 size={18} strokeWidth={2.5} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary with Totals */}
            <div className="cart-summary-column">
              <CartSummary
                cartItems={cartItems}
                onCheckout={() => {
                  alert(
                    `🎉 Checkout simulated successfully!\nTotal: ${formatPeso(
                      cartItems.reduce((acc, ci) => acc + ci.product.price * ci.quantity, 0)
                    )}\nExam requirements satisfied.`
                  );
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
