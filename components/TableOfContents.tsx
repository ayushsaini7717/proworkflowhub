"use client";

import { useEffect, useState } from "react";
import { List } from "lucide-react";

export default function TableOfContents() {
  const [activeId, setActiveId] = useState<string>("");
  const [headings, setHeadings] = useState<{ id: string; text: string }[]>([]);

  useEffect(() => {
    // 1. Find all H2 headers inside the article
    // Note: We look for 'article h2' to avoid picking up headers from the sidebar/footer
    const elements = Array.from(document.querySelectorAll("article h2"));
    
    const data = elements.map((elem) => ({
      id: elem.id,
      text: elem.textContent || "",
    }));
    // schedule the state update on the next animation frame to avoid
    // causing a synchronous state update during the effect phase
    const rafId = requestAnimationFrame(() => setHeadings(data));

    // 2. Set up the observer to track scrolling
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { 
        rootMargin: "0px 0px -80% 0px", // Trigger when header is near top
        threshold: 0.1 
      } 
    );

    elements.forEach((elem) => observer.observe(elem));

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (headings.length === 0) return null;

  return (
    <div className="hidden lg:block">
       {/* Title */}
      <div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500">
        <List size={14} /> On this page
      </div>

      {/* Links List */}
      <nav className="relative flex flex-col gap-3 border-l border-slate-800 pl-4">
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            onClick={(e) => {
              e.preventDefault();
              document.querySelector(`#${heading.id}`)?.scrollIntoView({
                behavior: "smooth",
              });
            }}
            className={`text-sm transition-colors duration-200 hover:text-white ${
              activeId === heading.id
                ? "font-bold text-indigo-400"
                : "font-medium text-slate-500"
            }`}
          >
            {heading.text}
          </a>
        ))}
        
        {/* Active Indicator Bar */}
        {/* Simple logic to move a border/highlight could go here, 
            but changing text color (above) is cleaner for MVP */}
      </nav>
    </div>
  );
}