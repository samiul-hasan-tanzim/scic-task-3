"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import {
    LayoutDashboard,
    Plus,
    List,
    Shield,
    ChevronDown,
    Users,
    Package,
    BarChart3,
    Menu,
    X,
} from "lucide-react";

const adminSubItems = [
    { label: "Users", href: "/admin/users", icon: Users },
    { label: "Items", href: "/admin/items", icon: Package },
    { label: "Charts", href: "/admin/charts", icon: BarChart3 },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const { data: session, isPending } = authClient.useSession();
    const [adminOpen, setAdminOpen] = useState(pathname.startsWith("/admin"));
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        if (!isPending && !session) {
            router.push("/login");
        }
    }, [session, isPending, router]);

    const closeSidebar = () => setSidebarOpen(false);

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

    const isAdmin = user.email === "admin@admin.com";

    const sidebarContent = () => (
        <>
            <div className="flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold text-black dark:text-white">
                    TechStack Pro
                </Link>
                <button
                    onClick={closeSidebar}
                    className="rounded-lg p-1 transition hover:bg-gray-100 dark:hover:bg-zinc-800 lg:hidden"
                >
                    <X size={20} />
                </button>
            </div>

            <nav className="mt-10 flex flex-col gap-2">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={closeSidebar}
                            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                                active
                                    ? "bg-cyan-500 text-white"
                                    : "hover:bg-cyan-50 hover:text-cyan-600 dark:hover:bg-cyan-900/20 dark:hover:text-cyan-400"
                            }`}
                        >
                            <Icon size={18} />
                            {item.label}
                        </Link>
                    );
                })}

                {isAdmin && (
                    <div>
                        <button
                            onClick={() => setAdminOpen(!adminOpen)}
                            className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition ${
                                pathname.startsWith("/admin")
                                    ? "bg-cyan-500 text-white"
                                    : "hover:bg-cyan-50 hover:text-cyan-600 dark:hover:bg-cyan-900/20 dark:hover:text-cyan-400"
                            }`}
                        >
                            <span className="flex items-center gap-3">
                                <Shield size={18} />
                                Admin Panel
                            </span>
                            <ChevronDown
                                size={16}
                                className={`transition ${adminOpen ? "rotate-180" : ""}`}
                            />
                        </button>

                        {adminOpen && (
                            <div className="ml-4 mt-1 flex flex-col gap-1 border-l border-gray-200 pl-3 dark:border-zinc-700">
                                {adminSubItems.map((item) => {
                                    const Icon = item.icon;
                                    const active = pathname === item.href;
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={closeSidebar}
                                            className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                                                active
                                                    ? "bg-cyan-500 text-white"
                                                    : "hover:bg-cyan-50 hover:text-cyan-600 dark:hover:bg-cyan-900/20 dark:hover:text-cyan-400"
                                            }`}
                                        >
                                            <Icon size={16} />
                                            {item.label}
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}
            </nav>

            <div className="mt-auto border-t border-gray-200 pt-4 dark:border-gray-800">
                <p className="truncate text-sm font-medium">{user.name}</p>
                <p className="truncate text-xs text-gray-500">{user.email}</p>
            </div>
        </>
    );

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-zinc-950">
            {/* Mobile backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/40 lg:hidden"
                    onClick={closeSidebar}
                />
            )}

            {/* Mobile sidebar (overlay) */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-gray-200 bg-white p-6 shadow-xl transition-transform duration-300 dark:border-gray-800 dark:bg-black lg:hidden ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                {sidebarContent()}
            </aside>

            {/* Desktop sidebar (always visible) */}
            <aside className="hidden w-64 shrink-0 lg:block">
                <div className="flex h-full flex-col border-r border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-black">
                    {sidebarContent()}
                </div>
            </aside>

            {/* Content */}
            <main className="flex-1 overflow-auto p-4 md:p-8">
                {/* Mobile header */}
                <div className="mb-6 flex items-center gap-4 lg:hidden">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="rounded-xl border border-gray-200 p-2 transition hover:bg-gray-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
                    >
                        <Menu size={20} />
                    </button>
                    <span className="text-lg font-bold text-black dark:text-white">
                        TechStack Pro
                    </span>
                </div>

                {children}
            </main>
        </div>
    );
}
