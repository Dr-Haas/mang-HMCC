"use client";

import { useState } from "react";
import { VideoLoader } from "@/components/VideoLoader";
import { HomePageContent } from "@/components/home/HomePageContent";

export default function Home() {
  const [showContent, setShowContent] = useState(false);

  const handleVideoEnd = () => {
    setShowContent(true);
  };

  return (
    <>
      {!showContent && <VideoLoader onVideoEnd={handleVideoEnd} />}
      <HomePageContent showContent={showContent} />
    </>
  );
}
