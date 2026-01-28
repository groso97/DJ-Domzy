"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CheckCircle2, Award, Users, Clock, Sparkles, Music2, Heart } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { useIntersectionObserver, useScrollPosition } from "@/hooks";

const highlights = [
  { icon: Award, text: "5+ godina profesionalnog iskustva", gradient: "from-primary to-accent" },
  { icon: Users, text: "Stalna interakcija s gostima", gradient: "from-accent to-secondary" },
  { icon: Clock, text: "Dinamično vođenje programa", gradient: "from-secondary to-primary" },
  { icon: CheckCircle2, text: "Energično do zadnjeg takta", gradient: "from-primary via-accent to-secondary" },
];

const skills = [
  { text: "Vjenčanja & romantične proslave", icon: Heart },
  { text: "Privatni eventi", icon: Sparkles },
  { text: "Korporativni eventi", icon: Users },
  { text: "Klubska i elektronska glazba", icon: Music2 },
  { text: "Retro & hitovi svih vremena", icon: Clock },
  { text: "Live remixevi i mashupovi", icon: Music2 },
];

export function About() {
  const [sectionRef, isSectionVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.2, triggerOnce: true });
  const imageRef = useRef<HTMLDivElement>(null);
  const { y: scrollY } = useScrollPosition();
  const [imageOffset, setImageOffset] = useState(0);

  // Parallax effect for image
  useEffect(() => {
    if (!imageRef.current || !isSectionVisible) return;
    
    const rect = imageRef.current.getBoundingClientRect();
    const elementTop = rect.top + scrollY;
    const elementCenter = elementTop + rect.height / 2;
    const viewportCenter = scrollY + window.innerHeight / 2;
    const distance = viewportCenter - elementCenter;
    const parallaxSpeed = 0.1;
    
    setImageOffset(distance * parallaxSpeed);
  }, [scrollY, isSectionVisible]);

  return (
    <section ref={sectionRef} id="o-meni" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#A855F7]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#A855F7]/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid gap-12 lg:gap-16 lg:grid-cols-2 items-center">
          {/* Image Side - Enhanced with parallax and scale animation */}
          <div ref={imageRef} className="relative group optimize-animation">
            <div 
              className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10 animate-image-scale-rotate"
              style={{
                transform: `translateY(${imageOffset}px)`,
                willChange: 'transform'
              }}
            >
              {/* DJ Domzy Image */}
              <Image
                src="/dj-domzy.png"
                alt="DJ Domza - Profesionalni DJ"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#A855F7]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Decorative glow elements */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#A855F7]/30 rounded-full blur-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-[#A855F7]/20 rounded-full blur-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Experience Badge - Modernized with pulsing glow */}
            <div className="absolute -bottom-8 -right-8 md:right-8 bg-gradient-to-br from-[#A855F7]/90 to-[#A855F7]/70 backdrop-blur-md rounded-2xl p-5 shadow-2xl shadow-[#A855F7]/30 ring-1 ring-white/20 transform group-hover:scale-105 transition-transform duration-300 animate-highlight-pulse">
              <div className="text-4xl font-bold text-white font-display">5+</div>
              <div className="text-sm text-white/90 font-medium mt-1">Godina iskustva</div>
            </div>
          </div>

          {/* Content Side - Enhanced with stagger animations */}
          <div className="space-y-8">
            <SectionHeading
              title="O meni"
              centered={false}
              className="mb-8"
            />

            {/* Main Text - Updated with stagger fade-in */}
            <div className="space-y-6">
              <p 
                className={`text-muted-foreground text-lg leading-relaxed font-serif ${
                  isSectionVisible ? 'animate-section-reveal' : 'opacity-0'
                }`}
                style={{ animationDelay: '0.2s' }}
              >
                <span className="text-[#A855F7] font-semibold">DJ Domza</span> ima više od 5 godina iskustva u nastupima na svadbama, privatnim i korporativnim eventima. Svakom eventu pristupa opušteno, ali profesionalno, s jasnim ciljem – stvoriti odličnu atmosferu u kojoj se svi gosti osjećaju dobro i zabavljaju bez prestanka.
              </p>

              <p 
                className={`text-muted-foreground leading-relaxed font-serif ${
                  isSectionVisible ? 'animate-section-reveal' : 'opacity-0'
                }`}
                style={{ animationDelay: '0.4s' }}
              >
                Kroz stalnu interakciju s gostima i dobar osjećaj za publiku, glazbom povezuje različite generacije i prati energiju večeri u svakom trenutku. Uz sigurno, dinamično i energično vođenje programa, DJ Domza vodi cijelu večer od prve pjesme do zadnjeg takta, držeći plesni podij živim do samog kraja.
              </p>
            </div>

            {/* Highlights Grid - Modernized with checkmark bounce */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
              {highlights.map((item, index) => (
                <div 
                  key={item.text} 
                  className={`group relative overflow-hidden rounded-xl p-4 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border border-white/10 hover:border-[#A855F7]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#A855F7]/10 optimize-animation ${
                    isSectionVisible ? 'animate-section-reveal' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                >
                  {/* Gradient background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  
                  <div className="relative flex items-start gap-3">
                    <div className="relative">
                      <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-20 group-hover:opacity-40 blur-xl transition-opacity duration-300`} />
                      <item.icon 
                        className={`h-6 w-6 text-[#A855F7] shrink-0 mt-0.5 relative z-10 group-hover:scale-110 transition-transform duration-300 ${
                          isSectionVisible ? 'animate-checkmark-bounce' : ''
                        }`}
                        style={{ animationDelay: `${0.6 + index * 0.1 + 0.2}s` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-foreground leading-relaxed">{item.text}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Skills - Modernized */}
            <div className="pt-6">
              <h3 
                className={`font-display text-xl font-semibold mb-4 text-foreground ${
                  isSectionVisible ? 'animate-section-reveal' : 'opacity-0'
                }`}
                style={{ animationDelay: '1s' }}
              >
                Specijalizacije:
              </h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <div
                    key={skill.text}
                    className={`group relative overflow-hidden px-4 py-2.5 rounded-full bg-gradient-to-r from-[#A855F7]/10 to-[#A855F7]/5 border border-[#A855F7]/20 hover:border-[#A855F7]/40 transition-all duration-300 hover:shadow-md hover:shadow-[#A855F7]/20 optimize-animation ${
                      isSectionVisible ? 'animate-section-reveal' : 'opacity-0'
                    }`}
                    style={{ animationDelay: `${1.2 + index * 0.05}s` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#A855F7]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative flex items-center gap-2">
                      <skill.icon className="h-4 w-4 text-[#A855F7] group-hover:scale-110 transition-transform duration-300" />
                      <span className="text-sm font-medium text-foreground group-hover:text-[#A855F7] transition-colors duration-300">
                        {skill.text}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
