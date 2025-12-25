import { prisma } from "@/lib/prisma";
import ComparisonTable from "@/components/ComparisonTable";
import { notFound } from "next/navigation";

export async function generateMetadata({
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
    },
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

  return (
    <main className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold">
        {comparison.productA.name} vs {comparison.productB.name}
      </h1>

      <p className="mt-4 text-gray-700">
        {comparison.summary}
      </p>

      <ComparisonTable
        productA={comparison.productA.name}
        productB={comparison.productB.name}
        affiliateA={comparison.productA.affiliateUrl}
        affiliateB={comparison.productB.affiliateUrl}
        winner={
          comparison.winner === comparison.productA.name ? "A" : "B"
        }
        features={comparison.features}
      />
      <section className="mt-12">
        <h2 className="text-xl font-semibold mb-4">
          Learn More About Each Tool
        </h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>
            <a
              href={`/product/${comparison.productA.slug}`}
              className="text-blue-600 hover:underline"
            >
              {comparison.productA.name} Review
            </a>
          </li>
          <li>
            <a
              href={`/product/${comparison.productB.slug}`}
              className="text-blue-600 hover:underline"
            >
              {comparison.productB.name} Review
            </a>
          </li>
        </ul>
      </section>


      <section className="mt-10">
        <h2 className="text-xl font-semibold">Final Verdict</h2>
        <p className="mt-2">
          {comparison.winner} is the better choice for most teams based on
          automation depth and scalability.
        </p>
      </section>
    </main>
  );
}