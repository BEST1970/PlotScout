"use client";

import React, { useState, useEffect } from "react";
import { Search, Loader2 } from "lucide-react";
import "leaflet/dist/leaflet.css";
import proj4 from "proj4";

import { MapContainer, TileLayer, WMSTileLayer, useMapEvents, useMap, Marker, GeoJSON as ParcelBoundary } from 'react-leaflet';
import L from 'leaflet';
import type { Polygon as GeoJsonPolygon } from 'geojson';

import { globalCachedData, ParcelRow, formatZone } from "./ResultsList";

proj4.defs("EPSG:2180", "+proj=tmerc +lat_0=0 +lon_0=19 +k=0.9993 +x_0=500000 +y_0=-5300000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");

function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  var R = 6371000;
  var dLat = (lat2-lat1) * (Math.PI/180);
  var dLon = (lon2-lon1) * (Math.PI/180); 
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1*(Math.PI/180)) * Math.cos(lat2*(Math.PI/180)) * Math.sin(dLon/2) * Math.sin(dLon/2); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  return R * c;
}

function findMatchingParcel(lat: number, lng: number, addressSearch: string = ""): ParcelRow | null {
  if (!globalCachedData) return null;
  
  if (addressSearch) {
    const q = addressSearch.toLowerCase();
    const match = globalCachedData.find(p => p.address && p.address.toLowerCase().includes(q));
    if (match) return match;
  }
  
  // Find closest by distance
  let closest: ParcelRow | null = null;
  let minD = 50; // Max 50 meters
  for (const p of globalCachedData) {
    if (p.lat && p.lon) {
      const d = getDistance(lat, lng, p.lat, p.lon);
      if (d < minD) {
        minD = d;
        closest = p;
      }
    }
  }
  return closest;
}

type ScoutResult = {
  parcel_id: string;
  zone: string;
  plot_area: number | null;
  existing_gfa: number | null;
  allowed_gfa: number | null;
  gap: number | null;
  warning: string | null;
  address?: string | null;
  district?: string | null;
  existing_footprint?: number | null;
  building_count?: number | null;
  error?: string;
};

export default function ParcelExplorer() {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeParcel, setActiveParcel] = useState<ScoutResult | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [searchCoords, setSearchCoords] = useState<[number, number] | null>(null);
  const [selectedCoords, setSelectedCoords] = useState<[number, number] | null>(null);
  const [selectedBoundary, setSelectedBoundary] = useState<GeoJsonPolygon | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery + ', Warsaw')}`);
      const data = await res.json();
      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);
        setSearchCoords([lat, lon]);
        setErrorMsg("");
        
        const mockMatch = findMatchingParcel(lat, lon, searchQuery);
        if (mockMatch) {
            setActiveParcel({
              parcel_id: mockMatch.parcel_id,
              zone: formatZone(mockMatch.Zone),
              plot_area: mockMatch.plot_area,
              existing_gfa: mockMatch.existing_gfa,
              allowed_gfa: mockMatch.allowed_gfa,
              gap: mockMatch.gap,
              warning: null
            });
        } else {
            setActiveParcel(null);
        }
      } else {
        setErrorMsg("Address not found.");
      }
    } catch (err: any) {
      setErrorMsg("Geocoding failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const MapUpdater = () => {
    const map = useMap();
    useEffect(() => {
      if (searchCoords) {
        map.flyTo(searchCoords, 18, { animate: true, duration: 1.5 });
      }
    }, [searchCoords, map]);
    return null;
  };

  const customIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const MapClickHandler = () => {
    useMapEvents({
      click: async (e) => {
        setLoading(true);
        setErrorMsg("");
        setActiveParcel(null);
        
        try {
          const lat = e.latlng.lat;
          const lng = e.latlng.lng;
          setSelectedCoords([lat, lng]);
          
          // ULDK uses Poland's EPSG:2180 coordinate system. Resolve it through
          // our server route so browser CORS rules cannot block parcel clicks.
          const [x, y] = proj4("EPSG:4326", "EPSG:2180", [lng, lat]);
          const parcelRes = await fetch(`/api/parcel-at-point?x=${encodeURIComponent(x)}&y=${encodeURIComponent(y)}`);
          const parcelData = await parcelRes.json();
          if (!parcelRes.ok) {
            throw new Error(parcelData.error || "No parcel found at this location.");
          }
          
          const parcelId = parcelData.parcel_id;
          setSelectedBoundary(parcelData.boundary || null);
          
          // Prefer reviewed seed data when the click matches one of its parcels.
          const mockMatch = findMatchingParcel(lat, lng);
          if (mockMatch) {
            setActiveParcel({
              parcel_id: mockMatch.parcel_id,
              zone: formatZone(mockMatch.Zone),
              plot_area: mockMatch.plot_area,
              existing_gfa: mockMatch.existing_gfa,
              allowed_gfa: mockMatch.allowed_gfa,
              gap: mockMatch.gap,
              warning: null
            });
            return;
          }

          setActiveParcel({
            parcel_id: parcelId,
            zone: parcelData.zone,
            plot_area: parcelData.plot_area,
            existing_gfa: parcelData.existing_gfa,
            allowed_gfa: parcelData.allowed_gfa,
            gap: parcelData.gap,
            warning: parcelData.warning,
            address: parcelData.address,
            district: parcelData.district,
            existing_footprint: parcelData.existing_footprint,
            building_count: parcelData.building_count,
          });
        } catch (err: any) {
          setErrorMsg(err.message || "An error occurred.");
        } finally {
          setLoading(false);
        }
      },
    });
    return null;
  };

  return (
    <div className="flex flex-col lg:flex-row h-[700px] bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden animate-fade-in-up">
      {/* Side Panel */}
      <div className="w-full lg:w-96 bg-slate-50 border-r border-slate-200 flex flex-col z-10">
        <div className="p-6 border-b border-slate-200 bg-white">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Parcel Explorer</h2>
          
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search address in Warsaw..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-bpi-navy-light transition-all"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          </form>
          <p className="text-xs text-slate-500 mt-4 leading-relaxed">
            Click any parcel to load its official boundary and area, public building data, address, district, and estimated development potential.
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {loading && (
            <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-4">
              <Loader2 className="w-8 h-8 animate-spin text-bpi-navy" />
              <p className="text-sm font-medium">Analyzing parcel data...</p>
            </div>
          )}

          {errorMsg && !loading && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600 text-sm">
              <span className="font-bold block mb-1">Error</span>
              {errorMsg}
            </div>
          )}

          {activeParcel && !loading && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Selected Parcel</h3>
                <p className="text-sm font-semibold text-slate-800 break-all">{activeParcel.parcel_id}</p>
                {activeParcel.address && <p className="mt-2 text-xs text-slate-600 leading-relaxed">{activeParcel.address}</p>}
                {activeParcel.district && <p className="mt-1 text-xs font-semibold text-bpi-navy">{activeParcel.district}</p>}
              </div>

              {activeParcel.warning && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 text-orange-700 text-xs font-semibold">
                  ⚠️ {activeParcel.warning}
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white border border-slate-200 rounded-lg p-3">
                  <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Zone</p>
                  <p className="text-sm font-bold text-slate-800">{activeParcel.zone}</p>
                </div>
                <div className="bg-white border border-slate-200 rounded-lg p-3">
                  <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Plot Area</p>
                  <p className="text-sm font-bold text-slate-800">
                    {activeParcel.plot_area === null ? "N/A" : activeParcel.plot_area.toLocaleString(undefined, {maximumFractionDigits: 0})}
                    {activeParcel.plot_area !== null && <span className="text-[10px] text-slate-400 font-medium"> sqm</span>}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {activeParcel.existing_footprint !== undefined && (
                  <div className="bg-white border border-slate-200 rounded-lg p-4 flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-500 uppercase">Building Footprint</span>
                    <span className="text-sm font-bold text-slate-800">
                      {activeParcel.existing_footprint === null ? "N/A" : `${activeParcel.existing_footprint.toLocaleString(undefined, { maximumFractionDigits: 0 })} sqm`}
                      {activeParcel.building_count !== null && activeParcel.building_count !== undefined && <span className="block text-[10px] text-slate-400 text-right">{activeParcel.building_count} buildings</span>}
                    </span>
                  </div>
                )}
                <div className="bg-white border border-slate-200 rounded-lg p-4 flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-500 uppercase">Existing GFA</span>
                  <span className="text-sm font-bold text-slate-800">
                    {activeParcel.existing_gfa === null ? "N/A" : `${activeParcel.existing_gfa.toLocaleString(undefined, { maximumFractionDigits: 0 })} sqm`}
                  </span>
                </div>
                <div className="bg-white border border-slate-200 rounded-lg p-4 flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-500 uppercase">Allowed GFA</span>
                  <span className="text-sm font-bold text-slate-800">
                    {activeParcel.allowed_gfa === null ? "N/A" : `${activeParcel.allowed_gfa.toLocaleString(undefined, { maximumFractionDigits: 0 })} sqm`}
                  </span>
                </div>
                
                <div className={`rounded-xl p-5 border ${(activeParcel.gap ?? 0) > 0 ? 'bg-bpi-green/10 border-bpi-green/30' : 'bg-slate-100 border-slate-200'}`}>
                  <p className={`text-[11px] uppercase font-bold mb-1 ${(activeParcel.gap ?? 0) > 0 ? 'text-bpi-green-dark' : 'text-slate-500'}`}>Unused Potential Gap</p>
                  <p className={`text-2xl font-extrabold ${(activeParcel.gap ?? 0) > 0 ? 'text-bpi-green' : 'text-slate-800'}`}>
                    {activeParcel.gap === null ? "N/A" : activeParcel.gap.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    {activeParcel.gap !== null && <span className="text-sm font-medium opacity-60"> sqm</span>}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {!activeParcel && !loading && !errorMsg && (
            <div className="flex flex-col items-center justify-center h-full text-slate-400">
              <p className="text-sm text-center">Click on the map to select a parcel and view its potential.</p>
            </div>
          )}
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 relative z-0">
        <MapContainer
          center={[52.2297, 21.0122]}
          zoom={14}
          className="h-full w-full"
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution="&copy; OpenStreetMap contributors &copy; CARTO"
          />
          <WMSTileLayer
            url="https://mapy.geoportal.gov.pl/wss/service/PZGIK/EGIB/WMS/UslugaZbiorcza"
            layers="dzialki"
            format="image/png"
            transparent={true}
            version="1.1.1"
          />
          <MapUpdater />
          {selectedBoundary && (
            <ParcelBoundary
              key={JSON.stringify(selectedBoundary.coordinates[0][0])}
              data={selectedBoundary}
              style={{ color: '#1f6b4f', weight: 3, fillColor: '#53a318', fillOpacity: 0.2 }}
            />
          )}
          {(selectedCoords || searchCoords) && (
            <Marker position={selectedCoords || searchCoords!} icon={customIcon} />
          )}
          <MapClickHandler />
        </MapContainer>
      </div>
    </div>
  );
}
