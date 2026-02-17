"use client";

import { useState, useEffect } from "react";
import { VideoLoader } from "@/components/VideoLoader";
import { HomePageContent } from "@/components/home/HomePageContent";

export default function Home() {
  const [showContent, setShowContent] = useState(false);
  const [hasSeenVideo, setHasSeenVideo] = useState(false);
  const [enableVideoLoader, setEnableVideoLoader] = useState(false);

  // On mobile/iOS we skip the intro video to avoid fixed overlay/touch issues.
  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const isIOS = /iPad|iPhone|iPod/.test(window.navigator.userAgent);
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isMobile || isIOS || prefersReducedMotion) {
      setHasSeenVideo(true);
      setShowContent(true);
      setEnableVideoLoader(false);
      return;
    }

    try {
      const seen = localStorage.getItem("hmcc-video-seen");
      if (seen === "true") {
        setHasSeenVideo(true);
        setShowContent(true);
        setEnableVideoLoader(false);
        return;
      }
    } catch {
      // If storage is unavailable, fail safe and show the site.
      setHasSeenVideo(true);
      setShowContent(true);
      setEnableVideoLoader(false);
      return;
    }

    setEnableVideoLoader(true);
  }, []);

  const handleVideoEnd = () => {
    try {
      localStorage.setItem("hmcc-video-seen", "true");
    } catch {
      // Ignore storage failures and continue.
    }
    setHasSeenVideo(true);
    setShowContent(true);
  };

  return (
    <>
      {enableVideoLoader && !hasSeenVideo && <VideoLoader onVideoEnd={handleVideoEnd} />}
      <HomePageContent showContent={showContent || hasSeenVideo} />
    </>
  );
}
