"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { prefersReducedMotion } from "@/lib/gsap";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const [hasChecked, setHasChecked] = useState(false);

  useGSAP(() => {
    // Show only once per user session or until localStorage cleared
    const seenIntro = localStorage.getItem("seenIntro");
    if (seenIntro || prefersReducedMotion()) {
      onComplete();
      return;
    }
    setHasChecked(true);

    const tl = gsap.timeline({
      onComplete: () => {
        localStorage.setItem("seenIntro", "true");
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.3,
          onComplete,
        });
      },
    });

    // Quick 0.7s max duration as requested
    tl.fromTo(
      iconRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" }
    );
    tl.to(iconRef.current, { scale: 1.1, opacity: 0, duration: 0.3, delay: 0.1 });

  }, { scope: containerRef, dependencies: [onComplete] });

  const handleSkip = () => {
    localStorage.setItem("seenIntro", "true");
    onComplete();
  };

  if (!hasChecked) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
    >
      <div
        ref={iconRef}
        className="w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center"
      >
        <span className="text-black text-4xl font-bold">LG</span>
      </div>

      <button
        onClick={handleSkip}
        className="absolute bottom-10 px-6 py-2 text-white/50 hover:text-white transition-colors text-sm underline underline-offset-4"
      >
        Skip Intro
      </button>
    </div>
  );
}
