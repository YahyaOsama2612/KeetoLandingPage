import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiXMark, HiDocumentText, HiInformationCircle, HiShieldCheck, HiArrowPath, HiCheckCircle } from "react-icons/hi2";
import { legalData } from "../data/legalData";

const tabItems = [
  { id: "refund-policy", label: "Refund Policy", icon: HiArrowPath },
  { id: "terms-conditions", label: "Terms & Conditions", icon: HiDocumentText },
  { id: "about-us", label: "About Us", icon: HiInformationCircle },
  { id: "privacy-policy", label: "Privacy Policy", icon: HiShieldCheck },
];

export default function LegalModal({ activeTab, onClose, onSelectTab }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (activeTab) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [activeTab, onClose]);

  if (!activeTab) return null;

  const currentData = legalData[activeTab] || legalData["refund-policy"];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-secondary/70 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-border flex flex-col overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-6 pt-6 pb-4 border-b border-border bg-slate-50/80 flex items-center justify-between shrink-0">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent">
                <span>Keeto Restaurant Platform</span>
                <span>•</span>
                <span>SaaS Customized</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-secondary mt-0.5">
                {currentData.title}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white shadow-sm border border-border hover:bg-slate-100 flex items-center justify-center text-secondary transition-colors"
              aria-label="Close modal"
            >
              <HiXMark className="text-xl" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="px-6 py-3 bg-white border-b border-border/60 flex items-center gap-2 overflow-x-auto shrink-0 no-scrollbar">
            {tabItems.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onSelectTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all shrink-0 ${isActive
                    ? "bg-secondary text-primary shadow-sm"
                    : "text-text-muted hover:bg-slate-100 hover:text-secondary"
                    }`}
                >
                  <Icon className="text-lg" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-secondary/90 leading-relaxed text-base">


            <div className="border-b border-border/40 pb-3">
              <p className="text-sm font-medium text-text-muted">{currentData.subtitle}</p>
              <p className="text-xs text-text-muted/70 mt-1">{currentData.updated}</p>
            </div>

            <div className="space-y-6">
              {currentData.sections.map((sec, idx) => (
                <div key={idx} className="bg-slate-50/50 p-5 rounded-2xl border border-border/40">
                  <h4 className="text-lg font-bold text-secondary mb-2">
                    {sec.heading}
                  </h4>
                  <p className="text-slate-700 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                    {sec.content}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer inside Modal */}
          <div className="px-6 py-4 border-t border-border bg-slate-50/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-text-muted shrink-0">
            <span>© {new Date().getFullYear()} Keeto SaaS Operating System. All rights reserved.</span>
            <button
              onClick={onClose}
              className="px-5 py-2 bg-secondary text-white hover:bg-secondary/90 font-semibold rounded-xl text-xs transition-colors"
            >
              Done Reading
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
