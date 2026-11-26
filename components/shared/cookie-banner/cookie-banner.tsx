"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buildConsent, getSavedConsent, saveConsent } from "@/lib/consent";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [ads, setAds] = useState(false);

  useEffect(() => {
    const saved = getSavedConsent();
    if (!saved) {
      setIsVisible(true);
    }

    const reopen = () => {
      const current = getSavedConsent();
      setAnalytics(current?.analytics_storage === "granted");
      setAds(current?.ad_storage === "granted");
      setShowSettings(true);
      setIsVisible(true);
    };
    window.addEventListener("open-cookie-settings", reopen);
    return () => window.removeEventListener("open-cookie-settings", reopen);
  }, []);

  const finish = (a: boolean, m: boolean) => {
    saveConsent(buildConsent(a, m));
    setIsVisible(false);
    setShowSettings(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="dialog"
      aria-label="Postavke kolačića"
      aria-describedby="cookie-description"
      className="fixed bottom-0 left-0 right-0 z-[60] p-3 sm:p-4 max-h-[100dvh] overflow-y-auto"
    >
      <div className="max-w-4xl mx-auto">
        <div
          className="relative rounded-2xl p-5 md:p-6 shadow-2xl shadow-black/50 border border-white/10 bg-[#0a0a0a]/95 backdrop-blur-md"
          style={{
            backgroundImage: "linear-gradient(to right, rgba(37, 99, 235, 0.15) 0%, transparent 50%, rgba(37, 99, 235, 0.1) 100%)",
          }}
        >
          <div className="flex flex-col gap-4 sm:gap-5">
            <div className="flex gap-4 sm:gap-6 items-start">
              <div className="hidden sm:flex shrink-0 h-12 w-12 items-center justify-center rounded-xl bg-[#2563EB]/10 border border-[#2563EB]/20 text-[#2563EB]">
                <Cookie className="h-6 w-6" />
              </div>
              <div className="flex-1 min-w-0" id="cookie-description">
                <p className="text-sm md:text-base text-white/90 leading-relaxed">
                  Koristimo kolačiće za analitiku posjeta i mjerenje uspješnosti oglasa. Analitičke i
                  oglašivačke kolačiće postavljamo samo uz vašu privolu – možete je odbiti ili kasnije
                  promijeniti.{" "}
                  <Link
                    href="/kolacici"
                    className="text-[#2563EB] hover:underline underline-offset-2 font-medium"
                  >
                    Saznajte više
                  </Link>
                </p>
              </div>
            </div>

            {showSettings && (
              <div className="space-y-3 rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-start gap-3 text-sm md:text-base text-white/90">
                  <input
                    type="checkbox"
                    checked
                    disabled
                    id="consent-necessary"
                    className="mt-1 h-4 w-4 shrink-0 accent-[#2563EB]"
                  />
                  <label htmlFor="consent-necessary" className="leading-snug">
                    <span className="font-semibold">Nužni</span>
                    <span className="block text-white/60 text-sm">
                      Pamćenje vaše odluke o kolačićima. Uvijek uključeno.
                    </span>
                  </label>
                </div>
                <div className="flex items-start gap-3 text-sm md:text-base text-white/90">
                  <input
                    type="checkbox"
                    checked={analytics}
                    onChange={(e) => setAnalytics(e.target.checked)}
                    id="consent-analytics"
                    className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-[#2563EB]"
                  />
                  <label htmlFor="consent-analytics" className="cursor-pointer leading-snug">
                    <span className="font-semibold">Analitika</span>
                    <span className="block text-white/60 text-sm">
                      Anonimna statistika posjeta (Google Analytics).
                    </span>
                  </label>
                </div>
                <div className="flex items-start gap-3 text-sm md:text-base text-white/90">
                  <input
                    type="checkbox"
                    checked={ads}
                    onChange={(e) => setAds(e.target.checked)}
                    id="consent-ads"
                    className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-[#2563EB]"
                  />
                  <label htmlFor="consent-ads" className="cursor-pointer leading-snug">
                    <span className="font-semibold">Oglašavanje</span>
                    <span className="block text-white/60 text-sm">
                      Mjerenje uspješnosti Google oglasa i prilagodba oglasa.
                    </span>
                  </label>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 sm:justify-end">
              {showSettings ? (
                <Button
                  onClick={() => finish(analytics, ads)}
                  className="bg-[#2563EB] hover:bg-[#2563EB]/90 text-white rounded-xl font-semibold px-6"
                >
                  Spremi odabir
                </Button>
              ) : (
                <Button
                  onClick={() => setShowSettings(true)}
                  variant="ghost"
                  className="rounded-xl font-semibold px-6 text-white/80 border border-white/15 hover:text-white hover:bg-white/10"
                >
                  Postavke
                </Button>
              )}
              <div className="grid grid-cols-2 gap-2 sm:flex sm:gap-3">
              <Button
                onClick={() => finish(false, false)}
                className="bg-[#2563EB] hover:bg-[#2563EB]/90 text-white rounded-xl font-semibold px-6"
              >
                Odbij
              </Button>
              <Button
                onClick={() => finish(true, true)}
                className="bg-[#2563EB] hover:bg-[#2563EB]/90 text-white rounded-xl font-semibold px-6"
              >
                Prihvati sve
              </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
