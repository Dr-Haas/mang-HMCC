"use client";

import { useInView } from "@/hooks/useInView";

interface StaggerScrollProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "ul";
}

export function StaggerScroll({
  children,
  className = "",
  as: Tag = "div",
}: StaggerScrollProps) {
  const { ref, isInView } = useInView({ once: true });
  const visibleClass = isInView ? "scroll-visible" : "";

  return (
    <Tag
      ref={ref as never}
      className={`scroll-stagger-children ${visibleClass} ${className}`.trim()}
    >
      {children}
    </Tag>
  );
}
