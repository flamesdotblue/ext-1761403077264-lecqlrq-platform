import Spline from '@splinetool/react-spline';

export default function Hero({ onShopNow }) {
  return (
    <section className="relative h-[70vh] min-h-[520px] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/IKzHtP5ThSO83edK/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/10 to-white/90 pointer-events-none" />
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-2xl">
          <p className="inline-block px-2.5 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-medium">Freshly baked • Secure checkout</p>
          <h1 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900">Delightful cakes, baked with love and delivered fast</h1>
          <p className="mt-4 text-neutral-700">Browse our curated selection of artisan cakes. Create an account, add to cart, and checkout with secure payment.</p>
          <div className="mt-6 flex gap-3">
            <button onClick={onShopNow} className="px-5 py-2.5 rounded-md bg-neutral-900 text-white hover:bg-neutral-800 transition">Shop now</button>
            <a href="#products" className="px-5 py-2.5 rounded-md border border-neutral-300 hover:bg-neutral-100 transition">Explore cakes</a>
          </div>
        </div>
      </div>
    </section>
  );
}
