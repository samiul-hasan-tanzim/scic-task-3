"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { MessageSquare, Mail, BookOpen, ChevronDown, LifeBuoy, FileText, Users, Shield } from "lucide-react";

const faqs = [
  {
    q: "How do I get started?",
    a: "Sign up for a free account, browse the marketplace, and install any solution with one click. Each listing includes docs and setup guides.",
  },
  {
    q: "Can I sell my own solutions?",
    a: "Yes! Once registered, head to your dashboard and use the Add Item form to publish your tools. All submissions are reviewed for quality.",
  },
  {
    q: "What payment methods are accepted?",
    a: "We accept all major credit cards, PayPal, and cryptocurrency. Enterprise billing is also available for teams.",
  },
  {
    q: "Is there a refund policy?",
    a: "Absolutely. If a solution doesn't meet your needs, you can request a full refund within 14 days of purchase.",
  },
  {
    q: "How do I contact the seller?",
    a: "Each product page has a contact button. You can also reach out to our support team and we'll connect you directly.",
  },
  {
    q: "Are the solutions secure?",
    a: "Every submission is scanned for vulnerabilities and reviewed by our team. We also encourage community reporting.",
  },
];

const categories = [
  { icon: BookOpen, title: "Documentation", desc: "Browse guides and API references for every solution on the platform." },
  { icon: MessageSquare, title: "Community Forum", desc: "Join discussions, share tips, and get help from fellow developers." },
  { icon: Mail, title: "Email Support", desc: "Reach our team directly at support@techstackpro.com for personal assistance." },
  { icon: LifeBuoy, title: "Live Chat", desc: "Chat with our support team in real time during business hours." },
];

export default function Support() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-14 text-center"
      >
        <h1 className="text-4xl font-bold">How can we help you?</h1>
        <p className="mx-auto mt-3 max-w-xl text-gray-600 dark:text-gray-400">
          Browse our resources, check the FAQ, or reach out to the team directly.
        </p>
      </motion.div>

      {/* Support Categories */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <div
              key={cat.title}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400">
                <Icon size={20} />
              </div>
              <h3 className="mt-4 font-semibold">{cat.title}</h3>
              <p className="mt-1 text-sm text-gray-500">{cat.desc}</p>
            </div>
          );
        })}
      </motion.div>

      <div className="mb-14 grid gap-10 lg:grid-cols-5">
        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-3"
        >
          <h2 className="mb-6 text-2xl font-bold">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className="rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="flex w-full items-center justify-between px-6 py-4 text-left font-medium"
                  >
                    {faq.q}
                    <ChevronDown
                      size={18}
                      className={`shrink-0 transition ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="border-t border-gray-200 px-6 pb-4 pt-3 text-sm text-gray-600 dark:border-zinc-800 dark:text-gray-400">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2"
        >
          <h2 className="mb-6 text-2xl font-bold">Send a Message</h2>

          {sent ? (
            <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
              <Mail size={40} className="mx-auto text-cyan-500" />
              <h3 className="mt-4 text-lg font-semibold">Message Sent!</h3>
              <p className="mt-2 text-sm text-gray-500">
                Our team will get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
              <div>
                <label className="mb-2 block text-sm font-medium">Name</label>
                <input
                  required
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-cyan-500 dark:border-zinc-700 dark:bg-zinc-950"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Email</label>
                <input
                  type="email"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-cyan-500 dark:border-zinc-700 dark:bg-zinc-950"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Subject</label>
                <select className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-cyan-500 dark:border-zinc-700 dark:bg-zinc-950">
                  <option>General Inquiry</option>
                  <option>Technical Support</option>
                  <option>Billing</option>
                  <option>Report an Issue</option>
                  <option>Partnership</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Message</label>
                <textarea
                  required
                  rows={4}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-cyan-500 dark:border-zinc-700 dark:bg-zinc-950"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-xl bg-cyan-500 py-3 font-semibold text-white transition hover:bg-cyan-600"
              >
                Send Message
              </button>
            </form>
          )}
        </motion.div>
      </div>

      {/* Additional Resources */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid gap-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 sm:grid-cols-3"
      >
        {[
          { icon: FileText, label: "Terms of Service", href: "#" },
          { icon: Shield, label: "Privacy Policy", href: "#" },
          { icon: Users, label: "Community Guidelines", href: "#" },
        ].map((r) => {
          const Icon = r.icon;
          return (
            <Link
              key={r.label}
              href={r.href}
              className="flex items-center gap-3 rounded-xl p-4 transition hover:bg-gray-50 dark:hover:bg-zinc-900"
            >
              <Icon size={20} className="text-cyan-500" />
              <span className="font-medium">{r.label}</span>
            </Link>
          );
        })}
      </motion.div>
    </div>
  );
}
