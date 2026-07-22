import urllib.request
import json
import ssl
import urllib.parse

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

files = {
    "aflac": "File:Aflac.svg",
    "mutualofomaha": "File:Logo of Mutual of Omaha.svg"
}

for name, title in files.items():
    url = f"https://en.wikipedia.org/w/api.php?action=query&titles={urllib.parse.quote(title)}&prop=imageinfo&iiprop=url&format=json"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    resp = urllib.request.urlopen(req, context=ctx).read().decode('utf-8')
    data = json.loads(resp)
    pages = data['query']['pages']
    for pid, pdata in pages.items():
        if 'imageinfo' in pdata:
            img_url = pdata['imageinfo'][0]['url']
            print(f"Downloading {img_url} to {name}.svg")
            img_req = urllib.request.Request(img_url, headers={'User-Agent': 'Mozilla/5.0'})
            img_data = urllib.request.urlopen(img_req, context=ctx).read()
            with open(f"assets/logos/{name}.svg", "wb") as f:
                f.write(img_data)
        else:
            print(f"Could not find URL for {title}")
