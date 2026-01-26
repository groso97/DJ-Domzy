import type { Metadata } from "next";
import { siteConfig } from "@/config/constants";

export const metadata: Metadata = {
  title: "Politika privatnosti",
  description: "Politika privatnosti DJ Domzy web stranice",
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-32">
      <div className="max-w-3xl mx-auto prose prose-neutral dark:prose-invert">
        <h1>Politika privatnosti</h1>
        <p className="lead">
          Zadnje ažuriranje: {new Date().toLocaleDateString("hr-HR")}
        </p>

        <h2>1. Uvod</h2>
        <p>
          Dobrodošli na web stranicu DJ Domzy ({siteConfig.url}). 
          Poštujemo vašu privatnost i obvezujemo se zaštititi vaše osobne podatke.
        </p>

        <h2>2. Podaci koje prikupljamo</h2>
        <p>Prikupljamo sljedeće podatke:</p>
        <ul>
          <li>Ime i prezime</li>
          <li>Email adresa</li>
          <li>Broj telefona (opcionalno)</li>
          <li>Poruka i detalji o događaju</li>
        </ul>

        <h2>3. Kako koristimo vaše podatke</h2>
        <p>Vaše podatke koristimo isključivo za:</p>
        <ul>
          <li>Odgovaranje na vaše upite</li>
          <li>Slanje ponuda i informacija o uslugama</li>
          <li>Komunikaciju vezanu uz rezervacije</li>
        </ul>

        <h2>4. Dijeljenje podataka</h2>
        <p>
          Vaše osobne podatke ne prodajemo, ne iznajmljujemo i ne dijelimo 
          s trećim stranama, osim kada je to potrebno za pružanje usluge 
          ili kada to zahtijeva zakon.
        </p>

        <h2>5. Sigurnost podataka</h2>
        <p>
          Poduzimamo razumne mjere za zaštitu vaših osobnih podataka od 
          neovlaštenog pristupa, promjene ili uništenja.
        </p>

        <h2>6. Vaša prava</h2>
        <p>Imate pravo:</p>
        <ul>
          <li>Zatražiti pristup svojim podacima</li>
          <li>Zatražiti ispravak netočnih podataka</li>
          <li>Zatražiti brisanje svojih podataka</li>
          <li>Prigovoriti obradi svojih podataka</li>
        </ul>

        <h2>7. Kontakt</h2>
        <p>
          Za sva pitanja vezana uz privatnost, kontaktirajte nas na:{" "}
          <a href={`mailto:${siteConfig.contact.email}`}>
            {siteConfig.contact.email}
          </a>
        </p>
      </div>
    </div>
  );
}
