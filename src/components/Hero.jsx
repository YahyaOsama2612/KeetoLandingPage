import { motion } from "framer-motion";
import { HiArrowRight, HiPlay } from "react-icons/hi2";
import { FaStar } from "react-icons/fa";
import Reveal from "./Reveal";
import heroImage from "../assets/image_2022_05_06T11_30_27_643Z (1).png";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28 min-h-screen"
      style={{
        backgroundColor: "#0f172a",
        backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.25), rgba(15, 23, 42, 0.25)), url("${heroImage}")`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/25" />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <div className="max-w-3xl">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white shadow-sm backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Restaurant tech, all in one place
            </span>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-6 text-[2.8rem] leading-[1.05] sm:text-6xl font-extrabold text-white tracking-tight">
              Run your whole restaurant from one screen
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-6 text-lg text-white/80 max-w-xl leading-relaxed">
              Keeto bundles QR menus, online ordering, a kitchen dashboard and
              delivery tracking into one calm, connected system — so every order
              lands in the right hands the first time.
            </p>
          </Reveal>

          <Reveal
            delay={0.24}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href="#clients"
              className="group inline-flex items-center gap-2 rounded-xl bg-primary hover:bg-primary-hover text-secondary font-semibold px-7 py-3.5 shadow-[0_10px_25px_rgba(250,204,21,0.4)] transition-all hover:-translate-y-0.5"
            >
              Start free trial
              <HiArrowRight className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#journey"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-7 py-3.5 font-semibold text-white hover:border-white transition-colors"
            >
              <span className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center">
                <HiPlay size={14} />
              </span>
              See how it works
            </a>
          </Reveal>

          <Reveal
            delay={0.32}
            className="mt-12 flex flex-wrap items-center gap-8 text-white/90"
          >
            <div>
              <p className="text-2xl font-extrabold">1,200+</p>
              <p className="text-sm text-white/70">Restaurants onboard</p>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div>
              <p className="text-2xl font-extrabold">98%</p>
              <p className="text-sm text-white/70">Orders on time</p>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="flex items-center gap-1">
              <FaStar className="text-primary" />
              <p className="text-2xl font-extrabold">4.9</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
