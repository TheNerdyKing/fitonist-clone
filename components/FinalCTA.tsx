"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/gsap";
import { Flame, TrendingUp, Zap, Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  { text: "Unlimited campaign experiments", icon: Flame },
  { text: "Real-time performance tracking", icon: TrendingUp },
  { text: "Weekly strategy calls", icon: Zap },
];

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const deviceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      gsap.set([containerRef.current, contentRef.current?.children || [], deviceRef.current], { opacity: 1, y: 0, scale: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        gsap.fromTo(
          containerRef.current,
          { scale: 0.95, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );

        const elements = contentRef.current?.querySelectorAll(".cta-element");
        if (elements) {
          gsap.fromTo(
            elements,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.4,
              stagger: 0.05,
              ease: "power2.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        gsap.fromTo(
          deviceRef.current,
          { x: 30, opacity: 0, scale: 0.9 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      mm.add("(max-width: 767px)", () => {
        gsap.set([containerRef.current, deviceRef.current], { opacity: 1, y: 0, scale: 1 });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-dark-bg py-24 px-4 md:px-8"
    >
      <div
        ref={containerRef}
        className="max-w-6xl mx-auto bg-dark-card rounded-[3rem] border border-dark-border overflow-hidden relative min-h-[500px]"
      >
        <div className="relative z-10 grid md:grid-cols-2 gap-12 p-8 md:p-16 items-center">
          <div ref={contentRef}>
            <h2 className="cta-element text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Get unlimited growth experiments
            </h2>

            <ul className="space-y-4 mb-10">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <li key={index} className="cta-element flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-pastel-purple/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-pastel-purple" />
                    </div>
                    <span className="text-white text-lg">{benefit.text}</span>
                  </li>
                );
              })}
            </ul>

            <div className="cta-element flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-gray-100 transition-colors">
                Book a Strategy Call
              </button>
            </div>
          </div>

          <div ref={deviceRef} className="relative flex justify-center lg:justify-end">
            {/* Robust Phone Mock Restoration */}
            <div className="relative w-[280px] md:w-[320px] h-[550px] bg-black rounded-[3rem] border-8 border-gray-800 shadow-3xl overflow-hidden ring-4 ring-white/5">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-2xl z-20" /> {/* Speaker island */}
              <div className="absolute inset-0 bg-gradient-to-b from-dark-bg to-black p-6 pt-10">
                <div className="flex items-center justify-between mb-8">
                  <div className="w-8 h-8 bg-gradient-to-br from-pastel-purple to-pastel-blue rounded-lg" />
                  <span className="text-white/30 text-[10px] lowercase tracking-widest font-mono">luma_growth_v3</span>
                </div>

                <div className="space-y-6">
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <p className="text-white/40 text-[10px] uppercase tracking-wider mb-2">Conversion Value</p>
                    <div className="flex items-end gap-2">
                      <span className="text-white text-3xl font-bold tracking-tight">$42,910</span>
                      <span className="text-pastel-green text-xs font-semibold mb-1">+12.5%</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-white/5 rounded-2xl border border-white/5">
                      <p className="text-white/40 text-[10px] uppercase tracking-wider mb-1">ROAS</p>
                      <p className="text-white text-xl font-bold">4.8x</p>
                    </div>
                    <div className="p-3 bg-white/5 rounded-2xl border border-white/5">
                      <p className="text-white/40 text-[10px] uppercase tracking-wider mb-1">CTR</p>
                      <p className="text-white text-xl font-bold">5.2%</p>
                    </div>
                  </div>

                  <div className="flex items-end gap-1.5 h-16 pt-2">
                    {[40, 60, 50, 80, 70, 95, 85].map((h, i) => (
                      <div key={i} className="flex-1 bg-pastel-purple/40 rounded-t-[2px]" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </div>

                <button className="absolute bottom-6 left-6 right-6 py-3 bg-pastel-purple text-black text-sm font-bold rounded-xl shadow-lg shadow-pastel-purple/20">
                  Launch Campaign
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
