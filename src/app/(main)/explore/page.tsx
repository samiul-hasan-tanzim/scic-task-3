"use client";

import { useEffect, useState, useMemo } from "react";
import ExploreHeader from "@/components/explore/ExploreHeader";
import FilterSidebar from "@/components/explore/FilterSidebar";
import ProductGrid from "@/components/explore/ProductGrid";
import Pagination from "@/components/explore/Pagination";
import { SlidersHorizontal, X } from "lucide-react";

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
  createdAt?: string;
  tags?: string[];
}

const PER_PAGE = 8;

const defaultFilters = {
  categories: [] as string[],
  priceRange: 1000,
  releaseDate: "all",
  tags: [] as string[],
};

export default function Explore() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState(defaultFilters);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    fetch("/api/items")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      });
  }, []);

  const filtered = useMemo(() => {
    let result: Item[] = [...items];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (item) =>
          item.title?.toLowerCase().includes(q) ||
          item.shortDescription?.toLowerCase().includes(q) ||
          item.fullDescription?.toLowerCase().includes(q)
      );
    }

    if (filters.tags.length > 0) {
      result = result.filter((item) =>
        filters.tags.some((tag) => (item.tags || []).includes(tag))
      );
    }

    if (filters.categories.length > 0) {
      result = result.filter((item) =>
        filters.categories.includes(item.category || "")
      );
    }

    if (filters.priceRange < 1000) {
      result = result.filter((item) => item.price <= filters.priceRange);
    }

    if (filters.releaseDate !== "all") {
      const days = parseInt(filters.releaseDate);
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - days);
      result = result.filter(
        (item) => new Date(item.createdAt || 0) >= cutoff
      );
    }

    switch (sort) {
      case "oldest":
        result.sort((a, b) => new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime());
        break;
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        result.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
    }

    return result;
  }, [items, search, sort, filters]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const start = (page - 1) * PER_PAGE;
  const paginatedItems = filtered.slice(start, start + PER_PAGE);

  const resetPage = () => setPage(1);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <ExploreHeader
        search={search}
        sort={sort}
        onSearchChange={(v) => { setSearch(v); resetPage(); }}
        onSortChange={(v) => { setSort(v); resetPage(); }}
      />

      {/* Mobile filter button */}
      <button
        onClick={() => setMobileFiltersOpen(true)}
        className="mb-4 flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium transition hover:bg-gray-100 dark:border-zinc-700 dark:hover:bg-zinc-900 lg:hidden"
      >
        <SlidersHorizontal size={16} />
        Filters
      </button>

      {/* Mobile filter backdrop */}
      {mobileFiltersOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setMobileFiltersOpen(false)}
        />
      )}

      {/* Mobile filter drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-80 overflow-y-auto border-r border-gray-200 bg-white shadow-xl transition-transform duration-300 dark:border-zinc-800 dark:bg-black lg:hidden ${mobileFiltersOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="p-6 pb-0">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Filters</h2>
            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="rounded-lg p-1 transition hover:bg-gray-100 dark:hover:bg-zinc-800"
            >
              <X size={20} />
            </button>
          </div>
        </div>
        <div className="px-6 pb-6">
          <FilterSidebar
            selectedCategories={filters.categories}
            priceRange={filters.priceRange}
            releaseDate={filters.releaseDate}
            selectedTags={filters.tags}
            onCategoriesChange={(v) => { setFilters({ ...filters, categories: v }); resetPage(); }}
            onPriceRangeChange={(v) => { setFilters({ ...filters, priceRange: v }); resetPage(); }}
            onReleaseDateChange={(v) => { setFilters({ ...filters, releaseDate: v }); resetPage(); }}
            onTagsChange={(v) => { setFilters({ ...filters, tags: v }); resetPage(); }}
            onReset={() => { setFilters(defaultFilters); resetPage(); }}
          />
        </div>
      </div>

      <div className="mt-8 flex gap-8">
        <FilterSidebar
          className="max-lg:hidden lg:block"
          selectedCategories={filters.categories}
          priceRange={filters.priceRange}
          releaseDate={filters.releaseDate}
          selectedTags={filters.tags}
          onCategoriesChange={(v) => { setFilters({ ...filters, categories: v }); resetPage(); }}
          onPriceRangeChange={(v) => { setFilters({ ...filters, priceRange: v }); resetPage(); }}
          onReleaseDateChange={(v) => { setFilters({ ...filters, releaseDate: v }); resetPage(); }}
          onTagsChange={(v) => { setFilters({ ...filters, tags: v }); resetPage(); }}
          onReset={() => { setFilters(defaultFilters); resetPage(); }}
        />

        <div className="flex-1">
          <ProductGrid items={paginatedItems} loading={loading} />

          {!loading && totalPages > 1 && (
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          )}
        </div>
      </div>
    </div>
  );
}
