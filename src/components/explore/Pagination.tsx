"use client";

import {
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

export default function Pagination() {
    return (
        <div className="mt-14 flex items-center justify-center gap-2">
            {/* Previous */}
            <button
                className="
                    flex h-10 w-10 items-center
                    justify-center rounded-xl
                    border border-gray-200
                    transition
                    hover:bg-gray-100
                    dark:border-zinc-800
                    dark:hover:bg-zinc-900
                "
            >
                <ChevronLeft size={18} />
            </button>

            {/* Page Numbers */}
            <button
                className="
                    flex h-10 w-10 items-center
                    justify-center rounded-xl
                    bg-cyan-500
                    font-medium text-white
                "
            >
                1
            </button>

            <button
                className="
                    flex h-10 w-10 items-center
                    justify-center rounded-xl
                    border border-gray-200
                    transition
                    hover:bg-gray-100
                    dark:border-zinc-800
                    dark:hover:bg-zinc-900
                "
            >
                2
            </button>

            <button
                className="
                    flex h-10 w-10 items-center
                    justify-center rounded-xl
                    border border-gray-200
                    transition
                    hover:bg-gray-100
                    dark:border-zinc-800
                    dark:hover:bg-zinc-900
                "
            >
                3
            </button>

            <span className="px-2 text-gray-500">
                ...
            </span>

            <button
                className="
                    flex h-10 w-10 items-center
                    justify-center rounded-xl
                    border border-gray-200
                    transition
                    hover:bg-gray-100
                    dark:border-zinc-800
                    dark:hover:bg-zinc-900
                "
            >
                12
            </button>

            {/* Next */}
            <button
                className="
                    flex h-10 w-10 items-center
                    justify-center rounded-xl
                    border border-gray-200
                    transition
                    hover:bg-gray-100
                    dark:border-zinc-800
                    dark:hover:bg-zinc-900
                "
            >
                <ChevronRight size={18} />
            </button>
        </div>
    );
}