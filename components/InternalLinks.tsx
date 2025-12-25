import Link from "next/link";
import { Scale, ArrowRight, Layers } from "lucide-react"; // Ensure lucide-react is installed

interface Comparison {
  slug: string;
  productA: { name: string };
  productB: { name: string };
}

interface Product {
  id: string; // or number, matching your schema
  name: string;
  slug: string;
}

export default function InternalLinks({
  comparisons,
  relatedProducts,
}: {
  comparisons: Comparison[];
  relatedProducts: Product[];
}) {
  if (comparisons.length === 0 && relatedProducts.length === 0) return null;

  return (
    <nav className="space-y-8">
      
      {/* 1. COMPARISON LINKS */}
      {comparisons.length > 0 && (
        <div>
          <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">
            Compare Alternatives
          </h3>
          <div className="flex flex-col gap-2">
            {comparisons.map((c) => (
              <Link
                key={c.slug}
                href={`/compare/${c.slug}`}
                className="group flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/50 p-3 transition hover:border-indigo-500/30 hover:bg-slate-800"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-slate-800 text-indigo-400 group-hover:text-white transition">
                    <Scale size={16} />
                  </div>
                  <span className="text-sm font-medium text-slate-300 group-hover:text-white">
                    {c.productA.name} <span className="text-slate-600">vs</span> {c.productB.name}
                  </span>
                </div>
                <ArrowRight size={14} className="text-slate-600 opacity-0 transition-all group-hover:translate-x-1 group-hover:text-indigo-400 group-hover:opacity-100" />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 2. RELATED PRODUCT LINKS */}
      {relatedProducts.length > 0 && (
        <div>
          <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">
            Related Tools
          </h3>
          <div className="flex flex-col gap-2">
            {relatedProducts.map((p) => (
              <Link
                key={p.id}
                href={`/product/${p.slug}`}
                className="group flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/50 p-3 transition hover:border-indigo-500/30 hover:bg-slate-800"
              >
                <div className="flex items-center gap-3">
                   <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-slate-800 text-emerald-400 group-hover:text-white transition">
                    <Layers size={16} />
                  </div>
                  <span className="text-sm font-medium text-slate-300 group-hover:text-white">
                    {p.name} Review
                  </span>
                </div>
                <ArrowRight size={14} className="text-slate-600 opacity-0 transition-all group-hover:translate-x-1 group-hover:text-emerald-400 group-hover:opacity-100" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}