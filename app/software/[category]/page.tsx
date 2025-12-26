import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ArrowRight, Star, Layers } from "lucide-react";
import * as Icons from "lucide-react";
import type { Metadata } from "next";


export async function generateMetadata({
  params
}: {
  params: Promise<{ category: string }>
}): Promise<Metadata> {
  const { category: slug } = await params;

  const category = await prisma.category.findUnique({
    where: { slug },
  });

  if (!category) return { title: "Category Not Found" };

  return {
    title: `Best ${category.name} Software (2025) - Top Rated Tools`,
    description: category.description || `Compare the best ${category.name} tools. Pricing, features, and expert reviews.`,
    openGraph: {
      title: `Best ${category.name} Software (2025)`,
      description: category.description || "In-depth comparisons.",
    },
  };
}

const DynamicIcon = ({ name, className }: { name: string; className?: string }) => {
  const IconComponent = (Icons as any)[name];
  return IconComponent ? <IconComponent className={className} /> : <Layers className={className} />;
};

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: slug } = await params;

  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      products: {
        include: {
          _count: { select: { reviews: true } } // Optional: if you want review counts
        }
      }
    },
  });

  if (!category) return notFound();

  return (
    <div className="min-h-screen bg-slate-950 pb-20">

      {/* Hero Section */}
      <div className="border-b border-slate-800 bg-slate-900 pt-24 pb-16 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-lg shadow-indigo-500/10">
            {category.icon && <DynamicIcon name={category.icon} className="h-8 w-8" />}
          </div>
          <h1 className="text-4xl font-extrabold text-white md:text-5xl">
            Best {category.name} Software
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-400 leading-relaxed">
            {category.description || `Compare the top ${category.name} tools for your business.`}
          </p>
        </div>
      </div>

      {/* Product Grid */}
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {category.products.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="group relative flex flex-col rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition hover:-translate-y-1 hover:border-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/10"
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="h-10 w-10 rounded-lg bg-white/5 p-2">
                  {/* If you have logoUrl, render Image here. Otherwise placeholder: */}
                  <div className="h-full w-full rounded bg-indigo-500/20" />
                </div>
                <div className="flex items-center gap-1 rounded-full bg-slate-800 px-2 py-1 text-xs font-bold text-white">
                  <Star size={12} className="text-yellow-500" fill="currentColor" />
                  9.2
                </div>
              </div>

              <h3 className="mb-2 text-xl font-bold text-white group-hover:text-indigo-400 transition">
                {product.name}
              </h3>

              <p className="mb-6 line-clamp-2 text-sm text-slate-400">
                {product.description}
              </p>

              <div className="mt-auto border-t border-slate-800 pt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-mono text-emerald-400">{product.pricingSummary}</span>
                  <span className="flex items-center gap-1 font-bold text-slate-500 group-hover:text-white transition">
                    Read Review <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {category.products.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-800 p-12 text-center text-slate-500">
            No products found in this category yet.
          </div>
        )}
      </div>
    </div>
  );
}