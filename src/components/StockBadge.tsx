import React from 'react';

export interface StockBadgeProps {
  quantity: number;
  className?: string;
}

export const StockBadge: React.FC<StockBadgeProps> = ({ quantity, className = '' }) => {
  if (quantity === 0) {
    return (
      <span className={`stock-badge stock-badge--out ${className}`}>
        Out of Stock
      </span>
    );
  }

  if (quantity < 5) {
    return (
      <span className={`stock-badge stock-badge--low ${className}`}>
        ⚠️ Low Stock: Only {quantity} left!
      </span>
    );
  }

  return (
    <span className={`stock-badge stock-badge--in ${className}`}>
      ✓ In Stock ({quantity})
    </span>
  );
};
