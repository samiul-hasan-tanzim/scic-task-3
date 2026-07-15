"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Star } from "lucide-react";

interface ProductCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  rating: number;
  price: string;
  badge?: string;
}

export default function ProductCard({
  id,
  title,
  description,
  image,
  rating,
  price,
  badge,
}: ProductCardProps) {
  return (
    <Link
      href={`/items/${id}`}
      className="group block overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-950"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition duration-500 group-hover:scale-110"
        />

        {badge && (
          <span className="absolute right-4 top-4 rounded-full bg-cyan-500 px-3 py-1 text-xs font-semibold text-white">
            {badge}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold transition group-hover:text-cyan-500">
            {title}
          </h3>

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <Heart
              size={20}
              className="text-gray-400 transition hover:text-red-500"
            />
          </button>
        </div>

        <p className="line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
          {description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star size={16} fill="currentColor" className="text-yellow-500" />
            <span className="text-sm font-medium">{rating}</span>
          </div>

          <span className="font-semibold">{price}</span>
        </div>

        <span className="block rounded-xl bg-cyan-500 py-2 text-center text-sm font-medium text-white">
          View Details
        </span>
      </div>
    </Link>
  );
}
