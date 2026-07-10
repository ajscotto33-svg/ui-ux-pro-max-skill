# Scroll Hero — Apple-style video scrub

A Next.js (App Router) site whose hero video scrubs forward as you scroll,
like Apple's product pages. The hero clip is a BMW X6 launching from 0 to
200 km/h into a Miami sunset.

## Run

```bash
npm install
npm run dev
```

## The hero video

The component plays `public/hero.mp4`. Until that file exists, the hero
falls back to a Miami-sunset gradient so the page still renders.

**Important for smooth scrubbing:** seek performance depends on keyframe
density. Re-encode any generated/downloaded clip with a keyframe on every
frame before dropping it in:

```bash
ffmpeg -i source.mp4 -g 1 -c:v libx264 -pix_fmt yuv420p -movflags +faststart -an public/hero.mp4
```

## How it works

`app/components/ScrollHero.tsx`:

- A tall wrapper section (default `4 × 100vh`) creates the scroll runway;
  a `position: sticky` stage pins the video for the whole runway.
- A `requestAnimationFrame` loop maps scroll progress (0→1) to
  `video.currentTime`, smoothed with an exponential lerp so the scrub
  glides instead of snapping to scroll events.
- The same progress value is written to a `--progress` CSS custom property;
  the three headline phases (intro / mid / outro) are pure-CSS `clamp()`
  functions of it — no React re-renders during scroll.
- `prefers-reduced-motion`: the video plays normally instead of binding to
  scroll, and intermediate copy phases are hidden.
