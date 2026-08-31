import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Marquee } from "./Marquee";
import { AccFrames } from "./AccFrames";
import { SectionHeader } from "./ui";
import { MagneticButton } from "./MagneticButton";

const TIPS = [
  { k: "Sets", v: "06" },
  { k: "Hover to expand", v: "→" },
  { k: "Arrow keys to navigate", v: "←/→" },
  { k: "Tap a card on mobile", v: "↗" },
];

/**
 * Popup hero — BucksSauce composition.
 * Layered: ambient grid → center hero → popup circle (sm+) → footer strip.
 * Each GSAP target carries its initial state via a class in index.css,
 * so the JSX stays clean.
 */
export function Hero() {
  // Parallax: hero popup drifts at 0.6× page scroll speed
  const [parallax, setParallax] = useState(0);
  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    let frame = 0;
    const update = () => {
      const y = window.scrollY;
      // Only parallax while the hero is roughly in view
      const hero = document.getElementById("characters");
      if (hero && y < hero.offsetTop + 200) {
        setParallax(y * 0.15);
      } else {
        setParallax(0);
      }
      frame = 0;
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="relative">
      <AmbientBackdrop />

      {/* Popup stage — full viewport, holds the 3 layered compositions */}
      <div className="relative min-h-[100svh] overflow-hidden">
        <HeroHeader />
        <HeroCircle parallaxY={parallax} />
        <HeroFooterStrip />
      </div>

      <Marquee variant="gacha" />

      <RosterSection />
    </section>
  );
}

/* ============================================================
   Layer 1 — Ambient backdrop (grid + warm glow)
   ============================================================ */
function AmbientBackdrop() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(212,168,87,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(212,168,87,0.4) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(212, 168, 87, 0.08) 0%, rgba(212, 168, 87, 0) 70%)",
        }}
      />
    </>
  );
}

/* ============================================================
   Layer 2 — Hero header (centered headline + eyebrow)
   GSAP targets: .hero-line, .hero-char (via .hero-char spans), .footer-line
   ============================================================ */
function HeroHeader() {
  return (
    <div className="hero-header pointer-events-none absolute left-1/2 top-[28%] z-10 w-[min(92%,1100px)] -translate-x-1/2 -translate-y-1/2 text-center sm:top-[32%]">
      <Eyebrow />

      <h1 className="font-impact text-[clamp(56px,11vw,180px)] font-extrabold uppercase leading-[0.86] tracking-[-0.03em] text-[var(--color-ink-50)]">
        {"RIN OKABE".split("").map((ch, i) => (
          <span key={i} className="hero-char">
            {ch === " " ? "\u00A0" : ch}
          </span>
        ))}
      </h1>

      <Subhead />
    </div>
  );
}

function Eyebrow() {
  return (
    <p className="mb-5 flex flex-wrap items-center justify-center gap-x-1 font-mono text-[10.5px] uppercase tracking-[0.24em] text-[var(--color-ink-300)] sm:gap-x-2">
      <span className="hero-line">
        <span className="text-[var(--color-gold)]">●</span> A small Tokyo studio
      </span>
      <span className="hero-line hidden sm:inline">·</span>
      <span className="hero-line">making thumbnails that earn</span>
      <span className="hero-line hidden sm:inline">·</span>
      <span className="hero-line">the click quietly.</span>
    </p>
  );
}

function Subhead() {
  return (
    <p className="mx-auto mt-6 max-w-md text-[13.5px] leading-[1.55] text-[var(--color-ink-200)] sm:text-[14.5px]">
      <span className="footer-line">
        <span className="font-display text-[18px] uppercase tracking-tight text-[var(--color-gold)]">
          SELECTED WORK
        </span>
      </span>
      <span className="footer-line">
        <span>Documentary · Editorial · Gaming · Music</span>
      </span>
      <span className="footer-line">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-ink-300)]">
          2023 — 2026 · 09 picks
        </span>
      </span>
    </p>
  );
}

/* ============================================================
   Layer 3 — Hero circle (gold halo + tilted album cover + tags)
   GSAP targets: .hero-img-bg, .hero-img-inner, .hero-tag
   ============================================================ */
function HeroCircle({ parallaxY = 0 }: { parallaxY?: number }) {
  return (
    <div
      className="hero-img pointer-events-none absolute left-1/2 z-0 mx-auto will-change-transform"
      style={{
        bottom: "clamp(-30%, -10vw, -10%)",
        width: "min(620px, 75vw)",
        transform: `translateX(-50%) translateY(${parallaxY}px)`,
      }}
    >
      {/* Gold halo — scales from 0 → 1 */}
      <div
        className="hero-img-bg relative aspect-square w-full rounded-full"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(232, 199, 122, 0.95) 0%, rgba(212, 168, 87, 0.85) 35%, rgba(176, 140, 66, 0.75) 75%, rgba(14, 13, 11, 0.0) 100%)",
          boxShadow:
            "0 30px 80px -20px rgba(212, 168, 87, 0.35), inset 0 0 0 1px rgba(242, 239, 230, 0.08)",
        }}
      >
        <div className="absolute inset-[6%] rounded-full border border-[var(--color-ink-900)]/30" />
        <div className="absolute inset-[14%] rounded-full border border-[var(--color-ink-50)]/15" />
        <div
          aria-hidden
          className="absolute inset-0 rounded-full opacity-30"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, rgba(23, 16, 10, 0.18) 10deg, transparent 20deg, transparent 60deg, rgba(23, 16, 10, 0.18) 70deg, transparent 80deg, transparent 180deg, rgba(23, 16, 10, 0.18) 200deg, transparent 210deg)",
          }}
        />
      </div>

      {/* Album cover — pops up from below the center */}
      <div className="hero-img-inner absolute left-1/2 top-1/2 w-[115%]">
        <AlbumCover />
      </div>

      {/* Orbiting tags */}
      <HeroTag pos="-right-3 top-[16%]" rotate={12} copy="S · RANK" dot />
      <HeroTag pos="-left-2 bottom-[20%]" rotate={-8} copy="Q3 · 2026" />
    </div>
  );
}

/**
 * HeroTag — a sticker-style label that orbits the circle.
 * Static rotation on the outer wrapper, GSAP-animated scale on the inner.
 */
function HeroTag({
  pos,
  rotate,
  copy,
  dot,
}: {
  pos: string;
  rotate: number;
  copy: string;
  dot?: boolean;
}) {
  return (
    <div
      className={`hero-tag-rotate absolute z-10 ${pos}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div
        className={`hero-tag border-2 border-[var(--color-ink-50)] bg-[var(--color-ink-900)] px-3 py-1.5 ${
          dot
            ? "flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.18em] text-[var(--color-ink-50)]"
            : "font-impact text-[20px] leading-none tracking-tight text-[var(--color-ink-50)]"
        }`}
      >
        {dot && <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold)]" />}
        {copy}
      </div>
    </div>
  );
}

/**
 * AlbumCover — the tilted record sleeve inside the gold circle.
 * A self-contained CSS/SVG composition: blueprint grid, monogram,
 * rank stamp, metadata strip.
 */
function AlbumCover() {
  return (
    <div className="relative aspect-square w-full">
      <div className="absolute inset-0 rounded-md border-2 border-[var(--color-ink-900)]/50 bg-[var(--color-ink-900)] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]">
        <BlueprintGrid />

        <div className="absolute left-3 top-3 font-mono text-[8px] uppercase tracking-[0.24em] text-[var(--color-ink-300)]">
          VOL · 01
        </div>
        <div className="absolute right-3 top-3 font-impact text-[28px] leading-none text-[var(--color-gold-bright)]">
          S
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="font-impact text-[72px] leading-[0.85] tracking-[-0.02em] text-[var(--color-ink-50)]">
            RO
          </div>
          <div className="mt-2 h-px w-16 bg-[var(--color-gold)]" />
          <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.24em] text-[var(--color-ink-300)]">
            STUDIO ATLAS
          </div>
          <div className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.18em] text-[var(--color-ink-400)]">
            EST · 2019
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 border-t border-[var(--color-ink-50)]/15 px-3 py-2 font-mono text-[8px] uppercase tracking-[0.2em] text-[var(--color-ink-300)]">
          <div className="flex items-center justify-between">
            <span>09 PICKS</span>
            <span className="text-[var(--color-gold)]">★</span>
            <span>Q3 · 2026</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function BlueprintGrid() {
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="ac-grid" width="6" height="6" patternUnits="userSpaceOnUse">
          <path d="M 6 0 L 0 0 0 6" fill="none" stroke="var(--color-gold)" strokeOpacity="0.2" strokeWidth="0.3" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#ac-grid)" />
    </svg>
  );
}

/* ============================================================
   Layer 4 — Footer strip (left meta, right CTA stack)
   ============================================================ */
function HeroFooterStrip() {
  return (
    <div className="hero-footer absolute inset-x-0 bottom-0 z-20 flex items-end justify-between p-6 sm:p-10">
      <div className="footer-line max-w-xs">
        <p className="text-[13.5px] leading-[1.5] text-[var(--color-ink-200)]">
          Tokyo · Kyoto
          <br />
          <span className="text-[var(--color-ink-400)]">EST. 2019 · Available Q3</span>
        </p>
      </div>

      <div className="footer-line flex flex-col items-end gap-3">
        <div className="inline-flex items-center gap-2 border border-[var(--color-ink-50)]/30 bg-[var(--color-ink-900)]/70 px-3 py-1.5 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold)] blink" />
          <span className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-[var(--color-ink-100)]">
            Now booking Q3 2026
          </span>
        </div>
        <MagneticButton
          as="a"
          strength={0.22}
          className="group inline-flex items-center gap-2 bg-[var(--color-gold)] px-5 py-3 text-[13.5px] font-bold uppercase tracking-[0.14em] text-[var(--color-ink-900)] transition-colors hover:bg-[var(--color-gold-bright)]"
        >
          <a href="#work" className="inline-flex items-center gap-2">
            Browse 09 picks
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </MagneticButton>
      </div>
    </div>
  );
}

/* ============================================================
   Roster section (sits below the popup hero)
   ============================================================ */
function RosterSection() {
  return (
    <section id="characters" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            number="01"
            label="THE ROSTER"
            title={
              <>
                06 SETS,
                <br />
                <span className="text-[var(--color-ink-300)]">ONE AT A TIME.</span>
              </>
            }
          />
          <p className="max-w-sm text-[14.5px] leading-[1.65] text-[var(--color-ink-200)]">
            Hover (or use ←/→) to cycle through. Each set has a mood, a client, a year, and a stat block that actually means something.
          </p>
        </div>
        <AccFrames />
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {TIPS.map((t) => (
            <div key={t.k} className="border border-white/10 bg-[var(--color-ink-800)] p-3.5">
              <div className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-[var(--color-ink-300)]">
                {t.k}
              </div>
              <div className="mt-1 font-impact text-[20px] uppercase tracking-[-0.01em] text-[var(--color-ink-50)]">
                {t.v}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
