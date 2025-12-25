"use client";

interface StickyMobileCTAProps {
  label: string;
  href: string;
}

export default function StickyMobileCTA({
  label,
  href,
}: StickyMobileCTAProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="bg-black p-3">
        <a
          href={href}
          rel="nofollow sponsored"
          className="block text-center bg-white text-black font-semibold py-3 rounded-lg"
        >
          {label}
        </a>
      </div>
    </div>
  );
}
