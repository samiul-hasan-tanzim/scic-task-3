"use client";

import { motion } from "motion/react";
import { Sparkles, ChevronRight } from "lucide-react";

const Hero = () => {
    return (
        <header className="relative overflow-hidden px-6 pb-20 pt-32">
            {/* Background Blur */}
            <div className="absolute left-1/2 top-20 h-125 w-125 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />

            <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
                {/* Left */}
                <div className="space-y-7">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-600 dark:text-cyan-400"
                    >
                        <Sparkles size={16} />
                        Introducing Engine v4.0
                    </motion.div>

                    {/* Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15, duration: 0.6 }}
                        className="text-5xl font-bold leading-tight md:text-6xl"
                    >
                        Scale your infrastructure with{" "}
                        <span className="bg-linear-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                            mathematical precision.
                        </span>
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="max-w-xl text-lg leading-8 text-gray-600 dark:text-gray-300"
                    >
                        Deploy complex cloud environments in minutes, not days.
                        Build, scale and monitor everything from one beautifully
                        designed platform.
                    </motion.p>

                    {/* Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.45, duration: 0.6 }}
                        className="flex flex-wrap gap-4 pt-2"
                    >
                        <button className="group flex items-center gap-2 rounded-2xl bg-black px-7 py-3 font-medium text-white transition hover:scale-105 dark:bg-white dark:text-black">
                            Start Deploying
                            <ChevronRight
                                size={18}
                                className="transition group-hover:translate-x-1"
                            />
                        </button>

                        <button className="rounded-2xl border border-gray-300 px-7 py-3 font-medium transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-zinc-900">
                            Book a Demo
                        </button>
                    </motion.div>
                </div>

                {/* Right */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="relative flex items-center justify-center"
                >
                    {/* Glow */}
                    <div className="absolute h-96 w-96 rounded-full bg-cyan-500/20 blur-[120px]" />

                    {/* Floating Stat Card */}
                    <motion.div
                        animate={{ y: [0, -15, 0] }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                        }}
                        className="absolute -left-8 top-12 z-20 rounded-2xl border border-white/20 bg-white/80 p-4 shadow-2xl backdrop-blur-xl dark:bg-zinc-900/80"
                    >
                        <p className="text-sm text-gray-500">
                            Global Uptime
                        </p>

                        <h3 className="text-2xl font-bold">
                            99.9%
                        </h3>
                    </motion.div>

                    {/* Main Image */}
                    <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                        }}
                        className="relative overflow-hidden rounded-4xl border border-white/20 shadow-[0_20px_80px_rgba(0,0,0,0.15)]"
                    >
                        <img
                            src="https://task-writer.com/images/automated_criteria.webp"
                            alt="Dashboard Preview"
                            className="h-125 w-full object-cover"
                        />
                    </motion.div>

                    {/* Floating Users Card */}
                    <motion.div
                        animate={{ y: [0, 18, 0] }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                        }}
                        className="absolute -right-6 bottom-10 z-20 rounded-2xl border border-white/20 bg-white/80 p-4 shadow-2xl backdrop-blur-xl dark:bg-zinc-900/80"
                    >
                        <p className="text-sm text-gray-500">
                            Enterprise Clients
                        </p>

                        <h3 className="text-2xl font-bold">
                            12K+
                        </h3>
                    </motion.div>
                </motion.div>
            </div>
        </header>
    );
};

export default Hero;