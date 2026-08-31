import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "./ui";
import { Reveal } from "./Reveal";

/* ============================================================
   STORYBOARD — "How a thumbnail gets made"
   Editorial collage à la Storyselling Agency:
   a light-cream printed insert pasted into the dark site.
   Black outlined numerals, overlapping red tape cards,
   flat, no gradients, no glows. Disciplined minimalism.
   ============================================================ */

type Step = {
  question: string; // tape card headline
  hint: string;     // tiny caption on the tape
  rotate: number;   // tilt angle
  offset: { x: string; y: string }; // position on the poster
};

const STEPS: Step[] = [
  {
    question: "WHAT IS IT ABOUT?",
    hint: "the brief · the audience · the one thing it must never feel like",
    rotate: -3,
    offset: { x: "0%", y: "8%" },
  },
  {
    question: "WHERE IS THE HOOK?",
    hint: "the single gesture that earns the click",
    rotate: 2.5,
    offset: { x: "55%", y: "20%" },
  },
  {
    question: "HOW IS IT COMPOSED?",
    hint: "typography · color · the rule of thirds",
    rotate: -2,
    offset: { x: "8%", y: "48%" },
  },
  {
    question: "HOW DOES IT CROP?",
    hint: "youtube · tiktok · instagram · newsletter",
    rotate: 3,
    offset: { x: "58%", y: "62%" },
  },
  {
    question: "HOW DO WE KNOW IT WORKS?",
    hint: "the A/B · the lift · the quiet win",
    rotate: -1.5,
    offset: { x: "0%", y: "84%" },
  },
];

const PRICING = [
  { name: "Single", price: "$2,400", sub: "1 hero · 3 crops · 1 A/B" },
  { name: "Series", price: "$8,800", sub: "6 episodes · full season pack" },
  { name: "Retainer", price: "From $18k/mo", sub: "Always-on thumbnail + motion team" },
];

export function Process() {
  return (
    <section
      id="process"
      className="relative bg-[var(--color-ink-900)] py-24 text-[var(--color-ink-50)] sm:py-32"
    >
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
        {/* Header — sits ABOVE the storyboard poster */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            number="03"
            label="THE PROCESS"
            title={
              <>
                HOW A THUMBNAIL
                <br />
                ACTUALLY <span className="text-[var(--color-gold)]">GETS MADE</span>.
              </>
            }
          />
          <p className="max-w-sm text-[14.5px] leading-[1.65] text-[var(--color-ink-200)]">
            Five questions. Five answers. The whole thing usually wraps in nine working days.
          </p>
        </div>
        </Reveal>

        <Reveal delay={0.1}>
        {/* The storyboard — a cream "printed insert" pasted into the dark site */}
        <div className="mt-16">
          <Poster />
        </div>
        </Reveal>

        <Reveal delay={0.15}>
        {/* Pricing — the "what it costs" payoff */}
        <div className="mt-20">
          <div className="mb-6 flex items-center gap-3">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-[var(--color-rare)]">
              06 / THE INVESTMENT
            </span>
            <span className="h-px w-12" style={{ background: "var(--color-rare)", opacity: 0.3 }} />
          </div>
          <h3 className="font-impact text-[32px] uppercase leading-[0.95] tracking-[-0.02em] text-[var(--color-ink-50)] sm:text-[40px]">
            THREE WAYS TO <span className="text-[var(--color-rare)]">WORK</span> TOGETHER.
          </h3>
          <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden border border-white/10 bg-white/5 sm:grid-cols-3">
            {PRICING.map((p, i) => (
              <div
                key={p.name}
                className="relative flex flex-col gap-2 bg-[var(--color-ink-900)] p-6 sm:p-8"
              >
                <div className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.24em] text-[var(--color-ink-300)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold)]" />
                  {p.name}
                </div>
                <div className="font-impact text-[40px] uppercase leading-none tracking-[-0.02em] text-[var(--color-ink-50)] sm:text-[48px]">
                  {p.price}
                </div>
                <div className="text-[13px] text-[var(--color-ink-200)]">{p.sub}</div>
                <span className="absolute right-4 top-4 font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--color-ink-400)]">
                  0{i + 1}
                </span>
              </div>
            ))}
          </div>
          <a
            href="#contact"
            className="mt-8 inline-flex items-center gap-1.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-[var(--color-ink-50)] hover:text-[var(--color-gold)]"
          >
            Get a tailored estimate
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   The poster — a cream-colored "printed insert" that breaks the
   dark site rhythm. Big black outlined numerals in the background,
   5 red tape cards overlapping each other diagonally.
   No gradients. No glows. No 3D shadows. Flat, like print.
   ============================================================ */
function Poster() {
  // Mobile: vertical list of cards (poster is too small for the collage to read)
  // Desktop: the cream poster with the editorial collage
  return (
    <>
      {/* Mobile fallback — simple vertical list of the 5 questions */}
      <ol className="space-y-3 sm:hidden">
        {STEPS.map((s, i) => (
          <li
            key={i}
            className="border-2 border-[var(--color-ink-900)] px-4 py-3"
            style={{ background: "var(--color-cherry)" }}
          >
            <div className="flex items-center justify-between font-mono text-[9.5px] uppercase tracking-[0.24em] text-[var(--color-ink-50)]/85">
              <span>0{i + 1} / 05</span>
              <span>★</span>
            </div>
            <h3 className="mt-1.5 font-impact text-[18px] uppercase leading-[0.95] tracking-[-0.01em] text-[var(--color-ink-50)]">
              {s.question}
            </h3>
            <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--color-ink-50)]/75">
              {s.hint}
            </p>
          </li>
        ))}
      </ol>

      {/* Desktop — the cream editorial poster */}
      <div
        className="relative hidden w-full overflow-hidden border-2 border-[var(--color-ink-900)] sm:block"
        style={{
          background: "var(--color-paper)",
          aspectRatio: "16 / 11",
        }}
      >
        {/* Faint warm grain — makes it feel printed, not flat-vector */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-multiply"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
          }}
        />

        {/* The big outlined numerals — black on cream, bold and visible */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-end justify-between px-2 sm:px-6"
          style={{ paddingBottom: "8%" }}
        >
          {STEPS.map((_, i) => (
            <span
              key={i}
              className="font-impact leading-none tracking-[-0.05em]"
              style={{
                fontSize: "clamp(80px, 18vw, 240px)",
                WebkitTextStroke: "2px rgba(14, 13, 10, 0.5)",
                color: "transparent",
              }}
            >
              {i + 1}
            </span>
          ))}
        </div>

        {/* Corner labels — flat, like a printed mark */}
        <div className="absolute left-5 top-5 z-10 sm:left-8 sm:top-8">
          <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--color-ink-700)]">
            Studio Atlas
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--color-ink-500)]">
            Process · 05 steps
          </div>
        </div>
        <div className="absolute right-5 top-5 z-10 text-right sm:right-8 sm:top-8">
          <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--color-ink-700)]">
            03 / The Process
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--color-ink-500)]">
            Q3 · 2026
          </div>
        </div>

        {/* The 5 red tape cards, overlapping each other diagonally */}
        <div className="absolute inset-0">
          {STEPS.map((s, i) => (
            <Tape key={i} step={s} index={i} />
          ))}
        </div>

        {/* Single starburst — bottom-right sticker seal */}
        <svg
          aria-hidden
          className="pointer-events-none absolute bottom-6 right-6 h-10 w-10 text-[var(--color-ink-900)]/80 sm:bottom-10 sm:right-10 sm:h-14 sm:w-14"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 0 L13.5 9 L22 7 L15 12 L22 17 L13.5 15 L12 24 L10.5 15 L2 17 L9 12 L2 7 L10.5 9 Z" />
        </svg>

        {/* Bottom-left small caption */}
        <div className="absolute bottom-5 left-5 z-10 sm:bottom-8 sm:left-8">
          <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--color-ink-700)]">
            ft. 09 working days
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--color-ink-500)]">
            1 human · 0 AI faces
          </div>
        </div>
      </div>
    </>
  );
}

/**
 * One red tape card. Flat color, black border, black text.
 * No gradient, no glow, no soft shadow. Sticker-on-poster feel.
 */
function Tape({ step, index }: { step: Step; index: number }) {
  return (
    <div
      className="absolute w-[44%] max-w-[280px] sm:w-[34%] sm:max-w-[300px]"
      style={{
        left: step.offset.x,
        top: step.offset.y,
        transform: `rotate(${step.rotate}deg)`,
        zIndex: 10 + index,
      }}
    >
      <div
        className="border-2 border-[var(--color-ink-900)] px-4 py-3 sm:px-5 sm:py-4"
        style={{
          background: "var(--color-cherry)",
        }}
      >
        {/* Tiny step number + corner stars */}
        <div className="flex items-center justify-between font-mono text-[9.5px] uppercase tracking-[0.24em] text-[var(--color-ink-50)]/85">
          <span>0{index + 1} / 05</span>
          <span>★</span>
        </div>

        {/* The question */}
        <h3 className="mt-2 font-impact text-[16px] uppercase leading-[0.95] tracking-[-0.01em] text-[var(--color-ink-50)] sm:text-[20px]">
          {step.question}
        </h3>

        {/* The hint */}
        <p className="mt-1.5 font-mono text-[8.5px] uppercase tracking-[0.18em] text-[var(--color-ink-50)]/75 sm:text-[9.5px]">
          {step.hint}
        </p>
      </div>
    </div>
  );
}
