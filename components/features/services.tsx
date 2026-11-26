"use client";

import React from "react";
import Link from "next/link";
import {
  Heart,
  Cake,
  Building2,
  Sparkles,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SectionHeading } from "@/components/shared/section-heading";
import { services } from "@/config/constants";
import { landingPages } from "@/config/landing-pages";
import { useIntersectionObserver } from "@/hooks";

export function Services() {
  const [sectionRef, isSectionVisible] = useIntersectionObserver<HTMLElement>({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section
      ref={sectionRef}
      id="usluge"
      className="pt-24 md:pt-32 pb-8 md:pb-12"
    >
      <div className="content-width">
        <SectionHeading
          badge="Usluge"
          title="Moje usluge"
          subtitle="Bez obzira na vrstu događaja, pružam profesionalnu glazbenu podršku prilagođenu vašim željama"
          centered={false}
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon];
            return (
              <Card
                key={service.id}
                className={`group relative transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/25 ${
                  isSectionVisible ? "animate-card-fade-left" : "opacity-0"
                }`}
                style={{
                  animationDelay: `${index * 0.15}s`,
                }}
              >
                <CardHeader className="relative p-6 md:p-8">
                  <div className="mb-6 inline-flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-xl bg-linear-to-br from-primary to-accent text-white shadow-lg shadow-primary/25 group-hover:shadow-xl group-hover:shadow-primary/40 transition-all duration-300 group-hover:scale-110">
                    <Icon className="h-8 w-8 md:h-10 md:w-10" />
                  </div>
                  <CardTitle className="text-2xl md:text-3xl">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative px-6 md:px-8 pb-6 md:pb-8">
                  <CardDescription className="text-base md:text-lg leading-relaxed">
                    {service.description}
                  </CardDescription>
                  {serviceLinks[service.id] && (
                    <Link
                      href={serviceLinks[service.id]}
                      className="mt-6 inline-flex items-center gap-2 font-semibold text-primary transition-colors hover:text-primary/80"
                    >
                      Saznaj više
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** Service card id -> dedicated landing page */
const serviceLinks: Record<string, string> = {
  vjencanja: `/${landingPages.vjencanje.slug}`,
  korporativni: `/${landingPages.domjenak.slug}`,
  rodendani: `/${landingPages.rodendan.slug}`,
  klubovi: `/${landingPages.djevojackaMomacka.slug}`,
};

const iconMap: Record<string, LucideIcon> = {
  Heart,
  Cake,
  Building2,
  Sparkles,
};
