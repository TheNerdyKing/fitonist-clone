"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/gsap";

gsap.registerPlugin(ScrollTrigger);

export default function ChooseChannel() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sticker1Ref = useRef<HTMLDivElement>(null);
  const sticker2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headlineRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        sticker1Ref.current,
        { scale: 0, rotation: -30, opacity: 0 },
        {
          scale: 1,
          rotation: -8,
          opacity: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        sticker2Ref.current,
        { scale: 0, rotation: 30, opacity: 0 },
        {
          scale: 1,
          rotation: 5,
          opacity: 1,
          duration: 0.6,
          delay: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[50vh] bg-white py-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <p className="text-gray-500 text-sm uppercase tracking-wider mb-4">
          What&apos;s your preferred growth channel?
        </p>

        <div className="relative">
          <h2
            ref={headlineRef}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-black opacity-0"
          >
            Choose your
            <br />
            channel
          </h2>

          <div
            ref={sticker1Ref}
            className="absolute top-0 right-[10%] md:right-[25%] px-6 py-3 bg-pastel-purple rounded-2xl shadow-lg opacity-0 z-20"
            style={{ transform: "rotate(-8deg)" }}
          >
            <span className="text-black font-semibold text-lg">SEO & Content</span>
          </div>

          <div
            ref={sticker2Ref}
            className="absolute top-16 right-[5%] md:right-[15%] px-6 py-3 bg-pastel-blue rounded-2xl shadow-lg opacity-0 z-20"
            style={{ transform: "rotate(5deg)" }}
          >
            <span className="text-black font-semibold text-lg">Paid Ads</span>
          </div>

          <div
            className="absolute -bottom-10 left-[5%] px-6 py-3 bg-pastel-green rounded-2xl shadow-lg z-20 hidden md:block"
            style={{ transform: "rotate(-5deg)" }}
          >
            <span className="text-black font-semibold text-lg">CRO & Funnels</span>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-24">
            {[
              {
                title: "Inbound Marketing",
                desc: "Drive traffic that actually wants to buy your product.",
                color: "bg-pastel-blue/10",
              },
              {
                title: "Scale Paid Channels",
                desc: "High ROAS campaigns on Google, Meta, and TikTok.",
                color: "bg-pastel-purple/10",
              },
              {
                title: "Conversion Design",
                desc: "Landing pages designed to maximize your lead volume.",
                color: "bg-pastel-green/10",
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`p-10 rounded-[2.5rem] ${item.color} border border-black/5 hover:border-black/10 transition-colors`}
              >
                <h4 className="text-2xl font-bold text-black mb-4">{item.title}</h4>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
