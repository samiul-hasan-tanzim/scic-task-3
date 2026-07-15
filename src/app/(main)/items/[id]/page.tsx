"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Star, Tag, DollarSign, Clock, BarChart3 } from "lucide-react";
import ProductCard from "@/components/explore/ProductCard";

interface Item {
  _id: string;
  title: string;
  shortDescription?: string;
  fullDescription?: string;
  price: number;
  category?: string;
  rating?: number;
  image?: string;
  tags?: string[];
  createdAt?: string;
}

export default function ItemDetails() {
  const { id } = useParams();
  const [item, setItem] = useState<Item | null>(null);
  const [related, setRelated] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/items/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setItem(data);
        setLoading(false);
        if (data.category) {
          fetch("/api/items")
            .then((r) => r.json())
            .then((all: Item[]) => {
              setRelated(
                all.filter((i) => i.category === data.category && i._id !== data._id).slice(0, 4)
              );
            });
        }
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl py-10">
        <div className="mb-8 h-5 w-40 animate-pulse rounded bg-gray-200 dark:bg-zinc-800" />
        <div className="space-y-6">
          <div className="h-72 w-full animate-pulse rounded-2xl bg-gray-200 dark:bg-zinc-800" />
          <div className="h-8 w-2/3 animate-pulse rounded bg-gray-200 dark:bg-zinc-800" />
          <div className="h-4 w-1/3 animate-pulse rounded bg-gray-200 dark:bg-zinc-800" />
          <div className="space-y-2">
            <div className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-zinc-800" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200 dark:bg-zinc-800" />
            <div className="h-4 w-4/6 animate-pulse rounded bg-gray-200 dark:bg-zinc-800" />
          </div>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="flex flex-col items-center justify-center py-32">
        <p className="text-gray-500">Item not found</p>
        <Link
          href="/explore"
          className="mt-4 text-cyan-500 hover:underline"
        >
          Back to explore
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl py-10">
      <Link
        href="/explore"
        className="mb-8 flex items-center gap-2 text-sm text-gray-500 hover:text-cyan-500"
      >
        <ArrowLeft size={18} />
        Back to explore
      </Link>

      {/* Main card */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        {item.image && (
          <div className="relative h-72 w-full">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="space-y-8 p-8">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold">{item.title}</h1>
              {item.category && (
                <span className="mt-2 inline-block rounded-full bg-cyan-100 px-3 py-1 text-xs font-medium text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400">
                  {item.category}
                </span>
              )}
            </div>

            <div className="text-right">
              <p className="text-3xl font-bold text-cyan-500">${item.price}</p>
              {item.rating && (
                <div className="mt-1 flex items-center gap-1 text-sm">
                  <Star size={16} fill="currentColor" className="text-yellow-500" />
                  <span className="font-medium">{item.rating}</span>
                </div>
              )}
            </div>
          </div>

          {/* Tags */}
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-gray-200 px-3 py-1 text-xs font-medium dark:border-zinc-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Description / Overview */}
          <div>
            <h2 className="mb-3 text-xl font-semibold">Overview</h2>
            {item.shortDescription && (
              <p className="text-lg text-gray-600 dark:text-gray-400">
                {item.shortDescription}
              </p>
            )}
            {item.fullDescription && (
              <div className="prose prose-gray mt-4 max-w-none dark:prose-invert">
                <p>{item.fullDescription}</p>
              </div>
            )}
          </div>

          {/* Key Information / Specifications */}
          <div>
            <h2 className="mb-4 text-xl font-semibold">Specifications</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {item.category && (
                <div className="flex items-center gap-3 rounded-xl border border-gray-200 p-4 dark:border-zinc-800">
                  <Tag size={20} className="text-cyan-500" />
                  <div>
                    <p className="text-xs text-gray-500">Category</p>
                    <p className="font-medium">{item.category}</p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3 rounded-xl border border-gray-200 p-4 dark:border-zinc-800">
                <DollarSign size={20} className="text-cyan-500" />
                <div>
                  <p className="text-xs text-gray-500">Price</p>
                  <p className="font-medium">${item.price}</p>
                </div>
              </div>
              {item.rating && (
                <div className="flex items-center gap-3 rounded-xl border border-gray-200 p-4 dark:border-zinc-800">
                  <Star size={20} className="text-yellow-500" />
                  <div>
                    <p className="text-xs text-gray-500">Rating</p>
                    <p className="font-medium">{item.rating} / 5</p>
                  </div>
                </div>
              )}
              {item.createdAt && (
                <div className="flex items-center gap-3 rounded-xl border border-gray-200 p-4 dark:border-zinc-800">
                  <Clock size={20} className="text-cyan-500" />
                  <div>
                    <p className="text-xs text-gray-500">Released</p>
                    <p className="font-medium">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              )}
              {item.tags && item.tags.length > 0 && (
                <div className="flex items-center gap-3 rounded-xl border border-gray-200 p-4 dark:border-zinc-800 sm:col-span-2">
                  <BarChart3 size={20} className="text-cyan-500" />
                  <div>
                    <p className="text-xs text-gray-500">Tags</p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium dark:bg-zinc-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Reviews / Ratings */}
          {item.rating && (
            <div>
              <h2 className="mb-4 text-xl font-semibold">Rating</h2>
              <div className="flex items-center gap-4 rounded-xl border border-gray-200 p-6 dark:border-zinc-800">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-yellow-100 text-2xl font-bold text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                  {item.rating}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        fill={i < Math.round(item.rating || 0) ? "currentColor" : "none"}
                        className={i < Math.round(item.rating || 0) ? "text-yellow-500" : "text-gray-300"}
                      />
                    ))}
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    {item.rating} out of 5
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Items */}
      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="mb-6 text-2xl font-bold">Related Items</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r) => (
              <ProductCard
                key={r._id}
                id={r._id}
                title={r.title}
                description={r.shortDescription || r.fullDescription || ""}
                image={r.image || ""}
                rating={r.rating || 0}
                price={`$${r.price}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
