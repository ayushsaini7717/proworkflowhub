import { prisma } from "@/lib/prisma";
import ComparisonTable from "@/components/ComparisonTable";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FileText, Trophy, ArrowRight } from "lucide-react";
import PricingCalculator from "@/components/PricingCalculator";
import ComparisonRadar, { RadarDataPoint } from "@/components/ComparisonRadar";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const comparison = await prisma.comparison.findUnique({
    where: { slug },
    include: { productA: true, productB: true },
  });

  if (!comparison) return {};

  return {
    title: `${comparison.productA.name} vs ${comparison.productB.name} (2025 Comparison)`,
    description: `Detailed comparison of ${comparison.productA.name} vs ${comparison.productB.name}. Features, pricing, pros, cons, and best use cases.`,
  };
}

export default async function ComparisonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const comparison = await prisma.comparison.findUnique({
    where: { slug },
    include: {
      productA: true,
      productB: true,
      features: true,
    },
  });

  if (!comparison) return notFound();

  const winnerName = comparison.winner;
  const isAWinner = winnerName === comparison.productA.name;
  const radarData = (comparison.radarData as unknown as RadarDataPoint[]) || [];

  return (
    <main className="min-h-screen bg-slate-950 pb-24">

      <section className="relative border-b border-slate-800 bg-slate-900 py-16 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/10 via-slate-900 to-slate-900" />

        <div className="relative mx-auto max-w-5xl px-6 text-center">

          <h1 className="mb-6 text-4xl font-extrabold text-white md:text-6xl">
            {comparison.productA.name} <span className="text-slate-600">vs</span> {comparison.productB.name}
          </h1>

          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-slate-400">
            {comparison.summary}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6">

        <div className="-mt-12 relative z-10 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl">
          <ComparisonTable
            productA={comparison.productA.name}
            productB={comparison.productB.name}
            affiliateA={comparison.productA.affiliateUrl}
            affiliateB={comparison.productB.affiliateUrl}
            winner={isAWinner ? "A" : "B"}
            features={comparison.features}
          />
        </div>
        <section id="pricing-calculator" className="mt-16">
          {radarData.length > 0 && (
            <ComparisonRadar
              productA={comparison.productA.name}
              productB={comparison.productB.name}
              data={radarData}
            />
          )}
          <h2 className="text-2xl font-bold text-white text-center mb-6">
            Calculate Your Monthly Cost
          </h2>

          <PricingCalculator
            productA={comparison.productA.name}
            productB={comparison.productB.name}

            priceA={comparison.productA.basePrice}
            priceB={comparison.productB.basePrice}
            isPerUserA={comparison.productA.isPerUser}
            isPerUserB={comparison.productB.isPerUser}
          />
        </section>

        <section className="mt-20">
          <h2 className="mb-8 text-center text-2xl font-bold text-white">Deep Dive into Each Tool</h2>
          <div className="grid gap-6 md:grid-cols-2">

            <Link
              href={`/reviews/${comparison.productA.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 p-8 transition hover:-translate-y-1 hover:border-indigo-500/50"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-indigo-400">
                    <FileText size={16} /> Full Review
                  </div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-indigo-300 transition">
                    {comparison.productA.name}
                  </h3>
                  <p className="mt-2 text-sm text-slate-400">Read our detailed analysis of features and pricing.</p>
                </div>
                <div className="rounded-full bg-slate-800 p-2 text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition">
                  <ArrowRight size={20} />
                </div>
              </div>
            </Link>

            <Link
              href={`/reviews/${comparison.productB.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 p-8 transition hover:-translate-y-1 hover:border-indigo-500/50"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-indigo-400">
                    <FileText size={16} /> Full Review
                  </div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-indigo-300 transition">
                    {comparison.productB.name}
                  </h3>
                  <p className="mt-2 text-sm text-slate-400">Read our detailed analysis of features and pricing.</p>
                </div>
                <div className="rounded-full bg-slate-800 p-2 text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition">
                  <ArrowRight size={20} />
                </div>
              </div>
            </Link>

          </div>
        </section>

        <section className="mt-16 rounded-3xl border border-emerald-500/20 bg-gradient-to-b from-emerald-950/20 to-slate-900 p-8 text-center md:p-12">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 ring-1 ring-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
            <Trophy size={32} />
          </div>
          <h2 className="mb-4 text-3xl font-bold text-white">The Final Verdict</h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-300 mb-8">
            <span className="font-bold text-emerald-400">{comparison.winner}</span> is the better choice for most teams based on automation depth and scalability.
          </p>

          <div className="flex justify-center">
            <a
              href={isAWinner ? comparison.productA.affiliateUrl : comparison.productB.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-emerald-900/20 transition hover:bg-emerald-500 hover:scale-105"
            >
              Get The Best Deal on {comparison.winner} <ArrowRight size={20} />
            </a>
          </div>
        </section>

      </div>
    </main>
  );
}