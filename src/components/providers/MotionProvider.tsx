"use client";

import { MotionConfig } from "framer-motion";
import { useAdaptiveMotion } from "@/hooks/useAdaptiveMotion";

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const { shouldReduceMotion } = useAdaptiveMotion();

  return (
    <MotionConfig reducedMotion={shouldReduceMotion ? "always" : "never"}>
      {children}
    </MotionConfig>
  );
}
