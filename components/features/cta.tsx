import Link from "next/link";
import { Phone, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/constants";

export function CTA() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 animated-gradient opacity-90" />
      
      {/* Pattern overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Spremni za nezaboravnu zabavu?
          </h2>
          <p className="text-lg sm:text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Kontaktirajte me danas i osigurajte termin za svoj događaj. 
            Zajedno ćemo stvoriti savršenu glazbenu atmosferu!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="xl"
              className="bg-white text-primary hover:bg-white/90 shadow-xl"
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
              className="border-white text-white hover:bg-white/10 bg-transparent"
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
