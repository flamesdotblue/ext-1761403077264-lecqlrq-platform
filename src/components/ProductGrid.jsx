import { useShop } from '../context/ShopContext';

function ProductCard({ product, onAdd }) {
  return (
    <div className="group bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-md transition">
      <div className="aspect-[4/3] overflow-hidden bg-neutral-100">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover group-hover:scale-105 transition" />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold text-neutral-900">{product.name}</h3>
          <span className="font-semibold">${product.price.toFixed(2)}</span>
        </div>
        <p className="mt-1 text-sm text-neutral-600 line-clamp-2">{product.description}</p>
        <button onClick={() => onAdd(product)} className="mt-4 w-full px-4 py-2 rounded-md bg-rose-500 text-white hover:bg-rose-600 transition">Add to cart</button>
      </div>
    </div>
  );
}

export default function ProductGrid() {
  const { products, addToCart } = useShop();

  return (
    <div>
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Our cakes</h2>
          <p className="text-neutral-600">Handpicked favorites for every occasion</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onAdd={addToCart} />
        ))}
      </div>
    </div>
  );
}
