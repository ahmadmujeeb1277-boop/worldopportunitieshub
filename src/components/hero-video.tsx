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
      <div className="absolute inset-0 bg-background/80" />
    </div>
  );
}
