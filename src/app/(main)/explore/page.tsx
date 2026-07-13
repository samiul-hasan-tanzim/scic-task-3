import ExploreHeader from "@/components/explore/ExploreHeader";
import FilterSidebar from "@/components/explore/FilterSidebar";
import ProductGrid from "@/components/explore/ProductGrid";
import Pagination from "@/components/explore/Pagination";

export default function Explore() {
  return (
    <div className="mx-auto max-w-7xl py-10">

      {/* Header */}
      <ExploreHeader />

      {/* Sidebar + Content */}
      <div className="mt-8 flex gap-8">
        <FilterSidebar />

        <div className="flex-1">
          <ProductGrid />

          <Pagination />
        </div>
      </div>
    </div>
  );
}