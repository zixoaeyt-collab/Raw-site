import { ArrowUpRight } from "lucide-react";
import { SectionHeader, UnderlineAccent } from "./ui";
import { Reveal } from "./Reveal";
import { MagneticButton } from "./MagneticButton";

const TIERS = ["Single", "Series", "Retainer"];

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-[var(--color-ink-900)] py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-1" style={{ background: "linear-gradient(to right, var(--color-rare), var(--color-warm), var(--color-gold), var(--color-info), var(--color-rare))" }} />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeader
              number="05"
              label="THE NEXT MOVE"
              title={
                <>
                  LET'S MAKE
                  <br />
                  <span className="relative inline-block">
                    SOMETHING
                    <UnderlineAccent width={300} />
                  </span>
                  <br />
                  <span className="text-[var(--color-ink-300)]">QUIET.</span>
                </>
              }
            />
            <p className="mt-7 max-w-lg text-[16px] leading-[1.65] text-[var(--color-ink-200)]">
              Bookings are open for Q3 2026. Tell me about your show, your deadline, and the one thing that keeps you up about it. I'll reply within 24 hours.
            </p>
          </div>

          <div className="lg:col-span-5">
            <form className="border border-white/15 bg-[var(--color-ink-800)] p-6 sm:p-8">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Your name" placeholder="Mei Tanaka" />
                <Field label="Studio / Channel" placeholder="Studio Atlas" />
              </div>
              <div className="mt-4">
                <Field label="Email" type="email" placeholder="you@yourdesk.com" />
              </div>
              <div className="mt-4">
                <label className="block">
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-[var(--color-ink-300)]">Tell me about the show</span>
                  <textarea
                    rows={4}
                    placeholder="Series name, deadline, the one thing you don't want it to feel like..."
                    className="mt-2 w-full border border-white/15 bg-[var(--color-ink-900)] px-4 py-3 text-[14px] text-[var(--color-ink-50)] placeholder:text-[var(--color-ink-400)] focus:border-[var(--color-acid)] focus:outline-none"
                  />
                </label>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {TIERS.map((t) => (
                  <label key={t} className="flex cursor-pointer items-center justify-center gap-2 border border-white/15 bg-[var(--color-ink-900)] px-3 py-2.5 text-[12.5px] uppercase tracking-[0.14em] text-[var(--color-ink-200)] has-[:checked]:border-[var(--color-acid)] has-[:checked]:bg-[var(--color-acid)] has-[:checked]:text-[var(--color-ink-900)]">
                    <input type="radio" name="tier" defaultChecked={t === "Single"} className="sr-only" />
                    {t}
                  </label>
                ))}
              </div>
              <MagneticButton
                as="button"
                strength={0.18}
                className="group mt-6 inline-flex w-full items-center justify-center gap-2 bg-[var(--color-acid)] px-5 py-3.5 text-[13.5px] font-bold uppercase tracking-[0.14em] text-[var(--color-ink-900)] transition-colors hover:bg-[var(--color-ink-50)]"
              >
                <button type="button" className="inline-flex items-center gap-2">
                  Send the brief
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </MagneticButton>
              <p className="mt-3 text-center text-[11.5px] text-[var(--color-ink-300)]">Replies within 24h · No mailing list, ever</p>
            </form>
          </div>
        </div>
        </Reveal>
      </div>
    </section>
  );
}

function Field({ label, placeholder, type = "text" }: { label: string; placeholder: string; type?: string }) {
  return (
    <label className="block">
      <span className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-[var(--color-ink-300)]">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-2 w-full border border-white/15 bg-[var(--color-ink-900)] px-4 py-2.5 text-[14px] text-[var(--color-ink-50)] placeholder:text-[var(--color-ink-400)] focus:border-[var(--color-acid)] focus:outline-none"
      />
    </label>
  );
}
