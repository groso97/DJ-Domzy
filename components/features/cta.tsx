"use client";

import React from "react";
import Link from "next/link";
import { Phone, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/constants";

export function CTA() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="content-width relative z-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 text-left text-white">
          {/* Title + subtitle left */}
          <div className="max-w-2xl">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-5 leading-tight">
              Spremni za nezaboravnu zabavu?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed">
              Kontaktirajte me danas i osigurajte termin za svoj događaj. 
              Zajedno ćemo stvoriti savršenu glazbenu atmosferu!
            </p>
          </div>

          {/* Buttons right - same row */}
          <div className="flex shrink-0 flex-col sm:flex-row gap-4">
            <Button
              asChild
              size="xl"
              className="bg-white text-primary hover:bg-white/90 shadow-xl hover-scale ripple-effect"
            >
              <Link href="#kontakt" className="gap-3">
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
