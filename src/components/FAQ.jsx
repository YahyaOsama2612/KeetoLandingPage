import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiChevronDown } from "react-icons/hi2";
import Reveal from "./Reveal";

const faqs = [
  {
    q: "Do I need special hardware for the QR menu?",
    a: "No. Print the QR codes we generate for you, or place them on table tents — guests just use their own phone camera.",
  },
  {
    q: "Can I use Keeto with my existing POS?",
    a: "Yes, Keeto integrates with most popular POS systems, or you can use our built-in POS instead.",
  },
  {
    q: "How long does setup take?",
    a: "Most single-location restaurants are live within a day. Multi-location groups typically take about a week.",
  },
  {
    q: "Is there a contract or can I cancel any time?",
    a: "All plans are month-to-month by default. Yearly billing is optional and can be cancelled at renewal.",
  },
  {
    q: "Do you support delivery drivers we already work with?",
    a: "Yes — connect your own driver roster or third-party couriers alongside Keeto\u2019s dispatch tools.",
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section id="faq" className="py-24 sm:py-28 bg-white">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <Reveal className="text-center">
          <span className="text-sm font-semibold text-accent uppercase tracking-wide">
            FAQ
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-secondary tracking-tight">
            Questions, answered
          </h2>
        </Reveal>

        <div className="mt-12 flex flex-col gap-4">
          {faqs.map((f, i) => {
            const open = openIdx === i;
            return (
              <Reveal key={f.q} delay={i * 0.05}>
                <div className="rounded-2xl border border-border bg-section overflow-hidden">
                  <button
                    onClick={() => setOpenIdx(open ? -1 : i)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                    aria-expanded={open}
                  >
                    <span className="font-semibold text-secondary">{f.q}</span>
                    <motion.span
                      animate={{ rotate: open ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="shrink-0 w-8 h-8 rounded-full bg-white border border-border flex items-center justify-center text-secondary"
                    >
                      <HiChevronDown />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-5 text-text-muted text-sm leading-relaxed">
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
