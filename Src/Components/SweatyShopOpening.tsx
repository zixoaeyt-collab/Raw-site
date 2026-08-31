import { useEffect, useState } from "react";
import { gsap } from "gsap";

// 6 distinct PNGs (one per character) flying out of the center.
// No bordered frames, no glossy patterns — just the images.
// Pulled from the raw GitHub CDN so the source of truth lives in
// the Imgs repo and the portfolio only references the URLs.
const IMG_BASE = "https://raw.githubusercontent.com/zixoaeyt-collab/Imgs/main";
const ITEMS = [
  { src: `${IMG_BASE}/1000063675.png`, alt: "Pixel Snorlax" },
  { src: `${IMG_BASE}/1000063676.png`, alt: "Lucky cat" },
  { src: `${IMG_BASE}/1000063677.png`, alt: "Anime character" },
  { src: `${IMG_BASE}/1000063687.png`, alt: "Game controller" },
  { src: `${IMG_BASE}/1000063688.png`, alt: "Voxel dinosaur" },
  { src: `${IMG_BASE}/1000063689.png`, alt: "Pixel space invader" },
] as const;

// 6 target positions — one per image, scattered around the viewport
const TARGETS = [
  { x: "-28vw", y: "-24vh", rotation: -20, scale: 1.0  },
  { x: "28vw",  y: "-22vh", rotation:  12, scale: 0.95 },
  { x: "-6vw",  y: "-30vh", rotation:   6, scale: 0.85 },
  { x: "30vw",  y: "4vh",   rotation:  -8, scale: 0.9  },
  { x: "-30vw", y: "20vh",  rotation:  14, scale: 0.95 },
  { x: "0vw",   y: "30vh",  rotation:  -6, scale: 0.8  },
] as const;

const EXIT_DISTANCE = 3.5;
const EXITS = TARGETS.map((t) => ({
  x: `${parseFloat(t.x) * EXIT_DISTANCE}vw`,
  y: `${parseFloat(t.y) * EXIT_DISTANCE}vh`,
  rotation: t.rotation * 2.5,
}));

const CORNERS = [
  "left-0 top-0 border-l-2 border-t-2",
  "right-0 top-0 border-r-2 border-t-2",
  "bottom-0 left-0 border-b-2 border-l-2",
  "bottom-0 right-0 border-b-2 border-r-2",
] as const;

const REVEALERS = [
  "var(--color-ink-700)",
  "var(--color-ink-800)",
  "var(--color-gold)",
  "var(--color-ink-900)",
];

type Props = { onComplete?: () => void };

/**
 * Centered preloader + popup hero reveal — single GSAP timeline.
 *
 *   Phase 1 — Stacked clip-path revealers expand from center
 *   Phase 2 — Items fly out from center to scattered positions
 *   Phase 3 — Center logo fades in
 *   Phase 4 — Hold
 *   Phase 5 — Exit pass: items scale up & fly off
 *   Phase 6 — Hero popup reveal (runs in parallel with Phase 5):
 *              - Chars spring in with elastic bounce
 *              - Hero circle scales 0 → 1
 *              - Album cover translates from below to centered
 *              - Orbiting tags pop in
 *              - Eyebrow + footer lines slide up
 */
export function SweatyShopOpening({ onComplete }: Props) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Snap everything to its final state without animation
      gsap.set(".hero-img-bg", { scale: 1 });
      gsap.set(".hero-img-inner", { y: "-100%" });
      gsap.set(".hero-tag", { scale: 1 });
      gsap.set(".hero-char", { y: 0, opacity: 1, scale: 1 });
      gsap.set(".hero-line", { yPercent: 0 });
      gsap.set(".footer-line > *", { yPercent: 0 });
      setDone(true);
      onComplete?.();
      return;
    }

    gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".preloader-item");
      const floatingTweens: gsap.core.Tween[] = [];

      // Live progress counter 0 → 100
      gsap.to(
        { v: 0 },
        {
          v: 100,
          duration: 3.2,
          ease: "power1.inOut",
          onUpdate: function () {
            setProgress(Math.round(this.targets()[0].v));
          },
        },
      );

      // Lock revealers so they start at 0% (centered dot)
      gsap.set(".preloader-revealer", {
        clipPath: "circle(0% at 50% 50%)",
        webkitClipPath: "circle(0% at 50% 50%)",
      });

      const tl = gsap.timeline({
        delay: 0.2,
        onComplete: () => {
          setDone(true);
          onComplete?.();
        },
      });

      // Phase 1 — Staged circular reveal
      tl.to(".preloader-revealer", {
        clipPath: "circle(150% at 50% 50%)",
        webkitClipPath: "circle(150% at 50% 50%)",
        duration: 1.2,
        stagger: 0.15,
        ease: "power2.inOut",
      });
      tl.set(".preloader-revealer", { display: "none" });

      // Phase 2 — Items fly out from center
      items.forEach((item, i) => {
        const target = TARGETS[i];
        const inner = item.querySelector<HTMLElement>(".preloader-item-inner");
        tl.to(
          item,
          {
            x: target.x,
            y: target.y,
            scale: target.scale,
            rotation: target.rotation,
            duration: 1,
            ease: "power3.out",
            onStart: () => {
              if (!inner) return;
              floatingTweens[i] = gsap.to(inner, {
                y: gsap.utils.random(-12, -22),
                duration: gsap.utils.random(1.5, 2.5),
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1,
                delay: gsap.utils.random(0, 0.5),
              });
            },
          },
          i === 0 ? "-=0.55" : "<0.075",
        );
      });

      // Phase 3 — Center logo fades in
      tl.to(".preloader-logo", { scale: 1, opacity: 1, duration: 1, ease: "power3.out" }, "<");
      tl.set(".preloader-bg", { display: "none" });

      // Phase 4 — Hold
      tl.to({}, { duration: 0.9 });
      tl.add(() => floatingTweens.forEach((t) => t.kill()));

      // Phase 5 — Exit pass (items scale up & fly off, logo shoots up)
      items.forEach((item, i) => {
        tl.to(
          item,
          {
            x: EXITS[i].x,
            y: EXITS[i].y,
            scale: TARGETS[i].scale * 2.2, // scale up but not as huge (PNG already has detail)
            rotation: EXITS[i].rotation,
            duration: 0.75,
            ease: "power2.in",
          },
          i === 0 ? ">" : "<0.075",
        );
      });
      tl.to(".preloader-logo", { y: "-120vh", scale: 2.5, duration: 0.75, ease: "power2.in" }, "<");

      // ===========================================================
      // Phase 6 — Hero popup reveal
      // ===========================================================

      // Mark the moment the hero starts (0.05s before exit pass ends)
      tl.addLabel("heroStart", ">-0.05");

      // The preloader has z-index 100 — it must hide BEFORE the hero
      // animation begins, otherwise the hero animates behind it invisibly.
      tl.set(".preloader", { display: "none" }, "heroStart");

      // Hero circle scales up from a dot
      tl.to(".hero-img-bg", { scale: 1, duration: 1.1, ease: "power3.out" }, "heroStart");

      // Album cover pops up. Initial state has translate(-50%, 50%) on the
      // parent; the inner carries y:0 + rotate. Animating the inner's y
      // from 0 to -100% lands the cover centered (-50% in absolute terms).
      tl.to(".hero-img-inner", { y: "-100%", duration: 1, ease: "power3.out" }, "heroStart+=0.1");

      // Orbiting tags
      tl.to(".hero-tag", { scale: 1, duration: 0.6, stagger: 0.08, ease: "back.out(1.7)" }, "heroStart+=0.3");

      // Headline characters — the signature BucksSauce elastic bounce
      tl.to(
        ".hero-char",
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.4,
          stagger: 0.022,
          ease: "elastic.out(0.7, 0.3)",
        },
        "heroStart+=0.2",
      );

      // Eyebrow + footer lines slide up (yPercent mask technique)
      tl.to(".hero-line", { yPercent: 0, duration: 0.6, stagger: 0.08, ease: "power3.out" }, "<0.1");
      tl.to(
        ".footer-line > *",
        { yPercent: 0, duration: 0.7, stagger: 0.1, ease: "power3.out" },
        "heroStart+=0.35",
      );
    });

    // Intentionally do NOT call ctx.revert() — the hero popup is animated
    // by this same context. Reverting would snap the hero back to its
    // initial invisible state. The preloader hides via display:none, which
    // is the same UX as unmounting it.
  }, [onComplete]);

  if (done) return null;

  return (
    <div className="preloader" aria-hidden>
      <div className="preloader-bg" />

      {/* Stacked circular revealers */}
      {REVEALERS.map((color, i) => (
        <div
          key={i}
          className="preloader-revealer"
          style={{ background: color }}
        />
      ))}

      {/* Faint grid behind the reveal */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(212,168,87,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(212,168,87,0.4) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Corner brackets centered on the reveal */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 h-[68vmin] w-[68vmin] max-h-[640px] max-w-[640px] -translate-x-1/2 -translate-y-1/2">
        {CORNERS.map((cls, i) => (
          <span key={i} className={`absolute h-4 w-4 ${cls} border-[var(--color-gold)]`} />
        ))}
      </div>

      {/* Preloader items — 6 distinct PNGs, one per target position.
          No borders, no frames — just the images flying out. */}
      <div className="preloader-items">
        {TARGETS.map((t, i) => {
          const item = ITEMS[i];
          return (
            <div
              key={i}
              className="preloader-item"
              style={{ transform: `translate(-50%, -50%) scale(${t.scale})` }}
            >
              <div className="preloader-item-inner h-full w-full">
                <img
                  src={item.src}
                  alt=""
                  className="h-full w-full object-contain"
                  draggable={false}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Center logo */}
      <div className="preloader-logo">
        <div className="flex flex-col items-center">
          <div className="border-2 border-[var(--color-gold)] bg-[var(--color-ink-900)]/60 px-7 py-3 backdrop-blur-sm">
            <div className="font-impact text-[40px] leading-none tracking-[-0.01em] text-[var(--color-ink-50)] sm:text-[52px]">
              RIN OKABE
            </div>
            <div className="mt-1.5 flex items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--color-ink-300)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold)]" />
              STUDIO ATLAS
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold)]" />
            </div>
          </div>
          <div className="mt-3 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--color-ink-300)]">
            <span>THUMBNAIL</span>
            <span className="text-[var(--color-gold)]">·</span>
            <span>MOTION</span>
            <span className="text-[var(--color-gold)]">·</span>
            <span>DIRECTION</span>
          </div>
        </div>
      </div>

      <StatusBar pos="top">
        <span className="inline-flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold)] blink" />
          {progress.toString().padStart(3, "0")}% · LOADING
        </span>
        <span className="hidden sm:inline">TOKYO · KYOTO</span>
        <span>Q3 · 2026</span>
      </StatusBar>

      <StatusBar pos="bottom">
        <span>STUDIO ATLAS · EST. 2019</span>
        <span className="hidden sm:inline">06 CANDIDATES</span>
        <span className="inline-flex items-center gap-2">
          {progress >= 100 ? "READY" : "COOKING"}
          <span
            className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold)]"
            style={{ opacity: progress >= 100 ? 1 : 0.4 }}
          />
        </span>
      </StatusBar>
    </div>
  );
}

function StatusBar({ pos, children }: { pos: "top" | "bottom"; children: React.ReactNode }) {
  return (
    <div
      className={`pointer-events-none absolute left-0 right-0 z-30 flex items-center justify-between px-6 py-5 font-mono text-[10.5px] uppercase tracking-[0.24em] text-[var(--color-ink-200)] sm:px-10 ${
        pos === "top" ? "top-0" : "bottom-0"
      }`}
    >
      {children}
    </div>
  );
}
