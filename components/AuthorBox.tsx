import Image from "next/image";
import Link from "next/link";

interface Author {
  name: string;
  role: string;
  bio: string;
  avatarUrl?: string;
  linkedinUrl?: string;
  slug: string;
}

export default function AuthorBox({ author }: { author: Author }) {
  return (
    <section className="mt-16 border-t pt-8">
      <div className="flex items-start gap-4">
        {author.avatarUrl && (
          <Image
            src={author.avatarUrl}
            alt={author.name}
            width={64}
            height={64}
            className="rounded-full"
          />
        )}

        <div>
          <Link
            href={`/author/${author.slug}`}
            className="font-semibold text-blue-600 hover:underline"
          >
            {author.name}
          </Link>
          <p className="text-sm text-gray-600">{author.role}</p>
          <p className="mt-2 text-sm">{author.bio}</p>

          {author.linkedinUrl && (
            <a
              href={author.linkedinUrl}
              className="text-blue-600 text-sm mt-2 inline-block"
            >
              LinkedIn Profile
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
