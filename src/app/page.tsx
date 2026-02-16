"use client";

import { useState, useEffect } from "react";
import { VideoLoader } from "@/components/VideoLoader";
import { HomePageContent } from "@/components/home/HomePageContent";

export default function Home() {
  const [showContent, setShowContent] = useState(false);
  const [hasSeenVideo, setHasSeenVideo] = useState(false);

  // Vérifier si l'utilisateur a déjà vu la vidéo (localStorage)
  useEffect(() => {
    const seen = localStorage.getItem("hmcc-video-seen");
    if (seen === "true") {
      setHasSeenVideo(true);
      setShowContent(true);
    }
  }, []);

  const handleVideoEnd = () => {
    localStorage.setItem("hmcc-video-seen", "true");
    setHasSeenVideo(true);
    setShowContent(true);
  };

  return (
    <>
      {!hasSeenVideo && <VideoLoader onVideoEnd={handleVideoEnd} />}
      <HomePageContent showContent={showContent || hasSeenVideo} />
    </>
  );
}
