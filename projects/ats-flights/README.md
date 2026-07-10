# ATS — Aircraft Transport Service

A luxury private-jet charter site for ATS, with an Apple-style scroll-scrubbed
hero: an ATS Gulfstream soaring above the Miami skyline into the sunset, its
frames bound to your scroll wheel.

Content adapted from atsflights.com (services, fleet, safety certifications,
contact). Design grounded in the UI UX Pro Max skill databases — the
"Classic Elegant" pairing (Playfair Display + Inter) and a premium-dark
palette, recast in a midnight-aviation navy with a signature ATS blue and a
Miami-sunset accent that ties back to the hero film.

## Run

```bash
npm install
npm run dev
```

## The hero video

The hero plays `public/hero.mp4` (a Higgsfield-generated Gulfstream-over-Miami
clip). Until that file exists the hero falls back to a sunset-over-water
gradient so the page still renders.

Seek smoothness depends on keyframe density — the asset is re-encoded with a
keyframe on every frame before use:

```bash
ffmpeg -i source.mp4 -g 1 -c:v libx264 -crf 18 -pix_fmt yuv420p -movflags +faststart -an public/hero.mp4
```

## How the scroll hero works

`app/components/ScrollHero.tsx`:

- A tall runway section (default `4 × 100vh`) with a `position: sticky` stage
  pins the video for the whole scroll.
- A `requestAnimationFrame` loop maps scroll progress (0→1) to
  `video.currentTime`, smoothed with an exponential lerp so the scrub glides.
- The same progress writes a `--progress` CSS variable; the headline phases
  (intro / mid / outro) are pure-CSS `clamp()` functions of it — no re-renders.
- `prefers-reduced-motion` plays the video normally and hides intermediate copy.
