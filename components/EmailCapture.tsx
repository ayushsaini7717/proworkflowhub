"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

export default function EmailCapture({
  source,
}: {
  source: string;
}) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    trackEvent("email_signup", {
      source,
    });

    await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, source }),
    });

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="border rounded-lg p-6 text-center bg-green-50">
        <h3 className="font-semibold text-lg">
          Check your inbox 👋
        </h3>
        <p className="mt-2 text-sm">
          We’ll send the SaaS Stack Builder shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border rounded-lg p-6 bg-gray-50"
    >
      <h3 className="text-lg font-semibold">
        Get the SaaS Stack Builder (Free)
      </h3>
      <p className="text-sm text-gray-600 mt-1">
        Choose the right tools without wasting money.
      </p>

      <input
        type="email"
        required
        placeholder="you@company.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mt-4 w-full border p-3 rounded"
      />

      <button
        type="submit"
        className="mt-4 w-full bg-black text-white py-3 rounded font-medium"
      >
        Get Free Access
      </button>
    </form>
  );
}
