"use client";

import React, { useEffect, useState, useRef } from "react";
import Papa from "papaparse";
import { ChevronDown, ChevronUp, Download } from "lucide-react";
import "leaflet/dist/leaflet.css";
import { parse } from "wellknown";
import proj4 from "proj4";

proj4.defs("EPSG:2180", "+proj=tmerc +lat_0=0 +lon_0=19 +k=0.9993 +x_0=500000 +y_0=-5300000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");

function transformCoords(coords: any): any {
  if (typeof coords[0] === 'number') {
    return proj4("EPSG:2180", "EPSG:4326", [coords[0], coords[1]]);
  }
  return coords.map(transformCoords);
}
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
            }));
            setData(withFeedback as ParcelRow[]);
          },
        });
      });
  }, []);

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
        if (result.wkt) {
          const geojson = parse(result.wkt);
          if (geojson && (geojson as any).coordinates) {
            (geojson as any).coordinates = transformCoords((geojson as any).coordinates);
          }
          setGeomData((prev) => ({ ...prev, [parcelId]: geojson as any }));
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

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden animate-fade-in-up">
      <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Batch Discovery Results</h2>
          <p className="text-sm text-slate-500 mt-1">Review the top unused potential parcels ranked by the pipeline.</p>
        </div>
        <button
          onClick={exportCsv}
          className="flex items-center space-x-2 px-4 py-2 bg-bpi-navy text-white rounded-lg hover:bg-bpi-navy-light transition-colors shadow-sm"
        >
          <Download className="w-4 h-4" />
          <span className="font-medium text-sm">Export CSV</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
              <th className="px-6 py-4 cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort('parcel_id')}>Parcel ID</th>
              <th className="px-6 py-4 cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort('Zone')}>Zone</th>
              <th className="px-6 py-4 cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort('plot_area')}>Plot Area (sqm)</th>
              <th className="px-6 py-4 cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort('allowed_gfa')}>Max GFA (sqm)</th>
              <th className="px-6 py-4 cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort('gap')}>Gap (sqm)</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((row) => (
              <React.Fragment key={row.parcel_id}>
                <tr
                  className={`hover:bg-slate-50 transition-colors cursor-pointer ${expandedRow === row.parcel_id ? 'bg-slate-50' : ''}`}
                  onClick={() => handleExpand(row.parcel_id)}
                >
                  <td className="px-6 py-4 font-medium text-slate-800">{row.parcel_id}</td>
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
                          {geomData[row.parcel_id] && (
                            <MapContainer
                              bounds={L.geoJSON(geomData[row.parcel_id]).getBounds()}
                              className="h-full w-full"
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
