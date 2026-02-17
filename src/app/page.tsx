"use client";

import { useState } from "react";
import { VideoLoader } from "@/components/VideoLoader";
import { PageLoader } from "@/components/PageLoader";
import { HomePageContent } from "@/components/home/HomePageContent";

export default function Home() {
  const [showContent, setShowContent] = useState(false);
  const [hasSeenVideo, setHasSeenVideo] = useState(false);
  const [showPageLoader, setShowPageLoader] = useState(false);

  // Vérifier si l'utilisateur a déjà vu la vidéo (localStorage)
  useEffect(() => {
    const seen = localStorage.getItem("hmcc-video-seen");
    if (seen === "true") {
      setHasSeenVideo(true);
      setShowPageLoader(true);
const HOME_LOADER_SEEN_KEY = "hmcc_home_loader_seen";

export default function Home() {
  const [showContent, setShowContent] = useState<boolean>(() => {
    if (typeof window === "undefined") {
      return false;
    }
    return window.sessionStorage.getItem(HOME_LOADER_SEEN_KEY) === "1";
  });

  const handleVideoEnd = () => {
    localStorage.setItem("hmcc-video-seen", "true");
    setHasSeenVideo(true);
    setShowPageLoader(true);
  };

  const handlePageLoaderComplete = () => {
    window.sessionStorage.setItem(HOME_LOADER_SEEN_KEY, "1");
    setShowContent(true);
  };

  return (
    <>
      {!hasSeenVideo && <VideoLoader onVideoEnd={handleVideoEnd} />}
      {showPageLoader && !showContent && (
        <PageLoader onComplete={handlePageLoaderComplete} />
      )}
      {!showContent && <VideoLoader onVideoEnd={handleVideoEnd} />}
      <HomePageContent showContent={showContent} />
    </>
  );
}
