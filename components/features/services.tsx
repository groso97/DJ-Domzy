"use client";

import React from "react";
import { Heart, Cake, Building2, Music4, type LucideIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeading } from "@/components/shared/section-heading";
import { services } from "@/config/constants";
import { useIntersectionObserver } from "@/hooks";

export function Services() {
  const [sectionRef, isSectionVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.2, triggerOnce: true });
  const [textRef, isTextVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.2, triggerOnce: true });

  return (
    <section ref={sectionRef} id="usluge" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Moje usluge"
          subtitle="Bez obzira na vrstu događaja, pružam profesionalnu glazbenu pratnju prilagođenu vašim željama"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon];
            return (
              <Card
                key={service.id}
                className={`group relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover-lift optimize-animation ${
                  isSectionVisible ? 'animate-card-fade-left' : 'opacity-0'
                }`}
                style={{ 
                  animationDelay: `${index * 0.15}s`,
                  willChange: 'transform, opacity'
                }}
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <CardHeader className="relative">
                  <div 
                    className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-white shadow-lg shadow-primary/25 group-hover:shadow-xl group-hover:shadow-primary/40 transition-all duration-300 group-hover:scale-110 optimize-animation ${
                      isSectionVisible ? 'animate-icon-bounce' : ''
                    }`}
                    style={{ animationDelay: `${index * 0.15 + 0.2}s` }}
                  >
                    <Icon className="h-7 w-7" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <CardDescription className="text-base leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional info - Slide-up animation */}
        <div 
          ref={textRef as React.RefObject<HTMLDivElement>}
          className={`mt-12 text-center ${
            isTextVisible ? 'animate-section-reveal' : 'opacity-0'
          }`}
          style={{ animationDelay: '0.8s' }}
        >
          <p className="text-muted-foreground">
            Sve usluge uključuju:{" "}
            <span className="text-foreground font-medium">
              profesionalnu DJ opremu, rasvjetu i konzultacije prije događaja
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

const iconMap: Record<string, LucideIcon> = {
  Heart,
  Cake,
  Building2,
  Music4,
};
