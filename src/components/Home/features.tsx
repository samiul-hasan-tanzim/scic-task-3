"use client";

import { motion } from "motion/react";
import {
    ShieldCheck,
    Globe,
    BarChart3,
    ArrowRight,
} from "lucide-react";

const features = [
    {
        icon: Globe,
        title: "Global Edge Network",
        description:
            "Deploy instantly across multiple regions with ultra-low latency and high availability.",
    },
    {
        icon: ShieldCheck,
        title: "Enterprise Security",
        description:
            "Built-in authentication, encryption, monitoring and advanced security controls.",
    },
    {
        icon: BarChart3,
        title: "Real-time Analytics",
        description:
            "Track performance, users and infrastructure metrics from a unified dashboard.",
    },
];

const Features = () => {
    return (
        <section className="px-6 py-24">
            <div className="mx-auto max-w-7xl">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mx-auto mb-16 max-w-3xl text-center"
                >
                    <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-500">
                        Enterprise Infrastructure
                    </span>

                    <h2 className="mt-6 text-4xl font-bold md:text-5xl">
                        Everything you need to{" "}
                        <span className="bg-linear-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                            scale confidently.
                        </span>
                    </h2>

                    <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
                        Powerful tools designed for modern teams. Build faster,
                        deploy globally and monitor everything in real time.
                    </p>
                </motion.div>

                {/* Cards */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;

                        return (
                            <motion.div
                                key={feature.title}
                                initial={{
                                    opacity: 0,
                                    y: 50,
                                }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.15,
                                }}
                                whileHover={{
                                    y: -10,
                                }}
                                className="
                  group
                  relative
                  overflow-hidden
                  rounded-3xl
                  border
                  border-gray-200
                  bg-white
                  p-8
                  shadow-sm
                  transition
                  dark:border-gray-800
                  dark:bg-zinc-900
                "
                            >
                                {/* Glow */}
                                <div className="absolute right-0 top-0 h-40 w-40 translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-3xl opacity-0 transition duration-500 group-hover:opacity-100" />

                                {/* Icon */}
                                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-500">
                                    <Icon size={28} />
                                </div>

                                <h3 className="mb-4 text-2xl font-semibold">
                                    {feature.title}
                                </h3>

                                <p className="mb-6 leading-7 text-gray-600 dark:text-gray-300">
                                    {feature.description}
                                </p>

                                <button className="flex items-center gap-2 font-medium text-cyan-500">
                                    Learn More
                                    <ArrowRight
                                        size={18}
                                        className="transition group-hover:translate-x-1"
                                    />
                                </button>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Features;