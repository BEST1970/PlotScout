"use client";

import { useState } from "react";
import dynamic from 'next/dynamic';

const ResultsList = dynamic(() => import('@/components/ResultsList'), { ssr: false });
const ParcelExplorer = dynamic(() => import('@/components/ParcelExplorer'), { ssr: false });

export default function PlotScout() {
  const [activeTab, setActiveTab] = useState<"results" | "explorer">("results");

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 selection:bg-bpi-green selection:text-white">
      {/* ── Top navigation ── */}
      <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4 group">
            <img 
              src="/data/bpi_real_estate_uban_shapers_for_good.svg" 
              alt="BPI Real Estate Logo" 
              className="h-10 w-auto" 
            />
            <div className="leading-tight pl-4 border-l border-slate-200">
              <span className="text-xl font-bold text-slate-800 tracking-tight">
                Plot<span className="text-bpi-green">Scout</span>
              </span>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-medium -mt-0.5">
                CFE Group · Real Estate
              </p>
            </div>
          </div>
          
          <div className="flex space-x-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
            <button
              onClick={() => setActiveTab("results")}
              className={`px-4 py-2 text-sm font-semibold rounded-md transition-all ${
                activeTab === "results" 
                  ? "bg-white text-slate-800 shadow-sm" 
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Batch Results
            </button>
            <button
              onClick={() => setActiveTab("explorer")}
              className={`px-4 py-2 text-sm font-semibold rounded-md transition-all ${
                activeTab === "explorer" 
                  ? "bg-white text-slate-800 shadow-sm" 
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Parcel Explorer
            </button>
          </div>
        </div>
      </header>

      {/* ── Page content ── */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "results" ? (
          <ResultsList />
        ) : (
          <ParcelExplorer />
        )}
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-200 py-6 text-center text-xs text-slate-400 bg-white mt-auto">
        PlotScout · CFE Group · Real Estate
      </footer>
    </div>
  );
}
