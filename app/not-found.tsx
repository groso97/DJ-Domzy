import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Music2 } from "lucide-react";

export default function NotFound() {
  return (
    <div className="bg-section-party relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-24 md:pt-32 pb-20 md:pb-28">
      <div className="party-glow-extra" />

      {/* Floating orbs - same as hero */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/30 rounded-full blur-3xl animate-floating-geometric" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/30 rounded-full blur-3xl animate-floating-geometric" style={{ animationDelay: "-3s" }} />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none z-0"
        style={{
          backgroundImage: `linear-gradient(rgba(37, 99, 235, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(37, 99, 235, 0.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="content-width relative z-10 text-center mx-auto">
        {/* 404 number - bold with gradient */}
        <div className="mb-4 animate-hero-title">
          <span className="text-7xl sm:text-8xl md:text-9xl font-bold tracking-tight gradient-text">
            404
          </span>
        </div>

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-primary/20 p-4 border border-primary/30 animate-pulse-glow-badge">
            <Music2 className="h-12 w-12 text-primary" />
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 animate-hero-subtitle">
          Stranica nije pronađena
        </h1>
        <p className="text-muted-foreground text-lg max-w-md mx-auto mb-10 animate-hero-subtitle" style={{ animationDelay: "0.1s" }}>
          Izgleda da je ova stranica otišla na pauzu. Vratite se na početnu i nastavite s zabavom.
        </p>

        <div className="animate-hero-button">
          <Button asChild size="xl" variant="glow" className="ripple-effect hover-scale">
            <Link href="/" className="gap-3 flex items-center">
              <Home className="h-5 w-5" />
              Natrag na početnu
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
