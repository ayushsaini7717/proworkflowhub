"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export default function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="md:hidden">
            <button
                onClick={() => setIsOpen(true)}
                className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-900 hover:text-white"
                aria-label="Open menu"
            >
                <Menu size={24} />
            </button>

            {/* Mobile Menu Overlay */}
            {isOpen && mounted && createPortal(
                <div className="fixed inset-0 z-[100] flex flex-col bg-slate-950 p-6">
                    <div className="mb-8 flex items-center justify-end">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-900 hover:text-white"
                            aria-label="Close menu"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    <nav className="flex flex-col gap-6 text-xl font-medium text-slate-300">
                        <Link
                            href="/reviews"
                            className="hover:text-white"
                            onClick={() => setIsOpen(false)}
                        >
                            Reviews
                        </Link>
                        <Link
                            href="/comparisons"
                            className="hover:text-white"
                            onClick={() => setIsOpen(false)}
                        >
                            Comparisons
                        </Link>
                        <Link
                            href="/newsletter"
                            className="hover:text-white"
                            onClick={() => setIsOpen(false)}
                        >
                            Subscribe
                        </Link>
                    </nav>
                </div>,
                document.body
            )}
        </div>
    );
}
