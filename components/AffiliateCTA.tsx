"use client";

import { trackEvent } from "@/lib/analytics";

interface AffiliateCTAProps {
  href: string;
  label: string;
  productSlug: string;
}

export default function AffiliateCTA({
  href,
  label,
  productSlug,
}: AffiliateCTAProps) {
  return (
    <a
      href={href}
      rel="nofollow sponsored"
      onClick={() =>
        trackEvent("affiliate_click", {
          label: `top-cta:${productSlug}`,
          destination: href,
        })
      }
      className="inline-block mt-6 bg-black text-white px-6 py-3 rounded"
    >
      {label}
    </a>
  );
}
