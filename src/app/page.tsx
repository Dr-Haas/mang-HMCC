"use client";

import { useState } from "react";
import { VideoLoader } from "@/components/VideoLoader";
import { HomePageContent } from "@/components/home/HomePageContent";

const HOME_LOADER_SEEN_KEY = "hmcc_home_loader_seen";

export default function Home() {
  const [showContent, setShowContent] = useState<boolean>(() => {
    if (typeof window === "undefined") {
      return false;
    }
    return window.sessionStorage.getItem(HOME_LOADER_SEEN_KEY) === "1";
  });

  const handleVideoEnd = () => {
    window.sessionStorage.setItem(HOME_LOADER_SEEN_KEY, "1");
    setShowContent(true);
  };

  return (
    <>
      {!showContent && <VideoLoader onVideoEnd={handleVideoEnd} />}
      <HomePageContent showContent={showContent} />
    </>
  );
}
