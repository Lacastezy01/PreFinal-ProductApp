import React from 'react';
import { Link } from 'react-router-dom';
import { CartItem } from '../types/product';
import { formatPeso } from '../utils/currency';
import { calculateSubtotal } from '../utils/calculations';
import { QuantityControl } from '../components/QuantityControl';
import { CartSummary } from '../components/CartSummary';
import { StockBadge } from '../components/StockBadge';
import { Trash2, ArrowLeft, ShoppingBag, ArrowRight } from 'lucide-react';

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
  return (
    <div className="cart-page">
      <div className="container">
        <div className="back-nav-row">
          <Link to="/" className="back-link">
            <ArrowLeft size={18} strokeWidth={2.5} />
            <span>Continue Shopping</span>
          </Link>
        </div>

        <div className="cart-page-header">
          <div className="cart-title-bubble">
            <ShoppingBag size={28} strokeWidth={2.5} />
            <h1>YOUR SHOPPING CART</h1>
          </div>
          {cartItems.length > 0 && (
            <button
              type="button"
              onClick={onClearCart}
              className="btn btn--outline btn--sm clear-cart-btn"
            >
              <Trash2 size={16} />
              <span>Empty Cart</span>
            </button>
          )}
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart-card">
            <div className="empty-cart-icon">
              <ShoppingBag size={72} strokeWidth={2} />
            </div>
            <h2>YOUR CART IS EMPTY!</h2>
            <p>Looks like you haven’t added any awesome items to your bag yet.</p>
            <Link to="/" className="btn btn--primary btn--lg">
              <span>EXPLORE THE CATALOG</span>
              <ArrowRight size={20} strokeWidth={2.5} />
            </Link>
          </div>
        ) : (
          <div className="cart-content-grid">
            {/* Left Column: Cart items table / list */}
            <div className="cart-items-column">
              <div className="cart-table-card">
                <div className="cart-items-list">
                  {cartItems.map((item) => {
                    const itemSubtotal = calculateSubtotal(item.product.price, item.quantity);
                    return (
                      <div key={item.product.id} className="cart-item-row">
                        <div className="cart-item-image-box">
                          <img
                            src={item.product.featureImage}
                            alt={item.product.name}
                            className="cart-item-thumbnail"
                          />
                        </div>

                        <div className="cart-item-info">
                          <div className="cart-item-category-tag">{item.product.category}</div>
                          <h4 className="cart-item-name">
                            <Link to={`/products/${item.product.id}`}>{item.product.name}</Link>
                          </h4>
                          <div className="cart-item-unit-price">
                            Unit Price: <strong>{formatPeso(item.product.price)}</strong>
                          </div>
                          <StockBadge quantity={item.product.quantity} className="cart-stock-badge" />
                        </div>

                        <div className="cart-item-quantity-wrapper">
                          <span className="qty-col-label">Quantity:</span>
                          <QuantityControl
                            quantity={item.quantity}
                            maxStock={item.product.quantity}
                            onIncrease={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                            onDecrease={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                            size="sm"
                          />
                          <span className="max-stock-hint">Max: {item.product.quantity}</span>
                        </div>

                        <div className="cart-item-subtotal-box">
                          <span className="subtotal-label">Subtotal:</span>
                          <span className="cart-item-subtotal-val">{formatPeso(itemSubtotal)}</span>
                        </div>

                        <div className="cart-item-remove-box">
                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.product.id)}
                            className="cart-remove-btn"
                            aria-label={`Remove ${item.product.name} from cart`}
                            title="Remove item"
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

            {/* Right Column: Order Summary */}
            <div className="cart-summary-column">
              <CartSummary
                cartItems={cartItems}
                onCheckout={() => {
                  alert('Thank you! This is a demo for the CCDI Pre-Final Exam.');
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
