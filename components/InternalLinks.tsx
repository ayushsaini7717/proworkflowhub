import Link from "next/link";

interface Comparison {
  slug: string;
  productA: { name: string };
  productB: { name: string };
}

interface Product {
  id: string;
  name: string;
  slug: string;
}

export default function InternalLinks({
  comparisons,
  relatedProducts,
}: {
  comparisons: Comparison[];
  relatedProducts: Product[];
}) {
  return (
    <section className="mt-16 border-t pt-8">
      {/* Comparison Links */}
      {comparisons.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mb-4">
            Related Comparisons
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            {comparisons.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/compare/${c.slug}`}
                  className="text-blue-600 hover:underline"
                >
                  {c.productA.name} vs {c.productB.name}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mt-8 mb-4">
            Related Tools
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            {relatedProducts.map((p) => (
              <li key={p.id}>
                <Link
                  href={`/product/${p.slug}`}
                  className="text-blue-600 hover:underline"
                >
                  {p.name} Review
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
