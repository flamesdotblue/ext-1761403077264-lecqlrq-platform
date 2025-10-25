import { useState } from 'react';
import { X } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { login as apiLogin, register as apiRegister } from '../lib/api';

export default function AuthModal({ open, onOpenChange }) {
  const { setUser } = useShop();
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const switchMode = () => setMode((m) => (m === 'login' ? 'register' : 'login'));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === 'register') {
        const res = await apiRegister(form);
        if (res?.token) setUser({ username: form.username, token: res.token });
      } else {
        const res = await apiLogin({ email: form.email, password: form.password });
        if (res?.token) setUser({ username: res.username || 'User', token: res.token });
      }
      onOpenChange(false);
    } catch (err) {
      alert('Authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`} aria-hidden={!open}>
      <div className={`absolute inset-0 bg-black/30 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`} onClick={() => onOpenChange(false)} />
      <div className={`absolute inset-0 flex items-center justify-center p-4 transition ${open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
        <div className="w-full max-w-md bg-white rounded-xl border border-neutral-200 shadow-xl">
          <div className="h-14 px-4 border-b border-neutral-200 flex items-center justify-between">
            <h3 className="font-semibold">{mode === 'login' ? 'Sign in' : 'Create account'}</h3>
            <button onClick={() => onOpenChange(false)} className="p-2 rounded-md hover:bg-neutral-100"><X className="w-5 h-5" /></button>
          </div>
          <form onSubmit={handleSubmit} className="p-4 space-y-3">
            {mode === 'register' && (
              <div>
                <label className="block text-sm mb-1">Username</label>
                <input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required className="w-full border rounded-md px-3 py-2" placeholder="Your name" />
              </div>
            )}
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required className="w-full border rounded-md px-3 py-2" placeholder="you@example.com" />
            </div>
            <div>
              <label className="block text-sm mb-1">Password</label>
              <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required className="w-full border rounded-md px-3 py-2" placeholder="••••••••" />
            </div>
            <button disabled={loading} className="w-full mt-2 px-4 py-2 rounded-md bg-neutral-900 text-white hover:bg-neutral-800 disabled:opacity-50">
              {loading ? 'Please wait…' : mode === 'login' ? 'Sign in' : 'Create account'}
            </button>
            <p className="text-sm text-neutral-600 text-center">
              {mode === 'login' ? (
                <>No account? <button type="button" className="text-rose-600 hover:underline" onClick={switchMode}>Create one</button></>
              ) : (
                <>Have an account? <button type="button" className="text-rose-600 hover:underline" onClick={switchMode}>Sign in</button></>
              )}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
