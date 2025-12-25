import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { authorSchema } from "@/lib/schema";
import { Linkedin, Globe, MapPin, ChevronRight, FileText } from "lucide-react";

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
    openGraph: {
      images: author.avatarUrl ? [author.avatarUrl] : [],
    },
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
    <div className="min-h-screen bg-slate-950 text-slate-300">
      
      {/* 1. AUTHOR PROFILE HEADER */}
      <section className="border-b border-slate-800 bg-slate-900 py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          
          {/* Avatar with Glow Effect */}
          <div className="relative mx-auto mb-8 h-32 w-32">
            <div className="absolute inset-0 rounded-full bg-indigo-500 blur-xl opacity-20 animate-pulse"></div>
            {author.avatarUrl ? (
              <Image
                src={author.avatarUrl}
                alt={author.name}
                fill
                className="relative rounded-full border-4 border-slate-950 object-cover shadow-2xl"
              />
            ) : (
              <div className="relative flex h-full w-full items-center justify-center rounded-full border-4 border-slate-950 bg-slate-800 text-4xl font-bold text-slate-500">
                {author.name.charAt(0)}
              </div>
            )}
          </div>

          <h1 className="mb-2 text-4xl font-extrabold text-white md:text-5xl">
            {author.name}
          </h1>
          <p className="mb-6 text-lg font-medium text-indigo-400">{author.role}</p>
          
          <div className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-400">
            {author.bio}
          </div>

          {/* Social Links */}
          <div className="mt-8 flex justify-center gap-4">
            {author.linkedinUrl && (
              <a
                href={author.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-600 hover:border-indigo-500 transition"
              >
                <Linkedin size={16} /> LinkedIn
              </a>
            )}
            {author.websiteUrl && (
              <a
                href={author.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-600 hover:border-indigo-500 transition"
              >
                <Globe size={16} /> Website
              </a>
            )}
          </div>
        </div>
      </section>

      {/* 2. AUTHORED ARTICLES GRID */}
      <main className="mx-auto max-w-5xl px-6 py-20">
        <div className="mb-10 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-500">
            <FileText size={20} />
          </div>
          <h2 className="text-2xl font-bold text-white">
            Articles by {author.name}
          </h2>
          <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-bold text-slate-400">
            {author.products.length}
          </span>
        </div>

        {author.products.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {author.products.map((product) => (
              <Link
                key={product.id}
                href={`/reviews/${product.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-indigo-500/50 hover:shadow-2xl"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                    Software Review
                  </span>
                  <ChevronRight size={16} className="text-slate-600 group-hover:text-white transition" />
                </div>
                
                <h3 className="mb-3 text-xl font-bold text-white group-hover:text-indigo-300 transition">
                  {product.name} Review
                </h3>
                
                <p className="line-clamp-2 text-sm text-slate-400 mb-4">
                  {product.description}
                </p>

                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span>{new Date(product.createdAt).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>5 min read</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/50 p-12 text-center">
            <p className="text-slate-500">This author has not published any reviews yet.</p>
          </div>
        )}
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
    </div>
  );
}