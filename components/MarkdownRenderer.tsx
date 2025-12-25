"use client";

import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { Check, Copy, Quote, Terminal } from "lucide-react";
import { useState } from "react";

interface MarkdownRendererProps {
    content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
    return (
        <div className="prose prose-lg prose-invert prose-indigo max-w-none">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeSlug]}
                components={components}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}

const components: Components = {
    h1: ({ children, id }) => (
        <h1
            id={id}
            className="mt-12 mb-6 scroll-mt-24 text-4xl font-extrabold tracking-tight text-white lg:text-5xl"
        >
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                {children}
            </span>
        </h1>
    ),
    h2: ({ children, id }) => (
        <h2
            id={id}
            className="mt-16 mb-8 scroll-mt-24 flex items-center gap-3 text-3xl font-bold tracking-tight text-white border-b border-slate-800 pb-4"
        >
            <span className="h-2 w-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"></span>
            {children}
        </h2>
    ),
    h3: ({ children, id }) => (
        <h3
            id={id}
            className="mt-10 mb-4 scroll-mt-24 text-2xl font-bold text-slate-100"
        >
            {children}
        </h3>
    ),
    p: ({ children }) => (
        <p className="mb-6 leading-8 text-slate-300">
            {children}
        </p>
    ),
    a: ({ href, children }) => (
        <a
            href={href}
            className="font-medium text-indigo-400 underline decoration-indigo-500/30 decoration-2 underline-offset-4 transition duration-200 hover:text-indigo-300 hover:decoration-indigo-400"
            target={href?.startsWith("http") ? "_blank" : undefined}
            rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
        >
            {children}
        </a>
    ),
    ul: ({ children }) => (
        <ul className="mb-8 space-y-3 ps-0">
            {children}
        </ul>
    ),
    ol: ({ children }) => (
        <ol className="mb-8 space-y-3 ps-5 list-decimal marker:text-indigo-500 marker:font-bold text-slate-300">
            {children}
        </ol>
    ),
    li: ({ children, className }) => {
        // Check if it's likely a checklist item (often remark-gfm handles this, but we can style standard list items)
        return (
            <li className="flex items-start gap-3 text-slate-300">
                {/* We can't easily distinguish ol/ul li here without context, so we might need a safer default. 
             If we use 'flex', markers break. Let's revert flex for generic li or handle bullet manually.
             A generic rich-text bullet is safer.
         */}
                <span className="mt-2 block h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
                <span className="flex-1">{children}</span>
            </li>
        )
    },
    blockquote: ({ children }) => (
        <blockquote className="relative my-12 overflow-hidden rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 p-8 shadow-inner">
            <div className="absolute -left-2 -top-2 text-indigo-500/10">
                <Quote size={80} strokeWidth={5} />
            </div>
            <div className="relative z-10 text-lg font-medium italic leading-relaxed text-slate-200">
                {children}
            </div>
        </blockquote>
    ),
    code: ({ className, children, ...props }) => {
        // Determine if it's inline code or block code
        const isInline = !className;
        // @ts-expect-error - inline prop not strictly in type but common
        const isBlock = !isInline || props.inline === false;

        if (isInline) {
            return (
                <code className="rounded-md border border-slate-700 bg-slate-800/50 px-1.5 py-0.5 font-mono text-sm text-indigo-300">
                    {children}
                </code>
            );
        }

        // Using a separate component for block code to handle state (copy button)
        return (
            <CodeBlock className={className}>
                {children}
            </CodeBlock>
        );
    },
    table: ({ children }) => (
        <div className="my-10 w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-400">
                    {children}
                </table>
            </div>
        </div>
    ),
    thead: ({ children }) => (
        <thead className="bg-slate-800/80 text-xs uppercase tracking-wider text-slate-200 font-semibold">
            {children}
        </thead>
    ),
    tr: ({ children }) => (
        <tr className="border-b border-slate-800/50 last:border-0 hover:bg-slate-800/30 transition-colors">
            {children}
        </tr>
    ),
    th: ({ children }) => (
        <th className="px-6 py-4">{children}</th>
    ),
    td: ({ children }) => (
        <td className="px-6 py-4 whitespace-nowrap">{children}</td>
    ),
    img: ({ src, alt }) => (
        <figure className="my-10">
            <img
                src={src}
                alt={alt}
                className="w-full rounded-xl border border-slate-800 shadow-2xl"
            />
            {alt && (
                <figcaption className="mt-3 text-center text-sm text-slate-500">
                    {alt}
                </figcaption>
            )}
        </figure>
    ),
    hr: () => <hr className="my-12 border-slate-800" />,
};

// Helper for Code Block (extracted for state)
function CodeBlock({ children, className }: { children: React.ReactNode; className?: string }) {
    const [copied, setCopied] = useState(false);
    const language = className?.replace("language-", "") || "text";
    const codeString = String(children).replace(/\n$/, "");

    const handleCopy = () => {
        navigator.clipboard.writeText(codeString);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="group relative my-8 overflow-hidden rounded-xl border border-slate-800 bg-[#0F1117] shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/50 px-4 py-2.5">
                <div className="flex items-center gap-2">
                    <Terminal size={14} className="text-slate-500" />
                    <span className="text-xs font-medium text-slate-400 uppercase">{language}</span>
                </div>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-slate-500 transition-colors hover:bg-slate-800 hover:text-white"
                >
                    {copied ? (
                        <>
                            <Check size={14} className="text-emerald-500" />
                            <span className="text-emerald-500">Copied</span>
                        </>
                    ) : (
                        <>
                            <Copy size={14} />
                            <span>Copy</span>
                        </>
                    )}
                </button>
            </div>
            <div className="overflow-x-auto p-4">
                <pre className={`!m-0 !bg-transparent !p-0 font-mono text-sm leading-relaxed ${className}`}>
                    {children}
                </pre>
            </div>
        </div>
    );
}
