"use client";

import { RotateCcw } from "lucide-react";
import { POPULAR_TAGS } from "@/lib/constants";

const categories = [
  "UI Frameworks",
  "Backend APIs",
  "Database Tools",
  "Cloud Services",
];

export default function FilterSidebar({
  selectedCategories,
  priceRange,
  releaseDate,
  selectedTags,
  onCategoriesChange,
  onPriceRangeChange,
  onReleaseDateChange,
  onTagsChange,
  onReset,
  className = "",
}: {
  selectedCategories: string[];
  priceRange: number;
  releaseDate: string;
  selectedTags: string[];
  onCategoriesChange: (v: string[]) => void;
  onPriceRangeChange: (v: number) => void;
  onReleaseDateChange: (v: string) => void;
  onTagsChange: (v: string[]) => void;
  onReset: () => void;
  className?: string;
}) {
  const toggleCategory = (cat: string) => {
    if (selectedCategories.includes(cat)) {
      onCategoriesChange(selectedCategories.filter((c) => c !== cat));
    } else {
      onCategoriesChange([...selectedCategories, cat]);
    }
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter((t) => t !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  return (
    <aside className={`sticky top-20 h-[calc(100vh-6rem)] w-72 shrink-0 overflow-y-auto border-r border-gray-200 pr-6 dark:border-zinc-800 ${className}`}>
      {/* Popular Tags */}
      <div className="mb-10">
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-500">
          Popular Tags
        </h3>

        <div className="flex flex-wrap gap-2">
          {POPULAR_TAGS.map((tag) => {
            const active = selectedTags.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${active
                  ? "border-cyan-500 bg-cyan-500 text-white"
                  : "border-gray-200 hover:border-cyan-500 hover:text-cyan-500 dark:border-zinc-700 dark:hover:border-cyan-500"
                  }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filters */}
      <div className="space-y-8 pb-10">
        {/* Category */}
        <div>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-500">
            Category
          </h3>

          <div className="space-y-3">
            {categories.map((cat) => (
              <label
                key={cat}
                className="flex cursor-pointer items-center gap-3"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                  className="h-4 w-4 rounded"
                />

                <span className="text-sm">{cat}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price */}
        <div>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-500">
            Price Range
          </h3>

          <input
            type="range"
            min="0"
            max="1000"
            value={priceRange}
            onChange={(e) => onPriceRangeChange(Number(e.target.value))}
            className="w-full"
          />

          <div className="mt-2 flex justify-between text-sm text-gray-500">
            <span>$0</span>
            <span>$1000+</span>
          </div>
        </div>

        {/* Reset */}
        <button
          onClick={onReset}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-cyan-500 py-3 text-cyan-500 transition hover:bg-cyan-500 hover:text-white"
        >
          <RotateCcw size={18} />
          Reset Filters
        </button>
      </div>
    </aside>
  );
}
