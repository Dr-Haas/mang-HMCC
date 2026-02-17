"use client";

import { useState } from "react";
import { VideoLoader } from "@/components/VideoLoader";
import { PageLoader } from "@/components/PageLoader";
import { HomePageContent } from "@/components/home/HomePageContent";

export default function Home() {
  const [showContent, setShowContent] = useState(false);
  const [hasSeenVideo, setHasSeenVideo] = useState(false);
  const [showPageLoader, setShowPageLoader] = useState(false);

  const handleVideoEnd = () => {
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

