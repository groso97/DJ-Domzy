import type { Metadata } from "next";
import { siteConfig } from "@/config/constants";

export const metadata: Metadata = {
  title: "Uvjeti korištenja",
  description: "Uvjeti korištenja DJ Domza web stranice",
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-32">
      <div className="max-w-3xl mx-auto prose prose-neutral dark:prose-invert">
        <h1>Uvjeti korištenja</h1>
        <p className="lead">
          Zadnje ažuriranje: {new Date().toLocaleDateString("hr-HR")}
        </p>

        <h2>1. Prihvaćanje uvjeta</h2>
        <p>
          Korištenjem ove web stranice pristajete na ove uvjete korištenja. 
          Ako se ne slažete s bilo kojim dijelom uvjeta, molimo vas da ne 
          koristite stranicu.
        </p>

        <h2>2. Usluge</h2>
        <p>
          DJ Domza pruža profesionalne DJ usluge za razne događaje uključujući 
          vjenčanja, rođendane, korporativne evente i klubove.
        </p>

        <h2>3. Rezervacije</h2>
        <p>
          Rezervacije se smatraju potvrđenima tek nakon pisane potvrde i 
          uplate akontacije prema dogovoru. Uvjeti otkazivanja i povrata 
          definiraju se individualnim ugovorom.
        </p>

        <h2>4. Cijene</h2>
        <p>
          Cijene usluga ovise o vrsti događaja, trajanju, lokaciji i 
          dodatnim zahtjevima. Točna cijena bit će navedena u ponudi.
        </p>

        <h2>5. Intelektualno vlasništvo</h2>
        <p>
          Sav sadržaj na ovoj stranici, uključujući tekstove, slike, logotipe 
          i grafičke elemente, vlasništvo je DJ Domza i zaštićen je autorskim 
          pravima.
        </p>

        <h2>6. Ograničenje odgovornosti</h2>
        <p>
          DJ Domza neće biti odgovoran za bilo kakvu štetu nastalu korištenjem 
          ove web stranice ili nemogućnošću korištenja iste.
        </p>

        <h2>7. Izmjene uvjeta</h2>
        <p>
          Zadržavamo pravo izmjene ovih uvjeta u bilo kojem trenutku. 
          Nastavkom korištenja stranice nakon izmjena, prihvaćate nove uvjete.
        </p>

        <h2>8. Kontakt</h2>
        <p>
          Za sva pitanja vezana uz ove uvjete, kontaktirajte nas na:{" "}
          <a href={`mailto:${siteConfig.contact.email}`}>
            {siteConfig.contact.email}
          </a>
        </p>
      </div>
    </div>
  );
}
