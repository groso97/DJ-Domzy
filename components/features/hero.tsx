"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { Play, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCounter, useIntersectionObserver } from "@/hooks";

export function Hero() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [ref500, isVisible500] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.2, triggerOnce: true });
  const [ref10, isVisible10] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.2, triggerOnce: true });
  const [ref100, isVisible100] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.2, triggerOnce: true });

  const count500 = useCounter(isVisible500 ? 500 : 0, 0, { duration: 2000, startDelay: 0 });
  const count10 = useCounter(isVisible10 ? 10 : 0, 0, { duration: 2000, startDelay: 0 });
  const count100 = useCounter(isVisible100 ? 100 : 0, 0, { duration: 2000, startDelay: 0 });

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      
      {/* Floating Elements - Enhanced with floating animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/30 rounded-full blur-3xl animate-floating-geometric" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/30 rounded-full blur-3xl animate-floating-geometric" style={{ animationDelay: "-3s" }} />
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-secondary/30 rounded-full blur-3xl animate-floating-geometric" style={{ animationDelay: "-1.5s" }} />
        <div className="absolute top-3/4 left-1/3 w-72 h-72 bg-primary/25 rounded-full blur-3xl animate-floating-geometric" style={{ animationDelay: "-2.5s" }} />
      </div>

      {/* Pulsing Sound Waves */}
      {[...Array(4)].map((_, i) => (
        <div
          key={`wave-${i}`}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#A855F7]/15 pointer-events-none"
          style={{
            width: `${200 + i * 120}px`,
            height: `${200 + i * 120}px`,
            animation: `sound-wave ${3 + i * 0.5}s ease-out infinite`,
            animationDelay: `${i * 0.4}s`
          }}
        />
      ))}

      {/* Audio Waveform Equalizer */}
      <div className="absolute left-[8%] top-1/2 -translate-y-1/2 gap-1.5 items-end pointer-events-none z-0 hidden md:flex">
        {[1, 0.7, 0.9, 0.6, 0.8, 0.75, 0.65, 0.85].map((height, i) => (
          <div 
            key={`bar-${i}`}
            className="w-1.5 bg-[#A855F7] rounded-t opacity-60 optimize-animation"
            style={{ 
              height: `${height * 50}px`,
              animation: `audio-visualizer ${1 + i * 0.15}s ease-in-out infinite`,
              animationDelay: `${i * 0.1}s`
            }}
          />
        ))}
      </div>

      {/* Vinyl Record */}
      <div className="absolute right-[6%] top-1/2 -translate-y-1/2 opacity-12 pointer-events-none z-0 hidden lg:block">
        <div className="relative w-64 h-64 rounded-full bg-gradient-radial from-[#A855F7]/20 via-[#A855F7]/10 to-transparent border-4 border-[#A855F7]/20 animate-vinyl-spin optimize-animation">
          {/* Groove lines */}
          <div className="absolute inset-0 rounded-full" style={{
            backgroundImage: `repeating-conic-gradient(
              from 0deg at 50% 50%,
              transparent 0deg 2deg,
              rgba(168, 85, 247, 0.1) 2deg 4deg
            )`
          }} />
          {/* Center circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#0A111F] border-2 border-[#A855F7]/30" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#A855F7]/20" />
        </div>
      </div>

      {/* Geometric Shapes - Enhanced with floating animation */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Hexagon */}
        <div className="absolute top-[15%] right-[12%] w-20 h-20 opacity-10 optimize-animation">
          <svg viewBox="0 0 100 100" className="w-full h-full text-[#A855F7] animate-floating-geometric" style={{ animationDelay: "-1s" }}>
            <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" fill="currentColor" />
          </svg>
        </div>
        {/* Triangle */}
        <div className="absolute bottom-[20%] left-[15%] w-16 h-16 opacity-10 optimize-animation">
          <svg viewBox="0 0 100 100" className="w-full h-full text-[#A855F7] animate-floating-geometric" style={{ animationDelay: "-2s" }}>
            <polygon points="50,10 90,90 10,90" fill="currentColor" />
          </svg>
        </div>
        {/* Small hexagon */}
        <div className="absolute top-[60%] right-[20%] w-12 h-12 opacity-8 optimize-animation">
          <svg viewBox="0 0 100 100" className="w-full h-full text-[#A855F7] animate-floating-geometric" style={{ animationDelay: "-0.5s" }}>
            <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" fill="currentColor" />
          </svg>
        </div>
      </div>

      {/* Grid Pattern - Enhanced */}
      <div 
        className="absolute inset-0 opacity-[0.06] pointer-events-none z-0"
        style={{
          backgroundImage: `linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading - Enhanced fade-in with blur and scale */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-hero-title optimize-animation">
            <span className="block text-foreground">Glazba koja</span>
            <span className="block mt-2">
              <span className="gradient-text">pokreće emocije</span>
            </span>
          </h1>

          {/* Subheading - Fade-in with delay */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-hero-subtitle">
            Profesionalni DJ s iskustvom od preko 10 godina. Specijaliziram se za 
            vjenčanja, rođendane, korporativne evente i klubove. 
            <span className="text-[#A855F7] font-medium"> Vaša zabava je moja strast.</span>
          </p>

          {/* CTA Buttons - Slide-up animation */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-hero-button">
            <Button asChild size="xl" variant="glow" className="ripple-effect hover-scale">
              <Link href="#kontakt" className="gap-3">
                <Calendar className="h-5 w-5" />
                Zatraži ponudu
              </Link>
            </Button>
            <Button asChild size="xl" variant="outline" className="ripple-effect hover-scale">
              <Link href="#kontakt" className="gap-3">
                <Play className="h-5 w-5" />
                Pogledaj radove
              </Link>
            </Button>
          </div>

          {/* Stats - Counter animation */}
          <div ref={statsRef} className="grid grid-cols-3 gap-4 sm:gap-8 mt-16 pt-8 border-t border-border/50">
            <div ref={ref500 as React.RefObject<HTMLDivElement>} className="text-center animate-section-reveal" style={{ animationDelay: "0.6s" }}>
              <div className="text-3xl sm:text-4xl font-bold gradient-text">{Math.round(count500)}+</div>
              <div className="text-sm sm:text-base text-muted-foreground mt-1">Evenata</div>
            </div>
            <div ref={ref10 as React.RefObject<HTMLDivElement>} className="text-center animate-section-reveal" style={{ animationDelay: "0.7s" }}>
              <div className="text-3xl sm:text-4xl font-bold gradient-text">{Math.round(count10)}+</div>
              <div className="text-sm sm:text-base text-muted-foreground mt-1">Godina iskustva</div>
            </div>
            <div ref={ref100 as React.RefObject<HTMLDivElement>} className="text-center animate-section-reveal" style={{ animationDelay: "0.8s" }}>
              <div className="text-3xl sm:text-4xl font-bold gradient-text">{Math.round(count100)}%</div>
              <div className="text-sm sm:text-base text-muted-foreground mt-1">Zadovoljstvo</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
