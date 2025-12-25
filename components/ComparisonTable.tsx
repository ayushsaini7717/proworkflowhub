interface Feature {
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
    <div className="overflow-x-auto my-10 border rounded-lg">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-4 text-left">Feature</th>
            <th className={`p-4 ${winner === "A" ? "bg-green-50" : ""}`}>
              {productA}
            </th>
            <th className={`p-4 ${winner === "B" ? "bg-green-50" : ""}`}>
              {productB}
            </th>
          </tr>
        </thead>

        <tbody>
          {features.map((f, i) => (
            <tr key={i} className="border-t">
              <td className="p-4 font-medium">{f.label}</td>
              <td className={`p-4 ${f.highlightA ? "font-semibold text-green-700" : ""}`}>
                {f.valueA}
              </td>
              <td className={`p-4 ${f.highlightB ? "font-semibold text-green-700" : ""}`}>
                {f.valueB}
              </td>
            </tr>
          ))}

          {/* CTA Row */}
          <tr className="border-t bg-gray-50">
            <td className="p-4 font-semibold">Try Now</td>
            <td className="p-4">
              <a
                href={affiliateA}
                rel="nofollow sponsored"
                className="inline-block bg-black text-white px-4 py-2 rounded"
              >
                Try {productA}
              </a>
            </td>
            <td className="p-4">
              <a
                href={affiliateB}
                rel="nofollow sponsored"
                className="inline-block bg-black text-white px-4 py-2 rounded"
              >
                Try {productB}
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
