import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ArrowRight, CheckCircle2, TrendingUp, Layers } from "lucide-react";

// Helper to get trending products
async function getTrendingData() {
  const trending = await prisma.product.findMany({
    take: 3,
    orderBy: { basePrice: 'desc' }, 
    include: { category: true }
  });

  const categories = await prisma.category.findMany({
    include: { _count: { select: { products: true } } }
  });

  return { trending, categories };
}

export default async function HomePage() {
  const { trending, categories } = await getTrendingData();

  return (
    <div className="min-h-screen bg-slate-950 overflow-x-hidden"> {/* Prevent horizontal scroll on mobile */}

      {/* 1. HERO SECTION */}
      <section className="relative border-b border-slate-800 bg-[url('/grid-pattern.svg')] bg-center pt-16 pb-20 md:pt-24 md:pb-32">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950/90" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1.5 text-xs sm:text-sm font-bold text-indigo-400">
            <CheckCircle2 size={16} /> 100% Unbiased for Founders & Devs
          </div>

          <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-7xl">
            Stop guessing. <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent">
              Start building.
            </span>
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-400 sm:text-xl md:mb-10">
            The ProWorkflow Hub tests SaaS tools with real code and real workflows.
            No fluff, just the data you need to pick your stack.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 w-full sm:flex-row sm:w-auto">
            <Link
              href="/reviews"
              className="flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-indigo-600 px-8 font-bold text-white transition hover:bg-indigo-500"
            >
              Browse Reviews <ArrowRight size={18} />
            </Link>
            <Link
              href="/comparisons"
              className="flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-slate-700 bg-slate-800 px-8 font-bold text-white transition hover:bg-slate-700"
            >
              See Comparisons
            </Link>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY GRID */}
      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8 flex items-center justify-between md:mb-12">
            <h2 className="text-xl font-bold text-white sm:text-2xl">Explore by Category</h2>
            <Link href="/categories" className="text-sm font-bold text-indigo-400 hover:text-indigo-300">
              View all &rarr;
            </Link>
          </div>

          {/* Grid: 1 col mobile -> 2 col tablet -> 3 col desktop */}
          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/software/${cat.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 p-6 md:p-8 transition hover:border-indigo-500/50"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 group-hover:scale-110 transition md:h-12 md:w-12">
                  <Layers size={20} className="md:w-6 md:h-6" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-white md:text-xl">{cat.name}</h3>
                <p className="text-sm text-slate-400 mb-4 line-clamp-2">{cat.description}</p>
                <div className="text-xs font-bold text-slate-500 group-hover:text-indigo-400">
                  {cat._count.products} tools reviewed
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. TRENDING REVIEWS */}
      <section className="border-t border-slate-800 bg-slate-900/30 py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8 flex items-center gap-3 md:mb-12">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
              <TrendingUp size={20} />
            </div>
            <h2 className="text-xl font-bold text-white sm:text-2xl">Trending This Week</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {trending.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className="flex flex-col rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden hover:shadow-2xl transition hover:-translate-y-1"
              >
                {/* Image Container - Aspect ratio maintenance */}
                <div className="h-40 w-full bg-slate-800 flex items-center justify-center text-slate-600 relative overflow-hidden sm:h-48">
                  {product.logoUrl ? (
                    // Using object-contain ensures logos aren't cropped weirdly
                    <img src={product.logoUrl} alt={product.name} className="h-full w-full object-cover opacity-80 group-hover:opacity-100 transition" />
                  ) : (
                    <span className="font-bold text-2xl opacity-20">{product.name}</span>
                  )}
                </div>

                <div className="p-5 flex-1 flex flex-col sm:p-6">
                  <div className="mb-3 text-xs font-bold uppercase tracking-wider text-emerald-400">
                    {product.category?.name}
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-white md:text-xl">{product.name} Review</h3>
                  <p className="mb-4 text-sm text-slate-400 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="mt-auto flex items-center justify-between border-t border-slate-800 pt-4">
                    <span className="text-xs font-medium text-slate-500">Updated Dec 2025</span>
                    <span className="text-sm font-bold text-white flex items-center gap-1">
                      Read <span className="hidden sm:inline">Review</span> &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}