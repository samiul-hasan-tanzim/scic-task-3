"use client";

import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

interface Item {
  _id: string;
  title: string;
  category?: string;
  price: number;
  email?: string;
}

export default function AdminItems() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = () => {
    fetch("/api/admin/items")
      .then((r) => r.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchItems(); }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"?`)) return;
    const res = await fetch(`/api/admin/items?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      setItems(items.filter((i) => i._id !== id));
    } else {
      alert("Failed to delete item");
    }
  };

  if (loading) {
    return <p className="py-10 text-center text-gray-500">Loading...</p>;
  }

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Manage Items</h1>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-gray-200 bg-gray-50 dark:border-zinc-800 dark:bg-zinc-900">
            <tr>
              <th className="px-6 py-4 font-medium">Title</th>
              <th className="px-6 py-4 font-medium">Category</th>
              <th className="px-6 py-4 font-medium">Price</th>
              <th className="px-6 py-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
            {items.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50 dark:hover:bg-zinc-900">
                <td className="px-6 py-4 font-medium">{item.title}</td>
                <td className="px-6 py-4">
                  <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-medium text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400">
                    {item.category || "General"}
                  </span>
                </td>
                <td className="px-6 py-4">${item.price}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDelete(item._id, item.title)}
                    className="rounded-lg border border-gray-200 p-2 text-red-500 transition hover:bg-red-50 dark:border-zinc-700 dark:hover:bg-red-900/20"
                    title="Delete item"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
