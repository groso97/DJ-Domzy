"use client";

import React, { useRef } from "react";
import { Phone, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCounter, useIntersectionObserver } from "@/hooks";
import { siteConfig } from "@/config/constants";

export function Hero() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [ref500, isVisible50] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.2, triggerOnce: true });
  const [ref10, isVisible8] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.2, triggerOnce: true });
  const [ref100, isVisible100] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.2, triggerOnce: true });

  const count50 = useCounter(isVisible50 ? 50 : 0, 0, { duration: 2000, startDelay: 0 });
  const count8 = useCounter(isVisible8 ? 8 : 0, 0, { duration: 2000, startDelay: 0 });
  const count100 = useCounter(isVisible100 ? 100 : 0, 0, { duration: 2000, startDelay: 0 });

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 md:pt-32 pb-20 md:pb-28">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/hero-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* Dark overlay #0C0F15 – no blue tint */}
      <div 
        className="absolute inset-0 z-[1]"
        style={{
          background: "linear-gradient(180deg, rgba(12, 15, 21, 0.82) 0%, rgba(12, 15, 21, 0.90) 50%, rgba(12, 15, 21, 0.96) 100%)",
        }}
      />

      <div className="content-width relative z-10 text-center mx-auto px-4">
          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 animate-hero-title leading-[1.1] drop-shadow-lg">
            <span className="block text-white">Glazba koja</span>
            <span className="block mt-3">
              <span className="gradient-text" style={{ textShadow: "0 2px 20px rgba(37, 99, 235, 0.5)" }}>pokreće emocije</span>
            </span>
          </h1>
          {/* Subheading */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 animate-hero-subtitle leading-relaxed drop-shadow-md">
          Vi planirate događaj, ja gradim atmosferu! Sa više od 8 godina iskustva stvaram energiju i glazbenu priču koja vaš event podiže na višu razinu.
          </p>

          {/* CTA Buttons - Slide-up animation */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-hero-button">
            <Button asChild size="xl" variant="glow" className="ripple-effect hover-scale">
              <a href="#kontakt" className="gap-3 flex items-center">
                <Calendar className="h-5 w-5" />
                Zatraži ponudu
              </a>
            </Button>
            <Button
              asChild
              size="xl"
              variant="outline"
              className="border-white text-white bg-transparent hover:bg-transparent hover:border-primary hover:text-primary [&:hover_svg]:text-primary hover-scale ripple-effect"
            >
              <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`} className="gap-3 flex items-center">
                <Phone className="h-5 w-5" />
                Nazovi odmah
              </a>
            </Button>
          </div>

          {/* Stats - Counter animation */}
          <div ref={statsRef} className="grid grid-cols-3 gap-6 sm:gap-10 mt-16 pt-10 border-t border-white/20 max-w-3xl mx-auto animate-section-reveal" style={{ animationDelay: "0.6s" }}>
            <div ref={ref500 as React.RefObject<HTMLDivElement>} className="text-center">
              <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-white drop-shadow-md">{Math.round(count50)}+</div>
              <div className="text-sm sm:text-base md:text-lg text-gray-400 mt-2">Evenata</div>
            </div>
            <div ref={ref10 as React.RefObject<HTMLDivElement>} className="text-center">
              <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-white drop-shadow-md">{Math.round(count8)}+</div>
              <div className="text-sm sm:text-base md:text-lg text-gray-400 mt-2">Godina iskustva</div>
            </div>
            <div ref={ref100 as React.RefObject<HTMLDivElement>} className="text-center">
              <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-white drop-shadow-md">{Math.round(count100)}%</div>
              <div className="text-sm sm:text-base md:text-lg text-gray-400 mt-2">Posvećenost</div>
            </div>
          </div>
      </div>
    </section>
  );
}
