import React from 'react';
import { ProductCategory, CATEGORIES } from '../types/product';

export interface CategoryFilterProps {
  selectedCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  categoryCounts: Record<string, number>;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  categoryCounts
}) => {
  return (
    <div className="category-filter-wrapper">
      <div className="category-filter-list" role="tablist" aria-label="Product categories">
        {CATEGORIES.map((cat) => {
          const count = categoryCounts[cat] ?? 0;
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              role="tab"
              aria-selected={isSelected}
              onClick={() => onSelectCategory(cat)}
              className={`category-pill-btn ${isSelected ? 'category-pill-btn--active' : ''}`}
            >
              <span>{cat}</span>
              <span className="category-pill-count">{count}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
