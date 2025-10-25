import { ShoppingCart, User } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function Navbar({ onOpenCart, onOpenAuth }) {
  const { cart, user, logout } = useShop();
  const count = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur bg-white/70 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-rose-500 to-pink-500" />
          <span className="font-semibold text-lg">Cake Shop</span>
        </div>
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-neutral-700">Hi, {user.username}</span>
              <button onClick={logout} className="text-sm px-3 py-1.5 rounded-md border border-neutral-300 hover:bg-neutral-100 transition">Log out</button>
            </div>
          ) : (
            <button onClick={onOpenAuth} className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-neutral-300 hover:bg-neutral-100 transition">
              <User className="w-4 h-4" />
              <span className="text-sm">Sign in</span>
            </button>
          )}
          <button onClick={onOpenCart} className="relative inline-flex items-center gap-2 px-3 py-2 rounded-md bg-neutral-900 text-white hover:bg-neutral-800 transition">
            <ShoppingCart className="w-4 h-4" />
            <span className="text-sm">Cart</span>
            {count > 0 && (
              <span className="absolute -top-2 -right-2 text-xs bg-rose-500 text-white rounded-full h-5 w-5 flex items-center justify-center shadow">{count}</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
