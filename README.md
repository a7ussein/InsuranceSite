# Alexander Manchester Insurance Advisory — Static Site

This is the production-ready static site for **Alexander Manchester Insurance Advisory**.

All CSS is in `css/styles.css`, and all custom interactive JavaScript logic is in `js/main.js`. The portrait image is optimized at `assets/alex-portrait.jpg` (1100×1467, quality 80%).

## Project Structure

```
/
├── index.html            # Main site HTML (semantic, a11y & SEO ready)
├── css/
│   └── styles.css        # All styles (CSS custom properties, glassmorphism cards, responsive)
├── js/
│   └── main.js           # Deferred JS (marquee clone, reveal animations, testimonial rotation, FAQ accordion)
├── assets/
│   ├── alex-portrait.jpg # Optimized portrait of Alexander Manchester
│   ├── favicon.svg       # SVG favicon featuring "AM" serif monogram
│   └── logos/            # Carrier logo assets (SVG placeholders + real PNGs)
└── README.md             # This file
```

## Running Locally

```bash
cd /Users/alexmanchester/Desktop/InsuranceSite
python3 -m http.server 8000
```

Then visit **[http://localhost:8000](http://localhost:8000)**.

## Deploying

This is a zero-dependency static site — no build step required.

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project root and follow prompts.

### Netlify
1. Go to [netlify.com](https://netlify.com) → **Add new site** → **Deploy manually**.
2. Drag and drop the project folder into the drop zone.

---

## ⚠️ Pre-Launch Checklist

Before going live, review these items:

1. **Canonical & Social URLs** — Update the `<link rel="canonical">` and `og:url` values in `index.html` to match your production domain.
2. **OG/Twitter Image URL** — Update the `og:image` and `twitter:image` meta tags to the full production URL of the portrait.
3. **Testimonials** — The three testimonials are placeholders. Replace with verified client testimonials and ensure written consent is on file before launch (insurance compliance requirement).
5. **Calendly Link** — Verify the Calendly embed URL (`manchesteralex633/30min`) is correct and the account is active.
