import { RARITY_COLOR, RARITY_LABEL, SECTION_ACCENT, type Rarity } from "../data";

/**
 * RarityBadge — the rarity letter/label with neon glow.
 * One implementation, used by PatternTile, AccFrames, ThumbGallery.
 */
export function RarityBadge({
  rarity,
  size = "md",
  withLabel = false,
}: {
  rarity: Rarity;
  size?: "sm" | "md" | "lg";
  withLabel?: boolean;
}) {
  const color = RARITY_COLOR[rarity];
  const sizeClass = size === "sm" ? "text-[14px]" : size === "lg" ? "text-[24px]" : "text-[18px]";
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-impact leading-none ${sizeClass}`}
      style={{ color, textShadow: "0 0 12px currentColor" }}
    >
      <span>{rarity}</span>
      {withLabel && (
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-ink-50)]/70" style={{ textShadow: "none" }}>
          · {RARITY_LABEL[rarity].split(" · ")[1] || RARITY_LABEL[rarity]}
        </span>
      )}
    </span>
  );
}

/**
 * RarityDot — small dot indicator with rarity glow.
 */
export function RarityDot({ rarity, size = 6 }: { rarity: Rarity; size?: number }) {
  const color = RARITY_COLOR[rarity];
  return (
    <span
      className="inline-block rounded-full"
      style={{
        width: size,
        height: size,
        background: color,
        boxShadow: `0 0 ${Math.max(4, size)}px ${color}`,
      }}
    />
  );
}

/**
 * SectionHeader — the eyebrow (01 / NAME) + accent line + display title.
 * Accent color is looked up from SECTION_ACCENT by ordinal so the
 * hierarchy is consistent and the gold stays the dominant signal.
 */
export function SectionHeader({
  number,
  label,
  title,
  overrideAccent,
}: {
  number: string;
  label: string;
  title: React.ReactNode;
  overrideAccent?: string;
}) {
  const accent = overrideAccent ?? SECTION_ACCENT[number] ?? "var(--color-gold)";
  return (
    <div>
      <div className="flex items-center gap-3">
        <span
          className="font-mono text-[10.5px] uppercase tracking-[0.24em]"
          style={{ color: accent }}
        >
          {number} / {label}
        </span>
        <span className="h-px w-12" style={{ background: "currentColor", opacity: 0.25, color: accent }} />
      </div>
      <h2 className="mt-3 font-impact text-[44px] uppercase leading-[0.9] tracking-[-0.02em] text-[var(--color-ink-50)] sm:text-[64px]">
        {title}
      </h2>
    </div>
  );
}

/**
 * RinMark — the small "RO" square logomark. Used in Nav and Footer.
 */
export function RinMark({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 32 32" className={className} style={style} fill="none" aria-hidden>
      <rect x="2" y="2" width="28" height="28" stroke="currentColor" strokeWidth="1.4" />
      <path d="M10 22 L10 10 L16 16 L22 10 L22 22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" strokeLinejoin="miter" />
    </svg>
  );
}

/**
 * Hand-drawn underline accent (one source for the curve SVG used in hero & contact).
 */
export function UnderlineAccent({ width = 300 }: { width?: number }) {
  return (
    <svg
      className="absolute -bottom-2 left-0 w-full"
      viewBox={`0 0 ${width} 12`}
      fill="none"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        d={`M2 8 C ${width * 0.2} 2, ${width * 0.5} 2, ${width - 2} 6`}
        stroke="var(--color-acid)"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
}
