import urllib.request
import re
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

urls = {
    "americo": "https://www.americo.com/",
    "americanamicable": "https://www.americanamicable.com/",
    "ethos": "https://www.ethoslife.com/",
    "transamerica": "https://www.transamerica.com/"
}

for name, url in urls.items():
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        html = urllib.request.urlopen(req, context=ctx).read().decode('utf-8')
        img_tags = re.findall(r'<img[^>]+src="([^"]+)"', html)
        print(f"{name}:")
        for tag in img_tags:
            if 'logo' in tag.lower():
                print("  ", tag)
    except Exception as e:
        print(f"Failed {name}: {e}")
