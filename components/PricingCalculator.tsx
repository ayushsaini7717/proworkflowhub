"use client";

import { useState } from "react";
import { Calculator, Users, CheckCircle2 } from "lucide-react";

interface PricingCalculatorProps {
  productA: string;
  productB: string;
  priceA: number; // Monthly price
  priceB: number; // Monthly price
  isPerUserA?: boolean;
  isPerUserB?: boolean;
}

export default function PricingCalculator({
  productA,
  productB,
  priceA,
  priceB,
  isPerUserA = false,
  isPerUserB = true, // Defaults: usually one is flat, one is per-seat
}: PricingCalculatorProps) {
  const [users, setUsers] = useState(5); // Default to a small team
  const [isAnnual, setIsAnnual] = useState(false);

  // Logic: Annual usually gives ~20% discount. 
  // You can make this a prop later if you want exact data.
  const discountFactor = isAnnual ? 0.8 : 1;
  const billingCycle = isAnnual ? "year" : "month";

  // Calculate Costs
  const costA = (isPerUserA ? priceA * users : priceA) * discountFactor;
  const costB = (isPerUserB ? priceB * users : priceB) * discountFactor;

  const difference = Math.abs(costA - costB);
  const cheaperProduct = costA < costB ? productA : productB;
  const yearlySavings = difference * 12;

  return (
    <div className="my-12 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 shadow-xl">
      {/* Header */}
      <div className="bg-slate-900 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-500">
            <Calculator size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Price Simulator</h3>
            <p className="text-xs text-slate-400">Calculate your real costs</p>
          </div>
        </div>
        
        {/* Billing Toggle */}
        <div className="flex items-center gap-2 rounded-lg bg-slate-950 p-1 border border-slate-800">
          <button
            onClick={() => setIsAnnual(false)}
            className={`px-3 py-1 text-xs font-bold rounded-md transition ${!isAnnual ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            className={`px-3 py-1 text-xs font-bold rounded-md transition ${isAnnual ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
          >
            Yearly <span className="text-emerald-400">(-20%)</span>
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* Slider Section */}
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
              <Users size={16} className="text-indigo-400"/> Team Size
            </label>
            <span className="text-2xl font-bold text-white">{users} <span className="text-sm font-normal text-slate-500">users</span></span>
          </div>
          <input
            type="range"
            min="1"
            max="50"
            step="1"
            value={users}
            onChange={(e) => setUsers(Number(e.target.value))}
            className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-700 accent-indigo-500 hover:accent-indigo-400"
          />
          <div className="mt-2 flex justify-between text-xs text-slate-500 font-mono">
            <span>1</span>
            <span>10</span>
            <span>25</span>
            <span>50+</span>
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Card A */}
          <div className={`relative rounded-xl border p-5 transition-all ${costA < costB ? 'border-emerald-500/50 bg-emerald-500/5 shadow-[0_0_20px_rgba(16,185,129,0.1)]' : 'border-slate-800 bg-slate-950/50 opacity-75'}`}>
            {costA < costB && <div className="absolute -top-3 left-4 bg-emerald-500 text-emerald-950 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Best Value</div>}
            <div className="text-sm font-medium text-slate-400 mb-1">{productA}</div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-white">${costA.toFixed(0)}</span>
              <span className="text-xs text-slate-500">/{billingCycle}</span>
            </div>
            {isPerUserA ? (
              <div className="mt-2 text-xs text-slate-500">Based on ${priceA}/user</div>
            ) : (
              <div className="mt-2 text-xs text-emerald-400 font-medium">Flat Price (Unlimited Users)</div>
            )}
          </div>

          {/* Card B */}
          <div className={`relative rounded-xl border p-5 transition-all ${costB < costA ? 'border-emerald-500/50 bg-emerald-500/5 shadow-[0_0_20px_rgba(16,185,129,0.1)]' : 'border-slate-800 bg-slate-950/50 opacity-75'}`}>
            {costB < costA && <div className="absolute -top-3 left-4 bg-emerald-500 text-emerald-950 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Best Value</div>}
            <div className="text-sm font-medium text-slate-400 mb-1">{productB}</div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-white">${costB.toFixed(0)}</span>
              <span className="text-xs text-slate-500">/{billingCycle}</span>
            </div>
             {isPerUserB ? (
              <div className="mt-2 text-xs text-slate-500">Based on ${priceB}/user</div>
            ) : (
              <div className="mt-2 text-xs text-emerald-400 font-medium">Flat Price (Unlimited Users)</div>
            )}
          </div>
        </div>

        {/* Summary Footer */}
        <div className="mt-6 rounded-lg bg-slate-800/50 border border-slate-700/50 p-4 text-center">
          <p className="text-sm text-slate-300">
            <span className="text-emerald-400 font-bold flex items-center justify-center gap-2 mb-1">
              <CheckCircle2 size={16} /> Save ${difference.toFixed(0)}/{billingCycle} with {cheaperProduct}
            </span>
            <span className="block text-xs text-slate-500">
              That is <strong>${(yearlySavings).toLocaleString()}</strong> per year kept in your pocket.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}