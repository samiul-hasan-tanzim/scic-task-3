"use client";

import { motion } from "motion/react";

const stats = [
    {
        value: "99.9%",
        label: "Uptime SLA",
    },
    {
        value: "24ms",
        label: "Global Latency",
    },
    {
        value: "150+",
        label: "Tech Integrations",
    },
    {
        value: "12K+",
        label: "Enterprise Clients",
    },
];

const Stats = () => {
    return (
        <section className="border-y border-gray-200 bg-gray-50 py-16 dark:border-gray-800 dark:bg-zinc-950">
            <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 md:grid-cols-4">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{
                            opacity: 0,
                            y: 40,
                        }}
                        whileInView={{
                            opacity: 1,
                            y: 0,
                        }}
                        viewport={{
                            once: true,
                        }}
                        transition={{
                            duration: 0.5,
                            delay: index * 0.15,
                        }}
                        whileHover={{
                            y: -8,
                        }}
                        className="
              rounded-3xl
              border border-gray-200
              bg-white
              p-8
              text-center
              shadow-sm
              transition
              dark:border-gray-800
              dark:bg-zinc-900
            "
                    >
                        <h3 className="mb-2 text-4xl font-bold lg:text-5xl">
                            <span className="bg-linear-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                                {stat.value}
                            </span>
                        </h3>

                        <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
                            {stat.label}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Stats;