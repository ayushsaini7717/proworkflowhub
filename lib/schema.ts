export function productReviewSchema({
  name,
  rating,
  description,
  slug,
}: {
  name: string;
  rating: number;
  description: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    url: `https://theproworkflowhub.com/product/${slug}`,
    review: {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: rating,
        bestRating: "10",
      },
      author: {
        "@type": "Organization",
        name: "The Pro-Workflow Hub",
      },
    },
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function authorSchema(author: {
  name: string;
  role: string;
  linkedinUrl?: string;
  websiteUrl?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    jobTitle: author.role,
    sameAs: [
      author.linkedinUrl,
      author.websiteUrl,
    ].filter(Boolean),
  };
}


export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "The Pro-Workflow Hub",
    url: "https://theproworkflowhub.com",
    logo: "https://theproworkflowhub.com/logo.png",
  };
}
