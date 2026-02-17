"use client";

import { useState, useEffect } from "react";
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
    }
  }, []);

  const handleVideoEnd = () => {
    localStorage.setItem("hmcc-video-seen", "true");
    setHasSeenVideo(true);
    setShowPageLoader(true);
  };

  const handlePageLoaderComplete = () => {
    setShowContent(true);
  };

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
