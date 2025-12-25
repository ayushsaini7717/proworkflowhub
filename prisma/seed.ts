import { prisma } from '../lib/prisma'

async function main() {
  console.log("🌱 Seeding database...");

  await prisma.comparisonFeature.deleteMany();
  await prisma.comparison.deleteMany();
  await prisma.review.deleteMany();

  const activeCampaign = await prisma.product.upsert({
    where: { slug: "activecampaign" },
    update: {},
    create: {
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

  const hubspot = await prisma.product.upsert({
    where: { slug: "hubspot" },
    update: {},
    create: {
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

  const comparison = await prisma.comparison.create({
    data: {
      slug: "activecampaign-vs-hubspot-for-agencies",
      summary:
        "ActiveCampaign offers deeper automation, while HubSpot wins on ease of use.",
      winner: "ActiveCampaign",
      productAId: activeCampaign.id,
      productBId: hubspot.id,
    },
  });

  await prisma.comparisonFeature.createMany({
    data: [
      {
        comparisonId: comparison.id,
        label: "Automation Depth",
        valueA: "Advanced multi-step automations",
        valueB: "Basic workflows",
        highlightA: true,
      },
      {
        comparisonId: comparison.id,
        label: "Ease of Use",
        valueA: "Steep learning curve",
        valueB: "Very beginner friendly",
        highlightB: true,
      },
      {
        comparisonId: comparison.id,
        label: "Best For",
        valueA: "Agencies & advanced teams",
        valueB: "Small teams & startups",
      },
    ],
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
