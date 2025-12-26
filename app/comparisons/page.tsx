import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Scale, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Software Comparisons - Head-to-Head Battles",
  description: "See which tool wins in our detailed side-by-side comparisons.",
};

export default async function ComparisonsPage() {
  const comparisons = await prisma.comparison.findMany({
    include: { productA: true, productB: true },
  });

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-20">
      <div className="mx-auto max-w-5xl px-6">
        
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-extrabold text-white">Head-to-Head Comparisons</h1>
          <p className="text-xl text-slate-400">
            We put top tools in the ring to see which one is actually better.
          </p>
        </div>

        <div className="grid gap-4">
          {comparisons.map((comp) => (
            <Link
              key={comp.id}
              href={`/compare/${comp.slug}`}
              className="group flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/50 p-6 transition hover:border-indigo-500/30 hover:bg-slate-900"
            >
              <div className="flex items-center gap-6">
                <div className="hidden md:flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-800 text-indigo-400">
                  <Scale size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition">
                    {comp.productA.name} <span className="text-slate-500 px-1">vs</span> {comp.productB.name}
                  </h3>
                  <p className="text-sm text-slate-400">{comp.summary}</p>
                </div>
              </div>
              
              <div className="hidden sm:flex items-center gap-2 text-sm font-bold text-indigo-400 opacity-0 transition-all group-hover:translate-x-2 group-hover:opacity-100">
                View Winner <ArrowRight size={16} />
              </div>
            </Link>
          ))}
        </div>
        
        {comparisons.length === 0 && (
           <div className="py-20 text-center text-slate-500">No comparisons published yet.</div>
        )}

      </div>
    </div>
  );
}