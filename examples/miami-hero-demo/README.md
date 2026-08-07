# Miami Luxury — Scroll-Controlled Hero Demo

An Apple-style hero section where a single cinematic drone video **scrubs to the
user's scroll position** (forward *and* backward). Built around a 14s, 1080p,
16:9 golden-hour fly-through of a fictional 8-mansion Miami enclave.

## Run it

It's a single self-contained file — no build step:

```bash
# from the repo root
open examples/miami-hero-demo/index.html          # macOS
# or serve it (recommended, so video range-requests behave):
python3 -m http.server -d examples/miami-hero-demo 8080
# then visit http://localhost:8080
```

Scroll down: the drone shot advances from the distant aerial → through the gate →
down the road → into the signature mansion → out to the infinity pool → up to the
full reveal. Scroll up and it plays in reverse. Journey captions and a progress
bar track your position.

## How it works

- A tall `.scrollTrack` (560vh) provides the scroll distance. The `.stage` is
  `position: sticky`, so the video stays pinned while you scroll *through* the track.
- Scroll position → `0..1` progress → `video.currentTime`.
- The playhead is **lerp-smoothed** (`ease = 0.16`) so scrubbing feels fluid
  instead of stepping frame-to-frame, and redundant seeks are skipped to avoid
  a seek-queue backlog. Respects `prefers-reduced-motion`.
- The video is `muted` + `playsinline` and never actually "plays" — we drive the
  timeline manually every animation frame.

## Swapping in your own / self-hosted video

The demo currently points at the hosted render on CloudFront. For production you
should **self-host the MP4** so it can't disappear and so you control caching:

1. Drop your file at `assets/miami-hero.mp4`.
2. Update the `<source src>` (and the `poster`) in `index.html`.

### Encode for smooth scrubbing (important)

Frame-accurate seeking is far smoother when the file has **frequent keyframes**
and a fast-start (moov atom up front). Re-encode with:

```bash
ffmpeg -i input.mp4 \
  -an \                         # hero is silent; drop audio
  -c:v libx264 -crf 20 -preset slow \
  -g 12 -keyint_min 12 \        # keyframe ~every 0.5s @24fps → snappy seeks
  -pix_fmt yuv420p \
  -movflags +faststart \
  assets/miami-hero.mp4
```

A short GOP (`-g`) is the single biggest factor in scrub smoothness. Optionally
also ship a WebM (VP9) source for broader/leaner delivery.

## Notes

- Tune the scrub feel with `duration`-mapping and the `ease` constant in the
  inline script; change scroll length via `.scrollTrack { height }`.
- "Ocho Estates" and all copy are placeholder/fictional for demonstration.
