import { prisma } from "@/lib/prisma";
import { loadReviewBySlug } from "@/lib/loadReview";
import { notFound } from "next/navigation";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ShieldCheck, Star } from "lucide-react";

import {
  productReviewSchema,
  faqSchema,
  authorSchema,
} from "@/lib/schema";
import FAQBlock from "@/components/FAQBlock";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import InternalLinks from "@/components/InternalLinks";
import {
  getProductComparisons,
  getRelatedProducts,
} from "@/lib/internalLinks";
import EmailCapture from "@/components/EmailCapture";
import AuthorBox from "@/components/AuthorBox";
import AffiliateCTA from "@/components/AffiliateCTA";
import TableOfContents from "@/components/TableOfContents";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug } });

  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.name} Review (2025): Features, Pricing & Verdict`,
    description: `In-depth ${product.name} review based on real testing.`,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: { author: true },
  });

  if (!product) return notFound();

  const comparisons = await getProductComparisons(product.id);
  const relatedProducts = await getRelatedProducts(product.id);
  const review = loadReviewBySlug(slug);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300">

      <header className="border-b border-slate-800 bg-slate-900 py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <ChevronRight size={12} />
            <Link href="/reviews" className="hover:text-white transition">Reviews</Link>
            <ChevronRight size={12} />
            <span className="text-indigo-400">Software</span>
          </div>

          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                <ShieldCheck size={14} /> Verified Analysis
              </div>
              <h1 className="mb-4 text-4xl font-extrabold text-white md:text-5xl lg:text-6xl">
                {product.name} Review
              </h1>
              <p className="text-xl leading-relaxed text-slate-400">
                {product.description}
              </p>
            </div>

            <div className="hidden shrink-0 md:block">
              <div className="rounded-xl border border-slate-700 bg-slate-800 p-6 text-center shadow-xl">
                <div className="mb-2 text-3xl font-bold text-white">9.2<span className="text-lg text-slate-500">/10</span></div>
                <div className="mb-4 flex justify-center text-yellow-500"><Star fill="currentColor" size={16} /><Star fill="currentColor" size={16} /><Star fill="currentColor" size={16} /><Star fill="currentColor" size={16} /><Star fill="currentColor" size={16} /></div>
                <AffiliateCTA
                  href={product.affiliateUrl}
                  label="Visit Website"
                  productSlug={product.slug}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-12 lg:grid-cols-12">

        <main className="lg:col-span-8">

          {review && (
            <article className="max-w-none">
              <MarkdownRenderer content={review.content} />
            </article>
          )}

          {review?.meta?.faqs?.length > 0 && (
            <div className="mt-16 rounded-2xl border border-slate-800 bg-slate-900/50 p-8">
              <h2 className="mb-8 text-2xl font-bold text-white">Frequently Asked Questions</h2>
              <FAQBlock faqs={review?.meta?.faqs ?? []} />
            </div>
          )}

          {product.author && (
            <div className="mt-12 border-t border-slate-800 pt-12">
              <AuthorBox
                author={{
                  ...product.author,
                  avatarUrl: product.author.avatarUrl ?? undefined,
                  linkedinUrl: product.author.linkedinUrl ?? undefined,
                }}
              />
            </div>
          )}
        </main>

        <aside className="hidden lg:block lg:col-span-4">
          <div className="sticky top-24 space-y-8">
            <TableOfContents />

            <div className="rounded-2xl border border-indigo-500/30 bg-indigo-500/10 p-6 shadow-2xl">
              <h3 className="mb-2 text-lg font-bold text-white">Ready to get started?</h3>
              <p className="mb-6 text-sm text-slate-300">
                Get the best deal on {product.name} using our exclusive link.
              </p>
              <AffiliateCTA
                href={product.affiliateUrl}
                label={`Try ${product.name} Now`}
                productSlug={product.slug}
              />
              <p className="mt-3 text-center text-xs text-slate-500">30-day money-back guarantee</p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-1">
              <EmailCapture source={`product:${product.slug}`} />
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-500">Related Comparisons</h4>
              <InternalLinks
                comparisons={comparisons}
                relatedProducts={relatedProducts}
              />
            </div>

          </div>
        </aside>

      </div>

      <StickyMobileCTA
        label={`Try ${product.name}`}
        href={product.affiliateUrl}
      />

      <div className="h-24 md:hidden" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            productReviewSchema({
              name: product.name,
              rating: 9, 
              description: product.description,
              slug: product.slug,
            })
          ),
        }}
      />

      {review?.meta?.faqs?.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema(review?.meta?.faqs ?? [])),
          }}
        />
      )}

      {product.author && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              authorSchema({
                name: product.author.name,
                role: product.author.role,
                linkedinUrl: product.author.linkedinUrl ?? undefined,
                websiteUrl: product.author.websiteUrl ?? undefined,
              })
            ),
          }}
        />
      )}
    </div>
  );
}