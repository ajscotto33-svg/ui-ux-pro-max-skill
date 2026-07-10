"use client";

import { useEffect, useRef, useState } from "react";

type ScrollHeroProps = {
  /** Video to scrub through as the user scrolls. */
  src?: string;
  /** Total scroll distance of the hero, in viewport-heights. Bigger = slower scrub. */
  scrollLengthVh?: number;
};

/**
 * Apple-style scroll-scrubbed hero.
 *
 * A tall wrapper (`scrollLengthVh` * 100vh) creates the scroll runway while a
 * sticky, full-viewport stage pins the video. Scroll progress through the
 * runway maps to `video.currentTime`, smoothed with an exponential lerp in a
 * rAF loop so the scrub glides instead of stuttering with each scroll event.
 *
 * Scrub smoothness depends on the video's keyframe density — re-encode the
 * asset with `ffmpeg -i in.mp4 -g 1 -c:v libx264 -pix_fmt yuv420p -an hero.mp4`
 * (a keyframe on every frame) or seeking will snap between sparse keyframes.
 *
 * Overlay copy is driven by a `--progress` CSS custom property (0 → 1) set on
 * the stage element, so text phases are pure CSS and never trigger re-renders.
 * Honors `prefers-reduced-motion` by playing the video normally instead of
 * binding it to scroll.
 */
export default function ScrollHero({
  src = "/hero.mp4",
  scrollLengthVh = 4,
}: ScrollHeroProps) {
  const runwayRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    const runway = runwayRef.current;
    const stage = stageRef.current;
    const video = videoRef.current;
    if (!runway || !stage || !video) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
      video.loop = true;
      video.play().catch(() => {});
      stage.style.setProperty("--progress", "1");
      return;
    }

    // iOS Safari refuses to seek until playback has been "primed": a muted
    // play() immediately followed by pause() unlocks currentTime writes.
    const prime = () => {
      const p = video.play();
      if (p) p.then(() => video.pause()).catch(() => {});
    };
    prime();

    let targetTime = 0;
    let currentTime = 0;
    let rafId = 0;

    const readProgress = () => {
      const rect = runway.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return 0;
      return Math.min(1, Math.max(0, -rect.top / scrollable));
    };

    const tick = () => {
      const progress = readProgress();
      stage.style.setProperty("--progress", progress.toFixed(4));

      if (video.duration && !Number.isNaN(video.duration)) {
        targetTime = progress * video.duration;
        // Exponential smoothing toward the target frame; the 0.14 factor is
        // the glide feel — higher chases the scrollbar harder.
        currentTime += (targetTime - currentTime) * 0.14;
        // Seeking is expensive; skip sub-frame deltas (~1/120s).
        if (Math.abs(video.currentTime - currentTime) > 1 / 120) {
          video.currentTime = currentTime;
        }
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <section
      ref={runwayRef}
      className="scroll-hero"
      style={{ height: `${scrollLengthVh * 100}vh` }}
      aria-label="BMW X6 launching toward a Miami sunset"
    >
      <div ref={stageRef} className="scroll-hero__stage">
        {!videoFailed && (
          <video
            ref={videoRef}
            className="scroll-hero__video"
            src={src}
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            onError={() => setVideoFailed(true)}
          />
        )}
        {videoFailed && <div className="scroll-hero__fallback" />}

        <div className="scroll-hero__vignette" aria-hidden="true" />

        <div className="scroll-hero__copy scroll-hero__copy--intro">
          <p className="scroll-hero__eyebrow">BMW X6 · M Performance</p>
          <h1 className="scroll-hero__title">
            Zero to two hundred.
            <br />
            <span>Before the light turns.</span>
          </h1>
          <p className="scroll-hero__hint" aria-hidden="true">
            Scroll ↓
          </p>
        </div>

        <div className="scroll-hero__copy scroll-hero__copy--mid">
          <h2 className="scroll-hero__title scroll-hero__title--right">
            Through the wing.
            <br />
            <span>Past the limit.</span>
          </h2>
        </div>

        <div className="scroll-hero__copy scroll-hero__copy--outro">
          <h2 className="scroll-hero__title">
            Miami, <span>golden hour.</span>
          </h2>
          <a className="scroll-hero__cta" href="#specs">
            Configure yours
          </a>
        </div>
      </div>
    </section>
  );
}
