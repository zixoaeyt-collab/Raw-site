import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navWords } from "../data";
import { RinMark } from "./ui";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [now, setNow] = useState("");
  const [activeId, setActiveId] = useState<string>("");
  const [hidden, setHidden] = useState(false);

  // Scroll: blur bg + hide-on-scroll-down / show-on-scroll-up
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      // Hide on scroll down past 200, show on scroll up
      if (y > 200 && y > lastY + 4) setHidden(true);
      else if (y < lastY - 2) setHidden(false);
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // IntersectionObserver — track which section is currently in view
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const ids = navWords.map((l) => l.href.replace("#", ""));
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (els.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the top of the viewport that is intersecting
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const update = () => {
      setNow(
        new Date().toLocaleTimeString("en-GB", {
          timeZone: "Asia/Tokyo",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
      );
    };
    update();
    const i = setInterval(update, 30_000);
    return () => clearInterval(i);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? "bg-[var(--color-ink-900)]/85 backdrop-blur-md border-b hairline"
          : "bg-transparent border-b border-transparent"
      } ${hidden ? "-translate-y-full" : "translate-y-0"}`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#" className="flex items-center gap-2.5">
          <RinMark className="h-6 w-6 text-[var(--color-acid)]" />
          <span className="font-impact text-[18px] leading-none tracking-[-0.01em] text-[var(--color-ink-50)]">
            RIN OKABE
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {navWords.map((l) => (
            <NavLink key={l.href} {...l} isActive={activeId === l.href.replace("#", "")} />
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.24em] text-[var(--color-ink-300)]">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-acid)] blink" />
            TKY {now}
          </div>
          <a
            href="#contact"
            className="group inline-flex items-center gap-1.5 bg-[var(--color-acid)] px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--color-ink-900)] transition-colors hover:bg-[var(--color-ink-50)]"
          >
            Book a session
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center border border-white/20"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t hairline bg-[var(--color-ink-900)]">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
            {navWords.map((l) => (
              <NavLink key={l.href} {...l} variant="mobile" onSelect={() => setOpen(false)} />
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center bg-[var(--color-acid)] px-4 py-3 text-[13px] font-semibold uppercase tracking-[0.14em] text-[var(--color-ink-900)]"
            >
              Book a session
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

function NavLink({
  id,
  text,
  href,
  variant = "desktop",
  isActive = false,
  onSelect,
}: {
  id: string;
  text: string;
  href: string;
  variant?: "desktop" | "mobile";
  isActive?: boolean;
  onSelect?: () => void;
}) {
  const isMobile = variant === "mobile";
  return (
    <a
      href={href}
      onClick={onSelect}
      className={
        isMobile
          ? "flex items-center gap-2 rounded-md px-2 py-3 text-[14px] font-medium uppercase tracking-[0.14em] text-[var(--color-ink-50)] hover:bg-white/5"
          : `group relative inline-flex items-center gap-1.5 px-3 py-2 text-[12px] font-medium uppercase tracking-[0.14em] transition-colors ${
              isActive
                ? "text-[var(--color-ink-50)]"
                : "text-[var(--color-ink-200)] hover:text-[var(--color-ink-50)]"
            }`
      }
    >
      <span
        className={
          isMobile
            ? "font-mono text-[10px] text-[var(--color-ink-400)]"
            : `font-mono text-[9.5px] transition-colors ${
                isActive ? "text-[var(--color-gold)]" : "text-[var(--color-ink-400)] group-hover:text-[var(--color-acid)]"
              }`
        }
      >
        {id}
      </span>
      {text}
      {!isMobile && (
        <span
          aria-hidden
          className={`pointer-events-none absolute bottom-1 left-3 right-3 h-px origin-left bg-[var(--color-gold)] transition-transform duration-300 ease-out ${
            isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
          }`}
        />
      )}
    </a>
  );
}
