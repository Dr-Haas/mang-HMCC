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
  const [shouldRenderUnicorn, setShouldRenderUnicorn] = useState(true);
  const [profile, setProfile] = useState<"desktop" | "mobile">("desktop");

  useEffect(() => {
    const isSmallScreen = window.matchMedia("(max-width: 767px)").matches;
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isIOS =
      /iPad|iPhone|iPod/.test(window.navigator.userAgent) ||
      (window.navigator.platform === "MacIntel" && window.navigator.maxTouchPoints > 1);

    // Unicorn stays enabled on mobile/iOS with reduced rendering profile.
    setProfile(isSmallScreen || isIOS ? "mobile" : "desktop");
    setShouldRenderUnicorn(!isReducedMotion);

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
        <div
          data-us-project={UNICORN_PROJECT_ID}
          data-us-lazyload="true"
          data-us-production="true"
          data-us-scale={profile === "mobile" ? "0.45" : "1"}
          data-us-dpi={profile === "mobile" ? "1" : "1.5"}
          data-us-fps={profile === "mobile" ? "24" : "60"}
          className="absolute inset-0"
        />
      )}
    </div>
  );
}
