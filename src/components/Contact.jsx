import { useState } from "react";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa";
import Reveal from "./Reveal";

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="py-24 sm:py-28 bg-section">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-5 gap-10">
        <Reveal className="lg:col-span-2">
          <span className="text-sm font-semibold text-accent uppercase tracking-wide">
            Contact
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-secondary tracking-tight">
            Let's set up your restaurant
          </h2>
          <p className="mt-4 text-text-muted leading-relaxed">
            Tell us a bit about your business and we'll walk you through a plan
            that fits.
          </p>

          <div className="mt-9 flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-white border border-border flex items-center justify-center text-accent">
                <HiOutlineMail />
              </span>
              <span className="text-secondary font-medium text-sm">
                info@Keeto.org
              </span>
            </div>
            <a
              href="tel:+201111771103"
              className="flex items-center gap-3 group w-fit"
            >
              <span className="w-10 h-10 rounded-xl bg-white border border-border flex items-center justify-center text-accent transition-colors group-hover:bg-primary/10">
                <HiOutlinePhone />
              </span>
              <span className="text-secondary font-medium text-sm group-hover:text-primary transition-colors">
                +20 11 1177 1103
              </span>
            </a>
            <a
              href="https://wa.me/201111771103"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 group w-fit"
            >
              <span className="w-10 h-10 rounded-xl bg-white border border-border flex items-center justify-center text-accent transition-colors group-hover:bg-primary/10">
                <FaWhatsapp />
              </span>
              <span className="text-secondary font-medium text-sm group-hover:text-primary transition-colors">
                +20 11 1177 1103
              </span>
            </a>
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-white border border-border flex items-center justify-center text-accent">
                <HiOutlineLocationMarker />
              </span>
              <span className="text-secondary font-medium text-sm">
                Smouha, Hatem mosque street, Alexandria{" "}
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-3">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl bg-white border border-border shadow-[0_2px_10px_rgba(17,24,39,0.04)] p-7 sm:p-9 grid sm:grid-cols-2 gap-5"
          >
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="name"
                className="text-sm font-semibold text-secondary"
              >
                Name
              </label>
              <input
                id="name"
                required
                type="text"
                placeholder="Jamie Rivera"
                className="rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-shadow"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-sm font-semibold text-secondary"
              >
                Email
              </label>
              <input
                id="email"
                required
                type="email"
                placeholder="jamie@restaurant.com"
                className="rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-shadow"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="phone"
                className="text-sm font-semibold text-secondary"
              >
                Phone
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                className="rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-shadow"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="restaurant"
                className="text-sm font-semibold text-secondary"
              >
                Restaurant name
              </label>
              <input
                id="restaurant"
                type="text"
                placeholder="The Daily Bowl"
                className="rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-shadow"
              />
            </div>
            <div className="sm:col-span-2 flex flex-col gap-1.5">
              <label
                htmlFor="message"
                className="text-sm font-semibold text-secondary"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                placeholder="Tell us about your locations and what you need help with..."
                className="rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-shadow resize-none"
              />
            </div>

            <button
              type="submit"
              className="sm:col-span-2 rounded-xl bg-primary hover:bg-primary-hover text-secondary font-semibold px-6 py-3.5 transition-all hover:-translate-y-0.5"
            >
              {sent ? "Message sent — we\u2019ll be in touch" : "Send message"}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
