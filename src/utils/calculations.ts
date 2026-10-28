import { CartItem, Product } from '../types/product';

/**
 * Computes individual subtotal for a product or cart item:
 * subtotal = price * quantity
 */
export function calculateSubtotal(price: number, quantity: number): number {
  if (price < 0 || quantity < 0) return 0;
  return price * quantity;
}

/**
 * Computes the total number of distinct items in cart.
 */
export function calculateDistinctItemsCount(cartItems: CartItem[]): number {
  return cartItems.length;
}

/**
 * Computes total number of individual product units across all cart items.
 */
export function calculateTotalUnits(cartItems: CartItem[]): number {
  return cartItems.reduce((total, item) => total + item.quantity, 0);
}

/**
 * Computes overall cart total by summing all item subtotals:
 * overallTotal = sum of all (price * quantity)
 */
export function calculateCartTotal(cartItems: CartItem[]): number {
  return cartItems.reduce((total, item) => {
    return total + calculateSubtotal(item.product.price, item.quantity);
  }, 0);
}

/**
 * Computes total catalog inventory value:
 * sum of (product.price * product.quantity) for all catalog products.
 */
export function calculateCatalogTotalValue(products: Product[]): number {
  return products.reduce((total, product) => {
    return total + calculateSubtotal(product.price, product.quantity);
  }, 0);
}

/**
 * Computes total inventory units in catalog.
 */
export function calculateCatalogTotalUnits(products: Product[]): number {
  return products.reduce((total, product) => total + product.quantity, 0);
}
