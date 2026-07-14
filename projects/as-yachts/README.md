# AS Yachts — Private Yacht Brokerage & Charter

A cinematic, single-page luxury yacht brokerage site built around an
Apple-style scroll-scrubbed hero video, plus a full yacht-detail experience.
Plain HTML/CSS/JS (GSAP ScrollTrigger via CDN — no build step).

Deployed at **`/yachts/`** alongside the other demo sites. The two earlier
sites (`/` and `/azure/`) are untouched.

## Run it

```bash
cd projects/as-yachts
python3 -m http.server 8080
# open http://localhost:8080
```

## Hero video (`assets/hero.mp4`) & scrub frames

The hero scrubs forward/back with scroll across a **560vh** runway, pinned
for the full journey — distant exterior → stern → back deck → salon →
foredeck jacuzzi — with four headline beats:

1. Beyond Ownership
2. A New Standard at Sea
3. Step Aboard
4. Your Journey Begins Here

Three rendering modes, best available wins (see `js/main.js`):

1. **Canvas frame sequence** (`assets/frames/`, JPEG @ 15fps) — zero-latency scrub
2. **Video `currentTime` scrub** (`assets/hero.mp4`, all-keyframe re-encode) — fallback
3. **Static autoplay loop** — reduced-motion / no-GSAP / nothing loads

The deploy workflow bakes all of this in. To run the scrub locally, drop the
source video in and extract frames:

```bash
curl -L -o assets/hero-original.mp4 "https://d8j0ntlcm91z4.cloudfront.net/user_3GIGRwFkw7yyzrAmJxMkkQFlLZP/hf_20260714_191448_f6c93475-3080-411f-915d-bc8467db69ee.mp4"
ffmpeg -i assets/hero-original.mp4 -g 1 -keyint_min 1 -sc_threshold 0 -c:v libx264 -crf 23 -pix_fmt yuv420p -an -movflags +faststart assets/hero.mp4
mkdir -p assets/frames
ffmpeg -i assets/hero-original.mp4 -vf "fps=15,scale=1600:-2" -q:v 3 assets/frames/frame_%04d.jpg
printf '{"count": %s}\n' "$(ls assets/frames/frame_*.jpg | wc -l)" > assets/frames/manifest.json
```

## Boat photography (`assets/img/`)

One distinct exterior photo per yacht, generated to match each builder and
size (`yacht-aurelia`, `yacht-meridian`, `yacht-serene`, `yacht-lareina`,
`yacht-odyssey`, `yacht-celestia`). Each vessel's image is reused on both its
Featured Yachts card and its Charter card, and Aurelia's also drives the
detail-page hero and lead gallery tile. Fetched from the Higgsfield CDN and
converted to JPG at deploy time.

## Editorial stills (`assets/stills/`)

Six first-party frames pulled straight from the hero footage at deploy time
(`still-approach`, `still-hull`, `still-aft`, `still-deck`, `still-salon`,
`still-foredeck`) — used for the interior/deck shots in the detail-page gallery.

Every image element carries a **CSS background-color + gradient fallback**, so a
missing image degrades to an intentional dark panel — never a broken image.

## Structure

```
index.html      Full brokerage site (hero + all sections)
yacht.html      Yacht detail experience (Aurelia · 62.5m Benetti)
css/style.css   Dark cinematic design system (navy/black + gold + silver)
js/main.js      Hero scrub, nav, reveals, counters, carousel, charter filter, forms
js/yacht.js     Detail-page interactions (standalone, no hero dependency)
assets/         hero.mp4, frames/, stills/ (generated at deploy)
```

### Sections (index.html)

Scroll-scrubbed hero → The House (manifesto + animated stats) → Featured
Yachts (6 cards) → Buy a Yacht (6-step process) → Sell Your Yacht (valuation
form) → Charter (filterable destination cards) → Destinations (editorial
rail) → Brokerage Expertise (8 services) → Testimonials (carousel) →
Private Inquiry (full contact form) → Footer.

## Notes

- Transparent navigation over the hero → glassmorphism after scroll.
- All motion respects `prefers-reduced-motion`.
- Fully responsive (desktop / tablet / mobile).
- **Demo content.** All yacht names, prices, specs, offices, phone/email and
  testimonials are illustrative placeholders.
