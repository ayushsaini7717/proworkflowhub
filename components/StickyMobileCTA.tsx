"use client";

import { trackEvent } from "@/lib/analytics";

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
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="bg-black p-3">
        <a
          href={href}
          rel="nofollow sponsored"
          onClick={handleClick}
          className="block text-center bg-white text-black font-semibold py-3 rounded-lg"
        >
          {label}
        </a>
      </div>
    </div>
  );
}
