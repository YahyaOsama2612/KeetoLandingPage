import { motion } from 'framer-motion'
import {
  MdQrCodeScanner,
  MdOutlineLanguage,
  MdOutlinePhoneIphone,
  MdOutlineDashboard,
  MdOutlinePointOfSale,
  MdOutlineDeliveryDining,
} from 'react-icons/md'
import Reveal from './Reveal'

const features = [
  {
    icon: MdQrCodeScanner,
    title: 'QR Menu',
    desc: 'Guests scan, browse and order straight from the table — no app download required.',
  },
  {
    icon: MdOutlineLanguage,
    title: 'Website Ordering',
    desc: 'A branded ordering page that plugs into your existing website in minutes.',
  },
  {
    icon: MdOutlinePhoneIphone,
    title: 'Mobile App',
    desc: 'Give regulars a fast, native way to reorder favorites and track loyalty perks.',
  },
  {
    icon: MdOutlineDashboard,
    title: 'Admin Dashboard',
    desc: 'One screen for menus, staff, inventory and sales — updated in real time.',
  },
  {
    icon: MdOutlinePointOfSale,
    title: 'POS',
    desc: 'A point-of-sale built for speed at the counter, synced with every other channel.',
  },
  {
    icon: MdOutlineDeliveryDining,
    title: 'Delivery App',
    desc: 'Route orders to drivers automatically and share live tracking with customers.',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-24 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal className="max-w-2xl mx-auto text-center">
          <span className="text-sm font-semibold text-accent uppercase tracking-wide">Everything, connected</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-secondary tracking-tight">
            One platform for every part of service
          </h2>
          <p className="mt-4 text-text-muted text-lg">
            Six tools that used to be six vendors — now working from the same order feed.
          </p>
        </Reveal>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.06}>
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="h-full rounded-2xl border border-border bg-section p-7 shadow-[0_2px_10px_rgba(17,24,39,0.04)] hover:shadow-[0_20px_35px_rgba(17,24,39,0.08)] transition-shadow"
              >
                <span className="w-12 h-12 rounded-xl bg-primary/20 text-accent flex items-center justify-center text-2xl">
                  <f.icon />
                </span>
                <h3 className="mt-5 text-lg font-bold text-secondary">{f.title}</h3>
                <p className="mt-2 text-sm text-text-muted leading-relaxed">{f.desc}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
