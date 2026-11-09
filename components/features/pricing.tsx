"use client";

import React from "react";
import { HashLink } from "@/components/shared/hash-link";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/section-heading";
import { useIntersectionObserver } from "@/hooks";

const paragraphs = [
  "Svaki događaj je jedinstven, stoga se cijene DJ usluga formiraju individualno, ovisno o vrsti događaja, lokaciji, trajanju angažmana, potrebnoj tehničkoj opremi i posebnim zahtjevima klijenta.",
  "Zbog različitih potreba i uvjeta pojedinog događaja nije moguće unaprijed odrediti jedinstvenu ili okvirnu cijenu usluge.",
  "Za izradu personalizirane ponude bez obveze, slobodno me kontaktirajte. Nakon zaprimanja osnovnih informacija o događaju dostavit ću vam ponudu s jasno iskazanom ukupnom cijenom.",
];

export function Pricing() {
  const [sectionRef, isSectionVisible] = useIntersectionObserver<HTMLElement>({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section
      ref={sectionRef}
      id="cijene"
      className="pt-16 md:pt-20 pb-24 md:pb-32"
    >
      <div className="content-width">
        <SectionHeading
          badge="Cijene"
          title="Cijene DJ usluga"
          centered={false}
          className="mb-10 md:mb-12"
        />

        <div
          className={`relative rounded-2xl border border-primary/20 bg-[#0C0F15]/80 overflow-hidden badge-glow-shadow ${
            isSectionVisible ? "animate-card-fade-left" : "opacity-0"
          }`}
        >
          {/* Top accent line */}
          <div className="h-0.5 w-full bg-linear-to-r from-transparent via-primary/60 to-transparent" />

          <div className="p-6 md:p-10 flex flex-col lg:flex-row lg:items-end gap-8 lg:gap-12">
            <div className="space-y-4 max-w-3xl">
              {paragraphs.map((text) => (
                <p
                  key={text}
                  className="text-muted-foreground text-base sm:text-lg leading-relaxed"
                >
                  {text}
                </p>
              ))}
            </div>

            <Button
              asChild
              size="xl"
              variant="outline"
              className="shrink-0 self-start lg:self-end border-primary text-primary hover:bg-primary/10 bg-transparent hover-scale ripple-effect"
            >
              <HashLink href="/#kontakt" className="gap-3">
                <Calendar className="h-5 w-5" />
                Zatraži ponudu
              </HashLink>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
