"use client";

import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

interface User {
  _id: string;
  name?: string;
  email: string;
  createdAt?: string;
}

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = () => {
    fetch("/api/admin/users")
      .then((r) => r.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleDelete = async (id: string, email: string) => {
    if (email === "admin@admin.com") {
      alert("Cannot delete the admin account.");
      return;
    }
    if (!confirm(`Delete user ${email}?`)) return;

    const res = await fetch(`/api/admin/users?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      setUsers(users.filter((u) => u._id !== id));
    } else {
      alert("Failed to delete user");
    }
  };

  if (loading) {
    return <p className="py-10 text-center text-gray-500">Loading...</p>;
  }

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Manage Users</h1>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-gray-200 bg-gray-50 dark:border-zinc-800 dark:bg-zinc-900">
            <tr>
              <th className="px-6 py-4 font-medium">Name</th>
              <th className="px-6 py-4 font-medium">Email</th>
              <th className="px-6 py-4 font-medium">Joined</th>
              <th className="px-6 py-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-zinc-900">
                <td className="px-6 py-4 font-medium">{user.name || "—"}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4 text-gray-500">
                  {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDelete(user._id, user.email)}
                    disabled={user.email === "admin@admin.com"}
                    className="rounded-lg border border-gray-200 p-2 text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-30 dark:border-zinc-700 dark:hover:bg-red-900/20"
                    title="Delete user"
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
