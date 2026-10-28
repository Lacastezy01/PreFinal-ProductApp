import React, { useMemo } from 'react';
import { CartItem } from '../types/product';
import { formatPeso } from '../utils/currency';
import {
  calculateCartTotal,
  calculateTotalUnits,
  calculateDistinctItemsCount
} from '../utils/calculations';
import { ShoppingCart, CheckCircle, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface CartSummaryProps {
  cartItems: CartItem[];
  onCheckout?: () => void;
}

export const CartSummary: React.FC<CartSummaryProps> = ({ cartItems, onCheckout }) => {
  // Use useMemo for optimal reactive derivation of totals
  const distinctItems = useMemo(() => calculateDistinctItemsCount(cartItems), [cartItems]);
  const totalUnits = useMemo(() => calculateTotalUnits(cartItems), [cartItems]);
  const overallTotal = useMemo(() => calculateCartTotal(cartItems), [cartItems]);

  return (
    <div className="cart-summary-box">
      <div className="cart-summary-header">
        <ShoppingCart size={22} strokeWidth={2.5} />
        <h3 className="summary-title">ORDER SUMMARY</h3>
      </div>

      <div className="summary-breakdown">
        <div className="summary-row">
          <span className="summary-label">Distinct Products:</span>
          <span className="summary-value">{distinctItems} item{distinctItems === 1 ? '' : 's'}</span>
        </div>
        <div className="summary-row">
          <span className="summary-label">Total Selected Units:</span>
          <span className="summary-value">{totalUnits} unit{totalUnits === 1 ? '' : 's'}</span>
        </div>
        <div className="summary-row">
          <span className="summary-label">Subtotal of Items:</span>
          <span className="summary-value">{formatPeso(overallTotal)}</span>
        </div>
        <div className="summary-row summary-row--shipping">
          <span className="summary-label">Standard Shipping:</span>
          <span className="summary-value text-green">FREE (Exam Promo)</span>
        </div>

        <div className="summary-coupon-badge">
          <Tag size={14} />
          <span>CCDI-PREFINAL-PROMO APPLIED</span>
        </div>

        <div className="summary-divider" />

        <div className="summary-row summary-row--total">
          <div className="summary-total-heading">
            <span className="summary-total-label">OVERALL TOTAL:</span>
            <span className="summary-total-subtext">All Philippine Peso taxes included</span>
          </div>
          <span className="summary-total-amount">{formatPeso(overallTotal)}</span>
        </div>
      </div>

      <div className="cart-summary-actions">
        {onCheckout ? (
          <button
            type="button"
            onClick={onCheckout}
            disabled={cartItems.length === 0}
            className="btn btn--primary btn--full btn--lg"
          >
            <CheckCircle size={20} strokeWidth={2.5} />
            <span>CONFIRM & CHECKOUT</span>
          </button>
        ) : (
          <Link
            to="/cart"
            className="btn btn--primary btn--full btn--lg"
          >
            <span>REVIEW IN CART</span>
            <ArrowRight size={20} strokeWidth={2.5} />
          </Link>
        )}
      </div>

      <div className="summary-trust-badge">
        <ShieldCheck size={16} className="text-green" />
        <span>Calculated via React Hooks & JavaScript .reduce()</span>
      </div>
    </div>
  );
};
