"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Moon, Search, Sun, LogOut, LayoutDashboard, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const navLinks = [
    { label: "Home", href: "/" },
    { label: "Explore", href: "/explore" },
    { label: "Support", href: "/support" },
];

const Navbar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const { theme, setTheme } = useTheme();
    const { data: session } = authClient.useSession();
    const [open, setOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (menuRef.current && !(menuRef.current as HTMLElement).contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    const handleLogout = async () => {
        await authClient.signOut();
        router.push("/");
    };

    const user = session?.user;

    return (
        <nav className="sticky top-0 left-0 z-50 w-full border-b border-gray-200 bg-white/90 backdrop-blur-md dark:border-gray-800 dark:bg-black/80">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
                {/* Left Side */}
                <div className="flex items-center gap-4 md:gap-10">
                    {/* Mobile menu toggle */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="rounded-lg p-2 transition hover:bg-gray-100 dark:hover:bg-gray-800 md:hidden"
                    >
                        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>

                    <Link
                        href="/"
                        className="text-xl font-bold text-black dark:text-white md:text-2xl"
                    >
                        TechStack Pro
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden items-center gap-8 md:flex">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`pb-1 transition ${isActive
                                        ? "border-b-2 border-cyan-500 font-medium text-cyan-500"
                                        : "text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-2 md:gap-3">
                    {/* Search */}
                    <button className="rounded-lg p-2 transition hover:bg-gray-100 dark:hover:bg-gray-800">
                        <Search size={20} />
                    </button>

                    {/* Theme Toggle */}
                    <button
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="rounded-lg border border-gray-200 p-2 transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
                    >
                        {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                    </button>

                    {/* User Section */}
                    {user ? (
                        <div className="relative" ref={menuRef}>
                            <button
                                onClick={() => setOpen(!open)}
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-500 text-sm font-semibold text-white transition hover:opacity-80"
                            >
                                {user.name?.charAt(0).toUpperCase() || "U"}
                            </button>

                            {open && (
                                <div className="absolute right-0 top-12 w-56 rounded-xl border border-gray-200 bg-white p-3 shadow-lg dark:border-gray-700 dark:bg-zinc-900">
                                    <p className="truncate px-2 text-sm font-medium">{user.name}</p>
                                    <p className="truncate px-2 text-xs text-gray-500">{user.email}</p>

                                    <hr className="my-2 border-gray-200 dark:border-gray-700" />

                                    <Link
                                        href="/dashboard"
                                        className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm transition hover:bg-gray-100 dark:hover:bg-zinc-800"
                                    >
                                        <LayoutDashboard size={16} />
                                        Dashboard
                                    </Link>

                                    <button
                                        onClick={handleLogout}
                                        className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm text-red-500 transition hover:bg-red-50 dark:hover:bg-red-900/20"
                                    >
                                        <LogOut size={16} />
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link
                            href="/login"
                            className="hidden rounded-lg bg-black px-5 py-2 font-medium text-white transition hover:opacity-90 dark:bg-white dark:text-black sm:block"
                        >
                            Get Started
                        </Link>
                    )}
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="border-t border-gray-200 bg-white px-4 pb-6 pt-4 dark:border-gray-800 dark:bg-black md:hidden">
                    <div className="flex flex-col gap-3">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileOpen(false)}
                                    className={`rounded-xl px-4 py-3 text-sm font-medium transition ${
                                        isActive
                                            ? "bg-cyan-500 text-white"
                                            : "hover:bg-gray-100 dark:hover:bg-zinc-900"
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}

                        {!user && (
                            <Link
                                href="/login"
                                onClick={() => setMobileOpen(false)}
                                className="mt-2 rounded-xl bg-black py-3 text-center text-sm font-medium text-white dark:bg-white dark:text-black"
                            >
                                Get Started
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
