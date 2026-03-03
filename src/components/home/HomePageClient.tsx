"use client";

import { useEffect, useState } from "react";
import { VideoLoader } from "@/components/VideoLoader";
import { HomePageContent } from "@/components/home/HomePageContent";

const HOME_INTRO_SEEN_KEY = "hmcc_home_intro_seen";

export function HomePageClient() {
  const [showContent, setShowContent] = useState(false);
  const [hasSeenVideo, setHasSeenVideo] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem(HOME_INTRO_SEEN_KEY) === "1";
    if (hasSeenIntro) {
      setHasSeenVideo(true);
      setShowContent(true);
    }
    setHydrated(true);
  }, []);

  const handleVideoEnd = () => {
    setHasSeenVideo(true);
    sessionStorage.setItem(HOME_INTRO_SEEN_KEY, "1");
    setShowContent(true);
  };

  if (!hydrated) {
    return <div className="fixed inset-0 z-[200] bg-white" />;
  }

  return (
    <>
      {!hasSeenVideo && <VideoLoader onVideoEnd={handleVideoEnd} />}

      {/* Écran blanc qui couvre tout avant que le VideoLoader soit prêt */}
      {!hasSeenVideo && (
        <div className="fixed inset-0 z-[99] bg-white pointer-events-none" />
      )}

      <HomePageContent showContent={showContent} />
    </>
  );
}
