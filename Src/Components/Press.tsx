import { Marquee } from "./Marquee";
import { SectionHeader } from "./ui";
import { Reveal } from "./Reveal";
import { Quote } from "lucide-react";

const REVIEWS = [
  { body: "Rin made our documentary thumbnails feel like a magazine, not a content farm. Our CTR went up 38% and the comments stopped saying 'clickbait'.", name: "Hana K.", role: "Series Producer, NHK World" },
  { body: "We've worked with thumbnail teams at three networks. Rin is the only one who brought a type spec to the first call. That told me everything.", name: "Mateo F.", role: "Channel Director, Phantom Tech" },
  { body: "The session felt like a design school tutorial and a recording session had a baby. Our launch trailer outperformed the studio's by 2.3x.", name: "Yuki O.", role: "Marketing Lead, Kowloon Drift" },
];

export function Press() {
  return (
    <section id="press" className="relative bg-[var(--color-ink-900)] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeader
              number="04"
              label="THE PRESS"
              title={
                <>
                  WHAT THE
                  <br />
                  CLIENTS <span className="text-[var(--color-rare)]">SAY</span>.
                </>
              }
            />
            <p className="mt-6 max-w-sm text-[15px] leading-[1.65] text-[var(--color-ink-200)]">
              Selected testimonials from the last two seasons. We don't run a sales team — the work speaks, and the people who paid for it speak louder.
            </p>
          </div>
          <div className="lg:col-span-7">
            <ul className="space-y-3">
              {REVIEWS.map((r, i) => (
                <li key={r.name} className="border border-white/10 bg-[var(--color-ink-800)] p-6 sm:p-7">
                  <div className="flex items-start gap-3">
                    <Quote className="h-5 w-5 flex-shrink-0 text-[var(--color-rare)]" strokeWidth={1.4} />
                    <div className="flex-1">
                      <p className="font-serif text-[19px] leading-[1.45] text-[var(--color-ink-50)] sm:text-[21px]">"{r.body}"</p>
                      <div className="mt-4 flex items-center gap-3 text-[12.5px]">
                        <span className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-[var(--color-ink-300)]">{String(i + 1).padStart(2, "0")}</span>
                        <span className="font-medium text-[var(--color-ink-50)]">{r.name}</span>
                        <span className="text-[var(--color-ink-400)]">·</span>
                        <span className="text-[var(--color-ink-200)]">{r.role}</span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        </Reveal>
      </div>
      <div className="mt-20">
        <Marquee variant="thin" />
      </div>
    </section>
  );
}
