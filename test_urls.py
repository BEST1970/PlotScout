import requests

bdot_urls = [
    "https://opendata.geoportal.gov.pl/bdot10k/14/1465_GPKG.zip",
    "https://opendata.geoportal.gov.pl/bdot10k/14/1465_SHP.zip",
    "https://opendata.geoportal.gov.pl/bdot10k/14/1465_GML.zip",
    "https://opendata.geoportal.gov.pl/bdot10k/1465_GPKG.zip",
    "https://opendata.geoportal.gov.pl/bdot10k/powiaty/1465_GPKG.zip",
    "https://opendata.geoportal.gov.pl/bdot10k/powiaty/1465_bdot10k_gpkg.zip"
]

for url in bdot_urls:
    try:
        r = requests.head(url)
        print(f"{r.status_code} - {url}")
    except Exception as e:
        print(f"Error {url}: {e}")

# Also test Nominatim for Kazimierzowska
r = requests.get("https://nominatim.openstreetmap.org/search?q=Kazimierzowska,Warszawa&format=json", headers={"User-Agent": "PlotScout/1.0"})
print("Nominatim:", r.json()[0]['lat'], r.json()[0]['lon'])

