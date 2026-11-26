import type { Metadata } from "next";
import Link from "next/link";
import { X } from "lucide-react";
import { LegalPageLayout } from "@/components/layout/legal-page-layout";
import { CompanyInfoBox } from "@/components/legal/company-info-box";
import { siteConfig, CONSENT_STORAGE_KEY } from "@/config/constants";

export const metadata: Metadata = {
  title: "Kolačići",
  description:
    "Informacije o kolačićima koje koristi web stranica DJ Domza. Saznajte koje kolačiće koristimo i zašto.",
  alternates: { canonical: "/kolacici" },
  robots: { index: true, follow: true },
};

const lastUpdated = "26. studenog 2026.";

export default function CookiesPage() {
  return (
    // TODO(vlasnik): pravni pregled prije objave (nacrt teksta za GA4 / Google Ads / Consent Mode)
    <LegalPageLayout
      title="Kolačići"
      breadcrumbLabel="Kolačići"
      lastUpdated={lastUpdated}
    >
      <p>
        Ova stranica objašnjava što su kolačići, koje kolačiće koristi web stranica DJ Domza i zašto.
        Kolačiće za analitiku i oglašavanje postavljamo isključivo uz vašu privolu, koju možete dati, odbiti ili
        kasnije promijeniti u bilo kojem trenutku.
      </p>

      <h2>Što su kolačići?</h2>
      <p>
        Kolačići (cookies) su male tekstualne datoteke koje web stranica pohranjuje na vaš uređaj kada je posjetite.
        Mogu biti trajni (ostaju do isteka ili brisanja) ili sesijski (brišu se zatvaranjem preglednika).
        Služe za pamćenje postavki, prijave ili anonimnu statistiku posjeta.
      </p>

      <h2>Koje kolačiće koristimo?</h2>
      <p>Koristimo sljedeće:</p>

      <h3>Nužno (uvijek uključeno)</h3>
      <CompanyInfoBox
        title="Lokalna pohrana – odluka o kolačićima"
        rows={[
          { label: "Naziv:", value: CONSENT_STORAGE_KEY },
          { label: "Svrha:", value: "Pamćenje vaše odluke o kolačićima (Prihvati sve / Odbij / Postavke)." },
          { label: "Trajanje:", value: "Trajno dok ne obrišete podatke stranice ili ne promijenite odluku." },
          { label: "Prikupljeni podaci:", value: "Samo vaš odabir po kategorijama (bez osobnih podataka)." },
          { label: "Treća strana:", value: "Ne – samo vaš preglednik." },
        ]}
        className="my-6"
      />

      <CompanyInfoBox
        title="Session Storage – izvor posjeta"
        rows={[
          { label: "Naziv:", value: "djdomza-attribution" },
          { label: "Svrha:", value: "Ako na stranicu dođete preko oglasa, pamtimo oznaku klika (npr. gclid) i UTM parametre kako bismo uz vaš upit mogli vidjeti iz koje kampanje je stigao." },
          { label: "Trajanje:", value: "Do zatvaranja kartice preglednika." },
          { label: "Prikupljeni podaci:", value: "Tehničke oznake iz adrese stranice; šalju se nama samo ako pošaljete kontakt formu." },
          { label: "Treća strana:", value: "Ne." },
        ]}
        className="my-6"
      />

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

      <h3>Analitika (samo uz privolu)</h3>
      <CompanyInfoBox
        title="Google Analytics 4"
        rows={[
          { label: "Naziv:", value: "_ga, _ga_<ID>" },
          { label: "Svrha:", value: "Statistika posjeta: koje se stranice gledaju i kako posjetitelji koriste stranicu." },
          { label: "Trajanje:", value: "2 godine." },
          { label: "Prikupljeni podaci:", value: "Pseudonimizirani identifikator preglednika, stranice, uređaj, približna lokacija." },
          { label: "Treća strana:", value: "Google Ireland Limited (Google LLC, SAD)." },
        ]}
        className="my-6"
      />

      <h3>Oglašavanje (samo uz privolu)</h3>
      <CompanyInfoBox
        title="Google Ads"
        rows={[
          { label: "Naziv:", value: "_gcl_au, _gcl_aw" },
          { label: "Svrha:", value: "Mjerenje uspješnosti oglasa: bilježi se je li posjetitelj koji je kliknuo na naš oglas poslao upit." },
          { label: "Trajanje:", value: "90 dana." },
          { label: "Prikupljeni podaci:", value: "Oznaka klika na oglas i vrijeme klika. Ako pošaljete upit, Google može dobiti hashirani email i telefon radi točnijeg mjerenja." },
          { label: "Treća strana:", value: "Google Ireland Limited (Google LLC, SAD)." },
        ]}
        className="my-6"
      />

      <h2>Što NE koristimo</h2>
      <div className="space-y-3 mb-6">
        {["Facebook Pixel"].map(
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

      <h2>Vaš odabir: Prihvati sve, Odbij, Postavke</h2>
      <p>
        Pri prvom posjetu prikazujemo obavijest s tri mogućnosti:
      </p>
      <ul>
        <li><strong>Prihvati sve</strong> – uključuje analitiku (Google Analytics) i oglašavanje (Google Ads).</li>
        <li><strong>Odbij</strong> – ne postavljamo analitičke ni oglašivačke kolačiće. Stranica radi jednako.</li>
        <li><strong>Postavke</strong> – zasebno birate analitiku i oglašavanje te spremate odabir.</li>
      </ul>
      <p>
        Do vaše odluke Google oznake ne postavljaju kolačiće. Odluku možete promijeniti ili povući u bilo kojem trenutku
        klikom na <strong>„Postavke kolačića“</strong> u podnožju stranice.
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
