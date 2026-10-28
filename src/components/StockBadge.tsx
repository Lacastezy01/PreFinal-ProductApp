import React from 'react';
import { AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';

export interface StockBadgeProps {
  quantity: number;
  className?: string;
  showIcon?: boolean;
}

export const StockBadge: React.FC<StockBadgeProps> = ({
  quantity,
  className = '',
  showIcon = true
}) => {
  if (quantity === 0) {
    return (
      <span
        className={`stock-badge stock-badge--out ${className}`}
        role="status"
        aria-label="Product is out of stock"
      >
        {showIcon && <XCircle size={14} strokeWidth={2.5} />}
        <span>Out of Stock</span>
      </span>
    );
  }

  if (quantity < 5) {
    return (
      <span
        className={`stock-badge stock-badge--low ${className}`}
        role="status"
        aria-label={`Low stock alert: only ${quantity} units remaining`}
      >
        {showIcon && <AlertTriangle size={14} strokeWidth={2.5} />}
        <span>Low Stock: Only {quantity} left!</span>
      </span>
    );
  }

  return (
    <span
      className={`stock-badge stock-badge--in ${className}`}
      role="status"
      aria-label={`In stock: ${quantity} units available`}
    >
      {showIcon && <CheckCircle2 size={14} strokeWidth={2.5} />}
      <span>In Stock ({quantity})</span>
    </span>
  );
};
