"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";

export default function ManageItems() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editItem, setEditItem] = useState<string | null>(null);
  const [form, setForm] = useState<any>({});

  const fetchItems = () => {
    fetch("/api/items")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    const res = await fetch(`/api/items/${id}`, { method: "DELETE" });
    if (res.ok) {
      setItems(items.filter((item) => item._id !== id));
    }
  };

  const openEdit = (item: any) => {
    setEditItem(item._id);
    setForm({
      title: item.title,
      shortDescription: item.shortDescription || "",
      fullDescription: item.fullDescription || "",
      price: item.price || "",
      category: item.category || "",
      image: item.image || "",
    });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveEdit = async (id: string) => {
    const res = await fetch(`/api/items/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        price: parseFloat(form.price) || 0,
      }),
    });

    if (res.ok) {
      setEditItem(null);
      fetchItems();
    } else {
      alert("Failed to update");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Manage Items</h1>
        <Link
          href="/items/add"
          className="rounded-xl bg-cyan-500 px-5 py-2 font-medium text-white transition hover:bg-cyan-600"
        >
          + Add New
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white py-20 text-center dark:border-gray-800 dark:bg-zinc-900">
          <p className="text-gray-500">No items found.</p>
          <Link
            href="/items/add"
            className="mt-2 inline-block font-medium text-cyan-500 hover:underline"
          >
            Add your first item
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-zinc-900">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-zinc-950">
              <tr>
                <th className="px-6 py-4 font-medium">Title</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Price</th>
                <th className="px-6 py-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {items.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50 dark:hover:bg-zinc-950">
                  <td className="px-6 py-4">
                    {editItem === item._id ? (
                      <input
                        name="title"
                        value={form.title}
                        onChange={handleEditChange}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 dark:border-gray-700 dark:bg-zinc-950"
                      />
                    ) : (
                      <span className="font-medium">{item.title}</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editItem === item._id ? (
                      <select
                        name="category"
                        value={form.category}
                        onChange={handleEditChange}
                        className="rounded-lg border border-gray-200 px-3 py-2 dark:border-gray-700 dark:bg-zinc-950"
                      >
                        <option value="">Select</option>
                        <option value="UI Frameworks">UI Frameworks</option>
                        <option value="Backend APIs">Backend APIs</option>
                        <option value="Database Tools">Database Tools</option>
                        <option value="Cloud Services">Cloud Services</option>
                      </select>
                    ) : (
                      <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-medium text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400">
                        {item.category || "General"}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editItem === item._id ? (
                      <input
                        name="price"
                        type="number"
                        step="0.01"
                        value={form.price}
                        onChange={handleEditChange}
                        className="w-24 rounded-lg border border-gray-200 px-3 py-2 dark:border-gray-700 dark:bg-zinc-950"
                      />
                    ) : (
                      <span>${item.price}</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {editItem === item._id ? (
                        <>
                          <button
                            onClick={() => saveEdit(item._id)}
                            className="rounded-lg bg-cyan-500 px-4 py-2 text-xs font-medium text-white hover:bg-cyan-600"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditItem(null)}
                            className="rounded-lg border border-gray-200 px-4 py-2 text-xs font-medium hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-zinc-800"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => openEdit(item)}
                            className="rounded-lg border border-gray-200 p-2 transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-zinc-800"
                            title="Edit"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="rounded-lg border border-gray-200 p-2 text-red-500 transition hover:bg-red-50 dark:border-gray-700 dark:hover:bg-red-900/20"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
