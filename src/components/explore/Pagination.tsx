"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  onPageChange: (p: number) => void;
}) {
  const getPages = () => {
    const pages: (number | "...")[] = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= page - 1 && i <= page + 1)) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }
    return pages;
  };

  return (
    <div className="mt-14 flex items-center justify-center gap-2">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 transition hover:bg-gray-100 disabled:opacity-40 dark:border-zinc-800 dark:hover:bg-zinc-900"
      >
        <ChevronLeft size={18} />
      </button>

      {getPages().map((p, i) =>
        p === "..." ? (
          <span key={`dot-${i}`} className="px-2 text-gray-500">
            ...
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`flex h-10 w-10 items-center justify-center rounded-xl font-medium transition ${
              p === page
                ? "bg-cyan-500 text-white"
                : "border border-gray-200 hover:bg-gray-100 dark:border-zinc-800 dark:hover:bg-zinc-900"
            }`}
          >
            {p}
          </button>
        )
      )}

      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 transition hover:bg-gray-100 disabled:opacity-40 dark:border-zinc-800 dark:hover:bg-zinc-900"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
