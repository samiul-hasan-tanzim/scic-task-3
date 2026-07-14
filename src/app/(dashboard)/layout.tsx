"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import {
    LayoutDashboard,
    Plus,
    List,
} from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();

    useEffect(() => {
        if (!isPending && !session) {
            router.push("/login");
        }
    }, [session, isPending, router]);

    if (isPending) {
        return (
            <div className="flex h-screen items-center justify-center">
                <p className="text-gray-500">Loading...</p>
            </div>
        );
    }

    if (!session) return null;

    const user = session.user;

    const navItems = [
        { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { label: "Add Item", href: "/items/add", icon: Plus },
        { label: "Manage Items", href: "/items/manage", icon: List },
    ];

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-zinc-950">
            {/* Sidebar */}
            <aside className="flex w-64 flex-col border-r border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-black">
                <Link href="/" className="text-2xl font-bold text-black dark:text-white">
                    TechStack Pro
                </Link>

                <nav className="mt-10 flex flex-col gap-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition hover:bg-cyan-50 hover:text-cyan-600 dark:hover:bg-cyan-900/20 dark:hover:text-cyan-400"
                            >
                                <Icon size={18} />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="mt-auto border-t border-gray-200 pt-4 dark:border-gray-800">
                    <p className="truncate text-sm font-medium">{user.name}</p>
                    <p className="truncate text-xs text-gray-500">{user.email}</p>
                </div>
            </aside>

            {/* Content */}
            <main className="flex-1 overflow-auto p-8">{children}</main>
        </div>
    );
}
