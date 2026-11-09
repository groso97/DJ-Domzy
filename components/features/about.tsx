"use client";

import React from "react";
import Image from "next/image";
import { CheckCircle2, Award, Users, Clock, Sparkles, Music2, Heart, TreePine } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { useIntersectionObserver } from "@/hooks";

const highlights = [
  { icon: Award, text: "8+ godina profesionalnog iskustva", gradient: "from-primary to-accent" },
  { icon: Users, text: "Stalna interakcija s gostima", gradient: "from-accent to-secondary" },
  { icon: Clock, text: "Dinamično vođenje programa", gradient: "from-secondary to-primary" },
  { icon: CheckCircle2, text: "Energično do zadnjeg takta", gradient: "from-primary via-accent to-secondary" },
];

const skills = [
  { text: "Vjenčanja & romantične proslave", icon: Heart },
  { text: "Privatni eventi", icon: Sparkles },
  { text: "Korporativni eventi", icon: Users },
  { text: "Božićni domjenci", icon: TreePine },
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
                Moj glazbeni put započeo je još u srednjoškolskim danima, kada se rodila snažna povezanost s DJ pultom i glazbom. Strast sam dodatno usavršio na DJ akademiji (2016.), gdje sam postavio čvrste temelje za profesionalni razvoj i izgradio prepoznatljiv glazbeni pristup.
              </p>

              <p 
                className={`text-muted-foreground text-base sm:text-lg md:text-xl leading-relaxed ${
                  isSectionVisible ? 'animate-section-reveal' : 'opacity-0'
                }`}
                style={{ animationDelay: '0.4s' }}
              >
                Prva iskustva stjecao sam u manjim, intimnim okruženjima, gdje sam naučio koliko su detalji presudni – pravi trenutak, osjećaj za publiku i prilagodba svakom tipu događaja.
              </p>

              <p
                className={`text-muted-foreground text-base sm:text-lg md:text-xl leading-relaxed ${
                  isSectionVisible ? 'animate-section-reveal' : 'opacity-0'
                }`}
                style={{ animationDelay: '0.5s' }}
              >
                Danas sam član DJ agencije Resident Events, koja pod vodstvom DJ Shake okuplja iskusne DJ-eve, a svoje sam iskustvo dodatno obogatio nastupima u klubu Makina u Vodicama tijekom ljetne sezone. Rad u profesionalnom okruženju i nastupi pred različitom publikom dodatno su oblikovali moj glazbeni pristup i osjećaj za stvaranje prave atmosfere.
              </p>

              <p
                className={`text-muted-foreground text-base sm:text-lg md:text-xl leading-relaxed ${
                  isSectionVisible ? 'animate-section-reveal' : 'opacity-0'
                }`}
                style={{ animationDelay: '0.6s' }}
              >
                Danas je moj fokus usmjeren na privatne i korporativne evente, djevojačke i momačke večeri te vjenčanja.
              </p>

              <p
                className={`text-muted-foreground text-base sm:text-lg md:text-xl leading-relaxed ${
                  isSectionVisible ? 'animate-section-reveal' : 'opacity-0'
                }`}
                style={{ animationDelay: '0.7s' }}
              >
                Upravo su vjenčanja postala prostor u kojem spajam profesionalnost, energiju i emociju – stvarajući atmosferu koja traje od prvog plesa do posljednjeg takta.
              </p>

              <p 
                className={`text-muted-foreground text-base sm:text-lg md:text-xl leading-relaxed ${
                  isSectionVisible ? 'animate-section-reveal' : 'opacity-0'
                }`}
                style={{ animationDelay: '0.8s' }}
              >
                Moj cilj je da svaki event ima svoju priču, ritam i energiju koja se pamti dugo nakon što se posljednje svjetlo ugasi.
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

          {/* Image Side - right (public/dj-domza.png) */}
          <div className="relative order-1 lg:order-2">
            <div className="relative aspect-4/5 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10">
              <Image
                src="/dj-domza.png"
                alt="DJ Domza za mikserom u profesionalnoj pozadini"
                fill
                className="object-cover"
                priority={false}
                loading="lazy"
                quality={75}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
