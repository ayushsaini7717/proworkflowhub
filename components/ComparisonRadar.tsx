"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

export interface RadarDataPoint {
  subject: string;
  A: number;
  B: number;
  fullMark: number;
}

interface ComparisonRadarProps {
  productA: string;
  productB: string;
  data: RadarDataPoint[];
}

import { TooltipProps } from "recharts";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";

export default function ComparisonRadar({
  productA,
  productB,
  data,
}: ComparisonRadarProps) {
  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: any[]; label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border border-slate-700 bg-slate-900/90 p-3 shadow-xl backdrop-blur-md">
          <p className="mb-2 font-bold text-slate-200">{label}</p>
          <div className="space-y-1">
            <p className="text-xs font-semibold text-indigo-400">
              {productA}: <span className="text-white">{payload[0].value}/10</span>
            </p>
            <p className="text-xs font-semibold text-emerald-400">
              {productB}: <span className="text-white">{payload[1].value}/10</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="my-12 flex flex-col items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-10">
      <div className="mb-6 text-center">
        <h3 className="text-lg font-bold text-white">Performance Matrix</h3>
        <p className="text-xs text-slate-400">Visual breakdown of strengths</p>
      </div>

      <div className="h-[300px] w-full max-w-md">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            {/* Grid Lines */}
            <PolarGrid stroke="#334155" />

            {/* Labels (e.g., "Ease of Use") */}
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 600 }}
            />

            {/* Axis Numbers (Hidden for cleaner look, or style if needed) */}
            <PolarRadiusAxis angle={30} domain={[0, 10]} tick={false} axisLine={false} />

            {/* Product A Radar (Indigo) */}
            <Radar
              name={productA}
              dataKey="A"
              stroke="#6366f1" // indigo-500
              strokeWidth={3}
              fill="#6366f1"
              fillOpacity={0.3}
            />

            {/* Product B Radar (Emerald) */}
            <Radar
              name={productB}
              dataKey="B"
              stroke="#10b981" // emerald-500
              strokeWidth={3}
              fill="#10b981"
              fillOpacity={0.3}
            />

            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ paddingTop: "20px" }}
              iconType="circle"
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}