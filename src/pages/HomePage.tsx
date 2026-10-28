import React from 'react';
import { Hero } from '../components/Hero';
import { ProductGrid } from '../components/ProductGrid';
import { CategoryFilter } from '../components/CategoryFilter';
import { SearchBar } from '../components/SearchBar';
import { Product, ProductCategory } from '../types/product';
import { formatPeso } from '../utils/currency';
import { calculateCatalogTotalValue, calculateCatalogTotalUnits } from '../utils/calculations';
import { Layers } from 'lucide-react';

export interface HomePageProps {
  products: Product[];
  selectedCategory: ProductCategory;
  setSelectedCategory: (cat: ProductCategory) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onAddToCart: (product: Product) => void;
  getCartQuantity: (id: string) => number;
}

export const HomePage: React.FC<HomePageProps> = ({
  products,
  selectedCategory,
  setSelectedCategory,
  searchTerm,
  setSearchTerm,
  onAddToCart,
  getCartQuantity
}) => {
  // Category counts
  const categoryCounts = React.useMemo(() => {
    const counts: Record<string, number> = { 'All Products': products.length };
    products.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [products]);

  // Filter products by category and search
  const filteredProducts = React.useMemo(() => {
    return products.filter((p) => {
      const matchesCategory =
        selectedCategory === 'All Products' || p.category === selectedCategory;
      const matchesSearch =
        searchTerm.trim() === '' ||
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.specifications.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchTerm]);

  const totalCatalogValue = calculateCatalogTotalValue(products);
  const totalCatalogUnits = calculateCatalogTotalUnits(products);

  return (
    <div className="home-page">
      <Hero />

      <section id="catalog-section" className="catalog-section">
        <div className="container">
          {/* Section Title in Pink Outlined Blob Container */}
          <div className="section-title-wrapper">
            <div className="section-title-bubble">
              <h2 className="section-title-text">PRODUCT CATALOG</h2>
            </div>
            <div className="catalog-summary-pill">
              <Layers size={18} strokeWidth={2.5} />
              <span>
                <strong>{products.length}</strong> items • <strong>{totalCatalogUnits}</strong> stock units • Value:{' '}
                <strong>{formatPeso(totalCatalogValue)}</strong>
              </span>
            </div>
          </div>

          {/* Search Bar */}
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onClear={() => setSearchTerm('')}
            resultCount={filteredProducts.length}
          />

          {/* Category Filter */}
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            categoryCounts={categoryCounts}
          />

          {/* Active Filter Notice */}
          {(selectedCategory !== 'All Products' || searchTerm) && (
            <div className="active-filter-bar">
              <span>
                Showing <strong>{filteredProducts.length}</strong> of {products.length} products
                {selectedCategory !== 'All Products' && ` in "${selectedCategory}"`}
                {searchTerm && ` matching "${searchTerm}"`}
              </span>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('All Products');
                  setSearchTerm('');
                }}
                className="reset-filter-btn"
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* Product Cards Grid */}
          <ProductGrid
            products={filteredProducts}
            onAddToCart={onAddToCart}
            getCartQuantity={getCartQuantity}
          />
        </div>
      </section>
    </div>
  );
};
