"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { Mail, CheckCircle2, ArrowRight, Loader2 } from "lucide-react";

export default function EmailCapture({
  source,
}: {
  source: string;
}) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      trackEvent("email_signup", {
        source,
      });

      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });

      setSubmitted(true);
    } catch (error) {
      console.error("Signup failed", error);
    } finally {
      setLoading(false);
    }
  }

  // SUCCESS STATE
  if (submitted) {
    return (
      <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-8 text-center shadow-lg">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
          <CheckCircle2 size={24} />
        </div>
        <h3 className="mb-2 text-lg font-bold text-white">
          You are on the list!
        </h3>
        <p className="text-sm text-slate-400">
          Check your inbox. The SaaS Stack Builder is on its way.
        </p>
      </div>
    );
  }

  // FORM STATE
  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-700 bg-gradient-to-br from-slate-900 to-slate-800 p-6 shadow-xl">
      {/* Decorative background glow */}
      <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-indigo-500/10 blur-3xl"></div>

      <div className="relative z-10">
        <div className="mb-4 flex items-center gap-2 text-indigo-400">
          <Mail size={20} />
          <span className="text-xs font-bold uppercase tracking-wider">Free Resource</span>
        </div>
        
        <h3 className="mb-2 text-lg font-bold text-white">
          Get the SaaS Stack Builder
        </h3>
        
        <p className="mb-6 text-sm text-slate-400">
          Stop wasting money on tools you do not need. Get our proven tech stack checklist for free.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="email" className="sr-only">Email address</label>
            <input
              id="email"
              type="email"
              required
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 placeholder-slate-500 shadow-inner outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-3 font-bold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-500 hover:shadow-indigo-500/40 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                Get Free Access <ArrowRight size={18} className="transition group-hover:translate-x-1" />
              </>
            )}
          </button>
        </form>
        
        <p className="mt-4 text-center text-xs text-slate-500">
          Join 2,000+ founders. Unsubscribe anytime.
        </p>
      </div>
    </div>
  );
}