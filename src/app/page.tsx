"use client";

import { useState, useEffect } from "react";
import { VideoLoader } from "@/components/VideoLoader";
import { PageLoader } from "@/components/PageLoader";
import { HomePageContent } from "@/components/home/HomePageContent";

const HOME_LOADER_SEEN_KEY = "hmcc_home_loader_seen";

export default function Home() {
  const [showContent, setShowContent] = useState(false);
  const [hasSeenVideo, setHasSeenVideo] = useState(false);
  const [showPageLoader, setShowPageLoader] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Check localStorage after hydration to avoid mismatch
  useEffect(() => {
    setMounted(true);
    const seenVideo = localStorage.getItem("hmcc-video-seen") === "true";
    const seenLoader = sessionStorage.getItem(HOME_LOADER_SEEN_KEY) === "1";
    
    if (seenVideo) {
      setHasSeenVideo(true);
      if (seenLoader) {
        setShowContent(true);
      } else {
        setShowPageLoader(true);
      }
    }
  }, []);

  const handleVideoEnd = () => {
    localStorage.setItem("hmcc-video-seen", "true");
    setHasSeenVideo(true);
    setShowPageLoader(true);
  };

  const handlePageLoaderComplete = () => {
    sessionStorage.setItem(HOME_LOADER_SEEN_KEY, "1");
    setShowContent(true);
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      {!hasSeenVideo && <VideoLoader onVideoEnd={handleVideoEnd} />}
      {showPageLoader && !showContent && (
        <PageLoader onComplete={handlePageLoaderComplete} />
      )}
      <HomePageContent showContent={showContent} />
    </>
  );
}

