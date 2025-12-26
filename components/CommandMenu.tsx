"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { Search, FileText, Scale, Layers, Laptop } from "lucide-react";
import { DialogTitle } from "@radix-ui/react-dialog";

interface SearchItem {
  id: string;
  title: string;
  slug: string;
  type: "product" | "comparison" | "page";
}

export function CommandMenu({
  products,
  comparisons
}: {
  products: { name: string; slug: string }[];
  comparisons: { slug: string; productA: { name: string }; productB: { name: string } }[];
}) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/50 px-3 py-1.5 text-xs font-medium text-slate-400 transition hover:border-indigo-500/50 hover:text-white"
      >
        <Search size={14} />
        <span className="hidden sm:inline">Search...</span>
        <kbd className="hidden rounded bg-slate-800 px-1.5 py-0.5 font-mono text-[10px] font-bold text-slate-500 group-hover:text-white sm:inline-block">
          ⌘K
        </kbd>
      </button>

      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label="Global Search"
        className="fixed inset-0 z-[99] flex items-start justify-center bg-slate-950/80 p-4 pt-[20vh] backdrop-blur-sm"
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpen(false);
        }}
      >
        <DialogTitle className="sr-only">Global Search</DialogTitle>
        <div className="w-full max-w-lg overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow-2xl animate-in fade-in zoom-in-95 duration-100">

          <div className="flex items-center border-b border-slate-800 px-3" cmdk-input-wrapper="">
            <Search className="mr-2 h-5 w-5 shrink-0 text-slate-500" />
            <Command.Input
              placeholder="Search reviews, comparisons, or tools..."
              className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm text-white outline-none placeholder:text-slate-500"
            />
          </div>

          <Command.List className="max-h-[300px] overflow-y-auto p-2 scrollbar-thin scrollbar-track-slate-900 scrollbar-thumb-slate-700">
            <Command.Empty className="py-6 text-center text-sm text-slate-500">
              No results found.
            </Command.Empty>

            <Command.Group heading="Navigation" className="mb-2 px-2 text-xs font-bold text-slate-500">
              <Command.Item
                onSelect={() => runCommand(() => router.push("/"))}
                className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm text-slate-300 hover:bg-indigo-600 hover:text-white aria-selected:bg-indigo-600 aria-selected:text-white"
              >
                <Laptop size={14} /> Home
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push("/reviews"))}
                className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm text-slate-300 hover:bg-indigo-600 hover:text-white aria-selected:bg-indigo-600 aria-selected:text-white"
              >
                <FileText size={14} /> All Reviews
              </Command.Item>
            </Command.Group>

            {products.length > 0 && (
              <Command.Group heading="Reviews" className="mb-2 px-2 text-xs font-bold text-slate-500">
                {products.map((product) => (
                  <Command.Item
                    key={product.slug}
                    onSelect={() => runCommand(() => router.push(`/product/${product.slug}`))}
                    className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm text-slate-300 hover:bg-indigo-600 hover:text-white aria-selected:bg-indigo-600 aria-selected:text-white"
                  >
                    <Layers size={14} /> {product.name} Review
                  </Command.Item>
                ))}
              </Command.Group>
            )}

            {comparisons.length > 0 && (
              <Command.Group heading="Comparisons" className="px-2 text-xs font-bold text-slate-500">
                {comparisons.map((comp) => (
                  <Command.Item
                    key={comp.slug}
                    onSelect={() => runCommand(() => router.push(`/compare/${comp.slug}`))}
                    className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm text-slate-300 hover:bg-indigo-600 hover:text-white aria-selected:bg-indigo-600 aria-selected:text-white"
                  >
                    <Scale size={14} /> {comp.productA.name} vs {comp.productB.name}
                  </Command.Item>
                ))}
              </Command.Group>
            )}
          </Command.List>
        </div>
      </Command.Dialog>
    </>
  );
}