import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ProductForm } from '../components/ProductForm';
import { ProductFormData } from '../types/product';
import { ArrowLeft, PlusCircle } from 'lucide-react';

export interface AddProductPageProps {
  onAddProduct: (data: ProductFormData) => void;
}

export const AddProductPage: React.FC<AddProductPageProps> = ({ onAddProduct }) => {
  const navigate = useNavigate();

  const handleFormSubmit = (data: ProductFormData) => {
    onAddProduct(data);
    navigate('/');
  };

  return (
    <div className="add-product-page">
      <div className="container">
        <div className="back-nav-row">
          <Link to="/" className="back-link">
            <ArrowLeft size={18} strokeWidth={2.5} />
            <span>Back to Catalog</span>
          </Link>
        </div>

        <div className="add-product-header">
          <div className="header-blob-title">
            <PlusCircle size={28} strokeWidth={2.5} />
            <h1>NEW PRODUCT INTAKE</h1>
          </div>
          <p className="add-product-desc">
            Complete all 8 required fields below to register a new item into the inventory catalog.
            Calculations and category counts will automatically update!
          </p>
        </div>

        <div className="form-container-card">
          <ProductForm onSubmit={handleFormSubmit} />
        </div>
      </div>
    </div>
  );
};
