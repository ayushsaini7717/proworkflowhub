import { ShieldAlert } from "lucide-react";
import { createProduct } from "@/app/action";

export default function AddProductPage() {
  return (
    <div className="min-h-screen bg-slate-950 p-12 text-slate-300">
      <div className="mx-auto max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 p-8">
        
        <div className="mb-8 flex items-center gap-3 border-b border-slate-800 pb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-400">
            <ShieldAlert size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Add New Product</h1>
            <p className="text-sm text-slate-400">Database Entry Creator</p>
          </div>
        </div>

        <form action={createProduct} className="space-y-6">
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-slate-500">Product Name</label>
              <input name="name" type="text" required placeholder="e.g. ClickUp" className="w-full rounded bg-slate-950 p-3 border border-slate-800 focus:border-indigo-500 outline-none" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-slate-500">Slug (URL)</label>
              <input name="slug" type="text" required placeholder="e.g. clickup" className="w-full rounded bg-slate-950 p-3 border border-slate-800 focus:border-indigo-500 outline-none" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-slate-500">Short Description</label>
            <textarea name="description" rows={3} required placeholder="One sentence summary..." className="w-full rounded bg-slate-950 p-3 border border-slate-800 focus:border-indigo-500 outline-none" />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-slate-500">Base Price ($)</label>
              <input name="basePrice" type="number" step="0.01" required placeholder="29.00" className="w-full rounded bg-slate-950 p-3 border border-slate-800 focus:border-indigo-500 outline-none" />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-slate-500">Website URL</label>
              <input name="websiteUrl" type="url" required placeholder="https://clickup.com" className="w-full rounded bg-slate-950 p-3 border border-slate-800 focus:border-indigo-500 outline-none" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-emerald-500">Affiliate Link (Money)</label>
            <input name="affiliateUrl" type="url" required placeholder="https://clickup.com?ref=YOURID" className="w-full rounded bg-slate-950 p-3 border border-emerald-900/50 text-emerald-400 focus:border-emerald-500 outline-none" />
          </div>

          <button type="submit" className="w-full rounded-lg bg-indigo-600 py-4 font-bold text-white hover:bg-indigo-500 transition">
            Create Product Database Entry
          </button>

        </form>
      </div>
    </div>
  );
}