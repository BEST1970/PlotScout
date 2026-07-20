import json
import io
import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry
import geopandas as gpd

def get_robust_session() -> requests.Session:
    """
    Creates a requests Session with robust retry logic and connection pooling.
    Ideal for serverless environments querying flaky public endpoints.
    """
    session = requests.Session()
    
    # Configure retry strategy with exponential backoff
    retry_strategy = Retry(
        total=5,
        backoff_factor=1,
        status_forcelist=[429, 500, 502, 503, 504],
        allowed_methods=["HEAD", "GET", "OPTIONS", "POST"]
    )
    
    adapter = HTTPAdapter(max_retries=retry_strategy)
    session.mount("http://", adapter)
    session.mount("https://", adapter)
    
    return session

def fetch_parcel_data(bbox_coords: str, session: requests.Session, timeout: int = 60) -> dict:
    """
    Executes a WFS GetFeature request against the National Parcels (EGiB) endpoint 
    to fetch geometry and area for parcels within a bounding box.
    Uses GeoPandas to securely parse the returned GML into GeoJSON format.
    """
    wfs_url = "https://mapy.geoportal.gov.pl/wss/service/PZGIK/EGIB/WFS/UslugaZbiorcza"
    
    # EGiB WFS server throws a 400 error if we request application/json natively.
    # Instead, we request the default GML using WFS 1.1.0 and parse it with GeoPandas.
    params = {
        "service": "WFS",
        "version": "1.1.0",
        "request": "GetFeature",
        "typeName": "ms:dzialki",
        "srsName": "EPSG:2180",
        # Added urn format for full OGC compliance
        "bbox": f"{bbox_coords},urn:ogc:def:crs:EPSG::2180" 
    }

    try:
        # Generous 60-second timeout with robust retry logic
        response = session.get(wfs_url, params=params, timeout=timeout)
        response.raise_for_status()
        
        # Parse the raw GML response directly into a GeoDataFrame!
        # This acts as our robust GML-to-GeoJSON translator
        gdf = gpd.read_file(io.BytesIO(response.content))
        
        if gdf.empty:
            return {"error": "No parcels found in this bounding box.", "bbox": bbox_coords}
            
        # Convert GeoDataFrame to standard GeoJSON dictionary
        geojson_data = json.loads(gdf.to_json())
        
        # Extract the first feature for our mock potential calculation
        feature = geojson_data["features"][0]
        properties = feature.get("properties", {})
        geometry = feature.get("geometry", {})
        
        # Polish EGiB might store IDs in different fields based on the exact layer implementation, 
        # but 'Identyfikator' is common.
        parcel_id = properties.get("Identyfikator", "unknown_id")
        plot_area_sqm = properties.get("powierzchnia", 5000) 
        
        return {
            "parcel_id": parcel_id,
            "plot_area_sqm": plot_area_sqm,
            "geometry": geometry,
            "properties": properties,
            "total_parcels_found": len(geojson_data["features"])
        }
        
    except requests.exceptions.RequestException as e:
        print(f"Network or timeout error fetching parcel data: {e}")
        return {"error": str(e), "bbox": bbox_coords}
    except Exception as e:
        print(f"Error parsing GML data with GeoPandas: {e}")
        return {"error": "Invalid response format or GML parse error", "bbox": bbox_coords}

def calculate_potential(parcel_data: dict, mock_footprint: int = 500, mock_floors: int = 2, mock_far: float = 2.5) -> dict:
    """
    Calculates the unused development potential.
    Pure functional logic separated from data-fetching, perfect for serverless testing.
    """
    if "error" in parcel_data:
        return parcel_data

    # EGiB properties are often stored as strings
    try:
        plot_area_sqm = float(parcel_data.get("plot_area_sqm", 0))
    except (ValueError, TypeError):
        plot_area_sqm = 0.0
    
    # The Math
    existing_gfa = mock_footprint * mock_floors
    theoretical_max_gfa = plot_area_sqm * mock_far
    unused_potential_sqm = theoretical_max_gfa - existing_gfa
    
    return {
        "parcel_id": parcel_data["parcel_id"],
        "plot_area_sqm": plot_area_sqm,
        "existing_gfa": existing_gfa,
        "theoretical_max_gfa": theoretical_max_gfa,
        "unused_potential_sqm": unused_potential_sqm,
        "total_parcels_found": parcel_data.get("total_parcels_found"),
        "status": "success",
        # Excluded full geometry in print output for brevity, but we return its type to prove we have it!
        "geometry_type": parcel_data.get("geometry", {}).get("type") 
    }

def handler(request_dict: dict, context=None) -> dict:
    """
    Serverless function handler entry point.
    Expects a parsed dictionary event.
    """
    # Standard EPSG:2180 coordinates for a small bounding box in Mokotów/Warsaw
    dummy_bbox = "635000,483000,635100,483100"
    
    bbox = request_dict.get("bbox", dummy_bbox)
    
    session = get_robust_session()
    
    print(f"Fetching spatial data for BBOX: {bbox}...")
    parcel_data = fetch_parcel_data(bbox, session)
    
    print("Calculating unused potential for the first parcel found...")
    result = calculate_potential(parcel_data)
    
    return {
        "statusCode": 200 if result.get("status") == "success" else 500,
        "headers": {
            "Content-Type": "application/json"
        },
        "body": json.dumps(result)
    }

if __name__ == "__main__":
    print("--- Phase 2: Robust WFS Query & Serverless Execution ---")
    mock_api_request = {"bbox": "635000,483000,635100,483100"} 
    
    response = handler(mock_api_request)
    
    print("\n--- API Response JSON ---")
    print(json.dumps(json.loads(response["body"]), indent=2))
