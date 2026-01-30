import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/layout/legal-page-layout";
import { CompanyInfoBox } from "@/components/legal/company-info-box";
import { siteConfig } from "@/config/constants";

export const metadata: Metadata = {
  title: "Uvjeti korištenja",
  description: "Uvjeti korištenja DJ Domza web stranice",
};

const lastUpdated = "30. siječnja 2026.";

const companyRows = [
  { label: "Pravno ime:", value: "DJ Domza eventi, obrt za usluge, vl. Domagoj Jakopović" },
  { label: "Trgovačko ime:", value: "DJ Domza" },
  { label: "Adresa:", value: "Kikićeva ulica 12, 10000 Zagreb" },
  { label: "Email:", value: siteConfig.contact.email },
];

export default function TermsPage() {
  return (
    <LegalPageLayout
      title="Uvjeti korištenja"
      breadcrumbLabel="Uvjeti korištenja"
      lastUpdated={lastUpdated}
    >
      <p>
        Ovi Uvjeti korištenja („Uvjeti“) reguliraju korištenje web stranice DJ Domza i pružanje
        DJ usluga. Pristupanjem stranici ili naručivanjem usluga prihvaćate ove Uvjete. Ako se
        ne slažete s njima, molimo vas da ne koristite našu stranicu niti naše usluge.
      </p>

      <CompanyInfoBox
        title="Podaci o tvrtki"
        rows={companyRows}
        className="my-10"
      />

      <h2>1. Definicije</h2>
      <p>
        <strong>„Stranica“</strong> označava web stranicu djdomza-eventi.hr i sve njezine podstranice.{" "}
        <strong>„Usluge“</strong> označava DJ usluge koje pruža DJ Domza eventi.{" "}
        <strong>„Korisnik“</strong> označava fizičku ili pravnu osobu koja koristi Stranicu ili naručuje Usluge.
      </p>

      <h2>2. Usluge</h2>
      <h3>2.1 Opseg usluga</h3>
      <p>
        DJ Domza pruža profesionalne DJ usluge za različite događaje, uključujući vjenčanja,
        rođendane, korporativne evente, privatne zabave i klubove. Opseg usluge (trajanje,
        oprema, repertoar i sl.) dogovara se individualno i naveden je u ponudi i ugovoru.
      </p>
      <h3>2.2 Izvedba usluge</h3>
      <p>
        Obvezujemo se pružiti uslugu u skladu s dogovorenim uvjetima i u razumnom roku. Rezervacija
        se smatra potvrđenom tek nakon pisane potvrde i uplate akontacije prema dogovoru.
      </p>

      <h2>3. Rezervacije i plaćanja</h2>
      <p>
        Rezervacije se potvrđuju nakon prihvaćanja ponude i uplate akontacije. Preostali iznos
        plaća se prema ugovorenom roku (obično prije ili na dan događaja). Uvjeti otkazivanja,
        povrata i naknade navedeni su u pojedinačnom ugovoru ili ponudi.
      </p>

      <h2>4. Cijene</h2>
      <p>
        Cijene ovise o vrsti događaja, trajanju, lokaciji, opremi i dodatnim zahtjevima. Konačna
        cijena bit će navedena u ponudi. Sve cijene su u kunama i uključuju PDV ako je obrt
        obveznik PDV-a u skladu s važećim propisima.
      </p>

      <h2>5. Intelektualno vlasništvo</h2>
      <p>
        Sav sadržaj na ovoj Stranici (tekstovi, slike, logotipi, grafički elementi, glazba i
        ostali materijali) vlasništvo je DJ Domza eventi ili njegovih davatelja licence i
        zaštićen je autorskim pravima. Zabranjeno je kopiranje, reprodukcija, distribucija ili
        korištenje bez prethodnog pisanog odobrenja.
      </p>

      <h2>6. Korištenje stranice</h2>
      <p>
        Stranicu smijete koristiti samo u zakonite svrhe. Zabranjeno je: narušavanje sigurnosti
        stranice, unošenje štetnog softvera, prikupljanje podataka drugih korisnika bez pristanka,
        kršenje važećih zakona ili prava trećih strana.
      </p>

      <h2>7. Ograničenje odgovornosti</h2>
      <p>
        DJ Domza eventi ne odgovara za štetu nastalu korištenjem Stranice ili nemogućnošću
        korištenja, osim u slučaju namjere ili grube nemara. Odgovornost je u svakom slučaju
        ograničena na iznos primljen za konkretnu uslugu u spornom slučaju, osim kad zakon
        izričito zahtijeva drugačije.
      </p>

      <h2>8. Izmjene uvjeta</h2>
      <p>
        Zadržavamo pravo izmjene ovih Uvjeta u bilo kojem trenutku. Ažurirana verzija stupa na
        snagu objavom na Stranici, s naznakom „Zadnje ažurirano“. Nastavkom korištenja Stranice
        ili Usluga nakon objave smatrat će se da ste prihvatili nove Uvjete.
      </p>

      <h2>9. Rješavanje sporova</h2>
      <p>
        Za sve sporove iz ovih Uvjeta primjenjuje se hrvatsko pravo. Nadležni sudovi su sudovi
        u Republici Hrvatskoj. Potrošači zadržavaju pravo na vanparnično rješavanje putem
        tijela za alternativno rješavanje sporova.
      </p>

      <h2>10. Kontakt</h2>
      <p>
        Za pitanja u vezi s ovim Uvjetima ili našim uslugama, obratite nam se:
      </p>

      <CompanyInfoBox
        title="Kontakt"
        rows={[
          { label: "Obrt za usluge:", value: "DJ Domza eventi" },
          { label: "Vlasnik:", value: "Domagoj Jakopović" },
          { label: "Adresa:", value: "Kikićeva ulica 12, 10000 Zagreb" },
          { label: "Email:", value: siteConfig.contact.email },
          { label: "Telefon:", value: siteConfig.contact.phone },
        ]}
        className="my-6"
      />
    </LegalPageLayout>
  );
}
