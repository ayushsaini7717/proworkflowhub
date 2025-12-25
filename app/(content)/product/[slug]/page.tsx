import { prisma } from "@/lib/prisma";
import { loadReviewBySlug } from "@/lib/loadReview";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import type { Metadata } from "next";
import { productReviewSchema } from "@/lib/schema";
import FAQBlock from "@/components/FAQBlock";
import { faqSchema } from "@/lib/schema";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import InternalLinks from "@/components/InternalLinks";
import {
  getProductComparisons,
  getRelatedProducts,
} from "@/lib/internalLinks";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
  });

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.name} Review (2025): Features, Pricing & Verdict`,
    description: `In-depth ${product.name} review based on real testing. Features, pricing, pros, cons, and who should use it.`,
    openGraph: {
      title: `${product.name} Review (2025)`,
      description: `Honest ${product.name} review with real-world testing and screenshots.`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} Review (2025)`,
      description: `Real-world ${product.name} review for teams and founders.`,
    },
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
  });


  if (!product) return notFound();

  const comparisons = await getProductComparisons(product.id);
  const relatedProducts = await getRelatedProducts(product.id);

  const review = loadReviewBySlug(slug);

  return (
  <>
    <article className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold">{product.name} Review</h1>

      <p className="mt-4 text-gray-700">
        {product.description}
      </p>

      {/* Top CTA */}
      <a
        href={product.affiliateUrl}
        rel="nofollow sponsored"
        className="inline-block mt-6 bg-black text-white px-6 py-3 rounded"
      >
        Try {product.name}
      </a>

      {/* Markdown Review */}
      {review && (
        <section className="prose prose-lg mt-12 max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeSlug]}
          >
            {review.content}
          </ReactMarkdown>
        </section>
      )}

      {/* FAQ UI */}
      {review?.meta?.faqs?.length > 0 && (
        <FAQBlock faqs={review?.meta?.faqs ?? []} />
      )}

      <InternalLinks
        comparisons={comparisons}
        relatedProducts={relatedProducts}
      />

    </article>

    {/* Sticky Mobile CTA */}
    <StickyMobileCTA
      label={`Try ${product.name}`}
      href={product.affiliateUrl}
    />

    {/* Spacer for sticky CTA */}
    <div className="h-20 md:hidden" />

    {/* Product Review Schema (ALWAYS) */}
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

    {/* FAQ Schema (ONLY if FAQs exist) */}
    {review?.meta?.faqs?.length > 0 && (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            faqSchema(review?.meta?.faqs ?? [])
          ),
        }}
      />
    )}
  </>
);

}
