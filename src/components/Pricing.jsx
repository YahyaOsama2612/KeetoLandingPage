import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiCheck, HiXMark, HiGlobeAlt, HiDevicePhoneMobile, HiBuildingStorefront, HiSparkles, HiArrowPath } from 'react-icons/hi2'
import Reveal from './Reveal'

const plans = [
  {
    id: 'fixed',
    name: 'Fixed by Order',
    tagline: 'Fixed amount will be added on each order',
    price: '5 EGP',
    unit: '/ order',
    startingText: 'Starting from 5 EGP / order',
    highlight: false,
    badge: 'Fixed Rate',
  },
  {
    id: 'percentage',
    name: '% by Order',
    tagline: 'Percentage amount based on order value',
    price: '2%',
    unit: '/ order',
    startingText: 'Starting from 2% / order',
    highlight: true,
    badge: 'Most Popular',
  },
  {
    id: 'subscription',
    name: 'Subscription Model',
    tagline: 'Fixed subscription amount every week',
    price: '5,000 EGP',
    unit: '/ week',
    startingText: 'Starting from 5,000 EGP / week',
    highlight: false,
    badge: 'Flat Fee',
  },
]

const onlineOrderFeatures = [
  {
    title: 'Website',
    desc: 'Branded ordering web page',
    icon: HiGlobeAlt,
  },
  {
    title: 'Mobile App',
    desc: 'Native iOS & Android app',
    icon: HiDevicePhoneMobile,
  },
  {
    title: 'Specific for your restaurant',
    desc: 'Customized menu & workflow',
    icon: HiBuildingStorefront,
  },
]

export default function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    restaurant: '',
    cuisine: '',
  })
  const [status, setStatus] = useState('idle') // 'idle' | 'sending' | 'success'

  const handleOpenModal = (plan) => {
    setSelectedPlan(plan)
    setStatus('idle')
    setFormData({
      name: '',
      phone: '',
      email: '',
      restaurant: '',
      cuisine: '',
    })
  }

  const handleCloseModal = () => {
    setSelectedPlan(null)
    setStatus('idle')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('sending')
    setTimeout(() => {
      setStatus('success')
    }, 1800)
  }

  return (
    <section id="pricing" className="py-24 sm:py-28 bg-white relative overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-primary/5 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        <Reveal className="max-w-2xl mx-auto text-center">
          <span className="text-sm font-semibold text-accent uppercase tracking-wider bg-accent/10 px-3.5 py-1 rounded-full inline-block">
            Pricing
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-secondary tracking-tight">
            Flexible options for your restaurant
          </h2>
          <p className="mt-3 text-text-muted text-base sm:text-lg">
            Choose the pricing model that fits your restaurant best.
          </p>
        </Reveal>

        {/* Pricing Cards Grid */}
        <div className="mt-14 grid lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.1} className="h-full">
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className={`relative rounded-3xl p-7 sm:p-8 h-full flex flex-col justify-between border transition-all duration-300 ${
                  p.highlight
                    ? 'bg-secondary text-white border-secondary shadow-2xl ring-2 ring-primary/60 lg:-translate-y-2'
                    : 'bg-section border-border shadow-[0_4px_20px_rgba(17,24,39,0.04)] hover:shadow-xl'
                }`}
              >
                {/* Header & Badge */}
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className={`text-xl font-bold ${p.highlight ? 'text-white' : 'text-secondary'}`}>
                      {p.name}
                    </h3>
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full ${
                        p.highlight
                          ? 'bg-primary text-secondary shadow-sm'
                          : 'bg-primary/20 text-secondary'
                      }`}
                    >
                      {p.badge}
                    </span>
                  </div>

                  <p className={`mt-2 text-sm ${p.highlight ? 'text-white/75' : 'text-text-muted'}`}>
                    {p.tagline}
                  </p>

                  {/* Pricing starting rate */}
                  <div className="mt-6 pt-5 border-t border-current/10">
                    <div className="text-xs uppercase font-semibold text-accent tracking-wider mb-1">
                      Starting From
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span className={`text-3xl sm:text-4xl font-extrabold ${p.highlight ? 'text-white' : 'text-secondary'}`}>
                        {p.price}
                      </span>
                      <span className={`text-sm font-medium ${p.highlight ? 'text-white/70' : 'text-text-muted'}`}>
                        {p.unit}
                      </span>
                    </div>
                  </div>

                  {/* Online Order Box (Included on each card as specified) */}
                  <div
                    className={`mt-6 rounded-2xl p-4 sm:p-5 border transition-colors ${
                      p.highlight
                        ? 'bg-white/10 border-white/15'
                        : 'bg-white border-border shadow-sm'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div
                        className={`p-1.5 rounded-lg ${
                          p.highlight ? 'bg-primary text-secondary' : 'bg-primary/20 text-accent'
                        }`}
                      >
                        <HiSparkles className="w-4 h-4" />
                      </div>
                      <h4 className={`text-sm font-bold tracking-wide uppercase ${p.highlight ? 'text-white' : 'text-secondary'}`}>
                        Online Order
                      </h4>
                    </div>

                    <ul className="space-y-2.5">
                      {onlineOrderFeatures.map((item, idx) => {
                        const Icon = item.icon
                        return (
                          <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                            <div className={`mt-0.5 p-1 rounded ${p.highlight ? 'bg-white/10 text-primary' : 'bg-secondary/5 text-secondary'}`}>
                              <Icon className="w-3.5 h-3.5 shrink-0" />
                            </div>
                            <div className="flex-1">
                              <span className={`font-semibold block ${p.highlight ? 'text-white' : 'text-secondary'}`}>
                                {item.title}
                              </span>
                              <span className={`text-xs ${p.highlight ? 'text-white/60' : 'text-text-muted'}`}>
                                {item.desc}
                              </span>
                            </div>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </div>

                {/* Subscribe Button */}
                <div className="mt-8 pt-4">
                  <button
                    onClick={() => handleOpenModal(p)}
                    className={`w-full py-3.5 px-6 rounded-2xl font-bold text-sm sm:text-base transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98] ${
                      p.highlight
                        ? 'bg-primary text-secondary hover:bg-primary-hover shadow-primary/20'
                        : 'bg-secondary text-white hover:bg-secondary/90 shadow-secondary/10'
                    }`}
                  >
                    Subscribe
                  </button>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Subscription Form Modal */}
      <AnimatePresence>
        {selectedPlan && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-secondary/70 backdrop-blur-md overflow-y-auto"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-border my-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-5 right-5 p-2 rounded-full text-text-muted hover:text-secondary hover:bg-secondary/5 transition-colors"
                aria-label="Close modal"
              >
                <HiXMark className="w-6 h-6" />
              </button>

              {status === 'idle' && (
                <>
                  <div className="pr-8">
                    <span className="inline-block text-xs font-bold uppercase tracking-wider bg-primary/20 text-secondary px-3 py-1 rounded-full mb-2">
                      Selected Plan: {selectedPlan.name}
                    </span>
                    <h3 className="text-2xl font-extrabold text-secondary">Complete Your Subscription</h3>
                    <p className="text-sm text-text-muted mt-1">
                      Fill in your details to subscribe to <span className="font-semibold text-secondary">{selectedPlan.name}</span> ({selectedPlan.startingText}).
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-secondary uppercase tracking-wide mb-1.5">
                        Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ahmed Hassan"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-gray-50/50 text-secondary text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-secondary uppercase tracking-wide mb-1.5">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +20 100 123 4567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-gray-50/50 text-secondary text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-secondary uppercase tracking-wide mb-1.5">
                        Email / Social *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. ahmed@restaurant.com or @instagram_handle"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-gray-50/50 text-secondary text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-secondary uppercase tracking-wide mb-1.5">
                        Restaurant Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Tasty Bites"
                        value={formData.restaurant}
                        onChange={(e) => setFormData({ ...formData, restaurant: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-gray-50/50 text-secondary text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-secondary uppercase tracking-wide mb-1.5">
                        Cuisine / Type
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Fast Food, Italian, Cafe"
                        value={formData.cuisine}
                        onChange={(e) => setFormData({ ...formData, cuisine: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-gray-50/50 text-secondary text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full py-4 rounded-xl bg-primary hover:bg-primary-hover text-secondary font-bold text-base shadow-lg shadow-primary/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
                      >
                        Submit Request
                      </button>
                    </div>
                  </form>
                </>
              )}

              {status === 'sending' && (
                <div className="py-12 flex flex-col items-center justify-center text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                    className="p-3 bg-primary/20 text-secondary rounded-full"
                  >
                    <HiArrowPath className="w-10 h-10" />
                  </motion.div>
                  <h4 className="mt-5 text-xl font-extrabold text-secondary">Sending Subscription Request...</h4>
                  <p className="mt-2 text-sm text-text-muted">
                    Please wait while we process your request for {selectedPlan.name}.
                  </p>
                </div>
              )}

              {status === 'success' && (
                <div className="py-8 flex flex-col items-center justify-center text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                    className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4 shadow-sm"
                  >
                    <HiCheck className="w-10 h-10" />
                  </motion.div>

                  <h4 className="text-2xl font-extrabold text-secondary">Request Sent Successfully!</h4>
                  <p className="mt-3 text-sm text-text-muted leading-relaxed max-w-sm">
                    Thank you <span className="font-semibold text-secondary">{formData.name}</span>! We have received your request for <span className="font-semibold text-secondary">{formData.restaurant}</span> under the <span className="font-semibold text-secondary">{selectedPlan.name}</span> plan. Our team will get in touch with you shortly.
                  </p>

                  <button
                    onClick={handleCloseModal}
                    className="mt-8 w-full py-3.5 rounded-xl bg-secondary text-white hover:bg-secondary/90 font-bold text-sm shadow-md transition-all"
                  >
                    Close
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
