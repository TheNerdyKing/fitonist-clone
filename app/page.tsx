"use client";

import { useState, useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "@/lib/lenis";
import Preloader from "@/components/Preloader";
import Hero from "@/components/Hero";
import GoalStack from "@/components/GoalStack";
import ChooseChannel from "@/components/ChooseChannel";
import ChannelScroller from "@/components/ChannelScroller";
import ProgressRing from "@/components/ProgressRing";
import BentoCards from "@/components/BentoCards";
import Testimonials from "@/components/Testimonials";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const lenisRef = useLenis();

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  const handlePreloaderComplete = () => {
    setIsLoading(false);

    // Give double refresh for security on layout stability
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    // Specifically wait for all fonts to load to prevent layout shifts on Vercel
    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }
  };

  return (
    <main className="relative">
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}

      <div className={isLoading ? "opacity-0" : "opacity-100 transition-opacity duration-500"}>
        <Hero />
        <GoalStack />
        <ChooseChannel />
        <ChannelScroller />
        <ProgressRing />
        <BentoCards />
        <Testimonials />
        <FinalCTA />
        <Footer />
      </div>
    </main>
  );
}
