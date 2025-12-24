import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: { reviews: true },
  });

  if (!product) return notFound();

  return (
    <article className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <p className="mt-4">{product.description}</p>

      <a
        href={product.affiliateUrl}
        className="inline-block mt-6 bg-black text-white px-6 py-3 rounded"
        rel="nofollow sponsored"
      >
        Try {product.name}
      </a>
    </article>
  );
}
