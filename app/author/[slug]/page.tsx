import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { authorSchema } from "@/lib/schema";

/* ---------------- METADATA ---------------- */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const author = await prisma.author.findUnique({
    where: { slug },
  });

  if (!author) {
    return { title: "Author Not Found" };
  }

  return {
    title: `${author.name} – Author at The Pro-Workflow Hub`,
    description: author.bio,
  };
}

/* ---------------- PAGE ---------------- */

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const author = await prisma.author.findUnique({
    where: { slug },
    include: {
      products: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!author) return notFound();

  return (
    <>
      <main className="max-w-4xl mx-auto p-8">
        {/* Author Header */}
        <section className="flex items-start gap-6">
          {author.avatarUrl && (
            <Image
              src={author.avatarUrl}
              alt={author.name}
              width={96}
              height={96}
              className="rounded-full"
            />
          )}

          <div>
            <h1 className="text-3xl font-bold">{author.name}</h1>
            <p className="text-gray-600">{author.role}</p>

            <p className="mt-4 text-gray-800 max-w-2xl">
              {author.bio}
            </p>

            <div className="mt-4 flex gap-4 text-sm">
              {author.linkedinUrl && (
                <a
                  href={author.linkedinUrl}
                  className="text-blue-600 hover:underline"
                >
                  LinkedIn
                </a>
              )}
              {author.websiteUrl && (
                <a
                  href={author.websiteUrl}
                  className="text-blue-600 hover:underline"
                >
                  Website
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Articles / Reviews */}
        <section className="mt-16">
          <h2 className="text-2xl font-semibold mb-6">
            Articles by {author.name}
          </h2>

          <ul className="space-y-4">
            {author.products.map((product) => (
              <li
                key={product.id}
                className="border rounded-lg p-4"
              >
                <Link
                  href={`/product/${product.slug}`}
                  className="text-lg font-semibold text-blue-600 hover:underline"
                >
                  {product.name} Review
                </Link>

                <p className="text-sm text-gray-600 mt-1">
                  {product.description}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </main>

      {/* Author Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            authorSchema({
              name: author.name,
              role: author.role,
              linkedinUrl: author.linkedinUrl ?? undefined,
              websiteUrl: author.websiteUrl ?? undefined,
            })
          ),
        }}
      />
    </>
  );
}
