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
