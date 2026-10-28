import React from 'react';
import { CartItem } from '../types/product';
import { formatPeso } from '../utils/currency';
import { calculateCartTotal, calculateTotalUnits, calculateDistinctItemsCount } from '../utils/calculations';
import { ShoppingCart, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface CartSummaryProps {
  cartItems: CartItem[];
  onCheckout?: () => void;
}

export const CartSummary: React.FC<CartSummaryProps> = ({ cartItems, onCheckout }) => {
  const distinctItems = calculateDistinctItemsCount(cartItems);
  const totalUnits = calculateTotalUnits(cartItems);
  const overallTotal = calculateCartTotal(cartItems);

  return (
    <div className="cart-summary-box">
      <div className="cart-summary-header">
        <ShoppingCart size={22} strokeWidth={2.5} />
        <h3 className="summary-title">ORDER SUMMARY</h3>
      </div>

      <div className="summary-breakdown">
        <div className="summary-row">
          <span className="summary-label">Distinct Items:</span>
          <span className="summary-value">{distinctItems} items</span>
        </div>
        <div className="summary-row">
          <span className="summary-label">Total Units:</span>
          <span className="summary-value">{totalUnits} units</span>
        </div>
        <div className="summary-row summary-row--shipping">
          <span className="summary-label">Standard Shipping:</span>
          <span className="summary-value text-green">FREE (Student Exam Promo)</span>
        </div>

        <div className="summary-divider" />

        <div className="summary-row summary-row--total">
          <span className="summary-total-label">OVERALL TOTAL:</span>
          <span className="summary-total-amount">{formatPeso(overallTotal)}</span>
        </div>
      </div>

      <div className="cart-summary-actions">
        {onCheckout ? (
          <button
            type="button"
            onClick={onCheckout}
            disabled={cartItems.length === 0}
            className="btn btn--primary btn--full"
          >
            <CheckCircle size={20} strokeWidth={2.5} />
            <span>CONFIRM & CHECKOUT</span>
          </button>
        ) : (
          <Link
            to="/cart"
            className="btn btn--primary btn--full"
          >
            <span>REVIEW IN CART</span>
            <ArrowRight size={20} strokeWidth={2.5} />
          </Link>
        )}
      </div>
    </div>
  );
};
