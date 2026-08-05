import { useState } from 'react'
import { motion } from 'framer-motion'
import { HiCheck } from 'react-icons/hi2'
import Reveal from './Reveal'

const plans = [
  {
    name: 'Starter',
    tagline: 'For a single counter or food truck',
    monthly: 29,
    yearly: 24,
    features: ['1 location', 'QR menu & ordering', 'Basic dashboard', 'Email support'],
    highlight: false,
  },
  {
    name: 'Growth',
    tagline: 'For restaurants ready to scale',
    monthly: 79,
    yearly: 65,
    features: [
      'Up to 5 locations',
      'Website + mobile ordering',
      'POS integration',
      'Delivery routing',
      'Priority support',
    ],
    highlight: true,
  },
  {
    name: 'Group',
    tagline: 'For multi-location brands',
    monthly: 149,
    yearly: 125,
    features: [
      'Unlimited locations',
      'Advanced analytics',
      'Custom branding',
      'Dedicated success manager',
      'API access',
    ],
    highlight: false,
  },
]

export default function Pricing() {
  const [yearly, setYearly] = useState(false)

  return (
    <section id="pricing" className="py-24 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal className="max-w-2xl mx-auto text-center">
          <span className="text-sm font-semibold text-accent uppercase tracking-wide">Pricing</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-secondary tracking-tight">
            Simple plans that grow with you
          </h2>
          <p className="mt-4 text-text-muted text-lg">No setup fees. Cancel any time.</p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 flex items-center justify-center gap-4">
          <span className={`font-semibold ${!yearly ? 'text-secondary' : 'text-text-muted'}`}>Monthly</span>
          <button
            onClick={() => setYearly((v) => !v)}
            className="relative w-14 h-8 rounded-full bg-secondary/10 transition-colors"
            aria-label="Toggle yearly pricing"
          >
            <motion.span
              className="absolute top-1 left-1 w-6 h-6 rounded-full bg-primary shadow-sm"
              animate={{ x: yearly ? 24 : 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          </button>
          <span className={`font-semibold ${yearly ? 'text-secondary' : 'text-text-muted'}`}>
            Yearly <span className="text-accent text-xs font-bold ml-1">Save 20%</span>
          </span>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-3 gap-7 items-start">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={`relative rounded-2xl p-8 h-full flex flex-col border ${
                  p.highlight
                    ? 'bg-secondary text-white border-secondary shadow-2xl md:scale-105'
                    : 'bg-section border-border shadow-[0_2px_10px_rgba(17,24,39,0.04)]'
                }`}
              >
                {p.highlight && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-primary text-secondary text-xs font-bold px-4 py-1.5 shadow-md">
                    Most popular
                  </span>
                )}
                <h3 className={`text-lg font-bold ${p.highlight ? 'text-white' : 'text-secondary'}`}>{p.name}</h3>
                <p className={`mt-1 text-sm ${p.highlight ? 'text-white/60' : 'text-text-muted'}`}>{p.tagline}</p>

                <div className="mt-6 flex items-end gap-1">
                  <span className={`text-4xl font-extrabold ${p.highlight ? 'text-white' : 'text-secondary'}`}>
                    ${yearly ? p.yearly : p.monthly}
                  </span>
                  <span className={`pb-1 text-sm ${p.highlight ? 'text-white/60' : 'text-text-muted'}`}>
                    /month
                  </span>
                </div>

                <ul className="mt-7 flex flex-col gap-3 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <HiCheck className={`mt-0.5 shrink-0 ${p.highlight ? 'text-primary' : 'text-accent'}`} />
                      <span className={p.highlight ? 'text-white/85' : 'text-text-muted'}>{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={`mt-8 text-center rounded-xl font-semibold px-6 py-3 transition-colors ${
                    p.highlight
                      ? 'bg-primary text-secondary hover:bg-primary-hover'
                      : 'bg-secondary text-white hover:bg-secondary/90'
                  }`}
                >
                  Choose {p.name}
                </a>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
