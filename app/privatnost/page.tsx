import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageLayout } from "@/components/layout/legal-page-layout";
import { CompanyInfoBox } from "@/components/legal/company-info-box";
import { siteConfig } from "@/config/constants";

export const metadata: Metadata = {
  title: "Politika privatnosti",
  description: "Politika privatnosti DJ Domza web stranice",
};

const lastUpdated = "30. siječnja 2026.";

const companyRows = [
  { label: "Pravno ime:", value: "DJ Domza eventi, obrt za usluge, vl. Domagoj Jakopović" },
  { label: "Trgovačko ime:", value: "DJ Domza" },
  { label: "Adresa:", value: "Kikićeva ulica 12, 10000 Zagreb" },
  { label: "Email:", value: siteConfig.contact.email },
];

export default function PrivacyPage() {
  return (
    <LegalPageLayout
      title="Politika privatnosti"
      breadcrumbLabel="Politika privatnosti"
      lastUpdated={lastUpdated}
    >
      <p>
        Ova Politika privatnosti objašnjava kako DJ Domza eventi („mi“, „nas“, „naš“) prikuplja,
        koristi i štiti vaše osobne podatke kada posjetite našu web stranicu ili koristite naše usluge.
        Poštujemo vašu privatnost i obvezujemo se na zaštitu vaših osobnih podataka u skladu s
        primjenjivim zakonima, uključujući Opću uredbu o zaštiti podataka (GDPR).
      </p>
      <p>
        Molimo vas da pažljivo pročitate ovu politiku kako biste razumjeli naše stavove i prakse
        u vezi s vašim podacima.
      </p>

      <CompanyInfoBox
        title="Podaci o tvrtki"
        rows={companyRows}
        className="my-10"
      />

      <h2>1. Podatke koje prikupljamo</h2>
      <h3>1.1 Osobni podaci</h3>
      <p>
        Možemo prikupljati osobne podatke koje nam dobrovoljno pružite putem kontakt forme ili
        emaila, uključujući: ime i prezime, email adresu, broj telefona, datum i vrstu događaja
        te poruku ili ostale detalje koje navedete u upitu.
      </p>
      <h3>1.2 Automatski prikupljeni podaci</h3>
      <p>
        Kada posjetite našu stranicu, naši sustavi mogu automatski prikupljati određene tehničke
        podatke, uključujući IP adresu, vrstu preglednika, uređaj, vrijeme posjeta i stranice
        koje ste pregledali. Za više informacija o kolačićima pogledajte našu{" "}
        <Link href="/kolacici">Politiku kolačića</Link>.
      </p>

      <h2>2. Kako koristimo vaše podatke</h2>
      <p>Vaše podatke koristimo u svrhe uključujući:</p>
      <ul>
        <li>Odgovaranje na vaše upite i pružanje informacija o uslugama</li>
        <li>Slanje ponuda, potvrda rezervacija i komunikaciju vezanu uz događaje</li>
        <li>Poboljšanje naše web stranice i korisničkog iskustva</li>
        <li>Ispunjavanje zakonskih obveza</li>
      </ul>

      <h2>3. Pravna osnova za obradu (GDPR)</h2>
      <p>Obrađujemo vaše podatke na temelju:</p>
      <p><strong>Pristanak:</strong> kada nam izričito date pristanak (npr. slanjem kontakt forme).</p>
      <p><strong>Izvršenje ugovora:</strong> kada je obrada potrebna za pripremu ili izvršenje ugovora o uslugama.</p>
      <p><strong>Legitimni interes:</strong> za poboljšanje usluga, sigurnost i zaštitu prava.</p>
      <p><strong>Zakonska obveza:</strong> kada to zahtijeva primjenjivi zakon.</p>

      <h2>4. Kolačići i slične tehnologije</h2>
      <p>
        Naša stranica može koristiti kolačiće i slične tehnologije. Detalje možete pronaći u
        našoj <Link href="/kolacici">Politici kolačića</Link>.
      </p>

      <h2>5. Dijeljenje podataka</h2>
      <p>
        Vaše osobne podatke ne prodajemo niti ih ne iznajmljujemo trećim stranama. Možemo ih
        dijeliti samo s pouzdanim pružateljima usluga (npr. hosting, email) koji nam pomažu u
        pružanju usluge, i to uz ugovorne obveze povjerljivosti i zaštite podataka. Možemo
        otkriti podatke ako to zakon zahtijeva ili za zaštitu naših prava.
      </p>

      <h2>6. Zadržavanje podataka</h2>
      <p>
        Osobne podatke zadržavamo samo onoliko dugo koliko je potrebno za ispunjenje svrhe
        za koju su prikupljeni ili koliko zakon zahtijeva. Podatke iz kontakt forme obično
        zadržavamo dok traje komunikacija ili rezervacija, te u razumnom roku nakon završetka
        suradnje, osim ako zakon ne zahtijeva dulje čuvanje.
      </p>

      <h2>7. Vaša prava prema GDPR-u</h2>
      <p>U skladu s GDPR-om imate sljedeća prava:</p>
      <p><strong>Pravo na pristup:</strong> možete zatražiti kopiju svojih osobnih podataka koje držimo.</p>
      <p><strong>Pravo na ispravak:</strong> možete zatražiti ispravak netočnih ili nepotpunih podataka.</p>
      <p><strong>Pravo na brisanje:</strong> u određenim uvjetima možete zatražiti brisanje svojih podataka.</p>
      <p><strong>Pravo na ograničenje obrade:</strong> u određenim uvjetima možete zatražiti ograničenje obrade.</p>
      <p><strong>Pravo na prigovor:</strong> možete prigovoriti obradi koja se temelji na legitimnom interesu.</p>
      <p><strong>Pravo na prenosivost:</strong> u određenim uvjetima možete zatražiti primanje podataka u strukturiranom formatu.</p>
      <p>
        Za ostvarivanje ovih prava kontaktirajte nas putem emaila navedenog u odjeljku „Kontakt“.
        Također imate pravo podnijeti pritužbu nadležnom tijelu za zaštitu podataka (Agencija za
        zaštitu osobnih podataka – AZOP).
      </p>

      <h2>8. Sigurnost podataka</h2>
      <p>
        Poduzimamo odgovarajuće tehničke i organizacijske mjere kako bismo zaštitili vaše osobne
        podatke od neovlaštenog pristupa, gubitka, zlouporabe ili promjene.
      </p>

      <h2>9. Medunarodni prijenos</h2>
      <p>
        Vaši podaci se u pravilu obrađuju unutar EU/EEA. Ako u rijetkim slučajevima koristimo
        usluge koje uključuju prijenos izvan EU/EEA, osigurat ćemo odgovarajuće jamstvo (npr.
        odluke Komisije o primjerenosti ili standardne ugovorne klauzule).
      </p>

      <h2>10. Maloljetnici</h2>
      <p>
        Naše usluge nisu namijenjene osobama mlađima od 16 godina. Svjesno ne prikupljamo
        osobne podatke od maloljetnika bez pristanka roditelja ili skrbnika.
      </p>

      <h2>11. Izmjene ove politike</h2>
      <p>
        Povremeno možemo ažurirati ovu Politiku privatnosti. O značajnim promjenama obavijestit
        ćemo vas putem stranice („Zadnje ažurirano“) ili, gdje je primjereno, putem emaila.
        Preporučujemo da povremeno pregledate ovu stranicu.
      </p>

      <h2>12. Kontakt</h2>
      <p>
        Za pitanja u vezi s ovom Politikom privatnosti ili vašim osobnim podacima, obratite se:
      </p>

      <CompanyInfoBox
        title="Kontakt"
        rows={[
          { label: "Pravno ime:", value: "DJ Domza eventi, obrt za usluge" },
          { label: "Adresa:", value: "Kikićeva ulica 12, 10000 Zagreb" },
          { label: "Email:", value: siteConfig.contact.email },
        ]}
        className="my-6"
      />

      <h2>13. Pravo na podnošenje pritužbe</h2>
      <p>
        Imate pravo podnijeti pritužbu nadležnom nadzornom tijelu za zaštitu osobnih podataka.
      </p>

      <CompanyInfoBox
        title="Agencija za zaštitu osobnih podataka (AZOP)"
        rows={[
          { label: "Adresa:", value: "Selska cesta 136, 10000 Zagreb, Hrvatska" },
          { label: "Telefon:", value: "+385 1 4609 000" },
          { label: "Web:", value: "https://www.azop.hr" },
        ]}
        className="my-6"
      />
    </LegalPageLayout>
  );
}
