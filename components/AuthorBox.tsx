import Image from "next/image";
import Link from "next/link";
import { Linkedin, Globe, ChevronRight } from "lucide-react";
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
   <div className="flex flex-col gap-6 rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:flex-row sm:items-center">
      {/* Avatar */}
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-slate-700 bg-slate-800 shadow-lg">
        {author.avatarUrl ? (
          <Image 
            src={author.avatarUrl} 
            alt={author.name} 
            fill 
            className="object-cover" 
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xl font-bold text-slate-500">
            {author.name.charAt(0)}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1">
        <h3 className="text-lg font-bold text-white">
          Reviewed by {author.name}
        </h3>
        <p className="mb-3 text-sm font-medium text-indigo-400">
          {author.role}
        </p>

        <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500">
          {/* Profile Link */}
          {author.slug && (
            <Link 
              href={`/author/${author.slug}`} 
              className="flex items-center gap-1 hover:text-white transition"
            >
              View Profile <ChevronRight size={12} />
            </Link>
          )}

          {/* Social Links */}
          {author.linkedinUrl && (
            <a 
              href={author.linkedinUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-[#0077b5] transition"
            >
              <Linkedin size={12} /> LinkedIn
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
