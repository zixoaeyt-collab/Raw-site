import { RarityBadge } from "./ui";
import type { Rarity } from "../data";

type Pattern = "grid" | "halftone" | "stripes" | "noise" | "rays" | "circuit" | "blueprint";

type Props = {
  pattern: Pattern;
  palette: [string, string, string];
  className?: string;
  showGlyph?: string;
  badge?: string;
  vignette?: boolean;
  rarity?: Rarity;
};

// Decorative CSS/SVG "thumbnail" — no stock photos needed.
export function PatternTile({ pattern, palette, className = "", showGlyph, badge, vignette = true, rarity }: Props) {
  const [base, accent, light] = palette;
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ background: base, color: light }} aria-hidden>
      <PatternLayer pattern={pattern} base={base} accent={accent} light={light} />
      {showGlyph && (
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center font-impact"
          style={{ color: light, fontSize: "clamp(80px, 18vw, 220px)", lineHeight: 1, letterSpacing: "-0.02em" }}
        >
          {showGlyph}
        </div>
      )}
      {vignette && <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(120% 80% at 50% 30%, transparent 40%, rgba(0,0,0,0.55) 100%)" }} />}
      {badge && (
        <div className="absolute left-3 top-3 z-10 inline-flex items-center gap-1.5 border border-white/30 bg-[var(--color-ink-900)]/80 px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.16em] text-[var(--color-ink-50)] backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
          {badge}
        </div>
      )}
      {rarity && (
        <div className="absolute right-3 top-3 z-10 inline-flex h-7 w-7 items-center justify-center">
          <RarityBadge rarity={rarity} />
        </div>
      )}
    </div>
  );
}

function PatternLayer({ pattern, accent, light }: { pattern: Pattern; base: string; accent: string; light: string }) {
  switch (pattern) {
    case "grid":
      return (
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 100 100">
          <defs>
            <pattern id="grid" width="6" height="6" patternUnits="userSpaceOnUse">
              <path d="M 6 0 L 0 0 0 6" fill="none" stroke={light} strokeOpacity="0.18" strokeWidth="0.4" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
          <circle cx="78" cy="22" r="14" fill={accent} fillOpacity="0.85" />
        </svg>
      );
    case "halftone":
      return (
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 100 100">
          <defs>
            <pattern id="halftone" width="4" height="4" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.1" fill={light} fillOpacity="0.18" />
            </pattern>
            <radialGradient id="hg" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor={accent} stopOpacity="0.6" />
              <stop offset="100%" stopColor={accent} stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100" height="100" fill="url(#halftone)" />
          <rect width="100" height="100" fill="url(#hg)" />
        </svg>
      );
    case "stripes":
      return (
        <div
          className="absolute inset-0"
          style={{
            background: `repeating-linear-gradient(135deg, ${light} 0 2px, transparent 2px 14px), linear-gradient(160deg, transparent 60%, ${accent}99 100%)`,
          }}
        />
      );
    case "noise":
      return (
        <>
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at 30% 30%, ${accent}33 0, transparent 50%), radial-gradient(circle at 70% 70%, ${light}22 0, transparent 60%)`,
            }}
          />
          <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
            <filter id="noise-f">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" />
              <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.4 0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noise-f)" opacity="0.18" />
          </svg>
        </>
      );
    case "rays":
      return (
        <div
          className="absolute inset-0"
          style={{
            background: `conic-gradient(from 220deg at 30% 70%, ${accent} 0deg, transparent 90deg, ${light}22 180deg, transparent 270deg, ${accent} 360deg)`,
            opacity: 0.6,
          }}
        />
      );
    case "circuit":
      return (
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 100 100">
          <g stroke={light} strokeOpacity="0.22" strokeWidth="0.6" fill="none">
            <path d="M 0 30 L 20 30 L 25 35 L 25 55 L 30 60 L 60 60 L 65 55 L 65 35 L 70 30 L 100 30" />
            <path d="M 0 70 L 35 70 L 40 75 L 40 90 L 50 90" />
            <path d="M 60 10 L 60 25 L 70 30" />
            <path d="M 80 0 L 80 20 L 90 25 L 100 25" />
          </g>
          <g fill={accent}>
            <circle cx="30" cy="60" r="1.5" />
            <circle cx="65" cy="35" r="1.5" />
            <circle cx="40" cy="90" r="1.5" />
            <circle cx="80" cy="20" r="1.5" />
          </g>
        </svg>
      );
    case "blueprint":
      return (
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 100 100">
          <defs>
            <pattern id="bp" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke={accent} strokeOpacity="0.35" strokeWidth="0.4" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#bp)" />
          <line x1="0" y1="50" x2="100" y2="50" stroke={accent} strokeOpacity="0.4" strokeWidth="0.3" />
          <line x1="50" y1="0" x2="50" y2="100" stroke={accent} strokeOpacity="0.4" strokeWidth="0.3" />
        </svg>
      );
  }
}
