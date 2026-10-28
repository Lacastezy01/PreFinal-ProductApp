import React from 'react';
import { Minus, Plus } from 'lucide-react';

export interface QuantityControlProps {
  quantity: number;
  maxStock: number;
  onIncrease: () => void;
  onDecrease: () => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const QuantityControl: React.FC<QuantityControlProps> = ({
  quantity,
  maxStock,
  onIncrease,
  onDecrease,
  disabled = false,
  size = 'md'
}) => {
  const canIncrease = !disabled && quantity < maxStock;
  const canDecrease = !disabled && quantity > 1;

  return (
    <div className={`quantity-control quantity-control--${size}`}>
      <button
        type="button"
        onClick={onDecrease}
        disabled={!canDecrease}
        className="quantity-btn quantity-btn--minus"
        aria-label="Decrease quantity"
      >
        <Minus size={16} strokeWidth={3} />
      </button>
      <span className="quantity-value" aria-live="polite">
        {quantity}
      </span>
      <button
        type="button"
        onClick={onIncrease}
        disabled={!canIncrease}
        className="quantity-btn quantity-btn--plus"
        aria-label="Increase quantity"
      >
        <Plus size={16} strokeWidth={3} />
      </button>
    </div>
  );
};
