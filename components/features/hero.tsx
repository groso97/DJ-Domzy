"use client";

import Link from "next/link";
import { Play, Calendar, Headphones, Music } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "-3s" }} />
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "-1.5s" }} />
        
        {/* Music Notes */}
        <Music className="absolute top-20 right-[15%] w-8 h-8 text-primary/30 animate-float" style={{ animationDelay: "-1s" }} />
        <Headphones className="absolute bottom-32 left-[20%] w-10 h-10 text-accent/30 animate-float" style={{ animationDelay: "-2s" }} />
      </div>

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-slide-up">
            <span className="block text-foreground">Glazba koja</span>
            <span className="block mt-2">
              <span className="gradient-text">pokreće emocije</span>
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Profesionalni DJ s iskustvom od preko 10 godina. Specijaliziram se za 
            vjenčanja, rođendane, korporativne evente i klubove. 
            <span className="text-[#A855F7] font-medium"> Vaša zabava je moja strast.</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Button asChild size="xl" variant="glow">
              <Link href="#kontakt" className="gap-3">
                <Calendar className="h-5 w-5" />
                Zatraži ponudu
              </Link>
            </Button>
            <Button asChild size="xl" variant="outline">
              <Link href="#galerija" className="gap-3">
                <Play className="h-5 w-5" />
                Pogledaj radove
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-16 pt-8 border-t border-border/50 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold gradient-text">500+</div>
              <div className="text-sm sm:text-base text-muted-foreground mt-1">Evenata</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold gradient-text">10+</div>
              <div className="text-sm sm:text-base text-muted-foreground mt-1">Godina iskustva</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold gradient-text">100%</div>
              <div className="text-sm sm:text-base text-muted-foreground mt-1">Zadovoljstvo</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center p-2">
          <div className="w-1 h-2 bg-muted-foreground/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
