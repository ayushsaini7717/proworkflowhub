import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://theproworkflowhub.com";

  const products = await prisma.product.findMany({ select: { slug: true, createdAt: true } });
  const categories = await prisma.category.findMany({ select: { slug: true } });
  const comparisons = await prisma.comparison.findMany({ select: { slug: true } });
  const authors = await prisma.author.findMany({ select: { slug: true } });

  const routes = [
    "",
    "/reviews",
    "/comparisons",
    "/about",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 1,
  }));

  const productUrls = products.map((product) => ({
    url: `${baseUrl}/product/${product.slug}`,
    lastModified: product.createdAt,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const categoryUrls = categories.map((cat) => ({
    url: `${baseUrl}/software/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const comparisonUrls = comparisons.map((comp) => ({
    url: `${baseUrl}/compare/${comp.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const authorUrls = authors.map((author) => ({
    url: `${baseUrl}/author/${author.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...routes,
    ...productUrls,
    ...categoryUrls,
    ...comparisonUrls,
    ...authorUrls,
  ];
}