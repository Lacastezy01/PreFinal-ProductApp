import React from 'react';
import { Search, X } from 'lucide-react';

export interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onClear: () => void;
  resultCount?: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  onClear,
  resultCount
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      onClear();
    }
  };

  return (
    <div className="search-bar-container">
      <div className="search-input-wrapper">
        <Search size={20} strokeWidth={2.5} className="search-icon" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search products by title, keyword, or specs... (Press Esc to clear)"
          className="search-input"
          aria-label="Search goods catalog"
        />
        {searchTerm && (
          <div className="search-addon-group">
            {typeof resultCount === 'number' && (
              <span className="search-result-pill">
                {resultCount} found
              </span>
            )}
            <button
              type="button"
              onClick={onClear}
              className="search-clear-btn"
              aria-label="Clear search input"
              title="Clear search"
            >
              <X size={18} strokeWidth={3} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
