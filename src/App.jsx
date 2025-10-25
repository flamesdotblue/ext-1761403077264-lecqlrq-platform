import { useEffect } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import CartPanel from './components/CartPanel';
import AuthModal from './components/AuthModal';

function AppShell() {
  const { setProducts, isAuthOpen, setIsAuthOpen, isCartOpen, setIsCartOpen } = useShop();

  useEffect(() => {
    // Seed products (could be replaced by API call)
    setProducts([
      {
        id: 1,
        name: 'Velvet Berry Cake',
        price: 29.99,
        description: 'Moist red velvet layers with fresh berry compote and cream cheese frosting.',
        image: 'https://images.unsplash.com/photo-1614704082846-69e028d3f2f8?q=80&w=1400&auto=format&fit=crop',
      },
      {
        id: 2,
        name: 'Classic Chocolate',
        price: 24.5,
        description: 'Rich cocoa sponge with dark chocolate ganache and shaved curls.',
        image: 'https://images.unsplash.com/photo-1734772307171-fa1ee9640c95?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxDbGFzc2ljJTIwQ2hvY29sYXRlfGVufDB8MHx8fDE3NjEzODAxMTJ8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
      },
      {
        id: 3,
        name: 'Lemon Meringue Torte',
        price: 27.0,
        description: 'Zesty lemon curd, soft sponge, and toasted meringue peaks.',
        image: 'https://images.unsplash.com/photo-1615478440017-3a041d5dc9c6?q=80&w=1400&auto=format&fit=crop',
      },
      {
        id: 4,
        name: 'Strawberry Shortcake',
        price: 22.75,
        description: 'Vanilla sponge, fresh strawberries, and chantilly cream.',
        image: 'https://images.unsplash.com/photo-1578775887804-699de7086ff9?q=80&w=1400&auto=format&fit=crop',
      },
    ]);
  }, [setProducts]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-rose-50/40 to-white text-neutral-900">
      <Navbar onOpenCart={() => setIsCartOpen(true)} onOpenAuth={() => setIsAuthOpen(true)} />
      <main className="relative">
        <Hero onShopNow={() => {
          const el = document.getElementById('products');
          el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }} />
        <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <ProductGrid />
        </section>
      </main>
      <CartPanel open={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <AuthModal open={isAuthOpen} onOpenChange={setIsAuthOpen} />
    </div>
  );
}

export default function App() {
  return (
    <ShopProvider>
      <AppShell />
    </ShopProvider>
  );
}
