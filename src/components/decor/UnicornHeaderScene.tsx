"use client";

import { useEffect, useState } from "react";

const UNICORN_PROJECT_ID = "KpJtpHMREjfflPEjEkw1";
const UNICORN_SDK_URL =
  "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.0.5/dist/unicornStudio.umd.js";
const UNICORN_SCRIPT_ID = "unicornstudio-sdk-v205";

declare global {
  interface Window {
    UnicornStudio?: {
      init: () => void;
      isInitialized?: boolean;
    };
  }
}

interface UnicornHeaderSceneProps {
  width?: string;
  height?: string;
}

export function UnicornHeaderScene({
  width = "100%",
  height = "400px",
}: UnicornHeaderSceneProps) {
  const [shouldRenderUnicorn, setShouldRenderUnicorn] = useState(false);

  useEffect(() => {
    const isSmallScreen = window.matchMedia("(max-width: 767px)").matches;
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isIOS = /iPad|iPhone|iPod/.test(window.navigator.userAgent);

    // Mobile Safari can be unstable with third-party WebGL embeds.
    // Keep a static fallback there to avoid blank/partial pages.
    if (isSmallScreen || isReducedMotion || isIOS) {
      setShouldRenderUnicorn(false);
      return;
    }

    setShouldRenderUnicorn(true);

    const initScene = () => {
      try {
        window.UnicornStudio?.init?.();
      } catch {
        setShouldRenderUnicorn(false);
      }
    };

    if (window.UnicornStudio?.init) {
      initScene();
      return;
    }

    let script = document.getElementById(UNICORN_SCRIPT_ID) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = UNICORN_SCRIPT_ID;
      script.src = UNICORN_SDK_URL;
      script.async = true;
      script.onload = initScene;
      script.onerror = () => setShouldRenderUnicorn(false);
      (document.head || document.body).appendChild(script);
    } else {
      script.addEventListener("load", initScene, { once: true });
    }
  }, []);

  return (
    <div style={{ width, height }} className="relative overflow-hidden unicorn-scene-host">
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-red-900/70 to-neutral-950" />
      {shouldRenderUnicorn && (
        <div data-us-project={UNICORN_PROJECT_ID} className="absolute inset-0" />
      )}
    </div>
  );
}
