"use client";

import { useEffect, useState } from "react";
import { VideoLoader } from "@/components/VideoLoader";
import { PageLoader } from "@/components/PageLoader";
import { HomePageContent } from "@/components/home/HomePageContent";

const HOME_INTRO_SEEN_KEY = "hmcc_home_intro_seen";

export function HomePageClient() {
  const [showContent, setShowContent] = useState(false);
  const [hasSeenVideo, setHasSeenVideo] = useState(false);
  const [showPageLoader, setShowPageLoader] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem(HOME_INTRO_SEEN_KEY) === "1";
    if (hasSeenIntro) {
      setHasSeenVideo(true);
      setShowPageLoader(false);
      setShowContent(true);
    }
    setHydrated(true);
  }, []);

  const handleVideoEnd = () => {
    setHasSeenVideo(true);
    setShowPageLoader(true);
  };

  const handlePageLoaderComplete = () => {
    sessionStorage.setItem(HOME_INTRO_SEEN_KEY, "1");
    setShowContent(true);
  };

  if (!hydrated) {
    return null;
  }

  return (
    <>
      {!hasSeenVideo && <VideoLoader onVideoEnd={handleVideoEnd} />}
      {showPageLoader && !showContent && <PageLoader onComplete={handlePageLoaderComplete} />}
      <HomePageContent showContent={showContent} />
    </>
  );
}
