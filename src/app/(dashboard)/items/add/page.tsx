"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { POPULAR_TAGS } from "@/lib/constants";
import { authClient } from "@/lib/auth-client";
import { Plus, X } from "lucide-react";

export default function AddItem() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [form, setForm] = useState({
    title: "",
    shortDescription: "",
    fullDescription: "",
    price: "",
    category: "",
    images: [""] as string[],
    tags: [] as string[],
  });
  const [saving, setSaving] = useState(false);
  const [urlErrors, setUrlErrors] = useState<string[]>([]);

  const isValidUrl = (url: string) =>
    url === "" || /^https?:\/\/.+\..+/i.test(url);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (index: number, value: string) => {
    const images = [...form.images];
    images[index] = value;
    setForm({ ...form, images });

    const errors = [...urlErrors];
    if (value && !isValidUrl(value)) {
      errors[index] = "Enter a valid URL (e.g. https://example.com/image.jpg)";
    } else {
      errors[index] = "";
    }
    setUrlErrors(errors);
  };

  const addImage = () => {
    setForm({ ...form, images: [...form.images, ""] });
    setUrlErrors([...urlErrors, ""]);
  };

  const removeImage = (index: number) => {
    setForm({
      ...form,
      images: form.images.filter((_, i) => i !== index),
    });
    setUrlErrors(urlErrors.filter((_, i) => i !== index));
  };

  const toggleTag = (tag: string) => {
    setForm({
      ...form,
      tags: form.tags.includes(tag)
        ? form.tags.filter((t) => t !== tag)
        : [...form.tags, tag],
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const cleanImages = form.images.filter(Boolean);
    for (const url of cleanImages) {
      if (!isValidUrl(url)) {
        alert("One or more image URLs are invalid.");
        return;
      }
    }

    setSaving(true);

    const res = await fetch("/api/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        images: cleanImages,
        userEmail: session?.user?.email || "",
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

        {/* Images */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Image URLs (optional)
          </label>

          <div className="space-y-3">
            {form.images.map((url, i) => (
              <div key={i}>
                <div className="flex items-center gap-2">
                  <input
                    value={url}
                    onChange={(e) => handleImageChange(i, e.target.value)}
                    className={`w-full rounded-xl border bg-white px-4 py-3 outline-none transition focus:border-cyan-500 dark:bg-zinc-950 ${
                      urlErrors[i] ? "border-red-500" : "border-gray-200 dark:border-gray-700"
                    }`}
                    placeholder="https://example.com/image.jpg"
                  />
                  {form.images.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="rounded-lg p-2 text-red-500 transition hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>
                {urlErrors[i] && (
                  <p className="mt-1 text-xs text-red-500">{urlErrors[i]}</p>
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addImage}
            className="mt-3 flex items-center gap-2 rounded-xl border border-dashed border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-500 transition hover:border-cyan-500 hover:text-cyan-500 dark:border-zinc-600 dark:hover:border-cyan-500"
          >
            <Plus size={16} />
            Add another image
          </button>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Tags</label>
          <div className="flex flex-wrap gap-2">
            {POPULAR_TAGS.map((tag) => {
              const active = form.tags.includes(tag);
              return (
                <button
                  type="button"
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                    active
                      ? "border-cyan-500 bg-cyan-500 text-white"
                      : "border-gray-200 hover:border-cyan-500 hover:text-cyan-500 dark:border-zinc-700 dark:hover:border-cyan-500"
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
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
