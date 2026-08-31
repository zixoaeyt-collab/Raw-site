import { useState } from "react";
import { thumbs, type Thumb, RARITY_LABEL, type Rarity } from "../data";
import { PatternTile } from "./PatternTile";
import { RarityDot, SectionHeader } from "./ui";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";

const filters = ["All", "Documentary", "Review", "Editorial", "Gaming", "Storytime", "Music", "Magazine"] as const;
const rarities: Rarity[] = ["S", "A", "B", "WIP"];
const shapeClass = {
  tall: "row-span-2 aspect-[3/4]",
  wide: "col-span-2 aspect-[16/10]",
  square: "aspect-square",
} as const;

export function ThumbGallery() {
  const [active, setActive] = useState<(typeof filters)[number]>("All");
  const filtered = active === "All" ? thumbs : thumbs.filter((t) => t.type === active);
  const total = thumbs.length;

  return (
    <section id="work" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            number="02"
            label="THE INDEX"
            title={
              <>
                09 PICKS
                <br />
                <span className="text-[var(--color-ink-300)]">FROM THE BACK</span>
              </>
            }
          />
          <p className="max-w-sm text-[14.5px] leading-[1.65] text-[var(--color-ink-200)]">
            A working portfolio. Some old, some brand new, all of them trying to do the same thing — earn the click quietly, then earn the watch.
          </p>
        </div>
        </Reveal>

        <Reveal delay={0.1}>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <span className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-[var(--color-ink-300)]">Rarity</span>
          {rarities.map((r) => (
            <span key={r} className="inline-flex items-center gap-1.5 border border-white/15 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-ink-50)]">
              <RarityDot rarity={r} />
              {RARITY_LABEL[r]}
            </span>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-1.5 border-y hairline py-3">
          <span className="mr-2 font-mono text-[10.5px] uppercase tracking-[0.24em] text-[var(--color-ink-300)]">Filter</span>
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              aria-pressed={active === f}
              className={`px-3 py-1.5 text-[12.5px] transition-colors ${
                active === f
                  ? "bg-[var(--color-acid)] text-[var(--color-ink-900)]"
                  : "text-[var(--color-ink-200)] hover:bg-white/5 hover:text-[var(--color-ink-50)]"
              }`}
            >
              {f}
            </button>
          ))}
          <span className="ml-auto font-mono text-[10.5px] uppercase tracking-[0.24em] text-[var(--color-ink-300)] tabular">
            {String(filtered.length).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>
        </Reveal>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((t, i) => (
            <ThumbCard key={t.id} thumb={t} index={i} total={total} />
          ))}
        </div>

        <Reveal delay={0.15}>
        <div className="mt-10 flex items-center justify-between border-t hairline pt-6">
          <p className="text-[12.5px] text-[var(--color-ink-300)]">
            Showing {filtered.length} of {total} · Curated by hand, always.
          </p>
          <a href="#" className="group inline-flex items-center gap-1.5 text-[13px] font-medium text-[var(--color-ink-50)]">
            See the full archive
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
        </Reveal>
      </div>
    </section>
  );
}

function ThumbCard({ thumb, index, total }: { thumb: Thumb; index: number; total: number }) {
  return (
    <a href="#" className={`lift group relative overflow-hidden border border-white/10 bg-[var(--color-ink-800)] ${shapeClass[thumb.shape]}`}>
      <PatternTile
        pattern={thumb.pattern}
        palette={thumb.palette}
        className="absolute inset-0"
        showGlyph={String((index % 9) + 1).padStart(2, "0")}
        vignette
        badge={thumb.type}
        rarity={thumb.rarity}
      />

      <div className="absolute right-12 top-3 z-10 font-mono text-[10px] tracking-[0.18em] text-[var(--color-ink-50)]/80">
        {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-2 p-4">
        <div className="min-w-0">
          <h3 className="font-impact text-[20px] uppercase leading-[1] tracking-[-0.01em] text-[var(--color-ink-50)] clamp-2 sm:text-[24px]">
            {thumb.title}
          </h3>
          <div className="mt-1.5 flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.18em] text-[var(--color-ink-50)]/70">
            <span className="inline-flex items-center gap-1.5">
              <RarityDot rarity={thumb.rarity} />
              {thumb.rarity}
            </span>
            <Sep />
            <span>{thumb.client}</span>
            <Sep />
            <span className="tabular">{thumb.year}</span>
            <Sep />
            <span className="tabular">{thumb.views}</span>
          </div>
        </div>
        <span className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center border border-white/40 bg-black/30 text-[var(--color-ink-50)] backdrop-blur-sm transition-colors group-hover:bg-[var(--color-acid)] group-hover:text-[var(--color-ink-900)] group-hover:border-[var(--color-acid)]">
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </a>
  );
}

function Sep() {
  return <span className="text-[var(--color-ink-50)]/30">·</span>;
}
