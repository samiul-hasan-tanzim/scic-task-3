"use client";

import { motion } from "motion/react";
import {
    Search,
    ArrowUpDown,
    LayoutGrid,
} from "lucide-react";

const ExploreHeader = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="
        mb-10 flex flex-col gap-6
        lg:flex-row lg:items-center
        lg:justify-between
      "
        >
            {/* Left */}
            <div>
                <h1 className="text-4xl font-bold">
                    Explore Solutions
                </h1>

                <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Discover professional-grade tools
                    for your next big project.
                </p>
            </div>

            {/* Right */}
            <div className="flex flex-col gap-4 sm:flex-row">
                {/* Search */}
                <div className="relative">
                    <Search
                        size={18}
                        className="
              absolute left-4 top-1/2
              -translate-y-1/2
              text-gray-500
            "
                    />

                    <input
                        type="text"
                        placeholder="Search solutions..."
                        className="
              h-12 w-full rounded-2xl
              border border-gray-200
              bg-white pl-11 pr-4
              outline-none transition
              focus:border-cyan-500
              dark:border-zinc-700
              dark:bg-zinc-900
              sm:w-80
            "
                    />
                </div>

                {/* Sort */}
                <button
                    className="
            flex h-12 items-center
            gap-2 rounded-2xl
            border border-gray-200
            px-5 transition
            hover:bg-gray-100
            dark:border-zinc-700
            dark:hover:bg-zinc-900
          "
                >
                    <ArrowUpDown size={18} />

                    <span>Most Recent</span>
                </button>

                {/* Grid */}
                <button
                    className="
            flex h-12 w-12
            items-center justify-center
            rounded-2xl
            border border-gray-200
            transition
            hover:bg-gray-100
            dark:border-zinc-700
            dark:hover:bg-zinc-900
          "
                >
                    <LayoutGrid size={20} />
                </button>
            </div>
        </motion.div>
    );
};

export default ExploreHeader;