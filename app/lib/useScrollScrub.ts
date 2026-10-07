"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Scroll-driven video scrubbing.
 *
 * A tall wrapper's scroll progress maps 0 → 1 onto the video timeline. The video
 * is only ever *seeked* — never played, never looped — so stopping the scroll
 * freezes it on that exact frame and scrolling back up runs it backwards.
 *
 * Performance rules baked in here:
 *  - Raw scroll events never touch `currentTime`; they only recompute the target
 *    progress and wake the animation loop.
 *  - All seeking happens inside `requestAnimationFrame`, so writes are synced to
 *    the browser's paint cycle (at most one per frame).
 *  - The target is interpolated toward the rendered time, and sub-frame writes are
 *    skipped (`MIN_SEEK`), which keeps the seek queue short and the scrubbing smooth.
 *
 * The engine expects an `<video>` whose media is encoded for random seeking —
 * frequent keyframes (a short GOP, e.g. every ~0.3s), H.264/MP4, modest bitrate
 * and `+faststart` so the moov atom leads the file. See `public/hero/` and the
 * transcode notes in AGENTS.md.
 */

const SMOOTHING = 0.28; // lerp factor applied per animation frame
const SNAP = 0.0012; // progress delta below which we snap straight to the target
const MIN_SEEK = 0.012; // seconds — ignore requests smaller than this
const COPY_FADE_END = 0.45; // progress at which the hero copy is fully faded out
const READY_TIMEOUT = 12000; // ms — reveal anyway if buffering stalls

export type ScrubStatus = "loading" | "ready" | "error";

export function useScrollScrub({ src, disabled }: { src: string | null; disabled: boolean }) {
  const wrapRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = useState<ScrubStatus>("loading");
  const [buffered, setBuffered] = useState(0);

  // ---- load the source ----------------------------------------------------
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    setStatus("loading");
    setBuffered(0);
    video.src = src;
    video.load();
  }, [src]);

  // ---- scroll position → video timeline -----------------------------------
  useEffect(() => {
    const wrap = wrapRef.current;
    const video = videoRef.current;
    if (disabled || !src || !wrap || !video) return;

    let duration = 0;
    let target = 0;
    let current = 0;
    let written = -1;
    let ready = false;
    let frame: number | null = null;
    let lastBuffered = -1;

    const clamp01 = (value: number) => (value < 0 ? 0 : value > 1 ? 1 : value);

    // How far the runway has been scrolled through, 0 → 1. Read straight from the
    // live rect so it stays correct across resizes, orientation changes and any
    // layout that settles after mount — transforms/opacity (our only per-frame
    // writes) don't dirty layout, so this read stays cheap.
    const readProgress = () => {
      const rect = wrap.getBoundingClientRect();
      const span = Math.max(1, rect.height - window.innerHeight);
      return clamp01(-rect.top / span);
    };

    const readBuffered = () => {
      if (!video.duration) return 0;
      const ranges = video.buffered;
      let end = 0;
      for (let i = 0; i < ranges.length; i += 1) {
        if (ranges.start(i) <= 0.05) end = Math.max(end, ranges.end(i));
      }
      return clamp01(end / video.duration);
    };

    // Fades the hero copy away as the scene is scrubbed, without React state.
    const paintCopy = (progress: number) => {
      const el = contentRef.current;
      if (!el) return;
      const visibility = clamp01(1 - progress / COPY_FADE_END);
      el.style.opacity = visibility.toFixed(3);
      el.style.transform = `translate3d(0, ${(-30 * (1 - visibility)).toFixed(2)}px, 0)`;
      el.style.pointerEvents = visibility < 0.06 ? "none" : "";
    };

    const seek = (progress: number) => {
      if (!ready || !duration) return;
      const time = progress * duration;
      if (Math.abs(time - written) < MIN_SEEK) return;
      written = time;
      video.currentTime = time;
    };

    const tick = () => {
      frame = null;
      current += (target - current) * SMOOTHING;
      if (Math.abs(target - current) < SNAP) current = target;
      seek(current);
      paintCopy(current);
      // Keep animating only while there is distance left to cover — then idle.
      if (current !== target) frame = requestAnimationFrame(tick);
    };

    const schedule = () => {
      if (frame === null) frame = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      target = readProgress();
      schedule();
    };

    const onMeta = () => {
      duration = video.duration || 0;
      onScroll();
      setBuffered(readBuffered());
    };

    const onBuffered = () => {
      const value = readBuffered();
      if (value - lastBuffered >= 0.02 || value === 1) {
        lastBuffered = value;
        setBuffered(value);
      }
      if (video.readyState >= 3) markReady();
    };

    const markReady = () => {
      if (ready) return;
      ready = true;
      setStatus("ready");
      // Jump straight to the scroll-mapped frame instead of easing in.
      current = target;
      written = -1;
      schedule();
    };

    const onError = () => setStatus("error");

    video.addEventListener("loadedmetadata", onMeta);
    video.addEventListener("loadeddata", onMeta);
    video.addEventListener("canplay", onBuffered);
    video.addEventListener("canplaythrough", onBuffered);
    video.addEventListener("progress", onBuffered);
    video.addEventListener("error", onError);

    if (video.readyState >= 1) onMeta();
    if (video.readyState >= 3) markReady();

    const readyTimer = window.setTimeout(() => {
      if (video.readyState >= 1) markReady();
    }, READY_TIMEOUT);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("orientationchange", onScroll);
    // Defer the first read by a frame so layout has settled.
    frame = requestAnimationFrame(() => {
      frame = null;
      onScroll();
    });

    return () => {
      window.clearTimeout(readyTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("orientationchange", onScroll);
      video.removeEventListener("loadedmetadata", onMeta);
      video.removeEventListener("loadeddata", onMeta);
      video.removeEventListener("canplay", onBuffered);
      video.removeEventListener("canplaythrough", onBuffered);
      video.removeEventListener("progress", onBuffered);
      video.removeEventListener("error", onError);
      if (frame !== null) cancelAnimationFrame(frame);

      const el = contentRef.current;
      if (el) {
        el.style.opacity = "";
        el.style.transform = "";
        el.style.pointerEvents = "";
      }
    };
  }, [src, disabled]);

  return { wrapRef, videoRef, contentRef, status, buffered };
}
