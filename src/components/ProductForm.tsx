import React, { useState } from 'react';
import { ProductFormData, ValidationErrors, ProductCategory, CATEGORIES } from '../types/product';
import { validateProductForm } from '../utils/validation';
import {
  Image,
  Tag,
  FileText,
  AlertCircle,
  PlusCircle,
  RotateCcw,
  Star
} from 'lucide-react';

export interface ProductFormProps {
  onSubmit: (data: ProductFormData) => void;
  initialValues?: Partial<ProductFormData>;
}

const LOCAL_PRESET_IMAGES = [
  { label: '⌨️ Cyber Keyboard', url: '/images/products/keyboard.svg' },
  { label: '🎧 Neon Headphones', url: '/images/products/headphones.svg' },
  { label: '👟 Canvas High-Tops', url: '/images/products/sneakers.svg' },
  { label: '📷 Retro Camera', url: '/images/products/camera.svg' },
  { label: '☕ Monster Mug', url: '/images/products/mug.svg' },
  { label: '🤖 Glowbot Figure', url: '/images/products/glowbot.svg' },
  { label: '🎒 Urban Backpack', url: '/images/products/backpack.svg' }
];

export const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, initialValues }) => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: initialValues?.name || '',
    category: initialValues?.category || 'Electronics',
    description: initialValues?.description || '',
    specifications: initialValues?.specifications || '',
    rating: initialValues?.rating ?? '4.8',
    price: initialValues?.price ?? '',
    quantity: initialValues?.quantity ?? '10',
    featureImage: initialValues?.featureImage || '/images/products/keyboard.svg'
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [previewError, setPreviewError] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const availableCategories = CATEGORIES.filter((c) => c !== 'All Products') as Exclude<
    ProductCategory,
    'All Products'
  >[];

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const currentErrors = validateProductForm(formData);
    if (currentErrors[field as keyof ValidationErrors]) {
      setErrors((prev) => ({ ...prev, [field]: currentErrors[field as keyof ValidationErrors] }));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'featureImage') {
      setPreviewError(false);
    }
    if (errors[name as keyof ValidationErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleApplyPreset = (url: string) => {
    setFormData((prev) => ({ ...prev, featureImage: url }));
    setPreviewError(false);
    if (errors.featureImage) {
      setErrors((prev) => ({ ...prev, featureImage: undefined }));
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      category: 'Electronics',
      description: '',
      specifications: '',
      rating: '4.8',
      price: '',
      quantity: '10',
      featureImage: ''
    });
    setErrors({});
    setTouched({});
    setPreviewError(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateProductForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Mark all fields as touched
      const allTouched: Record<string, boolean> = {};
      Object.keys(formData).forEach((k) => {
        allTouched[k] = true;
      });
      setTouched(allTouched);
      return;
    }

    onSubmit(formData);
  };

  const currentRatingNum = parseFloat(String(formData.rating)) || 0;

  return (
    <form onSubmit={handleSubmit} className="product-form-box" noValidate>
      <div className="form-header-badge">
        <Tag size={20} />
        <span>ENTER 8 MANDATORY PRODUCT SPECIFICATIONS</span>
      </div>

      <div className="form-grid">
        {/* 1. Feature Image URL */}
        <div className="form-group full-width">
          <label htmlFor="featureImage" className="form-label">
            1. Feature Image URL or Local Asset <span className="req">*</span>
          </label>
          <div className="input-with-icon">
            <Image size={18} className="input-icon" />
            <input
              type="text"
              id="featureImage"
              name="featureImage"
              value={formData.featureImage}
              onChange={handleChange}
              onBlur={() => handleBlur('featureImage')}
              placeholder="/images/products/keyboard.svg or https://..."
              className={`form-input ${errors.featureImage && touched.featureImage ? 'form-input--error' : ''}`}
            />
          </div>
          {errors.featureImage && touched.featureImage && (
            <span className="field-error-msg">
              <AlertCircle size={14} /> {errors.featureImage}
            </span>
          )}

          {/* Quick presets */}
          <div className="preset-images-row">
            <span className="preset-label">Quick sample product images:</span>
            {LOCAL_PRESET_IMAGES.map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => handleApplyPreset(preset.url)}
                className={`preset-btn ${formData.featureImage === preset.url ? 'preset-btn--selected' : ''}`}
              >
                {preset.label}
              </button>
            ))}
          </div>

          {/* Image Preview Box */}
          {formData.featureImage && (
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
            onBlur={() => handleBlur('name')}
            placeholder="e.g. Cyberpunk Mechanical Keyboard v2"
            className={`form-input ${errors.name && touched.name ? 'form-input--error' : ''}`}
          />
          {errors.name && touched.name && (
            <span className="field-error-msg">
              <AlertCircle size={14} /> {errors.name}
            </span>
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
            onBlur={() => handleBlur('category')}
            className={`form-select ${errors.category && touched.category ? 'form-input--error' : ''}`}
          >
            {availableCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && touched.category && (
            <span className="field-error-msg">
              <AlertCircle size={14} /> {errors.category}
            </span>
          )}
        </div>

        {/* 6. Rating (1.0 to 5.0) */}
        <div className="form-group half-width">
          <label htmlFor="rating" className="form-label">
            6. Rating (1.0 – 5.0) <span className="req">*</span>
          </label>
          <div className="rating-input-row">
            <input
              type="number"
              step="0.1"
              min="1.0"
              max="5.0"
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              onBlur={() => handleBlur('rating')}
              placeholder="4.5"
              className={`form-input rating-number-input ${errors.rating && touched.rating ? 'form-input--error' : ''}`}
            />
            <div className="rating-star-preview" aria-hidden="true">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={18}
                  className={star <= Math.round(currentRatingNum) ? 'star-filled' : 'star-empty'}
                  fill={star <= Math.round(currentRatingNum) ? '#FFB83F' : 'none'}
                />
              ))}
            </div>
          </div>
          {errors.rating && touched.rating && (
            <span className="field-error-msg">
              <AlertCircle size={14} /> {errors.rating}
            </span>
          )}
        </div>

        {/* 7. Price */}
        <div className="form-group half-width">
          <label htmlFor="price" className="form-label">
            7. Unit Price (PHP ₱) <span className="req">*</span>
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            onBlur={() => handleBlur('price')}
            placeholder="1499.00"
            className={`form-input ${errors.price && touched.price ? 'form-input--error' : ''}`}
          />
          {errors.price && touched.price && (
            <span className="field-error-msg">
              <AlertCircle size={14} /> {errors.price}
            </span>
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
            onBlur={() => handleBlur('quantity')}
            placeholder="12"
            className={`form-input ${errors.quantity && touched.quantity ? 'form-input--error' : ''}`}
          />
          {errors.quantity && touched.quantity && (
            <span className="field-error-msg">
              <AlertCircle size={14} /> {errors.quantity}
            </span>
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
            onBlur={() => handleBlur('description')}
            placeholder="Provide a vivid, playful overview of what makes this product special..."
            className={`form-textarea ${errors.description && touched.description ? 'form-input--error' : ''}`}
          />
          {errors.description && touched.description && (
            <span className="field-error-msg">
              <AlertCircle size={14} /> {errors.description}
            </span>
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
              onBlur={() => handleBlur('specifications')}
              placeholder="e.g. Dimensions: 320x120mm | Connectivity: Bluetooth 5.2 | Battery: 4000mAh"
              className={`form-textarea ${errors.specifications && touched.specifications ? 'form-input--error' : ''}`}
            />
          </div>
          {errors.specifications && touched.specifications && (
            <span className="field-error-msg">
              <AlertCircle size={14} /> {errors.specifications}
            </span>
          )}
        </div>
      </div>

      <div className="form-submit-row">
        <button
          type="button"
          onClick={handleReset}
          className="btn btn--outline"
        >
          <RotateCcw size={18} />
          <span>Reset Form</span>
        </button>
        <button type="submit" className="btn btn--primary btn--lg">
          <PlusCircle size={22} strokeWidth={2.5} />
          <span>ADD PRODUCT TO CATALOG</span>
        </button>
      </div>
    </form>
  );
};
