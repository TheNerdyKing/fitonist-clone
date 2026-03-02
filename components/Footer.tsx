"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { prefersReducedMotion } from "@/lib/gsap";
import { Mail, Phone, MessageCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const footerLinks = {
  services: [
    { label: "ניהול רשתות חברתיות", href: "#services" },
    { label: "קידום ממומן במטא", href: "#services" },
    { label: "קידום ממומן בגוגל", href: "#services" },
    { label: "חבילת שיווק מלאה", href: "#services" },
  ],
  company: [
    { label: "המלצות", href: "#recommendations" },
    { label: "מי אנחנו", href: "#about" },
    { label: "צור קשר", href: "#contact" },
  ],
  legal: [
    { label: "מדיניות פרטיות", href: "#" },
    { label: "תנאי שימוש", href: "#" },
  ],
};

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) return;

    gsap.fromTo(
      pillRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      }
    );

  }, { scope: footerRef });

  return (
    <footer
      ref={footerRef}
      className="relative bg-[#050505] pt-16 pb-8 px-4 md:px-8 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        <div
          ref={pillRef}
          className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white/[0.02] rounded-3xl md:rounded-full px-8 py-6 border border-white/5 mb-24"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.3)]">
              <span className="text-black font-bold text-lg">SX</span>
            </div>
            <span className="text-white text-xl font-bold italic tracking-tight">הזמן שלך לצמוח.</span>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => window.open('https://wa.me/972552664456', '_blank')} className="px-8 py-4 bg-orange-500 text-black rounded-full font-bold hover:bg-orange-400 transition-all text-sm cursor-pointer">
              לייעוץ מקצועי
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20 bg-[#080808] p-10 rounded-[3rem] border border-white/[0.03]">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-black text-sm font-bold">SX</span>
              </div>
              <span className="text-white font-bold tracking-tight">STONIX</span>
            </div>
            <div className="text-white/40 text-sm leading-relaxed max-w-[200px] flex flex-col gap-2">
              <p dir="rtl">שדרות ההסתדרות 236, חיפה</p>
              <p dir="ltr" className="text-right">055-2664456</p>
              <p dir="ltr" className="text-right">a.s.mediagroup2023@gmail.com</p>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-6">שירותים</h4>
            <ul className="space-y-4">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/30 text-sm hover:text-orange-500 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-6">STONIX</h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/30 text-sm hover:text-orange-500 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-6">משפטי</h4>
            <ul className="space-y-4 mb-8">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/30 text-sm hover:text-orange-500 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3">
              <a href="mailto:a.s.mediagroup2023@gmail.com" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-orange-500/20 hover:text-orange-500 transition-all text-white/40">
                <Mail className="w-4 h-4" />
              </a>
              <a href="tel:0552664456" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-orange-500/20 hover:text-orange-500 transition-all text-white/40">
                <Phone className="w-4 h-4" />
              </a>
              <a href="https://wa.me/972552664456" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-orange-500/20 hover:text-orange-500 transition-all text-white/40">
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-[10px] uppercase font-bold tracking-[0.2em]">
            ©2025 STONIX. כל הזכויות שמורות.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <p className="text-white/20 text-[10px] uppercase font-bold tracking-[0.2em]">מערכות מאובטחות</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
