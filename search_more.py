import urllib.request
import json
import ssl
import urllib.parse

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

def search(q):
    url = f"https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch={urllib.parse.quote(q)}&utf8=&format=json&srnamespace=6"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    resp = urllib.request.urlopen(req, context=ctx).read().decode('utf-8')
    data = json.loads(resp)
    print(f"Results for {q}:")
    for res in data['query']['search']:
        if res['title'].endswith('.svg') or res['title'].endswith('.png'):
            print(res['title'])

search("Mutual of Omaha logo")
search("Transamerica logo")
search("Americo logo")
search("American Amicable logo")
search("Ethos Life logo")
