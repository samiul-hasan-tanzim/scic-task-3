"use client";

import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl bg-linear-to-br from-cyan-500 via-blue-600 to-indigo-700 px-8 py-16 text-center text-white shadow-xl md:px-16"
      >
        {/* Glow */}
        <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />

        <Sparkles size={32} className="mx-auto" />

        <h2 className="mt-6 text-3xl font-bold md:text-4xl">
          Ready to scale your infrastructure?
        </h2>

        <p className="mx-auto mt-4 max-w-lg text-lg text-white/80">
          Join thousands of developers and enterprises already building with
          TechStack Pro.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/register"
            className="flex items-center gap-2 rounded-2xl bg-white px-8 py-3 font-semibold text-cyan-700 transition hover:scale-105"
          >
            Get Started Free
            <ArrowRight size={18} />
          </Link>

          <Link
            href="/explore"
            className="flex items-center gap-2 rounded-2xl border border-white/30 px-8 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            Browse Solutions
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
