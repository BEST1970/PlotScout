import pandas as pd
import requests
from owslib.wfs import WebFeatureService

def explore_wfs_endpoints():
    print("--- Step 1: Exploring WFS Endpoints ---")
    
    endpoints = {
        "Warsaw Local WFS": "https://wfs.um.warszawa.pl/serwis",
        "National Parcels (EGiB)": "https://mapy.geoportal.gov.pl/wss/service/PZGIK/EGIB/WFS/UslugaZbiorcza",
        "National Buildings": "http://mapy.geoportal.gov.pl/wss/service/wfsBU/guest"
    }

    for name, url in endpoints.items():
        print(f"\nExploring {name} ({url})...")
        try:
            # Connect to the WFS endpoint (trying standard versions)
            wfs = WebFeatureService(url=url, version='2.0.0')
            print(f"Successfully connected to {name} using WFS 2.0.0. Top 10 layers:")
            
            layer_names = list(wfs.contents.keys())
            
            if not layer_names:
                print("No layers found or accessible.")
            else:
                for idx, layer in enumerate(layer_names[:10]):
                    print(f"  {idx+1}. {layer}")
                    
        except Exception as e:
            print(f"Failed to connect with version 2.0.0: {e}")
            print("Falling back to version 1.1.0...")
            try:
                wfs = WebFeatureService(url=url, version='1.1.0')
                print(f"Successfully connected to {name} using WFS 1.1.0. Top 10 layers:")
                layer_names = list(wfs.contents.keys())
                for idx, layer in enumerate(layer_names[:10]):
                    print(f"  {idx+1}. {layer}")
            except Exception as e2:
                print(f"Fallback failed: {e2}")

def calculate_unused_potential():
    print("\n--- Step 2 & 3: Calculating Unused Potential (Mock Data) ---")
    
    # Step 2: Mock data for Kazimierzowska test plot
    # TODO INJECT: When we have the specific parcel ID, we will query the 
    # 'National Parcels' WFS endpoint to extract the true 'plot_area_sqm'.
    mock_parcel_data = {
        "parcel_address": "Kazimierzowska Test",
        "plot_area_sqm": 5000,
        "existing_footprint_sqm": 500,
        "existing_floors": 2,
        "max_allowed_density_far": 2.5
    }
    
    # Step 3: The Math
    
    # Calculate Gross Floor Area (GFA) of existing structures
    # TODO INJECT: Query 'National Buildings' WFS to get exact building footprints 
    # and estimated heights/floors within the parcel's bounding box.
    existing_gfa = mock_parcel_data["existing_footprint_sqm"] * mock_parcel_data["existing_floors"]
    
    # Calculate Theoretical Max GFA
    # TODO INJECT: Query 'Warsaw Local WFS' (zoning/MPZP layers) to dynamically 
    # determine the 'max_allowed_density_far' for this specific plot.
    theoretical_max_gfa = mock_parcel_data["plot_area_sqm"] * mock_parcel_data["max_allowed_density_far"]
    
    # Calculate Unused Potential
    unused_potential_sqm = theoretical_max_gfa - existing_gfa
    
    # Add calculated fields to the data dictionary
    mock_parcel_data["existing_gfa"] = existing_gfa
    mock_parcel_data["theoretical_max_gfa"] = theoretical_max_gfa
    mock_parcel_data["unused_potential_sqm"] = unused_potential_sqm
    
    print(f"Calculated Results for {mock_parcel_data['parcel_address']}:")
    print(f"  Existing GFA: {existing_gfa} sqm")
    print(f"  Theoretical Max GFA: {theoretical_max_gfa} sqm")
    print(f"  Unused Potential: {unused_potential_sqm} sqm")
    
    return [mock_parcel_data]

def export_results(data):
    print("\n--- Step 4: Output ---")
    
    df = pd.DataFrame(data)
    output_filename = "PlotScout_Test_Kazimierzowska.csv"
    
    try:
        df.to_csv(output_filename, index=False)
        print(f"Successfully exported data to {output_filename}")
    except Exception as e:
        print(f"Error exporting data: {e}")

if __name__ == "__main__":
    explore_wfs_endpoints()
    results_data = calculate_unused_potential()
    export_results(results_data)
