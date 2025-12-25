import {prisma} from '../lib/prisma'

async function main() {
  console.log("🌱 Seeding database...");

  // 1. Products
  const activeCampaign = await prisma.product.create({
    data: {
      name: "ActiveCampaign",
      slug: "activecampaign",
      description:
        "Advanced email marketing and CRM automation for growing businesses.",
      websiteUrl: "https://www.activecampaign.com",
      affiliateUrl: "https://affiliate-link-activecampaign",
      pricingSummary: "$29/month and up",
      logoUrl: "/logos/activecampaign.png",
    },
  });

  const hubspot = await prisma.product.create({
    data: {
      name: "HubSpot",
      slug: "hubspot",
      description:
        "All-in-one CRM platform for marketing, sales, and customer service.",
      websiteUrl: "https://www.hubspot.com",
      affiliateUrl: "https://affiliate-link-hubspot",
      pricingSummary: "Free + paid plans",
      logoUrl: "/logos/hubspot.png",
    },
  });

  // 2. Reviews
  await prisma.review.create({
    data: {
      productId: activeCampaign.id,
      rating: 9,
      testedDays: 14,
      pros: "Powerful automations, deep segmentation",
      cons: "Learning curve for beginners",
      verdict:
        "Best for agencies and teams needing advanced automation.",
    },
  });

  await prisma.review.create({
    data: {
      productId: hubspot.id,
      rating: 8,
      testedDays: 10,
      pros: "Great UI, strong ecosystem",
      cons: "Gets expensive at scale",
      verdict:
        "Ideal for teams wanting an all-in-one CRM with minimal setup.",
    },
  });

  // 3. Comparison
  await prisma.comparison.create({
    data: {
      slug: "activecampaign-vs-hubspot-for-agencies",
      summary:
        "ActiveCampaign offers deeper automation, while HubSpot wins on ease of use.",
      winner: "ActiveCampaign",
      productAId: activeCampaign.id,
      productBId: hubspot.id,
    },
  });

  console.log("✅ Seeding complete");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
