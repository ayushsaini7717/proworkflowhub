import { prisma } from "@/lib/prisma";

export default async function Home() {
  const products = await prisma.product.findMany({
    take: 5,
  });

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">
        The Pro-Workflow Hub
      </h1>

      <ul className="mt-6 space-y-4">
        {products.map((product) => (
          <li key={product.id} className="border p-4 rounded">
            <h2 className="font-semibold">{product.name}</h2>
            <p className="text-sm text-gray-600">
              {product.pricingSummary}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
