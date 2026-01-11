import { prisma } from "../lib/prisma";

async function main() {
  console.log("🌱 Seeding Linear data only...");

  /**
   * 1. CLEANUP (safe order) - SKIPPED to preserve data
   */
  // await prisma.comparisonFeature.deleteMany();
  // await prisma.comparison.deleteMany();
  // await prisma.review.deleteMany();
  // await prisma.product.deleteMany();
  // await prisma.category.deleteMany();
  // await prisma.author.deleteMany();
  /**
   * 2. AUTHOR (matches linear.md frontmatter)
   */
  const authorData = {
    name: "Pro Workflow Hub",
    slug: "Pro Workflow Hub",
    role: "Founder & Product Reviewer",
    bio: "Pro-workflow-hub is a platform which review and compare software to let you choose the best software for your need.",
    linkedinUrl: "",
    websiteUrl: "",
  };

  const author = await prisma.author.upsert({
    where: { slug: authorData.slug },
    update: authorData,
    create: authorData,
  });

  /**
   * 3. CATEGORY
   */
  const categoryData = {
    name: "Project Management",
    slug: "project-management",
    description: "Tools for planning, tracking, and shipping software projects.",
    icon: "KanbanSquare",
  };

  const projectManagement = await prisma.category.upsert({
    where: { slug: categoryData.slug },
    update: categoryData,
    create: categoryData,
  });

  /**
   * 4. PRODUCT — LINEAR (REAL DATA)
   */
  const productData = {
    name: "Jira Software",
    slug: "jira-software",
    description:
      "Jira Software is a powerful issue and project tracking tool used by teams to plan, track, and manage software development at scale.",
    websiteUrl: "https://www.atlassian.com/software/jira",
    affiliateUrl: "https://www.atlassian.com/software/jira/pricing",
    pricingSummary: "Free plan available · Paid plans from $7.75/user/month",
    logoUrl: "/logos/jira.png",
    basePrice: 7.75,
    isPerUser: true,

    docHighlights: [
      "Highly customizable workflows",
      "Advanced reporting and dashboards",
      "Strong Jira ecosystem & marketplace",
      "Scales well for large teams",
    ],

    authorId: author.id,
    categoryId: projectManagement.id,
  };

  const jira = await prisma.product.upsert({
    where: { slug: productData.slug },
    update: productData,
    create: productData,
  });

  /**
   * 5. REVIEW — mirrors linear.md content
   */
  const reviewData = {
    productId: jira.id,
    rating: 7,
    testedDays: 30,
    pros:
      "Extremely customizable, powerful reporting, massive plugin ecosystem",
    cons:
      "Slow UI, steep learning curve, overkill for small teams",
    verdict:
      "Best suited for large or process-heavy teams that need deep customization and control.",
  };

  // Check if this specific review already exists to avoid duplicates
  const existingReview = await prisma.review.findFirst({
    where: {
      productId: jira.id,
      verdict: reviewData.verdict, // Assuming verdict is unique enough for this seed
    },
  });

  if (!existingReview) {
    await prisma.review.create({
      data: reviewData,
    });
    console.log("Review created.");
  } else {
    console.log("Review already exists, skipping.");
  }

  console.log("Linear seeded successfully");
}

main()
  .catch((error) => {
    console.error("❌ Seed failed:", JSON.stringify(error, null, 2));
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

