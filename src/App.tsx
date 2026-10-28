import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { HomePage } from './pages/HomePage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { AddProductPage } from './pages/AddProductPage';
import { CartPage } from './pages/CartPage';
import { Product, CartItem, ProductCategory, ProductFormData, ToastNotification } from './types/product';
import { calculateTotalUnits } from './utils/calculations';
import { INITIAL_PRODUCTS } from './data/initialProducts';

const STORAGE_KEY_PRODUCTS = 'popstock_products_v1';
const STORAGE_KEY_CART = 'popstock_cart_v1';

export default function App() {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PRODUCTS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fallback
    }
    return INITIAL_PRODUCTS;
  });

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CART);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // Fallback
    }
    return [];
  });
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('All Products');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [notifications, setNotifications] = useState<ToastNotification[]>([]);

  // Sync products and cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(products));
    } catch {
      // Ignore write errors
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(cartItems));
    } catch {
      // Ignore write errors
    }
  }, [cartItems]);

  const addNotification = (type: 'success' | 'error' | 'info' | 'warning', message: string) => {
    const newNotif: ToastNotification = {
      id: `toast-${Date.now()}-${Math.random()}`,
      type,
      message
    };
    setNotifications((prev) => [...prev, newNotif]);
  };

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((item) => item.id !== id));
  };

  const totalCartUnits = calculateTotalUnits(cartItems);

  const getCartQuantity = (productId: string) => {
    const item = cartItems.find((ci) => ci.product.id === productId);
    return item ? item.quantity : 0;
  };

  const handleAddToCart = (product: Product, quantityToAdd: number = 1) => {
    if (product.quantity === 0) {
      addNotification('error', `Cannot add ${product.name}: Item is out of stock!`);
      return;
    }

    setCartItems((prevItems) => {
      const existing = prevItems.find((ci) => ci.product.id === product.id);
      const currentQty = existing ? existing.quantity : 0;
      const targetQty = currentQty + quantityToAdd;

      if (targetQty > product.quantity) {
        addNotification(
          'warning',
          `Cannot add more! Only ${product.quantity} units available in stock.`
        );
        return prevItems;
      }

      addNotification(
        'success',
        `Added ${quantityToAdd} × ${product.name} to your shopping cart!`
      );

      if (existing) {
        return prevItems.map((ci) =>
          ci.product.id === product.id
            ? { ...ci, quantity: targetQty }
            : ci
        );
      }
      return [...prevItems, { product, quantity: quantityToAdd }];
    });
  };

  const handleUpdateCartQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }

    setCartItems((prevItems) => {
      return prevItems.map((ci) => {
        if (ci.product.id === productId) {
          if (newQuantity > ci.product.quantity) {
            addNotification(
              'warning',
              `Stock limit reached: only ${ci.product.quantity} available!`
            );
            return ci;
          }
          return { ...ci, quantity: newQuantity };
        }
        return ci;
      });
    });
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => {
      const target = prev.find((ci) => ci.product.id === productId);
      if (target) {
        addNotification('info', `Removed ${target.product.name} from your cart.`);
      }
      return prev.filter((ci) => ci.product.id !== productId);
    });
  };

  const handleClearCart = () => {
    setCartItems([]);
    addNotification('info', 'Shopping cart emptied.');
  };

  const handleAddProduct = (formData: ProductFormData) => {
    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      name: formData.name.trim(),
      category: formData.category,
      description: formData.description.trim(),
      specifications: formData.specifications.trim(),
      rating: parseFloat(String(formData.rating)) || 5.0,
      price: parseFloat(String(formData.price)) || 0,
      quantity: parseInt(String(formData.quantity), 10) || 0,
      featureImage: formData.featureImage.trim(),
      badge: 'NEW',
      createdAt: Date.now()
    };

    setProducts((prev) => [newProduct, ...prev]);
    addNotification('success', `Awesome! "${newProduct.name}" added to catalog.`);
  };

  return (
    <BrowserRouter>
      <div className="app-layout">
        <Header cartCount={totalCartUnits} />

        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  products={products}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  onAddToCart={handleAddToCart}
                  getCartQuantity={getCartQuantity}
                />
              }
            />
            <Route
              path="/products/:productId"
              element={
                <ProductDetailsPage
                  products={products}
                  onAddToCart={handleAddToCart}
                  getCartQuantity={getCartQuantity}
                />
              }
            />
            <Route
              path="/add-product"
              element={<AddProductPage onAddProduct={handleAddProduct} />}
            />
            <Route
              path="/cart"
              element={
                <CartPage
                  cartItems={cartItems}
                  onUpdateQuantity={handleUpdateCartQuantity}
                  onRemoveItem={handleRemoveFromCart}
                  onClearCart={handleClearCart}
                />
              }
            />
          </Routes>
        </main>

        <Footer />
        <Toast notifications={notifications} onDismiss={dismissNotification} />
      </div>
    </BrowserRouter>
  );
}
