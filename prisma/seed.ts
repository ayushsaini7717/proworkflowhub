import { prisma } from "../lib/prisma";

async function main() {
  console.log("🌱 Seeding Linear data only...");

  /**
   * 1. CLEANUP (safe order)
   */
  await prisma.comparisonFeature.deleteMany();
  await prisma.comparison.deleteMany();
  await prisma.review.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.author.deleteMany();

  /**
   * 2. AUTHOR (matches linear.md frontmatter)
   */
  const author = await prisma.author.create({
    data: {
      name: "Pro Workflow Hub",
      slug: "Pro Workflow Hub",
      role: "Founder & Product Reviewer",
      bio: "Pro-workflow-hub is a platform which review and compare software to let you choose the best software for your need.",
      linkedinUrl: "https://linkedin.com/in/ayushsaini",
      websiteUrl: "https://theproworkflowhub.com",
    },
  });

  /**
   * 3. CATEGORY
   */
  const projectManagement = await prisma.category.create({
    data: {
      name: "Project Management",
      slug: "project-management",
      description: "Tools for planning, tracking, and shipping software projects.",
      icon: "KanbanSquare",
    },
  });

  /**
   * 4. PRODUCT — LINEAR (REAL DATA)
   */
  const linear = await prisma.product.create({
    data: {
      name: "Linear",
      slug: "linear",
      description:
        "Linear is a modern issue tracking and project management tool built for fast-moving software teams.",
      websiteUrl: "https://linear.app",
      affiliateUrl: "https://linear.app/pricing",
      pricingSummary: "Free for small teams, paid plans from $8/user/month",
      logoUrl: "https://www.agentlocker.ai/static/uploads/7c87cdc4-705c-4640-8722-624123ce072b_linear.webp",
      docHighlights: [
      {
        title: "How Cycles Work",
        image: "https://static.linear.app/docs/cycles/cycles-active.png", // Copied from docs
        link: "https://linear.app/docs/cycles"
      },
      {
        title: "Git Automation",
        image: "https://static.linear.app/docs/github/github-pr-link.png",
        link: "https://linear.app/docs/github"
      },
      {
        title: "Keyboard Shortcuts",
        image: "https://static.linear.app/docs/navigation/command-line.png",
        link: "https://linear.app/docs/keyboard-shortcuts"
      }
    ],
      basePrice: 8,
      isPerUser: true,
      authorId: author.id,
      categoryId: projectManagement.id,
    },
  });

  /**
   * 5. REVIEW — mirrors linear.md content
   */
  await prisma.review.create({
    data: {
      productId: linear.id,
      rating: 9,
      testedDays: 21,
      pros:
        "Extremely fast UI, keyboard-first workflow, excellent GitHub and Slack integrations",
      cons:
        "Limited customization and not ideal for non-technical teams",
      verdict:
        "One of the best issue tracking tools for modern software teams that value speed and focus.",
    },
  });

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
