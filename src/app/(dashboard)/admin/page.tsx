"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Users, Package, BarChart3 } from "lucide-react";

export default function AdminOverview() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then((d) => {
        setTotalUsers(d.totalUsers ?? 0);
        setTotalItems(d.totalItems ?? 0);
      });
  }, []);

  const cards = [
    { label: "Total Users", value: totalUsers, icon: Users, href: "/admin/users", color: "bg-blue-500" },
    { label: "Total Items", value: totalItems, icon: Package, href: "/admin/items", color: "bg-cyan-500" },
    { label: "Analytics", value: "Charts", icon: BarChart3, href: "/admin/charts", color: "bg-indigo-500" },
  ];

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Admin Overview</h1>
      <div className="grid gap-6 sm:grid-cols-3">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.href}
              href={c.href}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950"
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-white ${c.color}`}>
                <Icon size={24} />
              </div>
              <p className="mt-4 text-sm text-gray-500">{c.label}</p>
              <p className="text-2xl font-bold">{c.value}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
