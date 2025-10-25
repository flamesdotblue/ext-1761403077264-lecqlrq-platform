import { createContext, useContext, useMemo, useState } from 'react';

const ShopContext = createContext(null);

export function ShopProvider({ children }) {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product) => {
    setCart((prev) => {
      const found = prev.find((i) => i.id === product.id);
      if (found) {
        return prev.map((i) => (i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((i) => i.id !== id));
  const updateQuantity = (id, qty) => setCart((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i)));
  const clearCart = () => setCart([]);
  const logout = () => setUser(null);

  const value = useMemo(
    () => ({
      user,
      setUser,
      products,
      setProducts,
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      logout,
      isAuthOpen,
      setIsAuthOpen,
      isCartOpen,
      setIsCartOpen,
    }),
    [user, products, cart, isAuthOpen, isCartOpen]
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error('useShop must be used within ShopProvider');
  return ctx;
}
