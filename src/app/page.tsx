"use client";

import { useState, useEffect } from "react";
import { VideoLoader } from "@/components/VideoLoader";
import { HomePageContent } from "@/components/home/HomePageContent";

const HOME_LOADER_SEEN_KEY = "hmcc_home_loader_seen";

export default function Home() {
  const [showContent, setShowContent] = useState(false);
  const [hasSeenVideo, setHasSeenVideo] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem("hmcc-video-seen");
    if (seen === "true") {
      setHasSeenVideo(true);
      setShowContent(true);
    }
    setHydrated(true);
  }, []);

  const handleVideoEnd = () => {
    localStorage.setItem("hmcc-video-seen", "true");
    window.sessionStorage.setItem(HOME_LOADER_SEEN_KEY, "1");
    setHasSeenVideo(true);
    setShowContent(true);
  };

  if (!hydrated) {
    return <div className="fixed inset-0 z-[200] bg-white" />;
  }

  return (
    <>
      {!hasSeenVideo && <VideoLoader onVideoEnd={handleVideoEnd} />}

      {/* Écran blanc avant VideoLoader */}
      {!hasSeenVideo && (
        <div className="fixed inset-0 z-[99] bg-white pointer-events-none" />
      )}

      <HomePageContent showContent={showContent} />
    </>
  );
}

