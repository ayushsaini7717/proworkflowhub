import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Star, ArrowRight, Layers } from "lucide-react";

export const metadata = {
  title: "Software Reviews - The Pro-Workflow Hub",
  description: "Unbiased, in-depth reviews of the best SaaS tools for founders and developers.",
};

export default async function AllReviewsPage() {
  const products = await prisma.product.findMany({
    orderBy: { name: "asc" },
    include: { category: true } 
  });

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-6">
        
        <div className="mb-16 max-w-2xl">
          <h1 className="mb-4 text-4xl font-extrabold text-white">All Software Reviews</h1>
          <p className="text-xl text-slate-400">
            Browse our complete library of {products.length} tested tools.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Link 
              key={product.id} 
              href={`/product/${product.slug}`}
              className="group relative flex flex-col rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition hover:-translate-y-1 hover:border-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/10"
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
                   <Layers size={20} />
                </div>
                <div className="flex items-center gap-1 rounded-full bg-slate-800 px-2 py-1 text-xs font-bold text-white">
                  <Star size={12} className="text-yellow-500" fill="currentColor" />
                  9.0
                </div>
              </div>

              <div className="mb-2">
                 {product.category && (
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                      {product.category.name}
                    </span>
                 )}
              </div>

              <h3 className="mb-2 text-xl font-bold text-white group-hover:text-indigo-400 transition">
                {product.name}
              </h3>
              
              <p className="mb-6 line-clamp-2 text-sm text-slate-400">
                {product.description}
              </p>

              <div className="mt-auto flex items-center justify-between border-t border-slate-800 pt-4 text-sm font-bold text-slate-500">
                 <span>{product.pricingSummary}</span>
                 <span className="flex items-center gap-1 group-hover:text-white transition">
                   Read Review <ArrowRight size={14} />
                 </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}