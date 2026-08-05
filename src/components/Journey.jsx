import { motion } from 'framer-motion'
import { MdOutlineReceiptLong, MdOutlineDashboard, MdOutlineSoupKitchen, MdOutlineDeliveryDining } from 'react-icons/md'
import { HiOutlineHome } from 'react-icons/hi2'
import Reveal from './Reveal'

const steps = [
  { icon: MdOutlineReceiptLong, title: 'Customer orders', desc: 'From table, website or app — order hits the queue instantly.' },
  { icon: MdOutlineDashboard, title: 'Admin receives', desc: 'The order is confirmed and assigned in the dashboard.' },
  { icon: MdOutlineSoupKitchen, title: 'Kitchen prepares', desc: 'Ticket prints on the kitchen display, prep begins.' },
  { icon: MdOutlineDeliveryDining, title: 'Driver dispatched', desc: 'Nearest available driver is routed automatically.' },
  { icon: HiOutlineHome, title: 'Customer receives', desc: 'Live tracking ends with the order at the door.' },
]

export default function Journey() {
  return (
    <section id="journey" className="py-24 sm:py-28 bg-section overflow-hidden">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <Reveal className="text-center max-w-xl mx-auto">
          <span className="text-sm font-semibold text-accent uppercase tracking-wide">How it works</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-secondary tracking-tight">
            One order, five steps, zero confusion
          </h2>
        </Reveal>

        <div className="mt-16 relative">
          <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px sm:-translate-x-1/2 bg-border" />
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            style={{ transformOrigin: 'top' }}
            className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px sm:-translate-x-1/2 journey-line"
          />

          <div className="flex flex-col gap-10">
            {steps.map((s, i) => (
              <Reveal
                key={s.title}
                delay={i * 0.1}
                className={`relative flex items-start sm:items-center gap-6 sm:gap-10 ${
                  i % 2 === 1 ? 'sm:flex-row-reverse sm:text-right' : ''
                }`}
              >
                <div className="relative z-10 shrink-0 w-12 h-12 rounded-full bg-primary text-secondary flex items-center justify-center text-xl shadow-[0_8px_20px_rgba(250,204,21,0.4)] ml-0 sm:ml-0">
                  <s.icon />
                </div>
                <div className="rounded-2xl bg-white border border-border shadow-sm px-6 py-5 flex-1 sm:max-w-sm">
                  <p className="text-xs font-bold text-accent uppercase tracking-wide">Step {i + 1}</p>
                  <h3 className="mt-1 text-lg font-bold text-secondary">{s.title}</h3>
                  <p className="mt-1.5 text-sm text-text-muted leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
