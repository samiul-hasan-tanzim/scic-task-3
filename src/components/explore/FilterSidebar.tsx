"use client";

import {
    LayoutDashboard,
    Rocket,
    Database,
    Shield,
    RotateCcw,
    Star,
} from "lucide-react";

const navigationItems = [
    {
        title: "Overview",
        icon: LayoutDashboard,
        active: true,
    },
    {
        title: "Deployments",
        icon: Rocket,
    },
    {
        title: "Infrastructure",
        icon: Database,
    },
    {
        title: "Security",
        icon: Shield,
    },
];

const categories = [
    "UI Frameworks",
    "Backend APIs",
    "Database Tools",
    "Cloud Services",
];

const FilterSidebar = () => {
    return (
        <aside
            className="
        sticky top-20 hidden
        h-[calc(100vh-6rem)]
        w-72 shrink-0
        overflow-y-auto
        border-r border-gray-200
        pr-6
        dark:border-zinc-800
        lg:block
      "
        >
            {/* Navigation */}
            <div className="mb-10">
                <h3
                    className="
            mb-4 text-xs font-semibold
            uppercase tracking-widest
            text-gray-500
          "
                >
                    Navigation
                </h3>

                <div className="space-y-2">
                    {navigationItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <button
                                key={item.title}
                                className={`
                  flex w-full items-center gap-3
                  rounded-xl px-4 py-3
                  text-left transition
                  ${item.active
                                        ? "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400"
                                        : "hover:bg-gray-100 dark:hover:bg-zinc-900"
                                    }
                `}
                            >
                                <Icon size={18} />

                                <span className="font-medium">
                                    {item.title}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Filters */}
            <div className="space-y-8 pb-10">
                {/* Category */}
                <div>
                    <h3
                        className="
              mb-4 text-xs font-semibold
              uppercase tracking-widest
              text-gray-500
            "
                    >
                        Category
                    </h3>

                    <div className="space-y-3">
                        {categories.map((category) => (
                            <label
                                key={category}
                                className="
                  flex cursor-pointer
                  items-center gap-3
                "
                            >
                                <input
                                    type="checkbox"
                                    className="h-4 w-4 rounded"
                                />

                                <span className="text-sm">
                                    {category}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Price */}
                <div>
                    <h3
                        className="
              mb-4 text-xs font-semibold
              uppercase tracking-widest
              text-gray-500
            "
                    >
                        Price Range
                    </h3>

                    <input
                        type="range"
                        min="0"
                        max="1000"
                        className="w-full"
                    />

                    <div
                        className="
              mt-2 flex
              justify-between
              text-sm text-gray-500
            "
                    >
                        <span>$0</span>
                        <span>$1000+</span>
                    </div>
                </div>

                {/* Rating */}
                <div>
                    <h3
                        className="
              mb-4 text-xs font-semibold
              uppercase tracking-widest
              text-gray-500
            "
                    >
                        Rating
                    </h3>

                    <label
                        className="
              flex cursor-pointer
              items-center gap-3
            "
                    >
                        <input type="radio" name="rating" />

                        <div className="flex text-yellow-500">
                            {Array.from({ length: 4 }).map(
                                (_, i) => (
                                    <Star
                                        key={i}
                                        size={16}
                                        fill="currentColor"
                                    />
                                )
                            )}

                            <Star size={16} />
                        </div>

                        <span className="text-sm">
                            & up
                        </span>
                    </label>
                </div>

                {/* Release */}
                <div>
                    <h3
                        className="
              mb-4 text-xs font-semibold
              uppercase tracking-widest
              text-gray-500
            "
                    >
                        Release Date
                    </h3>

                    <select
                        className="
              w-full rounded-xl
              border border-gray-200
              bg-transparent p-3
              dark:border-zinc-700
            "
                    >
                        <option>Last 30 days</option>
                        <option>Last 6 months</option>
                        <option>Last year</option>
                        <option>All time</option>
                    </select>
                </div>

                {/* Reset */}
                <button
                    className="
            flex w-full items-center
            justify-center gap-2
            rounded-xl border
            border-cyan-500
            py-3 text-cyan-500
            transition
            hover:bg-cyan-500
            hover:text-white
          "
                >
                    <RotateCcw size={18} />

                    Reset Filters
                </button>
            </div>
        </aside>
    );
};

export default FilterSidebar;