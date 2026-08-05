import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import Reveal from "./Reveal";

const testimonials = [
  {
    name: "Amina Rahed",
    role: "Owner, Basil & Co",
    quote:
      "Our QR ordering cut ticket times almost in half. The kitchen finally isn\u2019t guessing what\u2019s coming next.",
    initials: "AR",
  },
  {
    name: "Mostafa Mohamed",
    role: "Ops lead, Northside Diner",
    quote:
      "Switching from three separate apps to Keeto saved us hours of admin every single week.",
    initials: "MM",
  },
  {
    name: "Salma Tawfik",
    role: "Founder, Casa Verde",
    quote:
      "Delivery tracking alone paid for the subscription — fewer angry calls, happier drivers.",
    initials: "ST",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 sm:py-28 bg-section">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal className="max-w-2xl mx-auto text-center">
          <span className="text-sm font-semibold text-accent uppercase tracking-wide">
            Reviews
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-secondary tracking-tight">
            Loved by teams who serve the rush
          </h2>
        </Reveal>

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="h-full rounded-2xl bg-white border border-border p-7 shadow-[0_2px_10px_rgba(17,24,39,0.04)]"
              >
                <div className="flex gap-1 text-primary">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <FaStar key={idx} />
                  ))}
                </div>
                <p className="mt-4 text-secondary leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <span className="w-11 h-11 rounded-full bg-secondary text-primary font-bold flex items-center justify-center text-sm">
                    {t.initials}
                  </span>
                  <div>
                    <p className="font-bold text-secondary text-sm">{t.name}</p>
                    <p className="text-xs text-text-muted">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
