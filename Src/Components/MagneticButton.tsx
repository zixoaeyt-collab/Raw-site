import { useRef, useState, type ReactNode } from "react";

/**
 * Wraps a button (or any clickable) so it subtly follows the cursor
 * when the cursor is within ~70px. Springs back when the cursor leaves.
 *
 * Disabled automatically when prefers-reduced-motion is set.
 */
export function MagneticButton({
  children,
  strength = 0.25,
  className = "",
  as: Tag = "div",
  ...rest
}: {
  children: ReactNode;
  /** 0 = no movement, 1 = full follow. Default 0.25. */
  strength?: number;
  className?: string;
  as?: "div" | "button" | "a";
} & React.HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);
    const radius = Math.max(rect.width, rect.height) * 1.2;
    if (dist > radius) {
      setTransform("");
      return;
    }
    // Fade in as the cursor approaches the edge of the radius
    const intensity = 1 - dist / radius;
    setTransform(`translate(${dx * strength * intensity}px, ${dy * strength * intensity}px)`);
  };
  const onLeave = () => setTransform("");

  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const style = reduce
    ? { transition: "transform 250ms ease" }
    : {
        transform,
        transition: "transform 250ms cubic-bezier(0.2, 0.6, 0.2, 1)",
      };

  const TagAny = Tag as unknown as React.ElementType;
  return (
    <TagAny
      ref={ref}
      className={className}
      style={style}
      onMouseMove={reduce ? undefined : onMove}
      onMouseLeave={reduce ? undefined : onLeave}
      {...rest}
    >
      {children}
    </TagAny>
  );
}
