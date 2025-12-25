import { prisma } from "@/lib/prisma";

/**
 * Get comparisons related to a product
 */
export async function getProductComparisons(productId: string) {
  return prisma.comparison.findMany({
    where: {
      OR: [
        { productAId: productId },
        { productBId: productId },
      ],
    },
    include: {
      productA: true,
      productB: true,
    },
  });
}

/**
 * Get related products (same category later)
 * For now: simple fallback (all others)
 */
export async function getRelatedProducts(productId: string) {
  return prisma.product.findMany({
    where: {
      NOT: { id: productId },
    },
    take: 4,
  });
}
