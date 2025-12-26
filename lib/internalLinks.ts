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
export async function getRelatedProducts(currentProductId: string) {
  const currentProduct = await prisma.product.findUnique({
    where: { id: currentProductId },
    select: { categoryId: true },
  });

  if (!currentProduct?.categoryId) return [];

  const related = await prisma.product.findMany({
    where: {
      categoryId: currentProduct.categoryId,
      id: { not: currentProductId }, 
    },
    take: 3,
    select: { id: true, name: true, slug: true },
  });

  return related;
}
