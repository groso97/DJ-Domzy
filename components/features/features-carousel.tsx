"use client";

import React from "react";
import { 
  Music2, 
  Volume2, 
  Headphones, 
  Calendar, 
  Users, 
  Sliders, 
  Shield,
  type LucideIcon 
} from "lucide-react";

interface Feature {
  icon: LucideIcon;
  text: string;
}

const features: Feature[] = [
  { icon: Music2, text: "Personalizirani glazbeni koncept" },
  { icon: Volume2, text: "Profesionalni razglas" },
  { icon: Headphones, text: "Kompletna audio oprema prilagođena prostoru događaja" },
  { icon: Calendar, text: "Vođenje programa i jasna struktura večeri" },
  { icon: Users, text: "Koordinacija s fotografom i ostalim izvođačima" },
  { icon: Sliders, text: "Fleksibilnost i prilagodba atmosferi" },
  { icon: Shield, text: "Regulirana autorska prava (ZAMP)" },
];

export function FeaturesCarousel() {
  // Duplicate features for seamless infinite scroll
  const duplicatedFeatures = [...features, ...features];

  return (
    <section className="pt-4 md:pt-6 pb-16 md:pb-20 relative overflow-hidden bg-section-solid w-full">
      <div className="relative overflow-hidden w-full">
        <div className="flex items-center gap-4 md:gap-6 animate-features-scroll w-full">
          {duplicatedFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="flex-shrink-0 rounded-full border-2 border-[#2563EB] bg-[#0C0F15]/80 px-4 md:px-6 py-3 md:py-4 flex items-center gap-3 md:gap-4 feature-neon-glow"
              >
                <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-linear-to-br from-primary to-accent flex items-center justify-center text-white">
                  <Icon className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <span className="text-sm md:text-base font-medium text-foreground whitespace-nowrap">
                  {feature.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

