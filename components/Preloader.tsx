"use client";

import { useRef, useState, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { prefersReducedMotion } from "@/lib/gsap";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  // Use layout effect to synchronously check local storage before painting
  useLayoutEffect(() => {
    const seenIntro = localStorage.getItem("seenIntro");
    if (seenIntro || prefersReducedMotion()) {
      onComplete();
    } else {
      setShouldAnimate(true);
    }
  }, [onComplete]);

  useGSAP(() => {
    if (!shouldAnimate) return;

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

  }, { scope: containerRef, dependencies: [shouldAnimate, onComplete] });

  const handleSkip = () => {
    localStorage.setItem("seenIntro", "true");
    onComplete();
  };

  // Prevent flashing of preloader content before the layout effect fires
  if (!shouldAnimate) {
    return <div className="fixed inset-0 z-[100] bg-black" />; // Keep background black until unmounted
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
    >
      <div
        ref={iconRef}
        className="w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center"
      >
        <span className="text-black text-4xl font-bold">SX</span>
      </div>

      <button
        onClick={handleSkip}
        className="absolute bottom-10 px-6 py-2 text-white/50 hover:text-white transition-colors text-sm underline underline-offset-4"
      >
        דלג
      </button>
    </div>
  );
}
