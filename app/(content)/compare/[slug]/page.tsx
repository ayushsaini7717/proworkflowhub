import { prisma } from "@/lib/prisma";

export default async function ComparisonPage({
  params,
}: {
  params: { slug: string };
}) {
  const comparison = await prisma.comparison.findUnique({
    where: { slug: params.slug },
    include: {
      productA: true,
      productB: true,
    },
  });

  if (!comparison) return null;

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">
        {comparison.productA.name} vs {comparison.productB.name}
      </h1>

      <p className="mt-4">{comparison.summary}</p>
    </main>
  );
}
