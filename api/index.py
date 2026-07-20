import json
import urllib.parse
from http.server import BaseHTTPRequestHandler
import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry
import xml.etree.ElementTree as ET
from shapely.geometry import Polygon

def get_robust_session():
    session = requests.Session()
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

def extract_polygons_from_gml(gml_content, feature_type):
    """
    Parses GML and extracts Shapely polygons along with their properties.
    """
    try:
        root = ET.fromstring(gml_content)
    except ET.ParseError:
        return []
    
    namespaces = {
        'gml': 'http://www.opengis.net/gml',
        'ms': 'http://mapserver.gis.umn.edu/mapserver'
    }
    
    features = []
    
    # Find all feature members
    for member in root.findall('.//gml:featureMember', namespaces):
        feature_node = member.find(f'ms:{feature_type}', namespaces)
        if feature_node is None:
            continue
            
        properties = {}
        for child in feature_node:
            if not child.tag.endswith('geometry'):
                tag_name = child.tag.split('}')[-1]
                properties[tag_name] = child.text
                
        # Extract geometry
        polygon_coords = None
        
        pos_list = feature_node.find('.//gml:posList', namespaces)
        if pos_list is not None and pos_list.text:
            coords = [float(x) for x in pos_list.text.strip().split()]
            polygon_coords = [(coords[i], coords[i+1]) for i in range(0, len(coords), 2)]
        else:
            coord_node = feature_node.find('.//gml:coordinates', namespaces)
            if coord_node is not None and coord_node.text:
                coord_str = coord_node.text.strip()
                pairs = coord_str.split(' ')
                polygon_coords = []
                for p in pairs:
                    if p:
                        try:
                            x, y = p.split(',')
                            polygon_coords.append((float(x), float(y)))
                        except ValueError:
                            pass
        
        if polygon_coords and len(polygon_coords) >= 3:
            poly = Polygon(polygon_coords)
            if not poly.is_valid:
                poly = poly.buffer(0)
            features.append({'geometry': poly, 'properties': properties})
            
    return features

def fetch_layer_data(bbox_coords: str, session: requests.Session, layer_name: str) -> list:
    wfs_url = "https://mapy.geoportal.gov.pl/wss/service/PZGIK/EGIB/WFS/UslugaZbiorcza"
    params = {
        "service": "WFS",
        "version": "1.1.0",
        "request": "GetFeature",
        "typeName": f"ms:{layer_name}",
        "srsName": "EPSG:2180",
        "bbox": f"{bbox_coords},urn:ogc:def:crs:EPSG::2180" 
    }
    try:
        response = session.get(wfs_url, params=params, timeout=60)
        response.raise_for_status()
        return extract_polygons_from_gml(response.content, layer_name)
    except Exception as e:
        print(f"Error fetching {layer_name}: {e}")
        return []

def process_scout(bbox, far, max_footprint_pct):
    session = get_robust_session()
    
    # 1. Fetch Parcels (dzialki)
    parcels = fetch_layer_data(bbox, session, "dzialki")
    
    # 2. Fetch Buildings (budynki)
    buildings = fetch_layer_data(bbox, session, "budynki")
    
    results = []
    
    # 3. Spatial Intersection
    for p in parcels:
        parcel_poly = p['geometry']
        parcel_id = p['properties'].get('Identyfikator', 'unknown')
        
        try:
            declared_area = float(p['properties'].get('powierzchnia', 0))
        except (ValueError, TypeError):
            declared_area = parcel_poly.area
            
        if declared_area == 0:
            declared_area = parcel_poly.area
            
        intersecting_building_areas = []
        existing_gfa = 0
        
        for b in buildings:
            build_poly = b['geometry']
            if parcel_poly.intersects(build_poly):
                intersection = parcel_poly.intersection(build_poly)
                intersect_area = intersection.area
                intersecting_building_areas.append(intersect_area)
                
                # Try to get floors, fallback to 2
                floors_str = b['properties'].get('liczba_kondygnacji_nadziemnych', '2')
                try:
                    floors = float(floors_str)
                except (ValueError, TypeError):
                    floors = 2.0
                    
                existing_gfa += (intersect_area * floors)
                
        existing_footprint = sum(intersecting_building_areas)
        theoretical_max_gfa = declared_area * far
        unused_potential_sqm = theoretical_max_gfa - existing_gfa
        
        results.append({
            "parcel_id": parcel_id,
            "plot_area_sqm": round(declared_area, 2),
            "existing_footprint_sqm": round(existing_footprint, 2),
            "existing_gfa": round(existing_gfa, 2),
            "theoretical_max_gfa": round(theoretical_max_gfa, 2),
            "unused_potential_sqm": round(unused_potential_sqm, 2),
            "max_allowed_footprint_sqm": round(declared_area * (max_footprint_pct / 100.0), 2)
        })
        
    return {"status": "success", "parcels": results, "total_buildings_fetched": len(buildings)}

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        parsed_path = urllib.parse.urlparse(self.path)
        query = urllib.parse.parse_qs(parsed_path.query)
        
        bbox = query.get('bbox', ['635000,483000,635100,483100'])[0]
        try:
            far = float(query.get('far', ['2.5'])[0])
            max_footprint = float(query.get('max_footprint', ['40'])[0])
        except ValueError:
            far = 2.5
            max_footprint = 40.0
            
        result = process_scout(bbox, far, max_footprint)
        
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps(result).encode('utf-8'))
        return
