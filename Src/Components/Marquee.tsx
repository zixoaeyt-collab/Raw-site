import { gachaRowA, gachaRowB } from "../data";

type Variant = "outline" | "gold" | "info" | "rare" | "warm";
type Word = { text: string; variant: Variant };

type Props = { variant?: "gacha" | "banner" | "thin"; className?: string };

export function Marquee({ variant = "gacha", className = "" }: Props) {
  if (variant === "gacha") return <GachaMarquee className={className} />;
  if (variant === "banner") return <BannerMarquee className={className} />;
  return <ThinMarquee className={className} />;
}

// Shared loop helper: marquees double their content for seamless scroll
const loop = <T,>(arr: readonly T[]): T[] => [...arr, ...arr];

/* ZZZ-style: chunky outlined impact, diamond dividers, two opposing rows */
function GachaMarquee({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden border-y-2 border-[var(--color-ink-50)] bg-[var(--color-ink-900)] py-6 ${className}`}>
      <Corners color="var(--color-gold)" />
      <Row items={loop(gachaRowA)} direction="marquee" />
      <div className="mt-2 border-t border-dashed border-[var(--color-ink-50)]/20 pt-2">
        <Row items={loop(gachaRowB)} direction="marquee-rev" />
      </div>
    </div>
  );
}

function Row({ items, direction }: { items: Word[]; direction: string }) {
  return (
    <div className="mask-fade-x">
      <div className={`${direction} flex w-max items-center gap-6 whitespace-nowrap py-1`}>
        {items.map((w, i) => (
          <span key={i} className="inline-flex items-center gap-6">
            <span className={`gacha-text ${w.variant === "outline" ? "" : w.variant}`}>{w.text}</span>
            <Diamond className="h-5 w-5 text-[var(--color-gold)]" />
          </span>
        ))}
      </div>
    </div>
  );
}

function Corners({ color }: { color: string }) {
  const corner = `pointer-events-none absolute z-10 h-6 w-6`;
  return (
    <>
      <div className={`${corner} left-0 top-0 border-l-2 border-t-2`} style={{ borderColor: color }} />
      <div className={`${corner} right-0 top-0 border-r-2 border-t-2`} style={{ borderColor: color }} />
      <div className={`${corner} bottom-0 left-0 border-b-2 border-l-2`} style={{ borderColor: color }} />
      <div className={`${corner} bottom-0 right-0 border-b-2 border-r-2`} style={{ borderColor: color }} />
    </>
  );
}

function Diamond({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 2 L22 12 L12 22 L2 12 Z" />
    </svg>
  );
}

/* Dark banner: outlined impact, 4 rotating colors on near-black */
const BANNER_ITEMS = ["STUDIO ATLAS", "06 ROSTER", "192M VIEWS", "14.6% CTR", "RIN OKABE", "Q3 2026"] as const;
// One gold, three desaturated secondaries — gold is dominant, rest support
const BANNER_COLORS = ["var(--color-ink-50)", "var(--color-gold)", "var(--color-info)", "var(--color-rare)"];

function BannerMarquee({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden border-y border-white/15 bg-[var(--color-ink-900)] py-8 ${className}`}>
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "linear-gradient(to right, rgba(240,255,77,0.4) 1px, transparent 1px)", backgroundSize: "20px 100%" }} />
      <div className="mask-fade-x">
        <div className="marquee-slow flex w-max items-center gap-10 whitespace-nowrap font-impact text-[60px] leading-none tracking-[-0.02em] sm:text-[80px]">
          {loop(BANNER_ITEMS).map((w, i) => (
            <span key={i} className="inline-flex items-center gap-10 text-[var(--color-ink-50)]">
              <span style={{ color: BANNER_COLORS[i % BANNER_COLORS.length] }}>{w}</span>
              <span className="text-[var(--color-acid)]">★</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* Thin: monospace divider */
const THIN_ITEMS = ["THUMBNAIL DIRECTION", "MOTION", "ART", "TYPE", "EDITORIAL", "GAMING", "MUSIC", "DOCUMENTARY", "STORYTIME", "STUDIO ATLAS", "TOKYO · KYOTO", "Q3 2026"];

function ThinMarquee({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden border-y hairline py-3 ${className}`}>
      <div className="mask-fade-x">
        <div className="marquee flex w-max items-center gap-8 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--color-ink-300)]">
          {loop(THIN_ITEMS).map((w, i) => (
            <span key={i} className="inline-flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-[var(--color-acid)]" />
              {w}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
