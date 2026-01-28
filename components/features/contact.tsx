"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Send, Phone, Mail, MapPin, Calendar, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { SectionHeading } from "@/components/shared/section-heading";
import { siteConfig } from "@/config/constants";
import { useIntersectionObserver } from "@/hooks";

const contactSchema = z.object({
  name: z.string().min(2, "Ime mora imati najmanje 2 znaka"),
  email: z.string().email("Unesite ispravnu email adresu"),
  phone: z.string().optional(),
  eventType: z.string().min(1, "Odaberite vrstu događaja"),
  eventDate: z.string().optional(),
  message: z.string().min(10, "Poruka mora imati najmanje 10 znakova"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const eventTypes = [
  { value: "vjencanje", label: "Vjenčanje" },
  { value: "rodendan", label: "Rođendan" },
  { value: "korporativni", label: "Korporativni event" },
  { value: "klub", label: "Klub / Festival" },
  { value: "privatna-zabava", label: "Privatna zabava" },
  { value: "ostalo", label: "Ostalo" },
];

const contactCards = [
  { icon: Phone, label: "Telefon", value: siteConfig.contact.phone, href: `tel:${siteConfig.contact.phone.replace(/\s/g, "")}` },
  { icon: Mail, label: "Email", value: siteConfig.contact.email, href: `mailto:${siteConfig.contact.email}` },
  { icon: MapPin, label: "Lokacija", value: "Zagreb i šira okolica", href: null },
];

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sectionRef, isSectionVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.2, triggerOnce: true });
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      eventType: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Poruka uspješno poslana!", {
          description: "Javit ću vam se u najkraćem mogućem roku.",
        });
        reset();
      } else {
        toast.error("Greška pri slanju", {
          description: result.error || "Pokušajte ponovo kasnije.",
        });
      }
    } catch {
      toast.error("Greška pri slanju", {
        description: "Provjerite internet vezu i pokušajte ponovo.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const ContactCard = ({ icon: Icon, label, value, href, index }: { icon: typeof Phone; label: string; value: string; href: string | null; index: number }) => {
    const content = (
      <div 
        className={`flex items-center gap-4 p-4 rounded-xl bg-card border hover:border-primary/50 transition-all duration-300 hover-lift group optimize-animation ${
          isSectionVisible ? 'animate-contact-card' : 'opacity-0'
        }`}
        style={{ animationDelay: `${0.2 + index * 0.1}s` }}
      >
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors hover-rotate">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <div>
          <div className="font-medium">{label}</div>
          <div className="text-muted-foreground">{value}</div>
        </div>
      </div>
    );

    return href ? (
      <a href={href} className="block">
        {content}
      </a>
    ) : (
      content
    );
  };

  return (
    <section ref={sectionRef} id="kontakt" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Kontaktirajte me"
          subtitle="Imate pitanja ili želite rezervirati termin? Javite mi se!"
        />

        <div className="grid gap-8 lg:grid-cols-2 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 
                className={`text-2xl font-bold ${
                  isSectionVisible ? 'animate-section-reveal' : 'opacity-0'
                }`}
                style={{ animationDelay: '0.1s' }}
              >
                Dogovorimo se!
              </h3>
              <p 
                className={`text-muted-foreground font-serif ${
                  isSectionVisible ? 'animate-section-reveal' : 'opacity-0'
                }`}
                style={{ animationDelay: '0.2s' }}
              >
                Ispunite formu ili me kontaktirajte direktno. Odgovorit ću vam 
                unutar 24 sata s detaljima i ponudom prilagođenom vašem događaju.
              </p>
            </div>

            {/* Contact Details - Stagger fade-up */}
            <div className="space-y-4">
              {contactCards.map((card, index) => (
                <ContactCard key={card.label} {...card} index={index} />
              ))}
            </div>

            {/* Availability Note */}
            <div 
              className={`p-4 rounded-xl bg-primary/10 border border-primary/20 ${
                isSectionVisible ? 'animate-section-reveal' : 'opacity-0'
              }`}
              style={{ animationDelay: '0.6s' }}
            >
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-[#A855F7]">Dostupnost 2026</div>
                  <p className="text-sm text-muted-foreground mt-1 font-serif">
                    Termini se brzo popunjavaju! Rezervirajte svoj datum na vrijeme.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div 
            className={`p-6 md:p-8 rounded-2xl bg-card border shadow-lg ${
              isSectionVisible ? 'animate-section-reveal' : 'opacity-0'
            }`}
            style={{ animationDelay: '0.3s' }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Ime i prezime *</Label>
                  <Input
                    id="name"
                    placeholder="Ivan Horvat"
                    {...register("name")}
                    aria-invalid={!!errors.name}
                    onFocus={() => setFocusedInput("name")}
                    onBlur={() => setFocusedInput(null)}
                    className={`transition-all duration-300 ${
                      focusedInput === "name" ? "animate-input-focus-glow" : ""
                    }`}
                    style={{
                      borderColor: focusedInput === "name" ? "rgba(168, 85, 247, 1)" : undefined,
                      boxShadow: focusedInput === "name" ? "0 0 0 4px rgba(168, 85, 247, 0.2)" : undefined,
                    }}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive animate-section-reveal">{errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="ivan@primjer.hr"
                    {...register("email")}
                    aria-invalid={!!errors.email}
                    onFocus={() => setFocusedInput("email")}
                    onBlur={() => setFocusedInput(null)}
                    className={`transition-all duration-300 ${
                      focusedInput === "email" ? "animate-input-focus-glow" : ""
                    }`}
                    style={{
                      borderColor: focusedInput === "email" ? "rgba(168, 85, 247, 1)" : undefined,
                      boxShadow: focusedInput === "email" ? "0 0 0 4px rgba(168, 85, 247, 0.2)" : undefined,
                    }}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive animate-section-reveal">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+385 99 123 4567"
                    {...register("phone")}
                    onFocus={() => setFocusedInput("phone")}
                    onBlur={() => setFocusedInput(null)}
                    className={`transition-all duration-300 ${
                      focusedInput === "phone" ? "animate-input-focus-glow" : ""
                    }`}
                    style={{
                      borderColor: focusedInput === "phone" ? "rgba(168, 85, 247, 1)" : undefined,
                      boxShadow: focusedInput === "phone" ? "0 0 0 4px rgba(168, 85, 247, 0.2)" : undefined,
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="eventDate">Datum događaja</Label>
                  <Input
                    id="eventDate"
                    type="date"
                    {...register("eventDate")}
                    onFocus={() => setFocusedInput("eventDate")}
                    onBlur={() => setFocusedInput(null)}
                    className={`transition-all duration-300 ${
                      focusedInput === "eventDate" ? "animate-input-focus-glow" : ""
                    }`}
                    style={{
                      borderColor: focusedInput === "eventDate" ? "rgba(168, 85, 247, 1)" : undefined,
                      boxShadow: focusedInput === "eventDate" ? "0 0 0 4px rgba(168, 85, 247, 0.2)" : undefined,
                    }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="eventType">Vrsta događaja *</Label>
                <Select
                  id="eventType"
                  options={eventTypes}
                  placeholder="Odaberite vrstu događaja"
                  {...register("eventType")}
                  aria-invalid={!!errors.eventType}
                />
                {errors.eventType && (
                  <p className="text-sm text-destructive animate-section-reveal">{errors.eventType.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Poruka *</Label>
                <Textarea
                  id="message"
                  placeholder="Opišite svoj događaj, posebne želje, broj gostiju..."
                  rows={4}
                  {...register("message")}
                  aria-invalid={!!errors.message}
                  onFocus={() => setFocusedInput("message")}
                  onBlur={() => setFocusedInput(null)}
                  className={`transition-all duration-300 ${
                    focusedInput === "message" ? "animate-input-focus-glow" : ""
                  }`}
                  style={{
                    borderColor: focusedInput === "message" ? "rgba(168, 85, 247, 1)" : undefined,
                    boxShadow: focusedInput === "message" ? "0 0 0 4px rgba(168, 85, 247, 0.2)" : undefined,
                  }}
                />
                {errors.message && (
                  <p className="text-sm text-destructive animate-section-reveal">{errors.message.message}</p>
                )}
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full hover-scale ripple-effect relative overflow-hidden"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spinner-rotate" />
                    Šaljem...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Pošalji upit
                  </>
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                Slanjem forme pristajete na obradu vaših podataka u svrhu kontaktiranja.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
