import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, PackagePlus, LayoutGrid } from 'lucide-react';

export interface HeaderProps {
  cartCount: number;
}

export const Header: React.FC<HeaderProps> = ({ cartCount }) => {
  const location = useLocation();

  return (
    <header className="app-header">
      <div className="header-inner container">
        <Link to="/" className="brand-logo" aria-label="Popstock Home">
          {/* Hand-drawn style dog badge inspired by Al Murphy's top left dog logo */}
          <span className="brand-dog-icon">
            <svg width="34" height="26" viewBox="0 0 50 38" fill="none">
              <path
                d="M8 22 C6 14, 14 6, 22 8 C26 2, 34 2, 38 7 C43 6, 48 10, 47 16 C46 22, 40 26, 35 25 L35 34 L30 34 L30 26 L20 26 L20 34 L15 34 L15 25 C10 26, 8 24, 8 22 Z"
                fill="#FFF16A"
                stroke="#111111"
                strokeWidth="4"
                strokeLinejoin="round"
              />
              <circle cx="36" cy="11" r="2.5" fill="#111111" />
              <path d="M4 14 Q2 10 7 11" stroke="#111111" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </span>
          <span className="brand-title">POPSTOCK</span>
        </Link>

        <nav className="header-nav">
          <Link
            to="/"
            className={`nav-link ${location.pathname === '/' ? 'nav-link--active' : ''}`}
          >
            <LayoutGrid size={18} strokeWidth={2.5} />
            <span>Catalog</span>
          </Link>
          <Link
            to="/add-product"
            className={`nav-link ${location.pathname === '/add-product' ? 'nav-link--active' : ''}`}
          >
            <PackagePlus size={18} strokeWidth={2.5} />
            <span>Add Product</span>
          </Link>
          <Link
            to="/cart"
            className={`nav-link nav-link--cart ${location.pathname === '/cart' ? 'nav-link--active' : ''}`}
          >
            <ShoppingBag size={18} strokeWidth={2.5} />
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="cart-badge-count">{cartCount}</span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};
