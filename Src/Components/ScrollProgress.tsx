import { useScrollProgress } from "../hooks/useScrollProgress";

/**
 * Thin gold line at the very top of the viewport that fills
 * as the user scrolls down the page.
 */
export function ScrollProgress() {
  const progress = useScrollProgress();
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-0 right-0 top-0 z-[60] h-[2px] bg-transparent"
    >
      <div
        className="h-full origin-left bg-[var(--color-gold)] transition-transform duration-150 ease-out"
        style={{ transform: `scaleX(${progress})`, width: "100%" }}
      />
    </div>
  );
}
