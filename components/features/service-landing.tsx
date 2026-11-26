import Image from "next/image";
import { Calendar, Check, ChevronDown, Phone, Quote, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/shared/section-heading";
import { HashLink } from "@/components/shared/hash-link";
import { Contact } from "@/components/features/contact";
import { galleryImages, siteConfig, testimonials } from "@/config/constants";
import type { LandingPageData } from "@/types";

const phoneHref = `tel:${siteConfig.contact.phone.replace(/\s/g, "")}`;

const stats = [
  { value: "50+", label: "Evenata" },
  { value: "8+", label: "Godina iskustva" },
  { value: "5★", label: "Recenzije" },
];

/**
 * Template for the service landing pages (one per Google Ads ad group topic).
 * Section order: hero → benefits → reviews → gallery → how it works → FAQ → contact form.
 */
export function ServiceLanding({ data }: { data: LandingPageData }) {
  const pageTestimonials = testimonials.filter(
    (t) => t.category === data.testimonialCategory
  );
  const pageImages = data.gallerySrcs
    .map((src) => galleryImages.find((img) => img.src === src))
    .filter((img): img is (typeof galleryImages)[number] => Boolean(img));

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <div className="bg-section-party relative">
        <div className="party-glow-extra" />
        <section className="relative flex items-center justify-center overflow-hidden pt-32 md:pt-40 pb-16 md:pb-24">
          <div className="absolute inset-0 z-0">
            <Image
              src="/hero-bg.jpg"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
          <div
            className="absolute inset-0 z-[1]"
            style={{
              background:
                "linear-gradient(180deg, rgba(12, 15, 21, 0.82) 0%, rgba(12, 15, 21, 0.90) 50%, rgba(12, 15, 21, 0.96) 100%)",
            }}
          />

          <div className="content-width relative z-10 text-center mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1] text-white drop-shadow-lg">
              {data.h1}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed drop-shadow-md">
              {data.intro}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="xl" variant="glow" className="ripple-effect hover-scale">
                <HashLink href="/#kontakt" className="gap-3 flex items-center">
                  <Calendar className="h-5 w-5" />
                  Provjeri slobodan termin
                </HashLink>
              </Button>
              <Button
                asChild
                size="xl"
                variant="outline"
                className="border-white text-white bg-transparent hover:bg-transparent hover:border-primary hover:text-primary [&:hover_svg]:text-primary hover-scale ripple-effect"
              >
                <a href={phoneHref} className="gap-3 flex items-center">
                  <Phone className="h-5 w-5" />
                  Nazovi odmah
                </a>
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 sm:gap-10 mt-14 pt-8 border-t border-white/20 max-w-3xl mx-auto">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl sm:text-5xl md:text-6xl font-bold text-white drop-shadow-md">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-base md:text-lg text-gray-400 mt-2">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Benefits */}
      <div className="bg-section-solid">
        <section className="py-20 md:py-28">
          <div className="content-width">
            <SectionHeading
              badge="Usluga"
              title={data.benefitsTitle}
              centered={false}
              className="mb-10 md:mb-14"
            />
            <ul className="grid gap-4 sm:grid-cols-2">
              {data.benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-start gap-4 rounded-xl border border-primary/30 bg-[#0C0F15]/80 p-5"
                >
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <Check className="h-4 w-4" aria-hidden />
                  </span>
                  <span className="text-base md:text-lg text-foreground leading-snug">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      {/* Reviews */}
      {pageTestimonials.length > 0 && (
        <div className="bg-section-party relative">
          <div className="party-glow-extra" />
          <section className="py-20 md:py-28 relative">
            <div className="content-width">
              <SectionHeading
                badge="Recenzije"
                title="Što kažu klijenti?"
                subtitle="Recenzije zadovoljnih klijenata su moja najveća nagrada"
                centered={false}
              />
              <div className="grid gap-6 md:grid-cols-2">
                {pageTestimonials.map((t) => (
                  <Card key={t.id}>
                    <CardContent className="p-6 pt-8 md:p-8 relative">
                      <Quote className="absolute left-6 top-6 h-10 w-10 text-primary/20" aria-hidden />
                      <div className="flex gap-1 mb-5 justify-end" aria-label={`Ocjena ${t.rating} od 5`}>
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-primary fill-primary" aria-hidden />
                        ))}
                      </div>
                      <blockquote className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6">
                        &ldquo;{t.content}&rdquo;
                      </blockquote>
                      <div className="flex items-center gap-4 pt-5 border-t border-border">
                        <div className="h-12 w-12 shrink-0 rounded-full bg-linear-to-br from-primary to-accent flex items-center justify-center text-white font-semibold text-lg">
                          {t.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-base">{t.name}</div>
                          <div className="text-sm text-muted-foreground">{t.role}</div>
                          {t.location && t.date && (
                            <div className="text-sm text-muted-foreground mt-1">
                              {t.location}, {t.date}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Gallery */}
      {pageImages.length > 0 && (
        <div className="bg-section-solid">
          <section className="py-20 md:py-28">
            <div className="content-width">
              <SectionHeading
                badge="Galerija"
                title="Trenuci s nastupa"
                centered={false}
                className="mb-10 md:mb-14"
              />
              <div className="grid grid-cols-3 gap-3 md:gap-6">
                {pageImages.map((image) => (
                  <div
                    key={image.src}
                    className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/10 bg-[#0C0F15]/80"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, 33vw"
                      className="object-cover object-[50%_20%]"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}

      {/* How it works */}
      <div className="bg-section-party relative">
        <div className="party-glow-extra" />
        <section className="py-20 md:py-28 relative">
          <div className="content-width">
            <SectionHeading
              badge="Suradnja"
              title="Kako izgleda suradnja?"
              centered={false}
              className="mb-10 md:mb-14"
            />
            <ol className="grid gap-6 md:grid-cols-3">
              {data.steps.map((step, index) => (
                <li key={step.title}>
                  <Card className="h-full">
                    <CardContent className="p-6 md:p-8">
                      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-primary to-accent text-lg font-bold text-white">
                        {index + 1}
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold mb-3">{step.title}</h3>
                      <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </div>

      {/* FAQ */}
      <div className="bg-section-solid">
        <section className="py-20 md:py-28">
          <div className="content-width">
            <SectionHeading
              badge="FAQ"
              title="Česta pitanja"
              centered={false}
              className="mb-10 md:mb-14"
            />
            <div className="space-y-3 max-w-3xl">
              {data.faq.map((item) => (
                <details
                  key={item.question}
                  className="group rounded-xl border border-primary/30 bg-[#0C0F15]/80 px-5 py-4 open:border-primary/60"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base md:text-lg font-semibold text-foreground [&::-webkit-details-marker]:hidden">
                    {item.question}
                    <ChevronDown
                      className="h-5 w-5 shrink-0 text-primary transition-transform duration-200 group-open:rotate-180"
                      aria-hidden
                    />
                  </summary>
                  <p className="mt-3 text-muted-foreground text-base md:text-lg leading-relaxed">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Contact form with the event type preselected */}
      <div className="bg-section-party relative">
        <div className="party-glow-extra" />
        <Contact defaultEventType={data.defaultEventType} />
      </div>
    </>
  );
}
