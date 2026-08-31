import { RinMark } from "./ui";
import { Marquee } from "./Marquee";

const columns = [
  {
    title: "Index",
    links: ["2026 picks", "2025 archive", "All thumbnails", "Motion reels", "Press kit"],
  },
  {
    title: "Studio",
    links: ["About Rin", "How I work", "Pricing", "FAQ", "Studio Atlas"],
  },
  {
    title: "Elsewhere",
    links: ["Are.na", "Instagram", "Vimeo", "Figma", "Read.cv"],
  },
];

export function Footer() {
  return (
    <footer className="relative bg-[var(--color-ink-900)]">
      <Marquee variant="banner" />

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 pb-12 pt-20 sm:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-2.5">
                <RinMark className="h-6 w-6 text-[var(--color-acid)]" />
                <span className="font-impact text-[20px] leading-none tracking-[-0.01em] text-[var(--color-ink-50)]">
                  RIN OKABE
                </span>
              </div>
              <p className="mt-5 max-w-sm text-[14.5px] leading-[1.6] text-[var(--color-ink-200)]">
                Thumbnail direction & motion design from a small studio in Tokyo and Kyoto. We sweat the details so your audience can see the work.
              </p>
              <div className="mt-6 flex flex-col gap-2 text-[12.5px] text-[var(--color-ink-300)]">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-acid)] blink" />
                  Available for Q3 2026 bookings
                </div>
                <div>hello@rinokabe.studio</div>
                <div>+81 (0)3 — 4567 — 8901</div>
              </div>
            </div>

            {columns.map((c) => (
              <div key={c.title} className="lg:col-span-2">
                <div className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-[var(--color-ink-400)]">
                  {c.title}
                </div>
                <ul className="mt-4 space-y-2.5">
                  {c.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        className="text-[13.5px] text-[var(--color-ink-200)] hover:text-[var(--color-acid)]"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="lg:col-span-1">
              <div className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-[var(--color-ink-400)]">
                v2.6
              </div>
            </div>
          </div>

          <div className="mt-16 flex flex-col-reverse items-start justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--color-ink-400)]">
              © 2026 Rin Okabe · Made with two screens and a very long extension cord
            </p>
            <div className="flex items-center gap-5 text-[12.5px] text-[var(--color-ink-200)]">
              <a href="#" className="hover:text-[var(--color-acid)]">Privacy</a>
              <a href="#" className="hover:text-[var(--color-acid)]">Terms</a>
              <a href="#" className="hover:text-[var(--color-acid)]">Colophon</a>
              <a href="#" className="hover:text-[var(--color-acid)]">RSS</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
