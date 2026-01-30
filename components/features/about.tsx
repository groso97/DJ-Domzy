"use client";

import React from "react";
import Image from "next/image";
import { CheckCircle2, Award, Users, Clock, Sparkles, Music2, Heart } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { useIntersectionObserver } from "@/hooks";

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

  return (
    <section ref={sectionRef} id="o-meni" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#2563EB]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#2563EB]/5 rounded-full blur-3xl" />
      </div>

      <div className="content-width relative z-10">
        <div className="grid gap-12 lg:gap-16 lg:grid-cols-2 items-center">
          {/* Content Side - left */}
          <div className="space-y-8 order-2 lg:order-1">
            <SectionHeading
              badge="O meni"
              title="Upoznajte DJ Domzu"
              centered={false}
              className="mb-8"
            />

            {/* Main Text */}
            <div className="space-y-4">
              <p 
                className={`text-muted-foreground text-base sm:text-lg md:text-xl leading-relaxed ${
                  isSectionVisible ? 'animate-section-reveal' : 'opacity-0'
                }`}
                style={{ animationDelay: '0.2s' }}
              >
                <span className="text-primary font-semibold">DJ Domza</span> ima više od 5 godina iskustva u nastupima na svadbama, privatnim i korporativnim eventima. Svakom eventu pristupa opušteno, ali profesionalno, s jasnim ciljem – stvoriti odličnu atmosferu u kojoj se svi gosti osjećaju dobro i zabavljaju bez prestanka.
              </p>

              <p 
                className={`text-muted-foreground text-base sm:text-lg md:text-xl leading-relaxed ${
                  isSectionVisible ? 'animate-section-reveal' : 'opacity-0'
                }`}
                style={{ animationDelay: '0.4s' }}
              >
                Kroz stalnu interakciju s gostima i dobar osjećaj za publiku, glazbom povezuje različite generacije i prati energiju večeri u svakom trenutku. Uz sigurno, dinamično i energično vođenje programa, DJ Domza vodi cijelu večer od prve pjesme do zadnjeg takta, držeći plesni podij živim do samog kraja.
              </p>
            </div>

            {/* Highlights Grid - smaller, pulsating glow */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-8">
              {highlights.map((item, index) => (
                <div 
                  key={item.text} 
                  className={`group relative rounded-xl border border-primary/30 bg-[#0C0F15]/80 px-4 py-3 badge-glow-shadow ${
                    isSectionVisible ? 'animate-section-reveal' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                >
                  <div className="relative flex items-center gap-3">
                    <item.icon className="h-5 w-5 text-primary shrink-0" />
                    <span className="text-sm font-medium text-foreground leading-tight">{item.text}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Skills - smaller pills */}
            <div className="pt-8">
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
                    className={`group relative overflow-hidden px-4 py-2 rounded-full border border-primary/30 bg-[#0C0F15]/80 badge-glow-shadow text-foreground hover:border-primary/50 transition-colors ${
                      isSectionVisible ? 'animate-section-reveal' : 'opacity-0'
                    }`}
                    style={{ animationDelay: `${1.2 + index * 0.05}s` }}
                  >
                    <div className="relative flex items-center gap-2">
                      <skill.icon className="h-4 w-4 text-primary shrink-0" />
                      <span className="text-sm font-medium group-hover:text-primary transition-colors">
                        {skill.text}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Image Side - right */}
          <div className="relative group order-1 lg:order-2">
            <div className="relative aspect-4/5 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10">
              <Image
                src="/dj-domza.png"
                alt="DJ Domza"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#2563EB]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#2563EB]/30 rounded-full blur-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-[#2563EB]/20 rounded-full blur-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
