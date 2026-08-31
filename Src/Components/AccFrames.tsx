import { useState, useRef, useEffect } from "react";
import { characters, RARITY_COLOR, type Character } from "../data";
import { PatternTile } from "./PatternTile";
import { RarityBadge } from "./ui";
import { ArrowUpRight, Plus } from "lucide-react";

export function AccFrames() {
  const [openId, setOpenId] = useState(characters[0].id);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handler = (e: KeyboardEvent) => {
      if (!el.contains(document.activeElement as Node) && document.activeElement !== el) return;
      const idx = characters.findIndex((c) => c.id === openId);
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setOpenId(characters[(idx + 1) % characters.length].id);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setOpenId(characters[(idx - 1 + characters.length) % characters.length].id);
      }
    };
    el.addEventListener("keydown", handler);
    return () => el.removeEventListener("keydown", handler);
  }, [openId]);

  return (
    <div
      ref={containerRef}
      role="listbox"
      aria-label="Selected work — choose a thumbnail set"
      tabIndex={0}
      className="flex h-[560px] w-full overflow-hidden rounded-2xl border hairline-strong bg-[var(--color-ink-900)] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] sm:h-[640px] focus:outline-none"
    >
      {characters.map((c, i) => (
        <CharacterPanel
          key={c.id}
          character={c}
          ordinal={`${String(i + 1).padStart(2, "0")} / ${String(characters.length).padStart(2, "0")}`}
          isOpen={openId === c.id}
          onOpen={() => setOpenId(c.id)}
        />
      ))}
    </div>
  );
}

function CharacterPanel({
  character,
  ordinal,
  isOpen,
  onOpen,
}: {
  character: Character;
  ordinal: string;
  isOpen: boolean;
  onOpen: () => void;
}) {
  const color = RARITY_COLOR[character.status];

  return (
    <button
      type="button"
      role="option"
      aria-selected={isOpen}
      onClick={onOpen}
      onMouseEnter={onOpen}
      data-open={isOpen}
      className="acc-item group relative h-full border-r border-white/10 text-left last:border-r-0 focus:outline-none"
      style={{ minWidth: 0 }}
    >
      <div className="absolute inset-0">
        <PatternTile pattern={character.pattern} palette={character.palette} className="h-full w-full" showGlyph={character.glyph} vignette />
      </div>

      {/* Closed state */}
      <div className={`pointer-events-none absolute inset-0 flex flex-col justify-between p-4 transition-opacity duration-500 ${isOpen ? "opacity-0" : "opacity-100"}`}>
        <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.18em] text-[var(--color-ink-50)]/70">
          <span>{ordinal}</span>
          <RarityBadge rarity={character.status} />
        </div>
        <div className="flex flex-col items-start gap-2">
          <span className="font-impact text-[32px] leading-[0.92] tracking-[-0.01em] text-[var(--color-ink-50)]" style={{ writingMode: "vertical-rl" }}>
            {character.name}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-ink-50)]/65">
            {character.role}
          </span>
        </div>
        <div className="flex items-end justify-between font-mono text-[10px] tracking-[0.18em] text-[var(--color-ink-50)]/65">
          <span>{character.year}</span>
          <span className="inline-flex h-6 w-6 items-center justify-center border border-white/30 text-[var(--color-ink-50)] transition-transform group-hover:rotate-45">
            <Plus className="h-3 w-3" />
          </span>
        </div>
      </div>

      {/* Open state */}
      <div className={`pointer-events-none absolute inset-0 z-20 flex flex-col justify-between p-6 transition-opacity duration-500 sm:p-8 ${isOpen ? "opacity-100" : "opacity-0"}`}>
        <div className="grid grid-cols-12 gap-3 text-[var(--color-ink-50)]">
          <Meta label="Client" value={character.client} span="col-span-6 sm:col-span-3" />
          <Meta label="Year" value={character.year} span="col-span-6 sm:col-span-2" />
          <Meta label="Views" value={character.views} span="col-span-6 sm:col-span-2" />
          <Meta label="CTR" value={character.ctr} span="col-span-6 sm:col-span-2" />
          <div className="col-span-12 flex items-start justify-end gap-2 sm:col-span-3">
            <span className="border border-white/25 px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-[var(--color-ink-50)]/85">
              {character.type}
            </span>
            <RarityBadge rarity={character.status} size="sm" />
          </div>
        </div>

        <div className="mt-6 max-w-2xl">
          <div className="inline-flex items-center gap-2 border border-white/20 bg-black/30 px-2 py-1 font-mono text-[10.5px] uppercase tracking-[0.18em] text-[var(--color-ink-50)]/80 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />
            {character.faction}
          </div>
          <h3 className="mt-4 font-impact leading-[0.95] text-[var(--color-ink-50)]" style={{ fontSize: "clamp(44px, 6vw, 84px)", letterSpacing: "-0.02em" }}>
            {character.name}
          </h3>
          <p className="mt-4 max-w-xl text-[13.5px] leading-[1.6] text-[var(--color-ink-50)]/85 clamp-3">
            {character.bio}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-wrap items-center gap-1.5">
            {character.tags.map((t) => (
              <span key={t} className="border border-white/20 bg-black/30 px-2.5 py-1 text-[10.5px] font-mono uppercase tracking-[0.16em] text-[var(--color-ink-50)]/90 backdrop-blur-sm">
                {t}
              </span>
            ))}
          </div>
          <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[var(--color-ink-50)]">
            View the set
            <span className="inline-flex h-7 w-7 items-center justify-center text-[var(--color-ink-900)] transition-transform group-hover:translate-x-0.5" style={{ background: color }}>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </span>
        </div>
      </div>
    </button>
  );
}

function Meta({ label, value, span }: { label: string; value: string; span: string }) {
  return (
    <div className={span}>
      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-ink-50)]/55">{label}</div>
      <div className="mt-1 text-[13px] font-medium tabular">{value}</div>
    </div>
  );
}
