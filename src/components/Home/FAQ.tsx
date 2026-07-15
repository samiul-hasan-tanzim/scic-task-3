"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How does the free tier work?",
    a: "Our free tier includes 10GB bandwidth, 1GB storage, and full access to the dashboard. No credit card required.",
  },
  {
    q: "Can I migrate from another provider?",
    a: "Yes. We provide migration tools and documentation for AWS, GCP, Azure, and self-hosted setups.",
  },
  {
    q: "What kind of support do you offer?",
    a: "All plans include email support. Pro and Enterprise plans include 24/7 live chat and phone support.",
  },
  {
    q: "Is my data secure?",
    a: "All data is encrypted at rest and in transit. We are SOC 2 compliant and undergo regular third-party audits.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Absolutely. No lock-in contracts. You can cancel from your dashboard and your data will be exported.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="border-y border-gray-200 bg-gray-50 px-6 py-24 dark:border-gray-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-500">
            FAQ
          </span>

          <h2 className="mt-6 text-4xl font-bold md:text-5xl">
            Frequently asked{" "}
            <span className="bg-linear-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
              questions.
            </span>
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-zinc-900"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left font-medium"
                >
                  {faq.q}
                  <ChevronDown
                    size={18}
                    className={`shrink-0 transition ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen && (
                  <div className="border-t border-gray-100 px-6 pb-5 pt-3 text-sm leading-7 text-gray-600 dark:border-gray-800 dark:text-gray-400">
                    {faq.a}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
