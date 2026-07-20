"use client";

import React, { useEffect, useState, useRef } from "react";
import Papa from "papaparse";
import { ChevronDown, ChevronUp, Download, Search, SlidersHorizontal } from "lucide-react";
import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import L from 'leaflet';

type ParcelRow = {
  parcel_id: string;
  Zone: string;
  plot_area: number;
  existing_gfa: number;
  allowed_gfa: number;
  gap: number;
  warning: string;
  pog_version: string;
  lat?: number;
  lon?: number;
  address?: string;
  feedback?: "Correct" | "Incorrect" | "Unsure" | "";
  notes?: string;
};

// Next.js needs a hack for leaflet icons if used, but we only use GeoJSON here

export default function ResultsList() {
  const [data, setData] = useState<ParcelRow[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: keyof ParcelRow; direction: 'asc' | 'desc' } | null>(null);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [geomData, setGeomData] = useState<{ [key: string]: any }>({});
  const [geomLoading, setGeomLoading] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [minGap, setMinGap] = useState<number>(0);

  useEffect(() => {
    fetch("/data/results_ranked.csv")
      .then((response) => response.text())
      .then((csv) => {
        Papa.parse(csv, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: (results) => {
            const parsed = results.data as ParcelRow[];
            const withFeedback = parsed.map((row) => ({
              ...row,
              feedback: "",
              notes: "",
              address: "", // Will be populated by Nominatim
            }));
            setData(withFeedback as ParcelRow[]);
          },
        });
      });
  }, []);

  // Rate-limited Reverse Geocoding queue
  useEffect(() => {
    const rowsToGeocode = data.filter(r => !r.address && r.lat && r.lon);
    if (rowsToGeocode.length === 0) return;

    const row = rowsToGeocode[0];
    
    const geocode = async () => {
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${row.lat}&lon=${row.lon}`);
        const json = await res.json();
        const address = json.address?.road ? `${json.address.road} ${json.address.house_number || ''}`.trim() : (json.display_name?.split(',')[0] || "Unknown");
        
        setData(prev => prev.map(r => r.parcel_id === row.parcel_id ? { ...r, address } : r));
      } catch (e) {
        console.error("Geocoding failed", e);
        setData(prev => prev.map(r => r.parcel_id === row.parcel_id ? { ...r, address: "Unavailable" } : r));
      }
    };

    const timer = setTimeout(geocode, 1500); // 1.5s delay to strictly respect Nominatim's 1 req/sec policy
    return () => clearTimeout(timer);
  }, [data]);

  const handleSort = (key: keyof ParcelRow) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sortedData = [...data].sort((a, b) => {
      const valA = a[key] ?? '';
      const valB = b[key] ?? '';
      if (valA < valB) return direction === 'asc' ? -1 : 1;
      if (valA > valB) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setData(sortedData);
  };

  const handleExpand = async (parcelId: string) => {
    if (expandedRow === parcelId) {
      setExpandedRow(null);
      return;
    }
    setExpandedRow(parcelId);

    if (!geomData[parcelId]) {
      setGeomLoading(true);
      try {
        const res = await fetch(`/api/parcel-geom?parcel_id=${encodeURIComponent(parcelId)}`);
        const result = await res.json();
        if (result && result.coordinates) {
          setGeomData((prev) => ({ ...prev, [parcelId]: result }));
        }
      } catch (e) {
        console.error("Error fetching geom:", e);
      } finally {
        setGeomLoading(false);
      }
    }
  };

  const updateFeedback = (parcelId: string, feedback: "Correct" | "Incorrect" | "Unsure") => {
    setData((prev) =>
      prev.map((row) => (row.parcel_id === parcelId ? { ...row, feedback } : row))
    );
  };

  const updateNotes = (parcelId: string, notes: string) => {
    setData((prev) =>
      prev.map((row) => (row.parcel_id === parcelId ? { ...row, notes } : row))
    );
  };

  const exportCsv = () => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "reviewed_results.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredData = data.filter((row) => {
    const matchesSearch = row.parcel_id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (row.address && row.address.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesGap = (row.gap || 0) >= minGap;
    return matchesSearch && matchesGap;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden animate-fade-in-up">
      <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Batch Discovery Results</h2>
          <p className="text-sm text-slate-500 mt-1">Current Demo Dataset: Warsaw Mokotów District | Filtered for significant untapped potential.</p>
        </div>
        <button
          onClick={exportCsv}
          className="flex items-center space-x-2 px-4 py-2 bg-bpi-navy text-white rounded-lg hover:bg-bpi-navy-light transition-colors shadow-sm"
        >
          <Download className="w-4 h-4" />
          <span className="font-medium text-sm">Export CSV</span>
        </button>
      </div>

      <div className="p-4 bg-white border-b border-slate-100 flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search by Parcel ID or Address..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-bpi-green/50 transition-all"
          />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <SlidersHorizontal className="w-4 h-4 text-slate-400" />
          <span className="text-sm text-slate-600 font-medium whitespace-nowrap">Min. Gap (sqm):</span>
          <input 
            type="range" 
            min="0" max="25000" step="1000"
            value={minGap}
            onChange={(e) => setMinGap(Number(e.target.value))}
            className="w-32 sm:w-48 accent-bpi-green"
          />
          <span className="text-sm font-bold text-slate-700 w-12 text-right">{minGap}+</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
              <th className="px-6 py-4 cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort('parcel_id')}>Parcel ID</th>
              <th className="px-6 py-4 cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort('address')}>Address</th>
              <th className="px-6 py-4 cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort('Zone')}>Zone</th>
              <th className="px-6 py-4 cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort('plot_area')}>Plot Area (sqm)</th>
              <th className="px-6 py-4 cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort('allowed_gfa')}>Max GFA (sqm)</th>
              <th className="px-6 py-4 cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort('gap')}>Gap (sqm)</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredData.map((row) => (
              <React.Fragment key={row.parcel_id}>
                <tr
                  className={`hover:bg-slate-50 transition-colors cursor-pointer ${expandedRow === row.parcel_id ? 'bg-slate-50' : ''}`}
                  onClick={() => handleExpand(row.parcel_id)}
                >
                  <td className="px-6 py-4 font-medium text-slate-800">{row.parcel_id}</td>
                  <td className="px-6 py-4 text-slate-600 font-medium">
                    {row.address ? row.address : (row.lat ? <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full border-2 border-slate-300 border-t-bpi-green animate-spin"></div>Loading...</span> : "N/A")}
                  </td>
                  <td className="px-6 py-4"><span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs font-bold">{row.Zone}</span></td>
                  <td className="px-6 py-4 text-slate-600">{row.plot_area?.toLocaleString(undefined, {maximumFractionDigits: 1})}</td>
                  <td className="px-6 py-4 text-slate-600">{row.allowed_gfa?.toLocaleString(undefined, {maximumFractionDigits: 1})}</td>
                  <td className="px-6 py-4 font-bold text-bpi-green">{row.gap?.toLocaleString(undefined, {maximumFractionDigits: 1})}</td>
                  <td className="px-6 py-4">
                    {row.feedback ? (
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        row.feedback === 'Correct' ? 'bg-bpi-green-light/20 text-bpi-green-dark' :
                        row.feedback === 'Incorrect' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                      }`}>
                        {row.feedback}
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400 font-medium">Pending</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-slate-400">
                    {expandedRow === row.parcel_id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </td>
                </tr>

                {expandedRow === row.parcel_id && (
                  <tr>
                    <td colSpan={7} className="p-0 border-b-2 border-bpi-navy-light/30">
                      <div className="bg-slate-50/50 p-6 flex flex-col lg:flex-row gap-6 animate-slide-down">
                        
                        {/* Map Section */}
                        <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden min-h-[300px] relative z-0">
                          {geomLoading && <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-bpi-green"></div></div>}
                          {!geomLoading && (!geomData[row.parcel_id] || !geomData[row.parcel_id].coordinates) && (
                            <div className="absolute inset-0 flex items-center justify-center bg-slate-50 text-slate-500 font-medium z-0">
                              Geometry currently unavailable
                            </div>
                          )}
                          {geomData[row.parcel_id] && geomData[row.parcel_id].coordinates && (
                            <MapContainer
                              bounds={L.geoJSON(geomData[row.parcel_id]).getBounds()}
                              style={{ height: '300px', width: '100%' }}
                              zoomControl={false}
                            >
                              <TileLayer
                                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                              />
                              <GeoJSON 
                                data={geomData[row.parcel_id]} 
                                style={{ color: '#147e34', weight: 2, fillColor: '#50ad30', fillOpacity: 0.3 }} 
                              />
                            </MapContainer>
                          )}
                        </div>

                        {/* Review Section */}
                        <div className="w-full lg:w-80 flex flex-col space-y-4">
                          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                            <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-3">Validate Result</h4>
                            <div className="flex gap-2 mb-4">
                              <button 
                                onClick={() => updateFeedback(row.parcel_id, "Correct")}
                                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${row.feedback === 'Correct' ? 'bg-bpi-green text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                              >
                                Correct
                              </button>
                              <button 
                                onClick={() => updateFeedback(row.parcel_id, "Unsure")}
                                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${row.feedback === 'Unsure' ? 'bg-orange-400 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                              >
                                Unsure
                              </button>
                              <button 
                                onClick={() => updateFeedback(row.parcel_id, "Incorrect")}
                                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${row.feedback === 'Incorrect' ? 'bg-red-500 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                              >
                                Incorrect
                              </button>
                            </div>
                            
                            <label className="text-xs font-semibold text-slate-600 block mb-2">Review Notes</label>
                            <textarea
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-bpi-navy-light transition-all resize-none"
                              rows={3}
                              placeholder="Add contextual notes..."
                              value={row.notes || ""}
                              onChange={(e) => updateNotes(row.parcel_id, e.target.value)}
                            />
                          </div>
                        </div>

                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
