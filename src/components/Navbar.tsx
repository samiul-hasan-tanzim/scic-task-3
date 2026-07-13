"use client";

import Link from "next/link";
import { Moon, Search, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

const navLinks = [
    {
        label: "Home",
        href: "/",
    },
    {
        label: "Explore",
        href: "/explore",
    },
    {
        label: "Support",
        href: "/support",
    }
];

const Navbar = () => {
    const pathname = usePathname();

    const { theme, setTheme } = useTheme();

    return (
        <nav className="sticky top-0 left-0 z-50 w-full border-b border-gray-200 bg-white/90 backdrop-blur-md dark:border-gray-800 dark:bg-black/80">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between">
                {/* Left Side */}
                <div className="flex items-center gap-10">
                    <Link
                        href="/"
                        className="text-2xl font-bold text-black dark:text-white"
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
                <div className="flex items-center gap-3">
                    {/* Search */}
                    <button className="rounded-lg p-2 transition hover:bg-gray-100 dark:hover:bg-gray-800">
                        <Search size={20} />
                    </button>

                    {/* Theme Toggle */}
                    <button
                        onClick={() =>
                            setTheme(theme === "dark" ? "light" : "dark")
                        }
                        className="rounded-lg border border-gray-200 p-2 transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
                    >
                        {theme === "dark" ? (
                            <Sun size={18} />
                        ) : (
                            <Moon size={18} />
                        )}
                    </button>

                    {/* CTA */}
                    <Link
                        href="/login"
                        className="hidden rounded-lg bg-black px-5 py-2 font-medium text-white transition hover:opacity-90 dark:bg-white dark:text-black sm:block"
                    >
                        Get Started
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;