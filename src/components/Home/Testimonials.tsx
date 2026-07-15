"use client";

import { motion } from "motion/react";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "We cut our deployment time by 70% after moving to TechStack Pro. The infrastructure just works.",
    name: "Sarah Chen",
    role: "CTO, Nova Labs",
  },
  {
    quote:
      "The monitoring and analytics tools gave us visibility we never had before. Absolute game changer.",
    name: "Marcus Rivera",
    role: "Lead Engineer, Bluecore",
  },
  {
    quote:
      "Enterprise-grade security without the enterprise complexity. Onboarded our whole team in a day.",
    name: "Priya Patel",
    role: "VP Engineering, Datalign",
  },
];

export default function Testimonials() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-500">
            Testimonials
          </span>

          <h2 className="mt-6 text-4xl font-bold md:text-5xl">
            Trusted by{" "}
            <span className="bg-linear-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
              engineering teams.
            </span>
          </h2>

          <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
            See why leading companies choose TechStack Pro to power their
            infrastructure.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-zinc-900"
            >
              <Quote size={28} className="mb-4 text-cyan-500/30" />

              <p className="mb-6 leading-7 text-gray-600 dark:text-gray-300">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="border-t border-gray-100 pt-4 dark:border-gray-800">
                <p className="font-semibold">{t.name}</p>
                <p className="text-sm text-gray-500">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
