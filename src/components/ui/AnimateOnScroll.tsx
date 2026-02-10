"use client";

import { useInView } from "@/hooks/useInView";

type AnimationType =
  | "fade-up"
  | "fade-in"
  | "fade-down"
  | "slide-left"
  | "slide-right"
  | "scale-in";

const animationClasses: Record<AnimationType, string> = {
  "fade-up": "scroll-animate-fade-up",
  "fade-in": "scroll-animate-fade-in",
  "fade-down": "scroll-animate-fade-down",
  "slide-left": "scroll-animate-slide-left",
  "slide-right": "scroll-animate-slide-right",
  "scale-in": "scroll-animate-scale-in",
};

interface AnimateOnScrollProps {
  children: React.ReactNode;
  animation?: AnimationType;
  className?: string;
}

export function AnimateOnScroll({
  children,
  animation = "fade-up",
  className = "",
}: AnimateOnScrollProps) {
  const { ref, isInView } = useInView({ once: true });
  const baseClass = animationClasses[animation];
  const visibleClass = isInView ? "scroll-visible" : "";

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`${baseClass} ${visibleClass} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
