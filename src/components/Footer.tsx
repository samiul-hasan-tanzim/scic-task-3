"use client";

import { Send } from "lucide-react";
import Link from "next/link";
import { BsTwitter } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";

const footerLinks = {
    Product: [
        { label: "Features", href: "/#features" },
        { label: "Explore", href: "/explore" },
        { label: "Pricing", href: "/#pricing" },
        { label: "Integrations", href: "/#integrations" },
    ],
    Company: [
        { label: "About", href: "/#about" },
        { label: "Blog", href: "/#blog" },
        { label: "Support", href: "/support" },
        { label: "Contact", href: "/support" },
    ],
    Resources: [
        { label: "Documentation", href: "/support" },
        { label: "Help Center", href: "/support" },
        { label: "API Reference", href: "/support" },
        { label: "Privacy", href: "/support" },
    ],
};

const Footer = () => {
    return (
        <footer className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-black">
            <div className="mx-auto max-w-7xl px-6 py-20">
                <div className="grid gap-14 lg:grid-cols-5">
                    {/* Left */}
                    <div className="lg:col-span-2">
                        <Link
                            href="/"
                            className="text-3xl font-bold"
                        >
                            TechStack Pro
                        </Link>

                        <p className="mt-5 max-w-md leading-8 text-gray-600 dark:text-gray-300">
                            Build, deploy and scale your applications
                            with enterprise-grade infrastructure and
                            modern developer tools.
                        </p>

                        {/* Social */}
                        <div className="mt-8 flex items-center gap-4">
                            {[
                                { icon: FaGithub, href: "https://github.com" },
                                { icon: BsTwitter, href: "https://twitter.com" },
                                { icon: FaLinkedin, href: "https://linkedin.com" },
                            ].map((s, i) => {
                                const Icon = s.icon;
                                return (
                                    <a
                                        key={i}
                                        href={s.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="
                      rounded-xl
                      border
                      border-gray-200
                      p-3
                      transition
                      hover:-translate-y-1
                      hover:border-cyan-500
                      hover:text-cyan-500
                      dark:border-gray-800
                    "
                                    >
                                        <Icon size={20} />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Links */}
                    {Object.entries(footerLinks).map(
                        ([title, links]) => (
                            <div key={title}>
                                <h3 className="mb-6 font-semibold">
                                    {title}
                                </h3>

                                <ul className="space-y-4">
                                    {links.map((link) => (
                                        <li key={link.label}>
                                            <Link
                                                href={link.href}
                                                className="
                          text-gray-600
                          transition
                          hover:text-cyan-500
                          dark:text-gray-300
                        "
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )
                    )}

                    {/* Contact */}
                    <div>
                        <h3 className="mb-6 font-semibold">Contact</h3>
                        <ul className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
                            <li>hello@techstackpro.com</li>
                            <li>San Francisco, CA</li>
                            <li>Mon–Fri 9AM–6PM PST</li>
                        </ul>
                    </div>
                </div>

                {/* Newsletter */}
                <div
                    className="
            mt-20
            rounded-3xl
            border
            border-gray-200
            bg-gray-50
            p-8
            dark:border-gray-800
            dark:bg-zinc-900
          "
                >
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h3 className="text-2xl font-bold">
                                Stay updated
                            </h3>

                            <p className="mt-2 text-gray-600 dark:text-gray-300">
                                Get product updates and engineering insights.
                            </p>
                        </div>

                        <div className="flex w-full max-w-md gap-3">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="
                  flex-1
                  rounded-2xl
                  border
                  border-gray-200
                  bg-transparent
                  px-5
                  py-3
                  outline-none
                  focus:border-cyan-500
                  dark:border-gray-700
                "
                            />

                            <button
                                className="
                  flex items-center gap-2
                  rounded-2xl
                  bg-cyan-500
                  px-5
                  py-3
                  font-medium
                  text-white
                  transition
                  hover:opacity-90
                "
                            >
                                Subscribe
                                <Send size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div
                    className="
            mt-12
            flex flex-col gap-4
            border-t
            border-gray-200
            pt-8
            text-sm
            text-gray-500
            dark:border-gray-800
            md:flex-row
            md:items-center
            md:justify-between
          "
                >
                    <p>
                        © 2026 TechStack Pro. All rights reserved.
                    </p>

                    <div className="flex gap-6">
                        <Link
                            href="/support"
                            className="hover:text-cyan-500"
                        >
                            Privacy Policy
                        </Link>

                        <Link
                            href="/support"
                            className="hover:text-cyan-500"
                        >
                            Terms of Service
                        </Link>

                        <Link
                            href="/support"
                            className="hover:text-cyan-500"
                        >
                            Cookies
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;