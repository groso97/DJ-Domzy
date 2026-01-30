import type { Metadata } from "next";
import Link from "next/link";
import { X } from "lucide-react";
import { LegalPageLayout } from "@/components/layout/legal-page-layout";
import { CompanyInfoBox } from "@/components/legal/company-info-box";
import { siteConfig, COOKIE_CONSENT_KEY } from "@/config/constants";

export const metadata: Metadata = {
  title: "Kolačići",
  description:
    "Informacije o kolačićima koje koristi web stranica DJ Domza. Saznajte koje kolačiće koristimo i zašto.",
  alternates: { canonical: "/kolacici" },
  robots: { index: true, follow: true },
};

const lastUpdated = "30. siječnja 2026.";

export default function CookiesPage() {
  return (
    <LegalPageLayout
      title="Kolačići"
      breadcrumbLabel="Kolačići"
      lastUpdated={lastUpdated}
    >
      <p>
        Ova stranica objašnjava što su kolačići, koje kolačiće koristi web stranica DJ Domza i zašto.
        Korištenjem stranice i klikom na „Razumijem“ u obavijesti o kolačićima potvrđujete da ste pročitali ovu stranicu.
      </p>

      <h2>Što su kolačići?</h2>
      <p>
        Kolačići (cookies) su male tekstualne datoteke koje web stranica pohranjuje na vaš uređaj kada je posjetite.
        Mogu biti trajni (ostaju do isteka ili brisanja) ili sesijski (brišu se zatvaranjem preglednika).
        Služe za pamćenje postavki, prijave ili anonimnu statistiku posjeta.
      </p>

      <h2>Koje kolačiće koristimo?</h2>
      <p>Koristimo sljedeće:</p>

      <CompanyInfoBox
        title="Vercel Analytics"
        rows={[
          { label: "Naziv:", value: "Vercel Analytics" },
          { label: "Svrha:", value: "Anonimna statistika posjeta (broj posjeta, stranice)." },
          { label: "Trajanje:", value: "Sesijski / kratkotrajni." },
          { label: "Prikupljeni podaci:", value: "Anonimno (npr. broj pregleda, izvor)." },
          { label: "Treća strana:", value: "Vercel (usluga hostanja). U skladu s GDPR-om." },
        ]}
        className="my-6"
      />

      <CompanyInfoBox
        title="Lokalna pohrana (Local Storage)"
        rows={[
          { label: "Naziv:", value: COOKIE_CONSENT_KEY },
          { label: "Svrha:", value: "Pamćenje da je obavijest o kolačićima viđena." },
          { label: "Trajanje:", value: "Trajno dok korisnik ne obriše podatke stranice." },
          { label: "Prikupljeni podaci:", value: "Samo vrijednost „true“ (bez osobnih podataka)." },
          { label: "Treća strana:", value: "Ne – samo vaš preglednik." },
        ]}
        className="my-6"
      />

      <h2>Što NE koristimo</h2>
      <div className="space-y-3 mb-6">
        {["Google Analytics", "Facebook Pixel", "Reklamni kolačići", "Praćenje između stranica u svrhu oglasa"].map(
          (item) => (
            <div key={item} className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-500/20 border border-red-500/30">
                <X className="h-4 w-4 text-red-400" />
              </span>
              <span className="text-[#9CA3AF]">{item}</span>
            </div>
          )
        )}
      </div>

      <h2>Zašto „Razumijem” a ne „Prihvaćam”?</h2>
      <p>
        <strong>„Prihvaćam”</strong> obično označava privolu za obradu osobnih podataka (npr. za oglašivačke kolačiće).
        <strong> „Razumijem”</strong> koristimo jer vas samo informiramo da stranica koristi kolačiće za anonimnu analitiku i
        pamćenje postavke obavijesti – ne prikupljamo vaše osobne podatke putem tog gumba. Klikom potvrđujete da ste upoznati s pravilima.
      </p>

      <h2>Kako upravljati kolačićima?</h2>
      <p>
        Kolačiće možete obrisati u postavkama preglednika (npr. „Izbriši podatke preglednika“ ili „Privatnost“).
        Možete ih i blokirati – u većini preglednika u izborniku „Postavke“ ili „Privatnost“ nalazi se opcija za blokiranje kolačića.
        Napomena: blokiranje nužnih kolačića može utjecati na rad stranice.
      </p>
      <p>
        Upute za vaš preglednik:{" "}
        <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Chrome</a>
        ,{" "}
        <a href="https://support.mozilla.org/hr/kb/uklanjanje-kolacica-podataka-stranica" target="_blank" rel="noopener noreferrer">Firefox</a>
        ,{" "}
        <a href="https://support.apple.com/hr-hr/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">Safari</a>.
      </p>

      <h2>Pitanja?</h2>
      <p>Za pitanja o kolačićima ili zaštiti podataka javite nam se:</p>

      <CompanyInfoBox
        title="Kontakt"
        rows={[
          { label: "Email:", value: siteConfig.contact.email },
          { label: "Telefon:", value: siteConfig.contact.phone },
        ]}
        className="my-6"
      />

      <p className="pt-6 border-t border-border/50">
        Za više informacija o obradi podataka pogledajte našu{" "}
        <Link href="/privatnost">Politiku privatnosti</Link>.
      </p>
    </LegalPageLayout>
  );
}
