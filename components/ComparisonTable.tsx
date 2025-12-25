import { Check, X, Minus } from "lucide-react";
interface Feature {
  id: string;
  label: string;
  valueA: string;
  valueB: string;
  highlightA: boolean;
  highlightB: boolean;
}

interface Props {
  productA: string;
  productB: string;
  features: Feature[];
  affiliateA: string;
  affiliateB: string;
  winner: "A" | "B";
}

export default function ComparisonTable({
  productA,
  productB,
  features,
  affiliateA,
  affiliateB,
  winner,
}: Props) {
  return (
    <div className="w-full overflow-hidden bg-slate-950">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] border-collapse text-left text-sm">
          
          {/* HEADER */}
          <thead>
            <tr>
              <th className="bg-slate-900 p-5 text-xs font-bold uppercase tracking-wider text-slate-500">
                Feature
              </th>
              
              {/* Product A Header */}
              <th className={`relative p-5 text-lg font-bold text-white ${winner === "A" ? "bg-emerald-950/10 ring-inset ring-2 ring-emerald-500/20" : "bg-slate-900"}`}>
                {winner === "A" && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 rounded-b-md bg-emerald-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-emerald-950 shadow-lg">
                    Winner
                  </div>
                )}
                {productA}
              </th>

              {/* Product B Header */}
              <th className={`relative p-5 text-lg font-bold text-white ${winner === "B" ? "bg-emerald-950/10 ring-inset ring-2 ring-emerald-500/20" : "bg-slate-900"}`}>
                {winner === "B" && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 rounded-b-md bg-emerald-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-emerald-950 shadow-lg">
                    Winner
                  </div>
                )}
                {productB}
              </th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody className="divide-y divide-slate-800 border-t border-slate-800">
            {features.map((f) => (
              <tr key={f.id} className="transition hover:bg-slate-900/50">
                <td className="bg-slate-950/50 p-5 font-medium text-slate-300">
                  {f.label}
                </td>
                
                {/* Product A Cell */}
                <td className={`p-5 ${winner === "A" ? "bg-emerald-950/5" : ""} ${f.highlightA ? "font-bold text-emerald-400" : "text-slate-400"}`}>
                  <div className="flex items-center gap-2">
                    {f.highlightA && <Check size={16} className="shrink-0 text-emerald-500" />}
                    {!f.highlightA && f.valueA !== "No" && <Minus size={16} className="shrink-0 text-slate-600 opacity-50" />}
                    {f.valueA === "No" && <X size={16} className="shrink-0 text-slate-600" />}
                    <span>{f.valueA}</span>
                  </div>
                </td>

                {/* Product B Cell */}
                <td className={`p-5 ${winner === "B" ? "bg-emerald-950/5" : ""} ${f.highlightB ? "font-bold text-emerald-400" : "text-slate-400"}`}>
                  <div className="flex items-center gap-2">
                    {f.highlightB && <Check size={16} className="shrink-0 text-emerald-500" />}
                    {!f.highlightB && f.valueB !== "No" && <Minus size={16} className="shrink-0 text-slate-600 opacity-50" />}
                    {f.valueB === "No" && <X size={16} className="shrink-0 text-slate-600" />}
                    <span>{f.valueB}</span>
                  </div>
                </td>
              </tr>
            ))}

            {/* CTA FOOTER ROW */}
            <tr className="bg-slate-900/50">
              <td className="p-5 font-bold text-white">Verdict</td>
              
              <td className={`p-5 ${winner === "A" ? "bg-emerald-950/10" : ""}`}>
                <a
                  href={affiliateA}
                  target="_blank"
                  rel="nofollow sponsored"
                  className={`block w-full rounded-lg py-3 text-center text-sm font-bold shadow-lg transition hover:scale-[1.02] ${
                    winner === "A"
                      ? "bg-emerald-600 text-white hover:bg-emerald-500"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  Get {productA}
                </a>
              </td>

              <td className={`p-5 ${winner === "B" ? "bg-emerald-950/10" : ""}`}>
                <a
                  href={affiliateB}
                  target="_blank"
                  rel="nofollow sponsored"
                  className={`block w-full rounded-lg py-3 text-center text-sm font-bold shadow-lg transition hover:scale-[1.02] ${
                    winner === "B"
                      ? "bg-emerald-600 text-white hover:bg-emerald-500"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  Get {productB}
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
