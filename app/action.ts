"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProduct(formData: FormData) {
  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const basePrice = parseFloat(formData.get("basePrice") as string);
  const affiliateUrl = formData.get("affiliateUrl") as string;
  const websiteUrl = formData.get("websiteUrl") as string;
  
  await prisma.product.create({
    data: {
      name,
      slug,
      description,
      basePrice,
      affiliateUrl,
      websiteUrl,
      pricingSummary: `$${basePrice}/mo`, 
      isPerUser: true, 
    },
  });

  revalidatePath("/");
  revalidatePath("/compare");
  
  redirect(`/product/${slug}`);
}