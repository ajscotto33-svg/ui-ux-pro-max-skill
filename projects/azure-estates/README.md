# Azure Estates — Neutral-Brand Luxury Real Estate Site

A premium single-page site with an Apple-style scroll-scrubbed hero video, built with plain HTML/CSS/JS (GSAP ScrollTrigger + Leaflet via CDN — no build step).

## Run it

```bash
cd projects/azure-estates
python3 -m http.server 8080
# open http://localhost:8080
```

## Hero video (`assets/hero.mp4`)

The page loads `assets/hero.mp4` first and automatically falls back to the generated Higgsfield CDN URL if the local file is missing. CDN links can expire, so drop the file in locally:

```bash
curl -L -o assets/hero.mp4 "https://d8j0ntlcm91z4.cloudfront.net/user_3GIGRwFkw7yyzrAmJxMkkQFlLZP/hf_20260714_150621_fe761e14-cf7f-4043-a8fc-e1bc99ba797c.mp4"
```

**For buttery-smooth scroll scrubbing**, re-encode so every frame is a keyframe (browsers seek instantly then):

```bash
ffmpeg -i hero-original.mp4 -g 1 -c:v libx264 -crf 21 -pix_fmt yuv420p -an -movflags +faststart assets/hero.mp4
```

## Placeholders to replace

- **Phone / email / social links** in the Contact section and `js/main.js` — currently `(305) 555-0100` / `hello@azureestates.com`.
- **Stats** in the About section (20+ years, $500M+, 15+ neighborhoods) are sample marketing numbers.
- **Property cards** use stylized line-art placeholders — swap `card__media` contents for real listing photography.
- **Testimonials** are sample copy.
- **Brand mark** — replace the `Æ` monogram block in About with a real logo or photo.

## Structure

```
index.html      All sections & markup
css/style.css   Design system (navy #0A1628 + champagne #C5A468, Cormorant Garamond / Jost)
js/main.js      Hero scrub, nav transition, reveals, carousel, map, form
assets/         hero.mp4 (see above)
```

Sections: scroll-scrubbed hero → About → Featured Properties → "We Service South Florida" map (Leaflet, Miami-centered, 10 area markers) → Why Work With Andrew → Testimonials carousel → Contact + form → Footer.

Accessibility: reduced-motion support (hero degrades to an autoplaying loop, reveals disabled), keyboard-navigable chips/carousel, visible focus states, labeled form fields with inline validation.
