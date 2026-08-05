import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import logo from "../assets/logo.webp";

const links = [
  { label: "Features", href: "#features" },
  { label: "About", href: "#about" },
  /*  { label: "Pricing", href: "#pricing" }, */
  { label: "How it works", href: "#journey" },
  { label: "Reviews", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-[0_4px_20px_rgba(17,24,39,0.06)]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-5 sm:px-8 py-4">
        <a
          href="#top"
          className="flex items-center gap-2 font-bold text-lg text-secondary"
        >
          <img src={logo} alt="Keeto logo" className="h-9 w-auto" />
        </a>
        {/* hidden lg:flex items-center gap-8 text-sm font-medium */}
        <ul
          className={`hidden lg:flex items-center gap-8 text-sm font-medium ${
            scrolled ? "text-2xl text-secondary" : "text-white/90"
          }`}
        >
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="hover:text-secondary transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="hidden lg:flex items-center gap-3">
          {/*  <a
            href="#contact"
            className="text-sm font-semibold text-secondary hover:text-accent transition-colors"
          >
            Log in
          </a> */}
          <a
            href="#clients"
            className="rounded-xl bg-primary hover:bg-primary-hover text-secondary font-semibold text-sm px-5 py-2.5 shadow-[0_8px_20px_rgba(250,204,21,0.35)] transition-all hover:-translate-y-0.5 active:translate-y-0"
          >
            Get started free
          </a>
        </div>
        {/* lg:hidden p-2 rounded-lg
         */}{" "}
        <button
          onClick={() => setOpen(true)}
          className={`lg:hidden p-2 rounded-lg ${
            scrolled
              ? "text-secondary"
              : "text-white/90"
          }`}
          aria-label="Open menu"
        >
          <HiMenu size={26} />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-secondary/50 backdrop-blur-sm lg:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="absolute right-0 top-0 h-full w-[78%] max-w-xs bg-white p-6 flex flex-col gap-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-secondary">Menu</span>
                <button onClick={() => setOpen(false)} aria-label="Close menu">
                  <HiX size={24} />
                </button>
              </div>
              <ul className="flex flex-col gap-5 text-base font-medium text-text-muted">
                {links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="hover:text-secondary"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
              {/*               <a
                href="#pricing"
                onClick={() => setOpen(false)}
                className="mt-auto rounded-xl bg-primary hover:bg-primary-hover text-secondary font-semibold text-center px-5 py-3"
              >
                Get started free
              </a> */}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
