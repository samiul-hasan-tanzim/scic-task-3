"use client";

import ProductCard from "./ProductCard";

interface Item {
  _id: string;
  title: string;
  shortDescription?: string;
  fullDescription?: string;
  price: number;
  category?: string;
  rating?: number;
  image?: string;
  images?: string[];
  badge?: string;
}

export default function ProductGrid({ items, loading }: { items: Item[]; loading: boolean }) {
  if (loading) {
    return (
      <section className="mt-8">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <div
              key={n}
              className="h-80 animate-pulse rounded-2xl bg-gray-200 dark:bg-zinc-800"
            />
          ))}
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="mt-8 py-20 text-center text-gray-500">
        No items found.
      </section>
    );
  }

  return (
    <section className="mt-8">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item) => (
          <ProductCard
            key={item._id}
            id={item._id}
            title={item.title}
            description={item.shortDescription || item.fullDescription || ""}
            image={(item.images?.[0] || item.image) || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3"}
            rating={item.rating || 0}
            price={`$${item.price}`}
            badge={item.badge}
          />
        ))}
      </div>
    </section>
  );
}
