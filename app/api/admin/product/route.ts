import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  // Basic protection (improve later)
  if (body.secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const product = await prisma.product.create({
    data: {
      name: body.name,
      slug: body.slug,
      description: body.description,
      websiteUrl: body.websiteUrl,
      affiliateUrl: body.affiliateUrl,
      pricingSummary: body.pricingSummary,
      logoUrl: body.logoUrl,
    },
  });

  return NextResponse.json(product);
}
