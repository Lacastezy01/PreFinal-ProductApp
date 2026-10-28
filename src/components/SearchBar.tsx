import React from 'react';
import { Search, X } from 'lucide-react';

export interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onClear: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  onClear
}) => {
  return (
    <div className="search-bar-container">
      <div className="search-input-wrapper">
        <Search size={20} strokeWidth={2.5} className="search-icon" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search products by name, keyword, or specs..."
          className="search-input"
          aria-label="Search products"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={onClear}
            className="search-clear-btn"
            aria-label="Clear search input"
          >
            <X size={18} strokeWidth={3} />
          </button>
        )}
      </div>
    </div>
  );
};
