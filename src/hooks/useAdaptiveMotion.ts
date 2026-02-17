"use client";

import { useEffect, useState } from "react";

interface AdaptiveMotionState {
  isIOSMobile: boolean;
  prefersReducedMotion: boolean;
  shouldReduceMotion: boolean;
}

export function useAdaptiveMotion(): AdaptiveMotionState {
  const [state, setState] = useState<AdaptiveMotionState>({
    isIOSMobile: false,
    prefersReducedMotion: false,
    // Keep motion reduced until client checks complete.
    shouldReduceMotion: true,
  });

  useEffect(() => {
    const mqReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqMobile = window.matchMedia("(max-width: 767px)");
    const ua = window.navigator.userAgent;
    const platform = window.navigator.platform;
    const isAppleTouchDevice =
      platform === "MacIntel" && (window.navigator as Navigator & { maxTouchPoints?: number }).maxTouchPoints > 1;
    const isIOS = /iPad|iPhone|iPod/.test(ua) || isAppleTouchDevice;

    const compute = () => {
      const isIOSMobile = isIOS && mqMobile.matches;
      const prefersReducedMotion = mqReduced.matches;

      setState({
        isIOSMobile,
        prefersReducedMotion,
        shouldReduceMotion: isIOSMobile || prefersReducedMotion,
      });
    };

    compute();
    mqReduced.addEventListener("change", compute);
    mqMobile.addEventListener("change", compute);

    return () => {
      mqReduced.removeEventListener("change", compute);
      mqMobile.removeEventListener("change", compute);
    };
  }, []);

  return state;
}
