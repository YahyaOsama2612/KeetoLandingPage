import { motion } from 'framer-motion'
import {
  MdOutlineTableRestaurant,
  MdOutlineInventory2,
  MdOutlineLoyalty,
  MdOutlineAnalytics,
  MdOutlineNotificationsActive,
  MdOutlinePayments,
  MdOutlineGroups,
  MdOutlineSupportAgent,
} from 'react-icons/md'
import Reveal from './Reveal'

const services = [
  { icon: MdOutlineTableRestaurant, title: 'Table management', desc: 'Floor plans, reservations and turn times in one view.' },
  { icon: MdOutlineInventory2, title: 'Inventory tracking', desc: 'Auto-deduct stock as orders come in.' },
  { icon: MdOutlineLoyalty, title: 'Loyalty & rewards', desc: 'Points, stamps and repeat-customer perks.' },
  { icon: MdOutlineAnalytics, title: 'Sales analytics', desc: 'Know your best hour, dish and server.' },
  { icon: MdOutlineNotificationsActive, title: 'Live alerts', desc: 'Instant pings for delays or low stock.' },
  { icon: MdOutlinePayments, title: 'Flexible payments', desc: 'Cards, wallets and split bills, handled.' },
  { icon: MdOutlineGroups, title: 'Staff scheduling', desc: 'Shifts, roles and payroll exports.' },
  { icon: MdOutlineSupportAgent, title: '24/7 support', desc: 'Real people, always a chat away.' },
]

export default function Services() {
  return (
    <section className="py-24 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal className="max-w-2xl mx-auto text-center">
          <span className="text-sm font-semibold text-accent uppercase tracking-wide">Under the hood</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-secondary tracking-tight">
            Every day tools your team will actually use
          </h2>
        </Reveal>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.05}>
              <motion.div
                whileHover={{ scale: 1.04 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="h-full rounded-2xl border border-border bg-section p-6 text-center flex flex-col items-center hover:border-primary transition-colors"
              >
                <span className="w-11 h-11 rounded-xl bg-secondary text-primary flex items-center justify-center text-xl">
                  <s.icon />
                </span>
                <h3 className="mt-4 font-bold text-secondary text-sm">{s.title}</h3>
                <p className="mt-1.5 text-xs text-text-muted leading-relaxed">{s.desc}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
