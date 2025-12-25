import Link from 'next/link';
import { LayoutGrid, Search, Menu } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-white">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
            <LayoutGrid size={20} />
          </div>
          <span>ProWorkflow<span className="text-indigo-500">Hub</span></span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <Link href="/categories" className="hover:text-white transition">Categories</Link>
          <Link href="/comparisons" className="hover:text-white transition">Comparisons</Link>
          <Link href="/about" className="hover:text-white transition">About Us</Link>
        </div>

        <div className="flex items-center gap-4">
          <button className="rounded-full p-2 text-slate-400 hover:bg-slate-800 hover:text-white">
            <Search size={20} />
          </button>
          <Link href="/newsletter" className="hidden md:block rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-900 hover:bg-white transition">
            Subscribe
          </Link>
        </div>
      </div>
    </nav>
  );
}