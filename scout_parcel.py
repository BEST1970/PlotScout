import os
import sys
import json
import geopandas as gpd
from shapely.wkt import loads as wkt_loads
import pandas as pd
import requests

DATA_DIR = "data"
BDOT_BUBD_PATH = os.path.join(DATA_DIR, "OT_BUBD_A.gml")
POG_GML_PATH = os.path.join(DATA_DIR, "plan_ogolny.gml")

def get_parcel_geometry(parcel_id):
    url = f"https://uldk.gugik.gov.pl/?request=GetParcelById&id={parcel_id}&result=geom_wkt"
    r = requests.get(url)
    if r.status_code == 200 and r.text.strip().startswith('0'):
        wkt_str = r.text.strip().split('\n')[1]
        if ";" in wkt_str:
            wkt_str = wkt_str.split(";")[1]
        poly = wkt_loads(wkt_str)
        return poly
    return None

def main():
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No parcel ID provided"}))
        return
        
    parcel_id = sys.argv[1]
    poly = get_parcel_geometry(parcel_id)
    if not poly:
        print(json.dumps({"error": "Could not fetch parcel geometry"}))
        return
        
    parcels_gdf = gpd.GeoDataFrame(
        {'parcel_id': [parcel_id]},
        geometry=[poly], crs="EPSG:2180"
    )
    parcels_gdf['plot_area'] = parcels_gdf.geometry.area
    
    # Load POG
    if not os.path.exists(POG_GML_PATH):
        print(json.dumps({"error": "POG GML missing"}))
        return
        
    try:
        pog_gdf = gpd.read_file(POG_GML_PATH, layer='StrefaPlanistyczna')
        if pog_gdf.crs != "EPSG:2180":
            pog_gdf = pog_gdf.to_crs("EPSG:2180")
            
        parcels_with_zones = gpd.overlay(parcels_gdf, pog_gdf, how='intersection')
        if len(parcels_with_zones) > 0:
            parcels_with_zones['overlap_area'] = parcels_with_zones.geometry.area
            zone_row = parcels_with_zones.sort_values('overlap_area', ascending=False).iloc[0]
        else:
            zone_row = pd.Series({'symbol': 'N/A', 'maksNadziemnaIntensywnoscZabudowy': 0, 'maksUdzialPowierzchniZabudowy': 0, 'maksWysokoscZabudowy': 0})
    except:
        zone_row = pd.Series({'symbol': 'N/A', 'maksNadziemnaIntensywnoscZabudowy': 0, 'maksUdzialPowierzchniZabudowy': 0, 'maksWysokoscZabudowy': 0})
        
    # Load BDOT
    if not os.path.exists(BDOT_BUBD_PATH):
        print(json.dumps({"error": "BDOT missing"}))
        return
        
    import warnings
    with warnings.catch_warnings():
        warnings.simplefilter("ignore")
        bdot_gdf = gpd.read_file(BDOT_BUBD_PATH)
        if bdot_gdf.crs != "EPSG:2180":
            bdot_gdf = bdot_gdf.to_crs("EPSG:2180")
            
        bldgs_in_parcels = gpd.overlay(bdot_gdf, parcels_gdf[['parcel_id', 'geometry']], how='intersection')
    
    existing_gfa = 0.0
    has_missing_floors = False
    
    for _, bldg in bldgs_in_parcels.iterrows():
        try:
            floors = float(bldg.get('liczbaKondygnacji', 0))
        except:
            floors = 0.0
            
        if pd.isna(floors) or floors <= 0:
            floors = 0.0
            has_missing_floors = True
            
        area = bldg.geometry.area
        existing_gfa += (area * floors)
        
    plot_area = parcels_gdf.iloc[0]['plot_area']
    
    try: density = float(zone_row.get('maksNadziemnaIntensywnoscZabudowy', 0))
    except: density = 0.0
    
    try: footprint_pct = float(zone_row.get('maksUdzialPowierzchniZabudowy', 0)) / 100.0
    except: footprint_pct = 0.0
    
    try: height = float(zone_row.get('maksWysokoscZabudowy', 0))
    except: height = 0.0
    
    floors = max(1.0, round(height / 3.0)) if height > 0 else 1.0
    
    vol_gfa = footprint_pct * plot_area * floors
    den_gfa = density * plot_area
    
    if den_gfa > 0 and vol_gfa > 0:
        allowed_gfa = min(vol_gfa, den_gfa)
    else:
        allowed_gfa = max(vol_gfa, den_gfa)
        
    gap = allowed_gfa - existing_gfa
    
    res = {
        "parcel_id": parcel_id,
        "zone": str(zone_row.get('symbol', 'N/A')),
        "plot_area": plot_area,
        "existing_gfa": existing_gfa,
        "allowed_gfa": allowed_gfa,
        "gap": gap,
        "warning": "Missing Floor Data" if has_missing_floors else None
    }
    
    print(json.dumps(res))

if __name__ == "__main__":
    main()
