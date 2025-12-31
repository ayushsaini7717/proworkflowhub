"use client";

import { ExternalLink, MousePointerClick } from "lucide-react";
import Link from "next/link";

interface DocHighlight {
  title: string;
  image: string;
  link?: string;
}

interface AnimatedDocWidgetProps {
  docs: any;
}

export default function AnimatedDocWidget({ docs }: AnimatedDocWidgetProps) {
  const typedDocs = (Array.isArray(docs) ? docs : []) as DocHighlight[];

  if (typedDocs.length === 0) return null;

  // Duplicate the docs to create a seamless loop
  const looppedDocs = [...typedDocs, ...typedDocs];

  return (
    <div className="my-12 overflow-hidden">
      <h2 className="mb-6 text-2xl font-bold text-white">Documentation Highlights</h2>

      {/* Carousel Container */}
      <div className="flex w-max gap-4 animate-scroll pause-on-hover">
        {looppedDocs.map((doc, index) => (
          <div
            key={index}
            className="group relative h-48 w-80 flex-shrink-0 cursor-pointer overflow-hidden rounded-xl border border-slate-800 bg-slate-900 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-indigo-500/50 hover:shadow-indigo-500/20"
          >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={doc.image}
                alt=""
                className="h-full w-full object-cover opacity-20 transition-all duration-700 group-hover:scale-110 group-hover:opacity-30 group-hover:blur-sm"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent opacity-80" />
            </div>

            {/* Content Centered */}
            <div className="relative flex h-full flex-col items-center justify-center p-6 text-center">
              <h3 className="translate-y-2 transform text-xl font-bold text-white transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:scale-105">
                {doc.title}
              </h3>

              <div className="mt-4 flex translate-y-8 transform items-center justify-center gap-2 text-sm font-medium text-indigo-400 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <span>Click to know more</span>
                <MousePointerClick size={16} />
              </div>
            </div>

            {/* Link Wrapper */}
            {doc.link && (
              <Link
                href={doc.link}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-10"
                aria-label={`Read documentation for ${doc.title}`}
              />
            )}

            {/* Top Right Icon */}
            {doc.link && (
              <div className="absolute top-3 right-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <ExternalLink className="text-white/50" size={16} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}