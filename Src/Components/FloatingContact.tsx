import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * Fixed bottom-right pill button → #contact.
 * Hides itself when the contact section is in the viewport
 * (so it doesn't duplicate the section's own CTA).
 */
export function FloatingContact() {
  const [visible, setVisible] = useState(false);
  const [contactInView, setContactInView] = useState(false);

  // After a short delay, show the button
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(t);
  }, []);

  // Watch the contact section
  useEffect(() => {
    const target = document.getElementById("contact");
    if (!target || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => setContactInView(entry.isIntersecting),
      { threshold: 0.25 },
    );
    io.observe(target);
    return () => io.disconnect();
  }, []);

  const hidden = !visible || contactInView;

  return (
    <a
      href="#contact"
      aria-label="Book a session"
      className={`group fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 border border-[var(--color-ink-50)]/30 bg-[var(--color-ink-900)]/85 px-4 py-2.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--color-ink-50)] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] backdrop-blur-md transition-all duration-300 hover:bg-[var(--color-gold)] hover:text-[var(--color-ink-900)] sm:bottom-8 sm:right-8 ${
        hidden ? "pointer-events-none translate-y-3 opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      Book a session
      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  );
}
