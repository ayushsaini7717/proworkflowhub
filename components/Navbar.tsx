import Link from 'next/link';
import { LayoutGrid } from 'lucide-react';
import { prisma } from '@/lib/prisma'; // Import Prisma
import { CommandMenu } from './CommandMenu'; // Import the new component

export default async function Navbar() { // Make Navbar async!
  
  // 1. Fetch Data for Search
  const products = await prisma.product.findMany({
    select: { name: true, slug: true },
    take: 20, // Limit for performance, or fetch all if list is small
  });

  const comparisons = await prisma.comparison.findMany({
    select: { 
      slug: true,
      productA: { select: { name: true } },
      productB: { select: { name: true } }
    },
    take: 10,
  });

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-white">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
            <LayoutGrid size={20} />
          </div>
          <span className="hidden sm:inline">ProWorkflow<span className="text-indigo-500">Hub</span></span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <Link href="/reviews" className="hover:text-white transition">Reviews</Link>
          <Link href="/comparisons" className="hover:text-white transition">Comparisons</Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          
          {/* ✅ REPLACE OLD SEARCH BUTTON WITH THIS */}
          <CommandMenu products={products} comparisons={comparisons} />

          <Link href="/newsletter" className="hidden md:block rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-900 hover:bg-white transition">
            Subscribe
          </Link>
        </div>
      </div>
    </nav>
  );
}