"use client";

import React from "react";
import { SectionHeading } from "@/components/shared/section-heading";
import { useIntersectionObserver } from "@/hooks";

const mixes = [
  {
    id: "domaci-party-hitovi",
    title: "Domaći party hitovi",
    description:
      "Selekcija domaćih hitova koja garantira vrhunsku atmosferu. U miksu sam povezao izvođače zabavne glazbe koja je idealna za vjenčanja i ostale proslave kako bi se održala dobra energija na podiju.",
    src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A2288033135&color=%232361ea&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true",
  },
  {
    id: "all-time-hits-house",
    title: "All time hits — House edition",
    description:
      "Savršena kombinacija bezvremenskih stranih hitova i modernog house zvuka.",
    src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A2288031467&color=%232361ea&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true",
  },
] as const;

export function Mixes() {
  const [sectionRef, isSectionVisible] = useIntersectionObserver<HTMLElement>({
    threshold: 0.15,
    triggerOnce: true,
  });

  return (
    <section
      ref={sectionRef}
      id="mixevi"
      className="py-24 md:py-32 relative overflow-hidden"
    >
      {/* Decorative background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="content-width relative z-10">
        <SectionHeading
          badge="Mixevi"
          title="DJ Mixevi"
          subtitle="Kad si već tu, stisni play i uživaj u mixevima. Ovo su odabrani setovi koji daju uvid u atmosferu i energiju na podiju — samo stisni play i pusti glazbu da govori."
          centered={false}
        />

        <div className="flex flex-col gap-8 md:gap-10">
          {mixes.map((mix, index) => (
            <div
              key={mix.id}
              className={`group relative rounded-2xl border border-primary/20 bg-[#0C0F15]/80 overflow-hidden transition-all duration-500 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/15 badge-glow-shadow ${
                isSectionVisible ? "animate-card-fade-left" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 0.25}s` }}
            >
              {/* Top accent line */}
              <div className="h-0.5 w-full bg-linear-to-r from-transparent via-primary/60 to-transparent" />

              <div className="p-5 md:p-8 space-y-5">
                {/* Title + description */}
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300">
                    {mix.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {mix.description}
                  </p>
                </div>

                {/* SoundCloud visual embed */}
                <div className="rounded-xl overflow-hidden ring-1 ring-white/5">
                  <iframe
                    width="100%"
                    height="166"
                    scrolling="no"
                    frameBorder="no"
                    allow="autoplay"
                    src={mix.src}
                    title={mix.title}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
