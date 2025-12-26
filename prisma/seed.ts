import {prisma } from "../lib/prisma";

async function main() {
  console.log("🌱 Seeding database...");

  await prisma.comparisonFeature.deleteMany();
  await prisma.comparison.deleteMany();
  await prisma.review.deleteMany();
  await prisma.product.deleteMany();
  await prisma.author.deleteMany();

  const author = await prisma.author.create({
    data: {
      name: "Ayush Saini",
      slug: "ayush-saini",
      role: "Founder & Product Reviewer",
      bio: "Ayush is a software engineer who tests SaaS tools hands-on and documents real workflows for founders and remote teams.",
      linkedinUrl: "https://linkedin.com/in/ayushsaini",
      websiteUrl: "https://theproworkflowhub.com",
    },
  });

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
      authorId: author.id,
      basePrice: 29.00,
      isPerUser: false,
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
      authorId: author.id,
      basePrice: 50.00, 
      isPerUser: true,
    },
  });

  await prisma.review.createMany({
    data: [
      {
        productId: activeCampaign.id,
        rating: 9,
        testedDays: 14,
        pros: "Powerful automations, deep segmentation",
        cons: "Learning curve for beginners",
        verdict:
          "Best for agencies and teams needing advanced automation.",
      },
      {
        productId: hubspot.id,
        rating: 8,
        testedDays: 10,
        pros: "Great UI, strong ecosystem",
        cons: "Gets expensive at scale",
        verdict:
          "Ideal for teams wanting an all-in-one CRM with minimal setup.",
      },
    ],
  });

  // 5️⃣ Comparison
  const comparison = await prisma.comparison.create({
    data: {
      slug: "activecampaign-vs-hubspot-for-agencies",
      summary:
        "ActiveCampaign offers deeper automation, while HubSpot wins on ease of use.",
      winner: "ActiveCampaign",
      productAId: activeCampaign.id,
      productBId: hubspot.id,
      radarData: [
      { subject: 'Automation', A: 10, B: 6, fullMark: 10 },
      { subject: 'Ease of Use', A: 6, B: 9, fullMark: 10 },
      { subject: 'Support', A: 8, B: 8, fullMark: 10 },
      { subject: 'Pricing', A: 9, B: 5, fullMark: 10 },
      { subject: 'Integrations', A: 8, B: 10, fullMark: 10 },
    ],
    },
  });

  // 6️⃣ Comparison Features
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
