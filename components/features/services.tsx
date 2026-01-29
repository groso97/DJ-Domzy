"use client";

import React from "react";
import { Heart, Cake, Building2, Music4, type LucideIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeading } from "@/components/shared/section-heading";
import { services } from "@/config/constants";
import { useIntersectionObserver } from "@/hooks";

export function Services() {
  const [sectionRef, isSectionVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.2, triggerOnce: true });

  return (
    <section ref={sectionRef} id="usluge" className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
        <SectionHeading
          badge="Usluge"
          title="Moje usluge"
          subtitle="Bez obzira na vrstu događaja, pružam profesionalnu glazbenu pratnju prilagođenu vašim željama"
          centered={false}
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon];
            return (
              <Card
                key={service.id}
                className={`group relative optimize-animation transition-transform duration-300 hover:-translate-y-3 hover:shadow-xl hover:shadow-primary/20 ${
                  isSectionVisible ? 'animate-card-fade-left' : 'opacity-0'
                }`}
                style={{ 
                  animationDelay: `${index * 0.15}s`,
                  willChange: 'transform, opacity'
                }}
              >
                
                <CardHeader className="relative p-6 md:p-8">
                  <div 
                    className={`mb-5 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-white shadow-lg shadow-primary/25 group-hover:shadow-xl group-hover:shadow-primary/40 transition-all duration-300 group-hover:scale-110 optimize-animation ${
                      isSectionVisible ? 'animate-icon-bounce' : ''
                    }`}
                    style={{ animationDelay: `${index * 0.15 + 0.2}s` }}
                  >
                    <Icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-2xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="relative px-6 md:px-8 pb-6 md:pb-8">
                  <CardDescription className="text-base md:text-lg leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
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
