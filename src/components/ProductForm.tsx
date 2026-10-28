import React, { useState } from 'react';
import { ProductFormData, ValidationErrors, ProductCategory, CATEGORIES } from '../types/product';
import { validateProductForm } from '../utils/validation';
import { Image, Tag, FileText, AlertCircle, PlusCircle } from 'lucide-react';

export interface ProductFormProps {
  onSubmit: (data: ProductFormData) => void;
  initialValues?: Partial<ProductFormData>;
}

const SAMPLE_PRESET_IMAGES = [
  { label: 'Retro Camera', url: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&auto=format&fit=crop&q=80' },
  { label: 'Wireless Headphones', url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80' },
  { label: 'Designer Backpack', url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80' },
  { label: 'Mechanical Keyboard', url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80' }
];

export const ProductForm: React.FC<ProductFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    category: 'Electronics',
    description: '',
    specifications: '',
    rating: '4.8',
    price: '',
    quantity: '10',
    featureImage: ''
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [previewError, setPreviewError] = useState(false);

  const availableCategories = CATEGORIES.filter(c => c !== 'All Products') as Exclude<ProductCategory, 'All Products'>[];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'featureImage') setPreviewError(false);
    if (errors[name as keyof ValidationErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleApplyPreset = (url: string) => {
    setFormData(prev => ({ ...prev, featureImage: url }));
    setPreviewError(false);
    if (errors.featureImage) {
      setErrors(prev => ({ ...prev, featureImage: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateProductForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="product-form-box" noValidate>
      <div className="form-header-badge">
        <Tag size={20} />
        <span>ENTER PRODUCT DETAILS</span>
      </div>

      <div className="form-grid">
        {/* 1. Feature Image Field */}
        <div className="form-group full-width">
          <label htmlFor="featureImage" className="form-label">
            1. Feature Image URL <span className="req">*</span>
          </label>
          <div className="input-with-icon">
            <Image size={18} className="input-icon" />
            <input
              type="url"
              id="featureImage"
              name="featureImage"
              value={formData.featureImage}
              onChange={handleChange}
              placeholder="https://example.com/product-image.jpg"
              className={`form-input ${errors.featureImage ? 'form-input--error' : ''}`}
            />
          </div>
          {errors.featureImage && (
            <span className="field-error-msg"><AlertCircle size={14} /> {errors.featureImage}</span>
          )}

          {/* Quick presets */}
          <div className="preset-images-row">
            <span className="preset-label">Quick sample images:</span>
            {SAMPLE_PRESET_IMAGES.map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => handleApplyPreset(preset.url)}
                className="preset-btn"
              >
                {preset.label}
              </button>
            ))}
          </div>

          {/* Image Preview Box */}
          {formData.featureImage && !errors.featureImage && (
            <div className="form-image-preview-frame">
              {previewError ? (
                <div className="preview-error">
                  <AlertCircle size={20} />
                  <span>Could not load image from this URL. Please verify the link.</span>
                </div>
              ) : (
                <img
                  src={formData.featureImage}
                  alt="Product preview"
                  onError={() => setPreviewError(true)}
                  className="form-image-preview"
                />
              )}
            </div>
          )}
        </div>

        {/* 2. Product Name */}
        <div className="form-group full-width">
          <label htmlFor="name" className="form-label">
            2. Product Name <span className="req">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Cyberpunk Mechanical Keyboard v2"
            className={`form-input ${errors.name ? 'form-input--error' : ''}`}
          />
          {errors.name && (
            <span className="field-error-msg"><AlertCircle size={14} /> {errors.name}</span>
          )}
        </div>

        {/* 3. Product Category */}
        <div className="form-group half-width">
          <label htmlFor="category" className="form-label">
            3. Product Category <span className="req">*</span>
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`form-select ${errors.category ? 'form-input--error' : ''}`}
          >
            {availableCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && (
            <span className="field-error-msg"><AlertCircle size={14} /> {errors.category}</span>
          )}
        </div>

        {/* 6. Rating (1.0 to 5.0) */}
        <div className="form-group half-width">
          <label htmlFor="rating" className="form-label">
            6. Rating (1.0 – 5.0) <span className="req">*</span>
          </label>
          <input
            type="number"
            step="0.1"
            min="1.0"
            max="5.0"
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            placeholder="4.5"
            className={`form-input ${errors.rating ? 'form-input--error' : ''}`}
          />
          {errors.rating && (
            <span className="field-error-msg"><AlertCircle size={14} /> {errors.rating}</span>
          )}
        </div>

        {/* 7. Price */}
        <div className="form-group half-width">
          <label htmlFor="price" className="form-label">
            7. Price (PHP ₱) <span className="req">*</span>
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="1499.00"
            className={`form-input ${errors.price ? 'form-input--error' : ''}`}
          />
          {errors.price && (
            <span className="field-error-msg"><AlertCircle size={14} /> {errors.price}</span>
          )}
        </div>

        {/* 8. Quantity */}
        <div className="form-group half-width">
          <label htmlFor="quantity" className="form-label">
            8. Initial Stock Quantity <span className="req">*</span>
          </label>
          <input
            type="number"
            step="1"
            min="0"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="12"
            className={`form-input ${errors.quantity ? 'form-input--error' : ''}`}
          />
          {errors.quantity && (
            <span className="field-error-msg"><AlertCircle size={14} /> {errors.quantity}</span>
          )}
        </div>

        {/* 4. Description */}
        <div className="form-group full-width">
          <label htmlFor="description" className="form-label">
            4. Description <span className="req">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            placeholder="Provide a vivid, playful overview of what makes this product special..."
            className={`form-textarea ${errors.description ? 'form-input--error' : ''}`}
          />
          {errors.description && (
            <span className="field-error-msg"><AlertCircle size={14} /> {errors.description}</span>
          )}
        </div>

        {/* 5. Product Specification */}
        <div className="form-group full-width">
          <label htmlFor="specifications" className="form-label">
            5. Product Specification <span className="req">*</span>
          </label>
          <div className="input-with-icon">
            <FileText size={18} className="input-icon" />
            <textarea
              id="specifications"
              name="specifications"
              rows={2}
              value={formData.specifications}
              onChange={handleChange}
              placeholder="e.g. Dimensions: 320x120mm; Switch: Hot-swappable Yellow; Connectivity: Bluetooth 5.2"
              className={`form-textarea ${errors.specifications ? 'form-input--error' : ''}`}
            />
          </div>
          {errors.specifications && (
            <span className="field-error-msg"><AlertCircle size={14} /> {errors.specifications}</span>
          )}
        </div>
      </div>

      <div className="form-submit-row">
        <button type="submit" className="btn btn--primary btn--lg">
          <PlusCircle size={22} strokeWidth={2.5} />
          <span>ADD PRODUCT TO CATALOG</span>
        </button>
      </div>
    </form>
  );
};
