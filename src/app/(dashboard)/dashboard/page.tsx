"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Package, Plus, List } from "lucide-react";

export default function Dashboard() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/items")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      });
  }, []);

  const stats = [
    {
      label: "Total Items",
      value: items.length,
      icon: Package,
      color: "bg-cyan-500",
    },
    {
      label: "Quick Add",
      value: "New",
      icon: Plus,
      color: "bg-blue-500",
      link: "/items/add",
    },
    {
      label: "Manage",
      value: "View All",
      icon: List,
      color: "bg-indigo-500",
      link: "/items/manage",
    },
  ];

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Dashboard</h1>

      {/* Stats */}
      <div className="mb-10 grid gap-6 sm:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-zinc-900"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl text-white ${stat.color}`}
                >
                  <Icon size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  {stat.link ? (
                    <Link href={stat.link} className="font-semibold hover:text-cyan-500">
                      {stat.value} &rarr;
                    </Link>
                  ) : (
                    <p className="text-2xl font-bold">{stat.value}</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Items */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-zinc-900">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recent Items</h2>
          <Link
            href="/items/manage"
            className="text-sm font-medium text-cyan-500 hover:underline"
          >
            View All
          </Link>
        </div>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : items.length === 0 ? (
          <div className="py-10 text-center text-gray-500">
            <p>No items yet.</p>
            <Link
              href="/items/add"
              className="mt-2 inline-block font-medium text-cyan-500 hover:underline"
            >
              Add your first item
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {items.slice(0, 5).map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between py-3"
              >
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-500">
                    ${item.price}
                  </p>
                </div>
                <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-medium text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400">
                  {item.category || "General"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
