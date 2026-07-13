"use client";

import { Cloud, Cpu, Database, GitBranch, Server, Shield } from "lucide-react";
import { motion } from "motion/react";

const integrations = [
    {
        icon: GitBranch,
        name: "GitHub",
    },
    {
        icon: Database,
        name: "MongoDB",
    },
    {
        icon: Cloud,
        name: "AWS",
    },
    {
        icon: Server,
        name: "Vercel",
    },
    {
        icon: Shield,
        name: "Cloudflare",
    },
    {
        icon: Cpu,
        name: "Docker",
    },
];

const Integrations = () => {
    return (
        <section className="relative overflow-hidden px-6 py-24">
            {/* Background Glow */}
            <div className="absolute left-1/2 top-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />

            <div className="relative mx-auto max-w-7xl">
                {/* Heading */}
                <motion.div
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
                        duration: 0.6,
                    }}
                    className="mx-auto mb-16 max-w-3xl text-center"
                >
                    <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-500">
                        Integrations
                    </span>

                    <h2 className="mt-6 text-4xl font-bold md:text-5xl">
                        Works seamlessly with your{" "}
                        <span className="bg-linear-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                            favorite tools.
                        </span>
                    </h2>

                    <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
                        Connect your existing infrastructure and ship faster
                        with powerful integrations.
                    </p>
                </motion.div>

                {/* Cards */}
                <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
                    {integrations.map((item, index) => {
                        const Icon = item.icon;

                        return (
                            <motion.div
                                key={item.name}
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
                                    delay: index * 0.1,
                                }}
                                whileHover={{
                                    y: -8,
                                }}
                                className="
                  group
                  flex
                  flex-col
                  items-center
                  gap-4
                  rounded-3xl
                  border
                  border-gray-200
                  bg-white/60
                  p-8
                  backdrop-blur-xl
                  transition
                  dark:border-gray-800
                  dark:bg-zinc-900/60
                "
                            >
                                <div
                                    className="
                    rounded-2xl
                    bg-cyan-500/10
                    p-4
                    text-cyan-500
                    transition
                    group-hover:scale-110
                  "
                                >
                                    <Icon size={34} />
                                </div>

                                <h3 className="font-semibold">
                                    {item.name}
                                </h3>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Integrations;