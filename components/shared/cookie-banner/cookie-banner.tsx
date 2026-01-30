"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { X, Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COOKIE_CONSENT_KEY } from "@/config/constants";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!seen) setIsVisible(true);
  }, []);

  const handleAccept = () => {
    if (typeof window === "undefined") return;
    localStorage.setItem(COOKIE_CONSENT_KEY, "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="dialog"
      aria-label="Obavijest o kolačićima"
      aria-describedby="cookie-description"
      className="sticky bottom-0 left-0 right-0 z-50 p-4"
    >
      <div className="max-w-4xl mx-auto">
        <div
          className="relative rounded-2xl p-5 md:p-6 shadow-2xl shadow-black/50 border border-white/10 bg-[#0a0a0a]/95 backdrop-blur-md"
          style={{
            backgroundImage: "linear-gradient(to right, rgba(37, 99, 235, 0.15) 0%, transparent 50%, rgba(37, 99, 235, 0.1) 100%)",
          }}
        >
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center">
            <div className="hidden sm:flex shrink-0 h-12 w-12 items-center justify-center rounded-xl bg-[#2563EB]/10 border border-[#2563EB]/20 text-[#2563EB]">
              <Cookie className="h-6 w-6" />
            </div>
            <div className="flex-1 min-w-0" id="cookie-description">
              <p className="text-sm md:text-base text-white/90 leading-relaxed">
                Koristimo kolačiće za anonimnu analitiku posjeta i poboljšanje stranice. Ne dijelimo podatke s trećim stranama.{" "}
                <Link
                  href="/kolacici"
                  className="text-[#2563EB] hover:underline underline-offset-2 font-medium"
                >
                  Saznajte više
                </Link>
              </p>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button
                onClick={handleAccept}
                className="shrink-0 bg-[#2563EB] hover:bg-[#2563EB]/90 text-white rounded-xl font-semibold px-6"
                aria-label="Prihvati kolačiće"
              >
                Razumijem
              </Button>
              <button
                type="button"
                onClick={handleAccept}
                className="sm:hidden shrink-0 p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Zatvori"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
