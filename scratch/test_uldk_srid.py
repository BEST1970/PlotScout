import requests
url = "https://uldk.gugik.gov.pl/?request=GetParcelById&id=146506_8.0205.109/2&result=geom_wkt&srid=4326"
r = requests.get(url)
print("WITH SRID=4326")
print(r.text)
