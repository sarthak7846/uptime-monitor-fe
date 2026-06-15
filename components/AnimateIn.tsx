"use client";

import { useEffect, useRef, useState } from "react";

type Variant = "fadeUp" | "fadeIn" | "slideLeft" | "slideRight" | "scaleUp";

const states: Record<Variant, { hidden: string; shown: string }> = {
  fadeUp: { hidden: "opacity-0 translate-y-6", shown: "opacity-100 translate-y-0" },
  fadeIn: { hidden: "opacity-0", shown: "opacity-100" },
  slideLeft: { hidden: "opacity-0 -translate-x-10", shown: "opacity-100 translate-x-0" },
  slideRight: { hidden: "opacity-0 translate-x-10", shown: "opacity-100 translate-x-0" },
  scaleUp: { hidden: "opacity-0 scale-95", shown: "opacity-100 scale-100" },
};

export default function AnimateIn({
  children,
  variant = "fadeUp",
  delay = 0,
  duration = 650,
  className = "",
  threshold = 0.12,
}: {
  children: React.ReactNode;
  variant?: Variant;
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const { hidden, shown: shownClass } = states[variant];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={`transition-all ease-out will-change-transform ${shown ? shownClass : hidden} ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: shown ? `${delay}ms` : "0ms",
      }}
    >
      {children}
    </div>
  );
}
