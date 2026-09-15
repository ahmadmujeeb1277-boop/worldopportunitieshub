"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const POSTER_SRC = "/video/students-hero-poster.jpg";

export function HeroVideo() {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const isWideEnough = window.matchMedia("(min-width: 768px)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setShowVideo(isWideEnough && !prefersReducedMotion);
  }, []);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {showVideo ? (
        <video
          className="h-full w-full object-cover"
          poster={POSTER_SRC}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src="/video/students-hero.mp4" type="video/mp4" />
        </video>
      ) : (
        <Image
          src={POSTER_SRC}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      )}
      {/* Scrim concentrated behind the headline/subtext band, fading to
          near-transparent at the top and bottom edges so the video itself
          stays the dominant visual — the search bar and pills below have
          their own solid backgrounds and don't need help from this. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.42) 24%, rgba(255,255,255,0.42) 56%, rgba(255,255,255,0) 90%)",
        }}
      />
    </div>
  );
}
