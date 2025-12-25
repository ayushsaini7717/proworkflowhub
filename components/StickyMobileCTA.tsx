"use client";

import { trackEvent } from "@/lib/analytics";
import { ArrowRight, Sparkles } from "lucide-react"; // Optional: add icon for better CTR

export default function StickyMobileCTA({
  label,
  href,
}: {
  label: string;
  href: string;
}) {
  function handleClick() {
    trackEvent("affiliate_click", {
      label,
      destination: href,
    });
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-800 bg-slate-950/90 backdrop-blur-lg pb-safe md:hidden">
      {/* 'pb-safe' ensures it respects iPhone home indicator area if you add safe-area utility, 
          otherwise standard padding works */}
      <div className="p-4">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer sponsored"
          onClick={handleClick}
          className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3.5 text-center text-base font-bold text-white shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-500 active:scale-[0.98]"
        >
          {/* Subtle shine effect */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition group-hover:opacity-100" />
          
          <span>{label}</span>
          <ArrowRight size={18} className="transition group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  );
}