"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Phone, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/constants";
import { useIntersectionObserver } from "@/hooks";

export function CTA() {
  const [sectionRef, isSectionVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.2, triggerOnce: true });
  const [displayedText, setDisplayedText] = useState("");
  const fullText = "Spremni za nezaboravnu zabavu?";
  const textRef = useRef(0);

  // Typewriter effect
  useEffect(() => {
    if (!isSectionVisible) return;

    const interval = setInterval(() => {
      if (textRef.current < fullText.length) {
        setDisplayedText(fullText.slice(0, textRef.current + 1));
        textRef.current += 1;
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isSectionVisible]);

  // Particle effect
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    delay: i * 0.1,
    x: Math.random() * 100,
    y: Math.random() * 100,
  }));

  return (
    <section ref={sectionRef} className="py-20 md:py-28 relative overflow-hidden">
      {/* Particle Background */}
      {isSectionVisible && particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 bg-[#A855F7] rounded-full opacity-30 pointer-events-none optimize-animation"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animation: `particle-float-random 8s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white">
          {/* Title with typewriter effect */}
          <h2 
            className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-6 ${
              isSectionVisible ? 'animate-section-reveal' : 'opacity-0'
            }`}
            style={{ animationDelay: '0.2s' }}
          >
            {displayedText}
            <span className="animate-pulse">|</span>
          </h2>

          {/* Subtitle with wave animation */}
          <p 
            className={`text-lg sm:text-xl text-white/90 mb-10 max-w-2xl mx-auto ${
              isSectionVisible ? 'animate-section-reveal' : 'opacity-0'
            }`}
            style={{ animationDelay: '0.4s' }}
          >
            Kontaktirajte me danas i osigurajte termin za svoj događaj. 
            Zajedno ćemo stvoriti savršenu glazbenu atmosferu!
          </p>

          {/* Buttons with gradient animation and pulsing shadow */}
          <div 
            className={`flex flex-col sm:flex-row gap-4 justify-center ${
              isSectionVisible ? 'animate-section-reveal' : 'opacity-0'
            }`}
            style={{ animationDelay: '0.6s' }}
          >
            <Button
              asChild
              size="xl"
              className="button-gradient-animate hover-scale ripple-effect relative overflow-hidden animate-button-pulse-shadow"
            >
              <Link href="#kontakt" className="gap-3 relative z-10">
                <Calendar className="h-5 w-5" />
                Zatraži ponudu
              </Link>
            </Button>
            <Button
              asChild
              size="xl"
              variant="outline"
              className="border-white text-white hover:bg-white/10 bg-transparent hover-scale ripple-effect"
            >
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                className="gap-3"
              >
                <Phone className="h-5 w-5" />
                Nazovi odmah
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
