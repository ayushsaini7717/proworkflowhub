import { Check, X, Star, Calendar } from "lucide-react";

interface ReviewData {
  rating: number;
  testedDays: number;
  pros: string;
  cons: string;
  verdict: string;
}

export default function ReviewSummary({ review }: { review: ReviewData }) {
  // Pros and Cons are stored as strings in DB (e.g., "Good UI, Fast API"), 
  // so we split them by comma to make a list.
  const prosList = review.pros.split(",").map((p) => p.trim());
  const consList = review.cons.split(",").map((c) => c.trim());

  return (
    <div className="mb-12 rounded-2xl border border-indigo-500/30 bg-indigo-500/5 p-5 md:p-8 shadow-xl">

      {/* Header: Rating & Time Tested */}
      <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between border-b border-indigo-500/10 pb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Our Verdict</h2>
          <p className="text-slate-400 text-sm">Based on real-world testing</p>
        </div>

        <div className="flex flex-wrap items-center gap-4 md:gap-6">
          {/* Days Tested Badge */}
          <div className="flex items-center gap-2 text-sm font-medium text-slate-300">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-slate-400">
              <Calendar size={16} />
            </div>
            <div>
              <div className="text-[10px] uppercase text-slate-500 font-bold tracking-wider">Tested For</div>
              <div>{review.testedDays} Days</div>
            </div>
          </div>

          {/* Rating Badge */}
          <div className="flex items-center gap-3 rounded-xl bg-slate-900 px-4 py-2 border border-slate-800">
            <div className="text-3xl font-extrabold text-white">{review.rating}</div>
            <div className="flex flex-col">
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} fill={i < Math.round(review.rating / 2) ? "currentColor" : "none"} />
                ))}
              </div>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">/10 Score</span>
            </div>
          </div>
        </div>
      </div>

      {/* Verdict Text */}
      <p className="mb-8 text-lg font-medium leading-relaxed text-indigo-100">
        {review.verdict}
      </p>

      {/* Pros & Cons Grid */}
      <div className="grid gap-8 md:grid-cols-2">

        {/* Pros */}
        <div>
          <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-emerald-400">
            <Check size={18} /> The Good
          </h3>
          <ul className="space-y-3">
            {prosList.map((pro, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-300">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                {pro}
              </li>
            ))}
          </ul>
        </div>

        {/* Cons */}
        <div>
          <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-red-400">
            <X size={18} /> The Bad
          </h3>
          <ul className="space-y-3">
            {consList.map((con, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-300">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                {con}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}