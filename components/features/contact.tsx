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

  const ContactCard = ({ icon: Icon, label, value, href }: { icon: typeof Phone; label: string; value: string; href: string | null }) => {
    const content = (
      <div className="card-transparent flex items-center gap-4 p-4 rounded-2xl relative overflow-hidden group">
        <div className="relative z-10 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <div className="relative z-10 min-w-0">
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
    <section id="kontakt" className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
        <SectionHeading
          badge="Kontakt"
          title="Kontaktirajte me"
          subtitle="Imate pitanja ili želite rezervirati termin? Javite mi se!"
          centered={false}
        />

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">
                Dogovorimo se!
              </h3>
              <p className="text-muted-foreground font-serif">
                Ispunite formu ili me kontaktirajte direktno. Odgovorit ću vam 
                unutar 24 sata s detaljima i ponudom prilagođenom vašem događaju.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-4">
              {contactCards.map((card) => (
                <ContactCard key={card.label} {...card} />
              ))}
            </div>

            {/* Availability Note */}
            <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-primary">Dostupnost 2026</div>
                  <p className="text-sm text-muted-foreground mt-1 font-serif">
                    Termini se brzo popunjavaju! Rezervirajte svoj datum na vrijeme.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-6 md:p-8 rounded-2xl card-transparent relative overflow-hidden">
            <form onSubmit={handleSubmit(onSubmit)} className="relative z-10 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Ime i prezime *</Label>
                  <Input
                    id="name"
                    placeholder="Ivan Horvat"
                    {...register("name")}
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name.message}</p>
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
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+385 99 424 2425"
                    {...register("phone")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="eventDate">Datum događaja</Label>
                  <Input
                    id="eventDate"
                    type="date"
                    {...register("eventDate")}
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
                  <p className="text-sm text-destructive">{errors.eventType.message}</p>
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
                />
                {errors.message && (
                  <p className="text-sm text-destructive">{errors.message.message}</p>
                )}
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full hover-scale ripple-effect"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
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
      </div>
    </section>
  );
}
