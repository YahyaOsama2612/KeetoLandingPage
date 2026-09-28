import { useState, useCallback } from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa6";
import logo from "../assets/logo.webp";
import LegalModal from "./LegalModal";

// Links with a `legal` key open the modal on that tab; the rest stay as anchors.
const columns = [
  {
    title: "Product",
    links: [
      { label: "Features" },
      { label: "Pricing" },
      { label: "How it works" },
      { label: "Integrations" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", legal: "about-us" },
      { label: "Careers" },
      { label: "Blog" },
      { label: "Contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Help center" },
      { label: "API docs" },
      { label: "Community" },
      { label: "Status" },
    ],
  },
];

const legalLinks = [
  { label: "Privacy policy", legal: "privacy-policy" },
  { label: "Terms of service", legal: "terms-conditions" },
  { label: "Refund policy", legal: "refund-policy" },
];

export default function Footer() {
  const [activeLegalTab, setActiveLegalTab] = useState(null);

  const closeLegal = useCallback(() => setActiveLegalTab(null), []);

  return (
    <footer className="bg-secondary text-white pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <a
              href="#top"
              className="flex items-center gap-2 font-bold text-lg"
            >
              <img src={logo} alt="Keeto logo" className="h-9 w-auto" />
            </a>
            <p className="mt-4 text-sm text-white/60 leading-relaxed max-w-xs">
              The connected operating system for restaurants — ordering, kitchen
              and delivery in one calm dashboard.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://www.instagram.com/keeto_app"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary hover:text-secondary flex items-center justify-center transition-colors"
              >
                <FaInstagram size={14} />
              </a>
              <a
                href="https://www.facebook.com/keetoapp"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary hover:text-secondary flex items-center justify-center transition-colors"
              >
                <FaFacebookF size={14} />
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-semibold text-sm mb-4">{col.title}</h4>
              <ul className="flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {l.legal ? (
                      <button
                        type="button"
                        onClick={() => setActiveLegalTab(l.legal)}
                        className="text-sm text-white/60 hover:text-primary transition-colors text-left"
                      >
                        {l.label}
                      </button>
                    ) : (
                      <a
                        href="#top"
                        className="text-sm text-white/60 hover:text-primary transition-colors"
                      >
                        {l.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>&copy; {new Date().getFullYear()} Keeto. All rights reserved.</p>
          <div className="flex items-center gap-6">
            {legalLinks.map((l) => (
              <button
                key={l.legal}
                type="button"
                onClick={() => setActiveLegalTab(l.legal)}
                className="hover:text-primary transition-colors"
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <LegalModal
        activeTab={activeLegalTab}
        onClose={closeLegal}
        onSelectTab={setActiveLegalTab}
      />
    </footer>
  );
}