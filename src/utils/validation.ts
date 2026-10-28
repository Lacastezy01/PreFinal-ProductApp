import { ProductFormData, ValidationErrors } from '../types/product';

/**
 * Validates the 8 mandatory fields for adding a new product.
 * Returns an object containing error messages for invalid fields.
 */
export function validateProductForm(data: ProductFormData): ValidationErrors {
  const errors: ValidationErrors = {};

  // 1. Feature Image URL
  const trimmedImage = data.featureImage ? String(data.featureImage).trim() : '';
  if (!trimmedImage) {
    errors.featureImage = 'Feature image URL is required';
  } else if (!/^(\/|https?:\/\/).+/i.test(trimmedImage)) {
    errors.featureImage = 'Image URL must begin with http://, https://, or /';
  }

  // 2. Product Name
  const trimmedName = data.name ? String(data.name).trim() : '';
  if (!trimmedName) {
    errors.name = 'Product name is required and cannot be whitespace only';
  } else if (trimmedName.length < 2) {
    errors.name = 'Product name must be at least 2 characters';
  }

  // 3. Category
  if (!data.category) {
    errors.category = 'Product category is required';
  }

  // 4. Description
  const trimmedDesc = data.description ? String(data.description).trim() : '';
  if (!trimmedDesc) {
    errors.description = 'Description is required and cannot be whitespace only';
  } else if (trimmedDesc.length < 10) {
    errors.description = 'Description should be at least 10 characters';
  }

  // 5. Product Specification
  const trimmedSpec = data.specifications ? String(data.specifications).trim() : '';
  if (!trimmedSpec) {
    errors.specifications = 'Product specifications are required';
  }

  // 6. Rating (1.0 to 5.0)
  const ratingNum = typeof data.rating === 'number' ? data.rating : parseFloat(String(data.rating));
  if (data.rating === '' || isNaN(ratingNum)) {
    errors.rating = 'Rating is required';
  } else if (ratingNum < 1 || ratingNum > 5) {
    errors.rating = 'Rating must be between 1.0 and 5.0';
  }

  // 7. Price
  const priceNum = typeof data.price === 'number' ? data.price : parseFloat(String(data.price));
  if (data.price === '' || isNaN(priceNum)) {
    errors.price = 'Price is required';
  } else if (priceNum < 0) {
    errors.price = 'Price cannot be negative';
  }

  // 8. Quantity
  const qtyNum = typeof data.quantity === 'number' ? data.quantity : parseFloat(String(data.quantity));
  if (data.quantity === '' || isNaN(qtyNum)) {
    errors.quantity = 'Quantity is required';
  } else if (qtyNum < 0) {
    errors.quantity = 'Quantity cannot be negative';
  } else if (!Number.isInteger(qtyNum)) {
    errors.quantity = 'Quantity must be a whole integer';
  }

  return errors;
}
