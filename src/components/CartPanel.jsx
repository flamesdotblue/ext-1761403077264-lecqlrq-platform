import { useState } from 'react';
import { X } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { checkout } from '../lib/api';

export default function CartPanel({ open, onClose }) {
  const { cart, removeFromCart, updateQuantity, clearCart, user, setIsAuthOpen } = useShop();
  const [loading, setLoading] = useState(false);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (!user) {
      setIsAuthOpen(true);
      return;
    }
    setLoading(true);
    try {
      const res = await checkout({
        items: cart.map((c) => ({ id: c.id, quantity: c.quantity })),
      });
      if (res?.status === 'ok') {
        clearCart();
        alert('Payment successful! Order placed.');
        onClose?.();
      } else {
        alert('Checkout initialized. In a real app, redirect to payment.');
      }
    } catch (e) {
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`} aria-hidden={!open}>
      <div className={`absolute inset-0 bg-black/30 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`} onClick={onClose} />
      <aside className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl border-l border-neutral-200 transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="h-16 px-4 border-b border-neutral-200 flex items-center justify-between">
          <h3 className="font-semibold">Your Cart</h3>
          <button onClick={onClose} className="p-2 rounded-md hover:bg-neutral-100"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-4 h-[calc(100%-8rem)] overflow-y-auto">
          {cart.length === 0 ? (
            <div className="text-center text-neutral-600 py-10">Your cart is empty.</div>
          ) : (
            <ul className="space-y-4">
              {cart.map((item) => (
                <li key={item.id} className="flex gap-3">
                  <img src={item.image} alt={item.name} className="h-20 w-24 object-cover rounded-md border" />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-neutral-600">${item.price.toFixed(2)}</p>
                      </div>
                      <button className="text-sm text-rose-600 hover:underline" onClick={() => removeFromCart(item.id)}>Remove</button>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} className="h-8 w-8 rounded-md border flex items-center justify-center">-</button>
                      <span className="px-3">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="h-8 w-8 rounded-md border flex items-center justify-center">+</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="h-16 px-4 border-t border-neutral-200 flex items-center justify-between">
          <div>
            <p className="text-sm text-neutral-600">Subtotal</p>
            <p className="font-semibold">${total.toFixed(2)}</p>
          </div>
          <button onClick={handleCheckout} disabled={cart.length === 0 || loading} className="px-4 py-2 rounded-md bg-neutral-900 text-white hover:bg-neutral-800 disabled:opacity-50">
            {loading ? 'Processing…' : 'Checkout'}
          </button>
        </div>
      </aside>
    </div>
  );
}
