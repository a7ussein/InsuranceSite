# Alex Manchester Insurance Advisory - Static Site

This is the refactored, production-ready static site for **Alex Manchester Insurance Advisory**.

All CSS is extracted to `css/styles.css`, and all custom interactive JavaScript logic is in `js/main.js`. Base64 images have been extracted and optimized to `assets/alex-portrait.jpg` (resized to 1100px wide, quality 80%, 1100x1467 ratio).

## Project Structure

```
/
├── index.html            # Main site HTML (fully optimized, semantic, a11y & SEO friendly)
├── css/
│   └── styles.css        # Extracted CSS styles (root custom properties intact)
├── js/
│   └── main.js           # Extracted JavaScript (loads deferred; handles Formspree integration)
├── assets/
│   ├── alex-portrait.jpg # Grayscale-ready optimized portrait of Alex
│   └── favicon.svg       # SVG favicon featuring "AM" serif monogram
└── README.md             # Project documentation and pre-launch configuration checklist
```

## Running Locally

To run the site locally, you can use any static file server. Since python is built into macOS, you can easily launch it from your terminal:

```bash
# Navigate to the folder (if not already there)
cd /Users/alexmanchester/Desktop/InsuranceSite

# Start a local Python server
python3 -m http.server 8000
```

Once running, navigate to:
**[http://localhost:8000](http://localhost:8000)**

## Deploying to Vercel or Netlify

Because this is a pure, zero-dependency static site, it requires no build step and can be hosted instantly.

### Option A: Vercel
1. Install the Vercel CLI: `npm i -g vercel` (if you have Node.js), or sign up at [vercel.com](https://vercel.com).
2. Run `vercel` in the project root folder.
3. Follow the interactive prompts to link your account and deploy.

### Option B: Netlify
1. Create a Netlify account at [netlify.com](https://netlify.com).
2. Go to the dashboard, click **Add new site** -> **Deploy manually**.
3. Drag and drop the `InsuranceSite` folder into the Netlify drop zone.
4. Your site will be online in seconds.

---

## ⚠️ Pre-Launch Checklist (Configuration TODOs)

Before deploying this site to a live domain, you **MUST** update the placeholder variables marked with `TODO` comments in the source code:

1. **Formspree Integration**:
   - In `js/main.js` (line 61), replace `FORM_ID_HERE` with your actual Formspree form ID to receive consultation requests.
2. **Canonical & Social URL**:
   - In `index.html` (lines 8 & 16), update the placeholder canonical URL to your final production domain.
3. **Contact Details**:
   - Replace placeholder direct phone numbers `(603) 555-0142` (in `index.html` lines 469, 732, and 776).
   - Replace placeholder email address `alex@manchesteradvisory.com` (in `index.html` line 733).
   - Replace placeholder office address `84 Elm Street, Suite 210 · Manchester, NH` (in `index.html` line 734).
4. **Marquee Carrier Names**:
   - Review and edit the `<span>` tags inside the marquee element (in `index.html` lines 503–516) to accurately reflect the carrier appointments you hold.
