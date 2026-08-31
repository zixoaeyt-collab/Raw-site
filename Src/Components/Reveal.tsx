import { useReveal } from "../hooks/useReveal";
import type { ElementType, ReactNode } from "react";

/**
 * Wraps a section so it fades up + translates when scrolled into view.
 * Respects prefers-reduced-motion (no-op, just renders children).
 *
 * Usage:
 *   <Reveal>
 *     <h2>...</h2>
 *     <p>...</p>
 *   </Reveal>
 *
 * Variant:
 *   - "fade-up"    (default) — translateY(24px) → 0, opacity 0 → 1
 *   - "fade"       — opacity 0 → 1 only
 *   - "fade-left"  — translateX(-24px) → 0
 *   - "fade-right" — translateX(24px) → 0
 */
type Variant = "fade-up" | "fade" | "fade-left" | "fade-right";

const variantClass: Record<Variant, string> = {
  "fade-up": "translate-y-6 opacity-0",
  "fade": "opacity-0",
  "fade-left": "-translate-x-6 opacity-0",
  "fade-right": "translate-x-6 opacity-0",
};

const revealedClass = "!translate-x-0 !translate-y-0 !opacity-100";

export function Reveal({
  children,
  variant = "fade-up",
  className = "",
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  /** Optional delay in seconds (useful for staggering). */
  delay?: number;
  as?: ElementType;
}) {
  const { ref, isRevealed } = useReveal<HTMLDivElement>();

  const TagAny = Tag as unknown as ElementType;
  return (
    <TagAny
      ref={ref as React.Ref<HTMLDivElement>}
      className={`transition-all duration-700 ease-out will-change-transform ${variantClass[variant]} ${
        isRevealed ? revealedClass : ""
      } ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </TagAny>
  );
}
