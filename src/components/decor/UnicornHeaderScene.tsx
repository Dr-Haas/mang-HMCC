"use client";

import { useEffect } from "react";

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
  useEffect(() => {
    const initScene = () => {
      window.UnicornStudio?.init?.();
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
      (document.head || document.body).appendChild(script);
    } else {
      script.addEventListener("load", initScene, { once: true });
    }
  }, []);

  return (
    <div
      data-us-project={UNICORN_PROJECT_ID}
      style={{ width, height }}
      className="unicorn-scene-host"
    />
  );
}
