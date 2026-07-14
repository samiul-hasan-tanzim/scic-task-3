"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddItem() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    shortDescription: "",
    fullDescription: "",
    price: "",
    category: "",
    image: "",
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const res = await fetch("/api/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        price: parseFloat(form.price) || 0,
        rating: 0,
      }),
    });

    if (res.ok) {
      router.push("/items/manage");
    } else {
      alert("Failed to save item");
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-8 text-3xl font-bold">Add Item</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-zinc-900"
      >
        <div>
          <label className="mb-2 block text-sm font-medium">Title</label>
          <input
            name="title"
            required
            value={form.title}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-cyan-500 dark:border-gray-700 dark:bg-zinc-950"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Short Description
          </label>
          <input
            name="shortDescription"
            value={form.shortDescription}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-cyan-500 dark:border-gray-700 dark:bg-zinc-950"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Full Description
          </label>
          <textarea
            name="fullDescription"
            rows={4}
            value={form.fullDescription}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-cyan-500 dark:border-gray-700 dark:bg-zinc-950"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">Price</label>
            <input
              name="price"
              type="number"
              step="0.01"
              value={form.price}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-cyan-500 dark:border-gray-700 dark:bg-zinc-950"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-cyan-500 dark:border-gray-700 dark:bg-zinc-950"
            >
              <option value="">Select</option>
              <option value="UI Frameworks">UI Frameworks</option>
              <option value="Backend APIs">Backend APIs</option>
              <option value="Database Tools">Database Tools</option>
              <option value="Cloud Services">Cloud Services</option>
            </select>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Image URL (optional)
          </label>
          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-cyan-500 dark:border-gray-700 dark:bg-zinc-950"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full rounded-xl bg-cyan-500 py-3 font-semibold text-white transition hover:bg-cyan-600 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
