"use client";

import { useEffect, useState, useMemo } from "react";
import ExploreHeader from "@/components/explore/ExploreHeader";
import FilterSidebar from "@/components/explore/FilterSidebar";
import ProductGrid from "@/components/explore/ProductGrid";
import Pagination from "@/components/explore/Pagination";

const PER_PAGE = 8;

const defaultFilters = {
  categories: [] as string[],
  priceRange: 1000,
  releaseDate: "all",
  tags: [] as string[],
};

export default function Explore() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState(defaultFilters);

  useEffect(() => {
    fetch("/api/items")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      });
  }, []);

  const filtered = useMemo(() => {
    let result = [...items];

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
        filters.categories.includes(item.category)
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
        (item) => new Date(item.createdAt) >= cutoff
      );
    }

    switch (sort) {
      case "oldest":
        result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
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
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return result;
  }, [items, search, sort, filters]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const start = (page - 1) * PER_PAGE;
  const paginatedItems = filtered.slice(start, start + PER_PAGE);

  const resetPage = () => setPage(1);

  return (
    <div className="mx-auto max-w-7xl py-10">
      <ExploreHeader
        search={search}
        sort={sort}
        onSearchChange={(v) => { setSearch(v); resetPage(); }}
        onSortChange={(v) => { setSort(v); resetPage(); }}
      />

      <div className="mt-8 flex gap-8">
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
