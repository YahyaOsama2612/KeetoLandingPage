import { motion } from "framer-motion";
import { HiCheckCircle } from "react-icons/hi2";
import { MdInsights } from "react-icons/md";
import Reveal from "./Reveal";

const points = [
  "Set up your first menu and QR codes in under an hour",
  "Every channel — dine-in, pickup, delivery — in one order queue",
  "Real-time inventory sync so nothing oversells",
  "Built-in analytics on your best-selling items and peak hours",
];

export default function About() {
  return (
    <section id="about" className="py-24 sm:py-28 bg-section">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-14 items-center">
        <Reveal>
          <span className="text-sm font-semibold text-accent uppercase tracking-wide">
            Why Keeto
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-secondary tracking-tight leading-tight">
            Built by people who've worked a Friday night rush
          </h2>
          <p className="mt-5 text-text-muted text-lg leading-relaxed">
            We started Keeto after watching too many kitchens juggle four
            different tablets for four different apps. So we built the one
            operations management system we wished we'd had — simple enough
            for a two-person café, sturdy enough for a twelve-location group.
          </p>

          <ul className="mt-8 flex flex-col gap-4">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <HiCheckCircle className="text-accent text-xl mt-0.5 shrink-0" />
                <span className="text-secondary font-medium">{p}</span>
              </li>
            ))}
          </ul>

          <a
            href="#pricing"
            className="mt-9 inline-flex items-center gap-2 rounded-xl bg-secondary text-white font-semibold px-7 py-3.5 hover:bg-secondary/90 transition-colors"
          >
            Explore plans
          </a>
        </Reveal>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-[4/3] rounded-[2rem] bg-gradient-to-br from-primary/30 via-primary/10 to-white border border-border overflow-hidden flex items-center justify-center"
        >
          <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-primary/40 blur-2xl" />
          <div className="absolute -bottom-14 -right-10 w-52 h-52 rounded-full bg-accent/20 blur-2xl" />

          <div className="relative rounded-2xl bg-white shadow-xl border border-border px-8 py-10 flex flex-col items-center gap-4 text-center">
            <span className="w-16 h-16 rounded-2xl bg-secondary text-primary flex items-center justify-center text-3xl">
              <MdInsights />
            </span>
            <p className="text-sm font-semibold text-text-muted">This week</p>
            <p className="text-4xl font-extrabold text-secondary">+18.4%</p>
            <p className="text-sm text-text-muted">average order growth</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
