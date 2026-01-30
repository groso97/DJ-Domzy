import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageLayout } from "@/components/layout/legal-page-layout";
import { CompanyInfoBox } from "@/components/legal/company-info-box";
import { siteConfig } from "@/config/constants";

export const metadata: Metadata = {
  title: "Pravila o kolačićima",
  description: "Pravila o kolačićima DJ Domza web stranice",
};

const lastUpdated = "30. siječnja 2026.";

export default function CookiesPage() {
  return (
    <LegalPageLayout
      title="Pravila o kolačićima"
      breadcrumbLabel="Kolačići"
      lastUpdated={lastUpdated}
    >
      <p>
        Ova stranica objašnjava što su kolačići i kako ih koristimo na web stranici DJ Domza.
        Korištenjem naše stranice pristajete na kolačiće u skladu s ovim pravilima i našom{" "}
        <Link href="/privatnost">Politikom privatnosti</Link>.
      </p>

      <h2>1. Što su kolačići?</h2>
      <p>
        Kolačići (cookies) su male tekstualne datoteke koje web stranica pohranjuje na vaš
        uređaj (računalo, tablet, mobitel) kada je posjetite. Omogućuju stranici da zapamti
        vaše postavke, prijave ili ponašanje tijekom posjeta ili između posjeta, što
        poboljšava korisničko iskustvo.
      </p>

      <h2>2. Kako koristimo kolačiće</h2>
      <p>
        Na stranici DJ Domza kolačiće koristimo u sljedeće svrhe:
      </p>
      <ul>
        <li><strong>Nužni kolačići</strong> – potrebni za rad stranice (npr. sigurnost, učitavanje stranice).</li>
        <li><strong>Funkcionalni kolačići</strong> – pamte vaše postavke (npr. jezik, prihvaćanje kolačića).</li>
        <li><strong>Analitički kolačići</strong> – pomažu nam razumjeti kako posjetitelji koriste stranicu (npr. broj posjeta, popularne stranice). Možemo koristiti usluge kao što je Google Analytics.</li>
      </ul>
      <p>
        Ne koristimo kolačiće za oglašavanje temeljeno na vašem ponašanju na drugim stranicama.
      </p>

      <h2>3. Pravna osnova</h2>
      <p>
        Nužne kolačiće koristimo na temelju legitimnog interesa (ispravan rad stranice).
        Funkcionalne i analitičke kolačiće koristimo na temelju vašeg pristanka, koji možete
        dati putem banner-a ili postavki na stranici. Pristanak možete povući u bilo kojem
        trenutku brisanjem kolačića u postavkama preglednika ili nas kontaktiravši.
      </p>

      <h2>4. Trajanje čuvanja</h2>
      <p>
        Različiti kolačići imaju različito trajanje: neki se brišu kada zatvorite preglednik
        (sesijski kolačići), drugi ostaju određeno vrijeme (npr. nekoliko mjeseci) dok ih vi
        ili preglednik ne obrišete.
      </p>

      <h2>5. Upravljanje kolačićima</h2>
      <p>
        Kolačiće možete kontrolirati ili brisati putem postavki svog preglednika. Većina
        preglednika dopušta: blokiranje svih kolačića, blokiranje kolačića trećih strana ili
        brisanje postojećih kolačića. Napomena: blokiranje nužnih kolačića može utjecati na
        funkcionalnost stranice.
      </p>
      <p>
        Upute za upravljanje kolačićima u popularnim preglednicima obično se nalaze u
        izborniku „Postavke“ ili „Privatnost“. Za više informacija možete posjetiti stranice
        pružatelja preglednika (npr. Google Chrome, Mozilla Firefox, Safari, Microsoft Edge).
      </p>

      <h2>6. Kolačići trećih strana</h2>
      <p>
        Na stranici mogu biti ugrađeni sadržaji ili alati trećih strana (npr. Google Analytics,
        ugrađeni videozapisi) koji postavljaju vlastite kolačiće. Za njihovu uporabu i
        politike privatnosti odgovorne su te treće strane. Preporučujemo da pregledate njihove
        politike privatnosti.
      </p>

      <h2>7. Izmjene</h2>
      <p>
        Ova Pravila o kolačićima mogu se povremeno ažurirati kako bismo odražavali promjene
        u praksi ili zakonodavstvu. O značajnim promjenama obavijestit ćemo putem stranice
        („Zadnje ažurirano“). Preporučujemo da povremeno pregledate ovu stranicu.
      </p>

      <h2>8. Kontakt</h2>
      <p>
        Za pitanja u vezi s kolačićima ili zaštitom podataka, obratite nam se:
      </p>

      <CompanyInfoBox
        title="Kontakt"
        rows={[
          { label: "Obrt za usluge", value: "DJ Domza eventi" },
          { label: "Adresa:", value: "Kikićeva ulica 12, 10000 Zagreb" },
          { label: "Email:", value: siteConfig.contact.email },
        ]}
        className="my-6"
      />
    </LegalPageLayout>
  );
}
