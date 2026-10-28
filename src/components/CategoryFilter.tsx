import React from 'react';
import { ProductCategory, CATEGORIES } from '../types/product';
import { Sparkles, Cpu, Shirt, Coffee, Trophy, BookOpen } from 'lucide-react';

export interface CategoryFilterProps {
  selectedCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  categoryCounts: Record<string, number>;
}

const CATEGORY_ICONS: Record<ProductCategory, React.ReactNode> = {
  'All Products': <Sparkles size={16} strokeWidth={2.5} />,
  'Electronics': <Cpu size={16} strokeWidth={2.5} />,
  'Fashion': <Shirt size={16} strokeWidth={2.5} />,
  'Home & Living': <Coffee size={16} strokeWidth={2.5} />,
  'Collectibles': <Trophy size={16} strokeWidth={2.5} />,
  'Stationery': <BookOpen size={16} strokeWidth={2.5} />
};

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  categoryCounts
}) => {
  return (
    <nav className="category-filter-wrapper" aria-label="Catalog Categories">
      <div className="category-filter-list" role="tablist">
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
              <span className="category-icon" aria-hidden="true">{CATEGORY_ICONS[cat]}</span>
              <span className="category-label">{cat}</span>
              <span className="category-pill-count">{count}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
