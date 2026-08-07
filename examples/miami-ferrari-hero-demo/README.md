# Bayfront Eight — Scroll-Controlled Hero (Ferrari waterfront)

An Apple-style hero section where a 14s cinematic drone shot **scrubs to the
user's scroll position** (forward *and* backward): follow the Ferrari through the
gates → past the bayfront estates → through the glass → settle inside the living
room over the infinity pool, Biscayne Bay, and the Miami skyline.

## Run it

Single self-contained file — no build step:

```bash
open examples/miami-ferrari-hero-demo/index.html            # macOS
# or serve it (recommended so video range-requests behave):
python3 -m http.server -d examples/miami-ferrari-hero-demo 8080
# visit http://localhost:8080  → scroll
```

## How it works

- A tall `.scrollTrack` (600vh) provides scroll distance; `.stage` is
  `position: sticky` so the video stays pinned while you scroll through it.
- Scroll position → `0..1` → `video.currentTime`, **lerp-smoothed** (`ease
  0.16`) for fluid scrubbing, with redundant seeks skipped. Respects
  `prefers-reduced-motion`.
- Video is `muted` + `playsinline` and never "plays" — the timeline is driven
  manually each animation frame. Journey captions + progress bar track position.

## Swapping in your own / self-hosted video

The demo points at the hosted render on CloudFront. For production, **self-host
the MP4** so it can't disappear and you control caching:

1. Put your file at `assets/hero.mp4`, update `<source src>` and `poster` in `index.html`.
2. Re-encode for smooth scrubbing (frequent keyframes + faststart):

```bash
ffmpeg -i input.mp4 -an -c:v libx264 -crf 20 -preset slow \
  -g 12 -keyint_min 12 -pix_fmt yuv420p -movflags +faststart assets/hero.mp4
```

Short GOP (`-g`) is the biggest factor in scrub smoothness.

## Notes

- Tune feel via the `ease` constant and `.scrollTrack { height }`.
- "Bayfront Eight" and all copy are placeholder/fictional for demonstration.
