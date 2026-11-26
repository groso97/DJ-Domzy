# Google Ads – analiza i plan povezivanja za djdomza-eventi.hr

> Datum analize: 26.11.2026.
> Projekt: Next.js 16 (App Router) one-page stranica, hostana na Vercelu, kontakt forma preko Resenda.

---

## 0. Sažetak (TL;DR)

**Cilj:** kad netko klikne oglas, treba doći na stranicu koja točno odgovara onome što je tražio, a svaki upit (forma, poziv, WhatsApp) mora se zabilježiti kao **konverzija** u Google Adsu. Tek tada Google može sam optimizirati ponude i trošiti budžet na ljude koji stvarno šalju upite.

**Redoslijed (najkraći put do kvalitetnih kampanja):**

| # | Korak | Trajanje | Prioritet |
|---|-------|----------|-----------|
| 0 | Sigurnosni i tehnički preduvjeti (rotirati Resend ključ, og-image, Search Console) | 1 h | 🔴 hitno |
| 1 | Računi: Google Ads, GA4, GTM, Search Console, Google Business Profile + međusobno povezivanje | 2–3 h | 🔴 |
| 2 | Cookie banner s pravom privolom + **Consent Mode v2** (obavezno u EU) | 3–4 h dev | 🔴 |
| 3 | GTM u Next.js layoutu | 30 min dev | 🔴 |
| 4 | Praćenje konverzija (forma, tel, WhatsApp, email) | 2–3 h dev + GTM | 🔴 |
| 5 | Enhanced conversions + spremanje GCLID-a uz upit | 2 h dev | 🟠 |
| 6 | Zasebne landing stranice po usluzi + sticky mobilni CTA | 1–2 dana dev | 🟠 |
| 7 | Brzina stranice (LCP hero slike, velike slike) | 2 h dev | 🟡 |
| 8 | Postavljanje kampanja (ključne riječi, oglasi, negativne riječi, lokacije, budžet) | 3–4 h | 🔴 |
| 9 | QA i testiranje svih konverzija | 1 h | 🔴 |
| 10 | Tjedna/mjesečna optimizacija | stalno | 🟢 |

🤖 **Implementacija koda:** za AI agenta / developera sve je sažeto u **[sekciji 16 – Upute za implementaciju](#16-upute-za-implementaciju-za-ai-agenta--developera)** (opseg, odluke, zamke, faze, kriteriji prihvaćanja).

⚠️ **Sezonski timing:** danas je kraj studenog – sezona **božićnih domjenaka** je upravo sada. Preporuka: odraditi korake 0–4 i 8–9 u što kraćem roku (2–3 dana) i odmah pokrenuti kampanju *„Božićni / poslovni domjenak – last minute“*, a landing stranice (korak 6) dodati u sljedećem krugu. Odmah iza toga (siječanj–travanj) kreće glavna sezona **rezervacija za ljetna vjenčanja**.

---

## 1. Analiza trenutnog stanja

### 1.1 Što je dobro

| Stavka | Stanje | Zašto je važno za Ads |
|---|---|---|
| Next.js + Vercel | Brzo, SSR, HTTPS | Dobar „Landing page experience“ → viši Quality Score, niži CPC |
| Jasni CTA gumbi | „Zatraži ponudu“ (hero, cijene, CTA), „Nazovi odmah“ | Jasna konverzijska akcija |
| `tel:` linkovi | Hero, CTA, Kontakt, Footer | Lako se prate preko GTM-a bez dodatnog koda |
| WhatsApp link | Footer (`wa.me/...`) | Dodatni kanal konverzije |
| Kontakt forma | Ime, email, telefon, datum, vrsta događaja, poruka | Vrsta događaja = vrijedan podatak za segmentaciju konverzija |
| Recenzije (7 × 5★) | S imenom, lokacijom i datumom | Povjerenje → viša stopa konverzije |
| Metadata, OG, JSON-LD, sitemap, robots | Postoji | Osnova za SEO/kvalitetu |
| Vercel Analytics + Speed Insights | Postoji | Ostaje, ne smeta Google tagovima |

### 1.2 Što nedostaje / blokira Google Ads

| # | Problem | Gdje | Posljedica | Rješenje (korak) |
|---|---|---|---|---|
| 1 | **Nema Google taga** (ni GTM, ni GA4, ni Ads) | `app/layout.tsx` | Ads ne zna tko je poslao upit → nema optimizacije | Korak 3 |
| 2 | **Nema praćenja konverzija** – forma samo prikaže toast, nema eventa ni thank-you stranice | `components/features/contact.tsx` (`onSubmit`) | Nema konverzija → „Maksimiziraj konverzije“ ne radi | Korak 4 |
| 3 | **Cookie banner je samo obavijest** („Razumijem“), nema odbijanja ni privole | `components/shared/cookie-banner/cookie-banner.tsx` | Za Google Ads u EU treba **Consent Mode v2** + stvarna privola. Bez toga Google ne gradi remarketing liste i gubi velik dio konverzija | Korak 2 |
| 4 | Stranica `/kolacici` izričito piše da se **NE koriste** Google Analytics ni oglašivački kolačići | `app/kolacici/page.tsx` (red ~66) | Nakon dodavanja Ads/GA4 tekst postaje netočan → pravni rizik (GDPR/AZOP) | Korak 2.4 |
| 5 | **Sve je na jednoj stranici** (`/`) | `app/page.tsx` | Oglas „DJ za vjenčanje“ i oglas „DJ za domjenak“ vode na istu stranicu → slabija relevantnost, niži Quality Score, viši CPC | Korak 6 |
| 6 | U formi **nema opcije „Djevojačka / momačka večer“**, iako je to jedna od 4 usluge | `contact.tsx` `eventTypes` + `app/api/contact/route.ts` `eventTypeLabels` | Ne može se razlikovati konverzija po usluzi | Korak 4.2 |
| 7 | **Placeholder za Google verifikaciju**: `verification: { google: "verification_token_here" }` | `app/layout.tsx` | Search Console nije verificiran (ili je pogrešan meta tag u produkciji) | Korak 0.3 |
| 8 | **`/og-image.jpg` ne postoji** u `public/` | `config/constants.ts` → `ogImage` | Pokvaren preview kod dijeljenja (FB, WhatsApp, Viber…) | Korak 0.2 |
| 9 | **Hero slika je CSS `background-image`** (nije `next/image`, nema preload) | `components/features/hero.tsx` | Sporiji LCP na mobitelu (većina Ads prometa za ovu nišu je mobilna) | Korak 7 |
| 10 | `public/dj-domza.png` je **2 MB PNG** | `components/features/about.tsx` | `next/image` ga optimizira, ali izvor bi trebao biti JPG/WebP ~200 KB | Korak 7 |
| 11 | Nema GCLID/UTM podataka u upitu | forma + API | Ne zna se koji upit je došao iz oglasa ni koji je postao rezervacija | Korak 5 |
| 12 | JSON-LD tip je `MusicGroup` | `app/layout.tsx` | Za lokalnu uslugu bolje `LocalBusiness`/`EntertainmentBusiness` (pomaže i Google Business Profile vezi) | Korak 7.4 |
| 13 | Na mobitelu nema stalno vidljivog gumba za poziv/WhatsApp | header / layout | Posjetitelj iz oglasa mora skrolati da nađe kontakt | Korak 6.4 |

### 1.3 🔴 Sigurnosni nalaz (nije Ads, ali je hitno)

Datoteka **`env.example` je u gitu i sadrži nešto što izgleda kao pravi Resend API ključ** (`RESEND_API_KEY=re_NLUq...`). Repozitorij je javan (commit „after making repo public“). Svatko tko ga pronađe može slati emailove s vaše domene.

1. Resend dashboard → API Keys → **obriši (revoke) taj ključ**, napravi novi.
2. Novi ključ upiši samo u **Vercel → Project → Settings → Environment Variables** (i lokalni `.env.local`, koji je u `.gitignore`).
3. U `env.example` stavi placeholder: `RESEND_API_KEY=re_xxxxxxxxxxxxxxxx`.
4. Ključ je i dalje vidljiv u git povijesti – zato je rotacija obavezna (samo brisanje iz datoteke nije dovoljno).

Usput: u `app/api/contact/route.ts` se `name`/`message` ubacuju u HTML emaila bez escapanja – nije kritično (email ide samo vama), ali preporuka je dodati jednostavnu `escapeHtml()` funkciju.

---

## 2. Korak 0 – Preduvjeti

### 0.1 Rotacija Resend ključa
Vidi 1.3.

### 0.2 OG slika
- Napraviti `public/og-image.jpg` dimenzija **1200 × 630 px** (logo + fotka za pultom + „DJ za vjenčanja i evente – Zagreb“).
- Alternativa: `app/opengraph-image.jpg` (Next.js ga automatski koristi).

### 0.3 Google Search Console
1. https://search.google.com/search-console → **Add property → Domain** → `djdomza-eventi.hr` (verifikacija DNS TXT zapisom kod registrara domene – najbolje, pokriva www i non-www).
2. Ako se koristi „URL prefix“ metoda s meta tagom → u `app/layout.tsx` zamijeniti `verification_token_here` pravim tokenom. Ako se koristi DNS → **obrisati** cijeli `verification` blok (placeholder ne smije ostati).
3. Submit sitemap: `https://djdomza-eventi.hr/sitemap.xml`.

### 0.4 Provjera domene / canonical
- Provjeriti da `NEXT_PUBLIC_SITE_URL` u Vercelu = `https://djdomza-eventi.hr` i da www → non-www redirect radi (Vercel → Domains). Final URL u oglasima mora biti ista varijanta.

---

## 3. Korak 1 – Računi i povezivanje

Sve otvoriti **na isti Google račun** (preporuka: poslovni Gmail, npr. onaj koji je vlasnik domene / Business Profilea). Kasnije dodati dodatne korisnike (developer, agencija) kao admine – nikad ne dijeliti lozinku.

### 1.1 Google Ads račun
1. https://ads.google.com → **New Google Ads account**.
2. Kad ponudi „Smart campaign“ / vođeno postavljanje → kliknuti **„Switch to Expert Mode“** → **„Create an account without a campaign“**. (Smart kampanje ne daju kontrolu nad ključnim riječima ni negativnim riječima.)
3. Postavke računa (⚠️ **ne mogu se kasnije promijeniti**):
   - Zemlja naplate: **Hrvatska**
   - Vremenska zona: **(GMT+01:00) Zagreb**
   - Valuta: **EUR**
4. Billing: tip računa poslovni (obrt/d.o.o.), unijeti OIB / PDV ID ako postoji – zbog ispravnih računa (Google Ireland izdaje račune; ako ste u sustavu PDV-a, primjenjuje se reverse charge).
5. Dovršiti **Advertiser verification** kad Google zatraži (osobna/poslovna dokumentacija) – bez toga oglasi mogu biti pauzirani.

### 1.2 Google Analytics 4
1. https://analytics.google.com → Admin → **Create property** → „DJ Domza – web“, vremenska zona Hrvatska, valuta EUR.
2. **Data stream → Web** → `https://djdomza-eventi.hr` → kopirati **Measurement ID** (`G-XXXXXXX`).
3. Admin → Data collection → **uključiti Google signals** (opcionalno, za remarketing; samo uz privolu).
4. Admin → Data retention → **14 mjeseci**.
5. Admin → Data filters → interni promet (vaša IP adresa) → Active.

### 1.3 Google Tag Manager
1. https://tagmanager.google.com → **Create account** → Container „djdomza-eventi.hr“ → **Web**.
2. Kopirati **Container ID** (`GTM-XXXXXXX`).
3. Admin → **Container settings** → uključiti **„Enable consent overview“** (za Consent Mode).

### 1.4 Google Business Profile (ako ne postoji – napraviti)
- https://business.google.com → kategorija **„DJ“** (ili „Disc jockey“), usluga u području (Service area business) – Zagreb + županije, bez javne adrese ako je nemate.
- Dodati iste fotke iz galerije, telefon, web, radno vrijeme, usluge (Vjenčanja, Rođendani, Domjenci, Djevojačke/momačke).
- Zamoliti klijente iz recenzija na webu da ostave recenziju i na Googleu → **zvjezdice se mogu prikazivati u oglasima**.

### 1.5 Povezivanje (linking) – obavezno

| Iz | U | Gdje | Zašto |
|---|---|---|---|
| GA4 | Google Ads | GA4 → Admin → Product links → **Google Ads links** → Link → uključiti „Enable personalized advertising“ + „Enable auto-tagging“ | Uvoz GA4 publika i metrika u Ads |
| Search Console | GA4 | GA4 → Admin → Product links → Search Console links | Organic upiti u GA4 |
| Search Console | Google Ads | Ads → Tools → **Data manager** → Search Console | Usporedba plaćenog i organskog prometa |
| Business Profile | Google Ads | Ads → Tools → Data manager → Google Business Profile | **Location assets** (adresa/karta/recenzije uz oglas) |
| Google Ads | — | Ads → Admin → Account settings → **Auto-tagging: ON** | Dodaje `gclid` u URL – nužno za mjerenje |

---

## 4. Korak 2 – Cookie banner s privolom + Consent Mode v2

### 2.1 Zašto
Od ožujka 2024. Google za korisnike iz EU/EEA **zahtijeva Consent Mode v2** (signale `ad_storage`, `ad_user_data`, `ad_personalization`, `analytics_storage`). Bez njih:
- ne radi remarketing ni slične publike,
- konverzije iz EU se mjere znatno lošije,
- prema GDPR-u i hrvatskom Zakonu o elektroničkim komunikacijama oglašivački/analitički kolačići (osim nužnih) smiju se postaviti tek nakon **aktivne privole**.

Trenutni banner („Razumijem“) je samo obavijest – za Vercel Analytics (bez kolačića) to je bilo OK, ali za Google tagove **nije dovoljno**.

### 2.2 Opcija A (preporuka): proširiti postojeći custom banner
Za **oglašivače** (ne izdavače) Google ne zahtijeva certificirani CMP, pa je vlastiti banner dovoljan ako ispravno šalje consent signale. Prednost: zadržava se dizajn stranice i nema mjesečne pretplate.

**Zahtjevi za banner:**
- 3 akcije: **„Prihvati sve“**, **„Odbij“** (jednako vidljiv gumb kao Prihvati – ne skriven link), **„Postavke“** (checkboxovi: Analitika, Oglašavanje).
- Ništa od Google kolačića prije klika.
- Odluka se pamti (localStorage) i šalje se `gtag('consent','update', …)`.
- Link **„Postavke kolačića“** u footeru koji ponovno otvara banner (pravo na povlačenje privole).

**Opcija B:** gotov CMP (Cookiebot, CookieYes, Usercentrics, Consentmanager) kroz GTM Community Template – brže, ali košta od ~10 €/mj i vizualno odudara.

### 2.3 Implementacija (Opcija A)

**a) Default consent PRIJE GTM-a** – u `app/layout.tsx`, unutar `<head>` (pored JSON-LD skripte):

```tsx
// app/layout.tsx
import { CONSENT_STORAGE_KEY } from "@/config/constants";

const consentDefaultScript = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  functionality_storage: 'granted',
  security_storage: 'granted',
  wait_for_update: 500
});
gtag('set', 'ads_data_redaction', true);
gtag('set', 'url_passthrough', true);
try {
  var saved = JSON.parse(localStorage.getItem('${CONSENT_STORAGE_KEY}') || 'null');
  if (saved) gtag('consent', 'update', saved);
} catch (e) {}
`;

// u <head>:
<script dangerouslySetInnerHTML={{ __html: consentDefaultScript }} />
```

**b) Konstanta** u `config/constants.ts`:

```ts
/** Spremljena odluka o privoli (Consent Mode v2) */
export const CONSENT_STORAGE_KEY = "djdomza-consent-v1";
```
(Stari `COOKIE_CONSENT_KEY` se može ukloniti ili ignorirati – novi ključ znači da će svi posjetitelji jednom ponovno vidjeti banner, što je i potrebno.)

**c) Helper** `lib/consent.ts`:

```ts
import { CONSENT_STORAGE_KEY } from "@/config/constants";

export type ConsentState = {
  analytics_storage: "granted" | "denied";
  ad_storage: "granted" | "denied";
  ad_user_data: "granted" | "denied";
  ad_personalization: "granted" | "denied";
};

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function saveConsent(state: ConsentState) {
  localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(state));
  window.gtag?.("consent", "update", state);
  window.dataLayer?.push({ event: "consent_update" });
}

export function buildConsent(analytics: boolean, ads: boolean): ConsentState {
  const a = analytics ? "granted" : "denied";
  const m = ads ? "granted" : "denied";
  return { analytics_storage: a, ad_storage: m, ad_user_data: m, ad_personalization: m };
}

export function getSavedConsent(): ConsentState | null {
  try {
    return JSON.parse(localStorage.getItem(CONSENT_STORAGE_KEY) || "null");
  } catch {
    return null;
  }
}
```

**d) Banner** (`cookie-banner.tsx`) – logika:

```tsx
const acceptAll = () => { saveConsent(buildConsent(true, true)); setIsVisible(false); };
const rejectAll = () => { saveConsent(buildConsent(false, false)); setIsVisible(false); };
const saveCustom = () => { saveConsent(buildConsent(analytics, ads)); setIsVisible(false); };

useEffect(() => {
  if (!getSavedConsent()) setIsVisible(true);
  const reopen = () => setIsVisible(true);
  window.addEventListener("open-cookie-settings", reopen);
  return () => window.removeEventListener("open-cookie-settings", reopen);
}, []);
```

U footer dodati gumb:

```tsx
<button type="button" onClick={() => window.dispatchEvent(new Event("open-cookie-settings"))}>
  Postavke kolačića
</button>
```

### 2.4 Pravni tekstovi – OBAVEZNO ažurirati
- **`app/kolacici/page.tsx`**: maknuti iz liste „ne koristimo“ stavke *Google Analytics* i *Reklamni kolačići*; dodati tablicu s kolačićima: `_ga`, `_ga_*` (GA4, 2 god.), `_gcl_au`, `_gcl_aw` (Google Ads, 90 dana), `djdomza-consent-v1` (localStorage, nužno). Objasniti razliku „Prihvati sve“ / „Odbij“ / „Postavke“ (trenutni tekst objašnjava zašto je gumb „Razumijem“ – treba ga prepisati).
- **`app/privatnost/page.tsx`**: dodati Google Ireland Ltd. kao primatelja podataka (analitika i oglašavanje), pravna osnova = privola, prijenos u SAD (EU-US Data Privacy Framework), te da se kod enhanced conversions hashirani email/telefon iz forme šalju Googleu (ako se uvede korak 5).

---

## 5. Korak 3 – Google Tag Manager u Next.js

### 3.1 Instalacija
```bash
npm install @next/third-parties
```

### 3.2 Environment varijabla
Vercel → Settings → Environment Variables (Production + Preview):
```
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```
Dodati i u `env.example` (s placeholderom).

### 3.3 `app/layout.tsx`
```tsx
import { GoogleTagManager } from "@next/third-parties/google";

// ...
return (
  <html lang="hr" className="dark" suppressHydrationWarning>
    <head>
      <script dangerouslySetInnerHTML={{ __html: consentDefaultScript }} />  {/* MORA biti prvi */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </head>
    {process.env.NEXT_PUBLIC_GTM_ID && (
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
    )}
    <body>…</body>
  </html>
);
```

> Ne dodavati GA4/Ads tag direktno u kod – **sve ide kroz GTM**. Tako se nove konverzije, remarketing i sl. dodaju bez novog deploya.

### 3.4 Osnovni tagovi u GTM-u
| Tag | Tip | Trigger | Consent |
|---|---|---|---|
| **Google Tag – GA4** | Google Tag, ID `G-XXXXXXX` | Initialization – All Pages | Built-in (analytics_storage) |
| **Google Tag – Ads** | Google Tag, ID `AW-XXXXXXXXX` | Initialization – All Pages | Built-in (ad_storage) |
| **Conversion Linker** | Conversion Linker | All Pages | Built-in |

`AW-` ID se nalazi u Ads → Goals → Conversions → (nakon kreiranja prve konverzije) → „Use Google Tag Manager“.

Napomena: Next.js App Router radi navigaciju bez reloada (npr. `/` → `/privatnost`). GA4 to hvata preko **Enhanced measurement → Page changes based on browser history events** (uključeno po defaultu) – provjeriti da je ON.

---

## 6. Korak 4 – Praćenje konverzija

### 4.1 Što se mjeri

| Konverzija (Ads naziv) | Kako se okida | Vrsta u Adsu | Primarna? | Vrijednost (prijedlog) |
|---|---|---|---|---|
| **Upit – kontakt forma** | `generate_lead` event nakon **uspješnog** slanja (`result.success`) | Submit lead form | ✅ Da | 50 € |
| **Klik na telefon** | klik na `tel:` link | Phone call lead | ✅ Da | 30 € |
| **Klik na WhatsApp** | klik na `wa.me` link | Contact | ✅ Da | 30 € |
| **Klik na email** | klik na `mailto:` link | Contact | ❌ Sekundarna | 10 € |
| **Poziv iz oglasa** (call asset) | Google forwarding broj, poziv ≥ 60 s | Phone call lead | ✅ Da | 50 € |
| **Rezervacija (offline)** | ručni uvoz (korak 5) | Converted lead | ✅ kad bude dovoljno podataka | stvarni iznos ugovora |

- Vrijednosti su **relativne težine** za Google algoritam (forma > klik na broj), ne stvarni prihod. Kasnije ih uskladiti s realnim omjerom upit → rezervacija.
- **Count: „One“** za sve lead konverzije (jedna osoba = jedan lead, čak i ako pošalje 3 forme).
- Click-through window: **90 dana** za formu (vjenčanja se planiraju dugo), view-through 1 dan.
- ⚠️ *Poziv iz oglasa*: Google forwarding brojevi nisu dostupni u svim zemljama. Ako u Ads → Call assets → „Call reporting“ za Hrvatsku nije dostupno, tu konverziju preskočiti i pozive iz oglasa bilježiti ručno.

### 4.2 Izmjene u kodu

**a) Helper za dataLayer** – `lib/analytics.ts`:

```ts
export function trackEvent(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}

/** E.164 bez razmaka, npr. +385991234567 – za enhanced conversions */
export function normalizePhone(phone?: string) {
  if (!phone) return undefined;
  let p = phone.replace(/[^\d+]/g, "");
  if (p.startsWith("00")) p = "+" + p.slice(2);
  if (p.startsWith("0")) p = "+385" + p.slice(1);
  return p.length >= 10 ? p : undefined;
}
```

**b) Forma** – `components/features/contact.tsx`, u `onSubmit` unutar `if (result.success)`:

```ts
if (result.success) {
  trackEvent("generate_lead", {
    form_name: "kontakt",
    event_type: data.eventType,          // vjencanje / rodendan / korporativni / ...
    value: 50,
    currency: "EUR",
    user_data: {                          // za enhanced conversions (korak 5)
      email: data.email.trim().toLowerCase(),
      phone_number: normalizePhone(data.phone),
    },
  });
  toast.success(...);
  reset();
}
```

> ⚠️ Event se šalje **samo kod uspjeha** – ne na klik „Pošalji upit“ (inače se broje i neuspjela slanja i validacijske greške).

**c) Dodati vrstu događaja „Djevojačka / momačka večer“** u oba mjesta:

```ts
// components/features/contact.tsx – eventTypes
{ value: "djevojacka-momacka", label: "Djevojačka / momačka večer" },

// app/api/contact/route.ts – eventTypeLabels
"djevojacka-momacka": "Djevojačka / momačka večer",
```

**d) Predodabir vrste događaja iz URL-a** (za landing stranice i oglase) – `Contact` prima prop:

```tsx
export function Contact({ defaultEventType = "" }: { defaultEventType?: string }) {
  // ...
  defaultValues: { eventType: defaultEventType, eventDate: "" },
```

**e) Klikovi na tel / WhatsApp / mailto** – **nije potreban kod**, rješava se GTM triggerima (vidi 4.3). Postojeći `<a href="tel:...">` i `<a href="https://wa.me/...">` su dovoljni.

### 4.3 GTM konfiguracija

**Varijable** (Variables → Configure → uključiti built-in): `Click URL`, `Click Text`, `Page Path`.

**Data Layer varijable:**
| Naziv | Data Layer Variable Name |
|---|---|
| `DLV - event_type` | `event_type` |
| `DLV - value` | `value` |
| `DLV - user_data.email` | `user_data.email` |
| `DLV - user_data.phone_number` | `user_data.phone_number` |

**User-Provided Data varijabla** (za enhanced conversions): tip *User-Provided Data* → Manual configuration → Email = `{{DLV - user_data.email}}`, Phone = `{{DLV - user_data.phone_number}}`.

**Triggeri:**
| Trigger | Tip | Uvjet |
|---|---|---|
| `CE - generate_lead` | Custom Event | Event name = `generate_lead` |
| `Click - tel` | Click – Just Links (Wait for tags: 2000 ms) | Click URL **starts with** `tel:` |
| `Click - WhatsApp` | Click – Just Links | Click URL **contains** `wa.me` |
| `Click - mailto` | Click – Just Links | Click URL **starts with** `mailto:` |

**Tagovi:**
| Tag | Tip | Trigger | Postavke |
|---|---|---|---|
| `GA4 - generate_lead` | GA4 Event | CE - generate_lead | Event name `generate_lead`, params: `event_type`, `value`, `currency=EUR` (⚠️ **NE** slati `user_data` u GA4 – PII je zabranjen u GA4) |
| `GA4 - phone_click` | GA4 Event | Click - tel | `phone_click`, param `link_url={{Click URL}}` |
| `GA4 - whatsapp_click` | GA4 Event | Click - WhatsApp | `whatsapp_click` |
| `GA4 - email_click` | GA4 Event | Click - mailto | `email_click` |
| `Ads - Conv - Upit forma` | Google Ads Conversion Tracking | CE - generate_lead | Conversion ID + Label iz Adsa, Value `{{DLV - value}}`, Currency EUR, ✅ *Include user-provided data* → `{{User-Provided Data}}` |
| `Ads - Conv - Klik telefon` | Google Ads Conversion Tracking | Click - tel | ID + Label |
| `Ads - Conv - Klik WhatsApp` | Google Ads Conversion Tracking | Click - WhatsApp | ID + Label |
| `Ads - Conv - Klik email` | Google Ads Conversion Tracking | Click - mailto | ID + Label |

Nakon objave u GA4 → Admin → Events → označiti `generate_lead` kao **Key event** (za izvještaje). U Adsu koristiti **direktne Ads tagove** kao primarne konverzije (preciznije od uvezenih GA4 key eventa – ne uvoziti oba kao primarna, inače dupliranje).

### 4.4 Kreiranje konverzija u Google Adsu
Ads → **Goals → Conversions → Summary → + New conversion action → Website → Add a conversion action manually**:

Za svaku iz tablice 4.1:
- Goal category (vidi tablicu), Name, Value (Use the same value: X EUR), Count: **One**, Click-through window 90 dana, Attribution: **Data-driven**.
- „Tag setup“ → **Use Google Tag Manager** → kopirati *Conversion ID* i *Conversion Label* u GTM tag.

Zatim Goals → **Settings → Enhanced conversions** → ON → metoda **Google Tag Manager**.

---

## 7. Korak 5 – Enhanced conversions + GCLID (kvaliteta leadova)

### 5.1 Enhanced conversions
Već pokriveno u 4.2 b) i 4.3 (`user_data` + *Include user-provided data*). Google hashira email/telefon (SHA-256) i spaja ih s prijavljenim Google korisnicima → vraća dio konverzija koje kolačići ne uhvate (Safari, odbijen consent, više uređaja). Šalje se samo ako je `ad_user_data = granted`.

### 5.2 Spremanje GCLID-a i UTM-a uz upit
Svrha: u emailu s upitom vidjeti **je li upit došao iz oglasa i iz koje kampanje** → kasnije uvesti „Rezervacija“ kao offline konverziju (Google tada optimizira na **rezervacije**, ne samo na upite).

**a)** `lib/attribution.ts`:
```ts
const KEY = "djdomza-attribution";
const PARAMS = ["gclid", "gbraid", "wbraid", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];

export function captureAttribution() {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  const found: Record<string, string> = {};
  PARAMS.forEach((p) => { const v = url.searchParams.get(p); if (v) found[p] = v; });
  if (Object.keys(found).length) {
    found.landing_page = url.pathname;
    found.captured_at = new Date().toISOString();
    sessionStorage.setItem(KEY, JSON.stringify(found));
  }
}

export function getAttribution(): Record<string, string> {
  try { return JSON.parse(sessionStorage.getItem(KEY) || "{}"); } catch { return {}; }
}
```
- `captureAttribution()` pozvati u `useEffect` postojeće `HashScroll` komponente (ili nove `AttributionCapture` klijentske komponente u layoutu).
- U `onSubmit` forme: `body: JSON.stringify({ ...data, attribution: getAttribution() })`.

**b)** `app/api/contact/route.ts`:
```ts
const contactSchema = z.object({
  // ...postojeća polja
  attribution: z.record(z.string().max(500)).optional(),
});
```
i u `buildEmailHtml` dodati mali blok na dnu emaila: *Izvor: Google Ads – kampanja X – gclid: …* (ili „Direktno / organski“ ako je prazno).

**c) Offline import „Rezervacija“** (kad klijent potpiše/uplati kaparu):
1. Ads → Goals → Conversions → New → **Import → Other data sources or CRMs → Track conversions from clicks** → naziv „Rezervacija“, kategorija *Converted lead*.
2. Voditi jednostavnu Google Sheets tablicu: `Google Click ID | Conversion Name | Conversion Time | Conversion Value | Conversion Currency`.
3. Jednom tjedno: Ads → Tools → Uploads → upload tablice (ili spojiti Sheet za automatski raspored).
4. GCLID vrijedi **90 dana** od klika – uvoziti redovito.

> Alternativa bez GCLID-a: **Enhanced conversions for leads** – uvoz hashiranog emaila iz upita koji je postao rezervacija. Radi i kad je GCLID izgubljen. Uključuje se u Goals → Settings → *Enhanced conversions for leads*.

---

## 8. Korak 6 – Landing stranice po usluzi

### 6.1 Zašto
Google ocjenjuje **relevantnost oglasa ↔ ključne riječi ↔ landing stranice** (Quality Score 1–10). Jedna stranica za sve = osrednji QS = viši CPC i lošija pozicija. Osoba koja traži „DJ za vjenčanje“ i vidi naslov *„Glazba koja pokreće emocije“* i odmah ispod rođendane i djevojačke ne dobiva potvrdu da je na pravom mjestu.

### 6.2 Predložene stranice

| URL | H1 (prijedlog) | Ključne riječi | Recenzije (iz `testimonials`) | Predodabrano u formi |
|---|---|---|---|---|
| `/dj-za-vjencanje` | DJ za vjenčanje – Zagreb i okolica | dj za vjenčanje, dj za svadbu, svadbeni dj | Lina & Bruno | `vjencanje` |
| `/dj-za-domjenak` | DJ za poslovne i božićne domjenke | dj za domjenak, dj za božićni domjenak, dj za firmu, dj team building | Marina M. D., Sandra & Borna | `korporativni` |
| `/dj-za-rodendan` | DJ za rođendan – 18., 30., 40., 50. | dj za rođendan, dj za 18. rođendan, dj za 50. rođendan | Viktorija V. | `rodendan` |
| `/dj-za-djevojacku-i-momacku` | DJ za djevojačku i momačku večer | dj za djevojačku, dj za momačku | Iva M., Barbara Š., Martina M. | `djevojacka-momacka` |

### 6.3 Struktura svake landing stranice (redoslijed sekcija)
1. **Hero** s H1 koji ponavlja ključnu riječ + 1 rečenica koristi + 2 gumba (*Provjeri slobodan termin* → forma, *Nazovi* → tel) + 3 brojke (50+ evenata, 8+ godina, 5★).
2. **Što dobivate** – 4–6 bulleta specifičnih za tu uslugu (npr. za vjenčanje: prvi ples, ulazak mladenaca, rezanje torte, bacanje buketa, mikrofon za govore, razglas za ceremoniju, rasvjeta…).
3. **Recenzije** – filtrirane na tu vrstu događaja.
4. **Galerija** (2–4 relevantne fotke).
5. **Kako izgleda suradnja** – 3 koraka (Upit → Ponuda u 24 h → Dogovor glazbe).
6. **FAQ** (5–6 pitanja: koliko traje, oprema, putni troškovi izvan Zagreba, kapara, želje za pjesme…) + `FAQPage` JSON-LD.
7. **Kontakt forma** s predodabranom vrstom događaja.

**Tehnički:**
- Napraviti komponentu `components/features/service-landing.tsx` koja prima podatke (naslov, bulleti, filter recenzija, FAQ, `defaultEventType`) – podatke držati u `config/landing-pages.ts`, a stranice su tanke: `app/dj-za-vjencanje/page.tsx` → `<ServiceLanding data={landingPages.vjencanje} />`.
- Svaka stranica: vlastiti `metadata` (title, description, canonical, OG).
- Dodati sve u `app/sitemap.ts`.
- Linkati ih iz sekcije **Usluge** na početnoj (kartica → „Saznaj više“) – dobro i za SEO.
- Ne stavljati ih iza `noindex` – mogu donositi i organski promet.

### 6.4 Sticky mobilni CTA
Na mobitelu (< 768 px) fiksna traka na dnu ekrana s 2 gumba: **📞 Nazovi** i **💬 WhatsApp** (+ opcionalno *Upit*). Na landing stranicama i početnoj. Paziti da ne prekriva cookie banner (prikazati je tek kad je banner zatvoren ili je pomaknuti iznad njega).

### 6.5 Optimizacija forme za konverziju
- Polje **Poruka** trenutno je obavezno s min. 10 znakova → za Ads promet preporuka: **neobavezno** (manje trenja = više upita; vrsta događaja i datum su dovoljni za ponudu).
- **Telefon** preporučiti (placeholder „za brži odgovor“), ali ostaviti neobaveznim.
- Iznad gumba kratak trust tekst: *„Odgovor s ponudom unutar 24 h · bez obveze“*.

### 6.6 Cijene (poslovna odluka)
Sekcija „Cijene“ trenutno kaže da okvirna cijena ne postoji. Za Ads to znači da dio klikova (koje plaćate) dolazi od ljudi s premalim budžetom. Razmisliti o **„Paketi od X €“** na landing stranicama – manje, ali kvalitetnijih upita, niži trošak po rezervaciji. Može se koristiti i u oglasu (*Price asset*).

---

## 9. Korak 7 – Brzina stranice (Landing page experience)

| # | Zadatak | Datoteka |
|---|---|---|
| 7.1 | Hero pozadinu prebaciti s CSS `backgroundImage` na `<Image src="/hero-bg.jpg" fill priority sizes="100vw" className="object-cover" />` – preload + AVIF/WebP | `components/features/hero.tsx` |
| 7.2 | `public/dj-domza.png` (2 MB) konvertirati u JPG/WebP ~150–250 KB | `public/` + `about.tsx` |
| 7.3 | `dj-domza-pioneer.jpg` (525 KB) smanjiti na ≤ 250 KB | `public/gallery/` |
| 7.4 | JSON-LD: promijeniti `@type` u `["LocalBusiness", "EntertainmentBusiness"]` (ili dodati drugi objekt), dodati `geo`, `areaServed` (Grad Zagreb, Zagrebačka, Karlovačka, Krapinsko-zagorska…), `aggregateRating` **samo ako** se poklapa s vidljivim recenzijama | `app/layout.tsx` |
| 7.5 | `priceRange: "$$"` → `"€€"` | `app/layout.tsx` |
| 7.6 | Provjeriti PageSpeed Insights (mobile) – cilj LCP < 2,5 s, CLS < 0,1, INP < 200 ms | https://pagespeed.web.dev |
| 7.7 | GTM/GA4 dodaju ~50–90 KB JS – nakon implementacije ponovno izmjeriti | — |

---

## 10. Korak 8 – Struktura kampanja

### 8.1 Tip kampanje
- **Search (Pretraživačka mreža)** – jedini tip za početak. Ljudi aktivno traže DJ-a = najviša namjera.
- **Ne** uključivati *Search Partners* ni *Display Network* (odznačiti u postavkama kampanje).
- **Ne** Performance Max na početku – troši na Display/YouTube, teško je kontrolirati uz mali budžet i malo konverzija. Razmotriti tek s 30+ konverzija mjesečno.
- Remarketing (Display/YouTube) – kasnije, kad publika naraste (min. 100 aktivnih korisnika na listi).

### 8.2 Kampanje i ad grupe

| Kampanja | Ad grupa | Final URL (dok nema landing stranica → `/#usluge` ili `/#kontakt`) | Budžet/dan (start) |
|---|---|---|---|
| **01 – Domjenci (sezonska, odmah)** | Božićni domjenak | `/dj-za-domjenak` | 10–15 € (stud.–pros.) |
| | Poslovni / firma / team building | `/dj-za-domjenak` | |
| **02 – Vjenčanja** | DJ za vjenčanje | `/dj-za-vjencanje` | 10–15 € (pojačati sij.–tra.) |
| | DJ za svadbu | `/dj-za-vjencanje` | |
| **03 – Rođendani** | DJ za rođendan (opće) | `/dj-za-rodendan` | 5 € |
| | Okrugli rođendani (18/30/40/50) | `/dj-za-rodendan` | |
| **04 – Djevojačke i momačke** | Djevojačka | `/dj-za-djevojacku-i-momacku` | 5 € |
| | Momačka | | |
| **05 – Brand** | DJ Domza | `/` | 1–2 € |
| **06 – Opće (DJ Zagreb)** | DJ Zagreb / DJ za zabavu | `/` | 5 € (testno) |

> Odvojene kampanje (a ne samo ad grupe) da bi se **budžet mogao seliti po sezoni** (zimi domjenci, proljeće vjenčanja i djevojačke).
> Ako je ukupni budžet < 15 €/dan, krenuti samo s kampanjama 01 + 02 + 05.

### 8.3 Ključne riječi (početni set)

Koristiti **phrase match** (`"..."`) i **exact match** (`[...]`). Broad match tek kad ima 30+ konverzija i Smart Bidding.

**01 – Domjenci**
```
"dj za domjenak"
"dj za božićni domjenak"
"dj za bozicni domjenak"
"dj za poslovni domjenak"
"dj za firmu"
"dj za korporativni event"
"dj za team building"
"glazba za domjenak"
"dj za novogodišnju zabavu"
[dj domjenak zagreb]
```

**02 – Vjenčanja**
```
"dj za vjenčanje"
"dj za vjencanje"
"dj za svadbu"
"dj vjenčanje zagreb"
"svadbeni dj"
"dj za vjenčanje cijena"
"glazba za vjenčanje dj"
[dj za vjenčanje zagreb]
[dj svadba]
```

**03 – Rođendani**
```
"dj za rođendan"
"dj za rodjendan"
"dj za 18 rođendan"
"dj za 30 rođendan"
"dj za 40 rođendan"
"dj za 50 rođendan"
"dj za privatnu zabavu"
```

**04 – Djevojačke i momačke**
```
"dj za djevojačku"
"dj za djevojacku"
"dj za momačku"
"dj za momacku"
"dj djevojačka večer"
```

**05 – Brand**
```
[dj domza]
"domza dj"
"dj domza eventi"
```

**06 – Opće**
```
"dj zagreb"
"dj za zabavu"
"dj za najam"
"iznajmljivanje dj"
"dj za event"
"dj za proslavu"
```

> Varijante bez dijakritika (`vjencanje`, `rodjendan`) dodati – mnogo ljudi tipka bez č/ć/đ na mobitelu. Google ih često spaja sam, ali eksplicitno je sigurnije.

### 8.4 Negativne ključne riječi (lista na razini računa)
Ads → Tools → Shared library → **Negative keyword lists** → „Opće negativne“ → primijeniti na sve kampanje:

```
posao
poslovi
zaposlenje
plaća
oglas za posao
tečaj
tecaj
škola
skola
kako postati
naučiti
učiti
oprema
mikseta
kontroler
pioneer
gramofon
slušalice
zvučnici
prodaja
prodajem
rabljeno
njuškalo
besplatno
free
download
mp3
remix
playlist
pjesme
lista pjesama
spotify
youtube
aplikacija
app
festival
ulaznice
karte
koncert
klub večeras
noćni život
izlasci
wikipedia
```
Plus imena poznatih DJ-eva / klubova ako se pojave u izvještaju *Search terms*.
Na kampanji **01 – Domjenci** dodati negativno `vjenčanje`, `svadba`; na **02 – Vjenčanja** dodati `domjenak`, `firma` (da se kampanje ne preklapaju).

### 8.5 Oglasi (Responsive Search Ads)
Po ad grupi **1 RSA** s 12–15 naslova (max 30 znakova) i 4 opisa (max 90 znakova). Ključnu riječ staviti u barem 2–3 naslova. Pinati samo naslov 1 (ključna riječ) ako je potrebno.

**Primjer – DJ za vjenčanje**

Naslovi:
1. DJ za Vjenčanje Zagreb
2. Profesionalni DJ za Svadbu
3. 8+ Godina Iskustva
4. 50+ Uspješnih Evenata
5. Ponuda u Roku 24 Sata
6. Pun Podij do Zadnje Pjesme
7. Provjerite Slobodan Termin
8. Glazba Prema Vašim Željama
9. Vrhunska Pioneer Oprema
10. 5★ Recenzije Mladenaca
11. Termini 2027 se Popunjavaju
12. DJ Domza – Vjenčanja
13. Zagreb i Cijela Hrvatska

Opisi:
1. Od prvog plesa do zadnje pjesme – glazba i atmosfera koju će gosti pamtiti. Zatražite ponudu.
2. Individualan pristup, dogovor glazbe unaprijed i vrhunska oprema. Odgovor unutar 24 sata.
3. Više od 8 godina iskustva i 50+ evenata. Pogledajte recenzije i provjerite slobodan termin.
4. Vi slavite ljubav, ja se brinem za podij. Besplatna ponuda bez obveze – javite se danas!

**Primjer – Božićni domjenak**

Naslovi:
1. DJ za Božićni Domjenak
2. DJ za Poslovni Domjenak
3. Slobodni Termini u Prosincu
4. Ponuda u Roku 24 Sata
5. Glazba za Sve Generacije
6. Elegancija i Zabava
7. Preporuke Direktora i HR-a
8. Last Minute? Javite se!
9. 8+ Godina Iskustva
10. DJ Domza – Domjenci
11. Zagreb i Okolica
12. Pun Podij Cijelu Večer

Opisi:
1. Profesionalna glazbena pratnja za božićne i poslovne domjenke. Provjerite slobodan termin.
2. Od ugodne pozadine za večeru do rasplesanog partyja – balans koji odgovara svim kolegama.
3. Otkazao vam je bend? Uskačem i last minute. Nazovite ili pošaljite upit – odgovor isti dan.
4. Jednoglasne pohvale zaposlenika i 5★ recenzije. Ponuda bez obveze unutar 24 sata.

> Tvrdnje u oglasima moraju biti istinite i vidljive na stranici (iskustvo, broj evenata, recenzije) – Google odbija oglase s neprovjerljivim tvrdnjama („najbolji u Hrvatskoj“ i sl.). Naslov „Termini 2027 se popunjavaju“ koristiti samo ako je istina.

### 8.6 Assets (ekstenzije) – na razini računa
| Asset | Sadržaj |
|---|---|
| **Sitelinks** (4–6) | Vjenčanja · Domjenci · Rođendani · Djevojačke/momačke · Mixevi · Recenzije — svaki s 2 linije opisa |
| **Callouts** | Ponuda u 24 h · 8+ godina iskustva · Pioneer DJ oprema · Bez skrivenih troškova · Dogovor glazbe unaprijed · Mikrofon za govore |
| **Structured snippets** | Header *Usluge*: Vjenčanja, Rođendani, Domjenci, Djevojačke, Momačke, Team building |
| **Call asset** | +385 99 424 2425 · raspored: samo kad možete javiti (npr. 9–21 h) · call reporting ON ako je dostupan |
| **Image assets** | 4–6 fotki iz galerije (kvadrat 1:1 i 1.91:1, min. 300×300 / 600×314) |
| **Business name + Logo** | DJ Domza + logo (traži verifikaciju oglašivača) |
| **Location asset** | iz povezanog Google Business Profilea |
| **Lead form asset** | opcionalno kasnije – forma direktno u oglasu (nepotrebno ako web forma dobro konvertira) |
| **Price asset** | samo ako se objave paketi (vidi 6.6) |

### 8.7 Lokacija i jezik
- **Lokacija:** Grad Zagreb + Zagrebačka županija + radijus 60–80 km oko Zagreba (pokriva Karlovac, Duga Resa, Samobor, Velika Gorica, Zaprešić, Zagorje). Po potrebi dodati Liku/Otočac i Rijeku kao zasebne lokacije s nižom ponudom (−20 %).
- **Location options:** ✅ **„Presence: People in or regularly in your included locations“** (NE „Presence or interest“ – inače se prikazuje ljudima iz cijelog svijeta koji „pokazuju interes“ za Zagreb).
- Iznimka za vjenčanja: dio mladenaca živi u inozemstvu (dijaspora) a vjenčanje je u Hrvatskoj – kasnije testirati zasebnu kampanju s *Presence or interest* + ključne riječi „dj za vjenčanje u hrvatskoj“.
- **Jezik:** hrvatski + engleski (mnogi korisnici imaju Chrome/telefon na engleskom; ključne riječi i dalje filtriraju na hrvatske upite).

### 8.8 Raspored i uređaji
- Prikaz 0–24 h na početku; nakon 4–6 tjedana pogledati *When and where ads showed* i smanjiti ponude u noćnim satima ako nema konverzija.
- Call asset ograničiti na sate kad se možete javiti.
- Uređaji: bez prilagodbi na početku (očekivano 70–85 % mobitel).

### 8.9 Strategija licitiranja (bidding) – po fazama
| Faza | Uvjet | Strategija |
|---|---|---|
| 1. Učenje | 0–15 konverzija / 30 dana | **Maximize clicks** s *max CPC limitom* 1,00–1,50 € **ili** Manual CPC (Enhanced CPC više ne postoji) |
| 2. Optimizacija | 15–30 konverzija / 30 dana po kampanji | **Maximize conversions** (bez ciljanog CPA) |
| 3. Skaliranje | 30+ konverzija / 30 dana, stabilan CPA | **Maximize conversions + Target CPA** (početni tCPA = stvarni prosječni CPA zadnjih 30 dana) |
| 4. Vrijednost | Uvoz rezervacija (korak 5) radi | **Maximize conversion value / tROAS** |

Pravila: ne mijenjati strategiju i budžet više od ±20 % tjedno; nakon promjene čekati 1–2 tjedna (learning period).

### 8.10 Budžet – okvir
- Okvirni CPC za ovakve upite u Hrvatskoj (procjena, provjeriti u **Keyword Planneru**: Ads → Tools → Keyword Planner → Get search volume and forecasts): ~0,30–1,50 €; najskuplje „dj za vjenčanje“.
- Početni ukupni budžet: **15–30 €/dan** (≈ 450–900 €/mj).
- Uz pretpostavljenu stopu konverzije 5–10 % i CPC ~0,80 € → **CPA ≈ 8–16 € po upitu**. Ako je prosječna vrijednost angažmana nekoliko stotina eura i svaki 3.–5. upit postane rezervacija, to je vrlo isplativo – stvarne brojke pratiti u tablici upit → rezervacija.
- Prvih 4 tjedna smatrati **fazom učenja** – ne zaključivati prerano.

---

## 11. Korak 9 – Testiranje (QA) prije pokretanja

1. **GTM Preview** (Tag Assistant): https://tagassistant.google.com → unijeti `https://djdomza-eventi.hr`.
2. Provjeriti redom:
   - [ ] Prije klika na banner: Consent state = sve `denied`, **ne** pale se GA4/Ads kolačići (DevTools → Application → Cookies: nema `_ga`, `_gcl_au`).
   - [ ] Klik „Odbij“ → i dalje nema kolačića; tagovi šalju samo cookieless pingove.
   - [ ] Klik „Prihvati sve“ → `consent update` granted, pojavljuju se `_ga`, `_gcl_au`.
   - [ ] Refresh → banner se ne prikazuje, consent se vraća iz localStorage.
   - [ ] „Postavke kolačića“ u footeru ponovno otvara banner.
   - [ ] Slanje forme (uspješno) → `generate_lead` u dataLayeru, pale se *GA4 - generate_lead* i *Ads - Conv - Upit forma*, user-provided data popunjen.
   - [ ] Slanje forme s greškom (npr. prazno ime) → **ne** pali se konverzija.
   - [ ] Klik na tel (hero, CTA, kontakt, footer, sticky bar) → *Ads - Conv - Klik telefon*.
   - [ ] Klik na WhatsApp → *Ads - Conv - Klik WhatsApp*.
   - [ ] Klik na email → *Ads - Conv - Klik email*.
   - [ ] Navigacija `/` → `/privatnost` → GA4 bilježi page_view.
   - [ ] URL s `?gclid=TEST123` → poslati formu → u emailu se vidi gclid.
3. **GA4 → Admin → DebugView** – eventi stižu.
4. **Google Ads → Goals → Conversions** – status prelazi iz *Unverified* u *No recent conversions* / *Recording conversions* (do 24 h).
5. **Ads → Goals → Settings → Enhanced conversions → Diagnostics** – nakon par dana provjeriti da je *Excellent/Good*.
6. Mobilni test na stvarnom telefonu (iOS Safari + Android Chrome).
7. Objaviti GTM container (**Submit → Publish**) s opisom verzije.

---

## 12. Korak 10 – Optimizacija nakon pokretanja

### Tjedno (15–30 min)
- **Search terms** izvještaj → dodavati nove negativne ključne riječi, a dobre upite dodati kao ključne riječi.
- Provjeriti da konverzije stižu (forma + klikovi) i usporediti s emailovima u inboxu (broj se mora otprilike poklapati).
- Odobrenost oglasa (Policy) i stanje budžeta („Limited by budget“?).
- Upisati rezervacije u tablicu za offline import.

### Mjesečno
- Preraspodjela budžeta po sezoni (vidi kalendar ispod).
- Pauzirati ključne riječi s puno klikova i 0 konverzija (npr. > 30 klikova bez konverzije).
- **Ad strength** i *Asset performance* → zamijeniti naslove ocijenjene „Low“.
- Usporediti CPA po kampanji s udjelom rezervacija → prilagoditi vrijednosti konverzija.
- Provjeriti Quality Score (dodati stupce *Quality Score, Exp. CTR, Ad relevance, Landing page exp.*) – ako je landing page exp. *Below average*, poboljšati stranicu.
- Ažurirati recenzije na webu i u GBP-u.

### Svaka 3 mjeseca
- Prelazak na sljedeću fazu biddinga (8.9) ako su ispunjeni uvjeti.
- Razmotriti remarketing (lista: posjetitelji zadnjih 30 dana koji nisu poslali upit) i/ili Performance Max kad ima 30+ konverzija mjesečno.
- A/B test landing stranice (npr. s cijenom „od X €“ vs. bez) preko **Ads → Experiments**.

---

## 13. Sezonski kalendar (raspodjela budžeta)

| Mjesec | Fokus | Kampanje s većim budžetom |
|---|---|---|
| **Stu – Pro** | Božićni i novogodišnji domjenci (+ last minute) | 01 Domjenci |
| **Sij – Tra** | Rezervacije vjenčanja za ljeto/jesen (vrhunac upita) | 02 Vjenčanja |
| **Ožu – Lip** | Djevojačke i momačke (sezona vjenčanja) | 04 Djevojačke/momačke, 02 Vjenčanja |
| **Svi – Ruj** | Last-minute vjenčanja, ljetne privatne zabave, rođendani | 02, 03 |
| **Ruj – Lis** | Rano bukiranje domjenaka (firme planiraju u rujnu/listopadu) | 01 Domjenci (rano), 02 |
| Cijela godina | Brand + rođendani | 05, 03 |

---

## 14. Checklist – redoslijed izvršavanja

### Dan 1 (bez programiranja)
- [ ] Rotirati Resend API ključ, očistiti `env.example`
- [ ] Search Console (DNS verifikacija) + sitemap
- [ ] Google Business Profile (ako ne postoji)
- [ ] Google Ads račun (Expert mode, EUR, Zagreb)
- [ ] GA4 property + web stream
- [ ] GTM container
- [ ] Povezati GA4 ↔ Ads, Search Console ↔ GA4/Ads, GBP ↔ Ads, auto-tagging ON
- [ ] Kreirati konverzije u Adsu (forma, tel, WhatsApp, email) + Enhanced conversions ON

### Dan 2 (development)
- [ ] `lib/consent.ts` + novi cookie banner (Prihvati / Odbij / Postavke) + link u footeru
- [ ] Consent default skripta u `<head>`
- [ ] `@next/third-parties` + `<GoogleTagManager>` + `NEXT_PUBLIC_GTM_ID` u Vercelu
- [ ] `lib/analytics.ts` + `generate_lead` event u formi
- [ ] Opcija „Djevojačka / momačka večer“ u formi i API-ju
- [ ] `lib/attribution.ts` + gclid/UTM u payloadu i emailu
- [ ] Ažurirati `/kolacici` i `/privatnost`
- [ ] Dodati `public/og-image.jpg`, popraviti/maknuti `verification` placeholder
- [ ] Deploy

### Dan 3 (GTM + kampanje)
- [ ] GTM varijable, triggeri, tagovi (sekcija 4.3)
- [ ] QA checklist (sekcija 11) → Publish container
- [ ] Negativna lista ključnih riječi
- [ ] Kampanje 01 Domjenci + 05 Brand (odmah), 02 Vjenčanja
- [ ] Assets (sitelinks, callouts, call, images, snippets)
- [ ] Pokretanje 🚀

### Tjedan 2–3
- [ ] Landing stranice (`/dj-za-vjencanje`, `/dj-za-domjenak`, `/dj-za-rodendan`, `/dj-za-djevojacku-i-momacku`) + sitemap + linkovi iz Usluga
- [ ] Sticky mobilni CTA (Nazovi / WhatsApp)
- [ ] Forma: poruka neobavezna, trust tekst
- [ ] Hero `next/image` + kompresija velikih slika
- [ ] Prebaciti Final URL-ove oglasa na nove landing stranice
- [ ] Kampanje 03 Rođendani, 04 Djevojačke/momačke

### Mjesec 2+
- [ ] Offline import „Rezervacija“
- [ ] Prelazak na Maximize conversions (kad ima 15+ konverzija/30 dana)
- [ ] Remarketing lista, JSON-LD `LocalBusiness`, FAQ sekcije

---

## 15. Datoteke koje se mijenjaju (pregled za developera)

| Datoteka | Izmjena |
|---|---|
| `env.example` | ukloniti pravi ključ, dodati `NEXT_PUBLIC_GTM_ID` |
| `app/layout.tsx` | consent default skripta, `<GoogleTagManager>`, verification, JSON-LD tip, `priceRange` |
| `config/constants.ts` | `CONSENT_STORAGE_KEY` |
| `lib/consent.ts` | **novo** – spremanje/čitanje privole, `gtag('consent','update')` |
| `lib/analytics.ts` | **novo** – `trackEvent`, `normalizePhone` |
| `lib/attribution.ts` | **novo** – gclid/UTM capture |
| `components/shared/cookie-banner/cookie-banner.tsx` | Prihvati / Odbij / Postavke |
| `components/layout/footer.tsx` | link „Postavke kolačića“ |
| `components/features/contact.tsx` | `generate_lead` event, `defaultEventType` prop, nova vrsta događaja, attribution u payloadu, poruka neobavezna |
| `app/api/contact/route.ts` | nova vrsta događaja, `attribution` u schemi i emailu, `escapeHtml` |
| `components/features/hero.tsx` | `next/image` s `priority` |
| `components/features/service-landing.tsx` | **novo** – predložak landing stranice |
| `config/landing-pages.ts` | **novo** – sadržaj landing stranica |
| `app/dj-za-*/page.tsx` | **novo** – 4 landing stranice |
| `components/shared/mobile-cta-bar.tsx` | **novo** – sticky Nazovi / WhatsApp |
| `app/sitemap.ts` | dodati landing stranice |
| `app/kolacici/page.tsx`, `app/privatnost/page.tsx` | GA4, Google Ads, privola, enhanced conversions |
| `public/og-image.jpg` | **novo** |
| `public/dj-domza.png` | kompresija / WebP |

---

## 16. Upute za implementaciju (za AI agenta / developera)

> Ova sekcija je **jedini izvor istine za implementaciju koda**. Sekcije 1–15 su kontekst i detalji. Ako se nešto ovdje razlikuje od ranijih sekcija, **vrijedi ova sekcija**.

### 16.1 Cilj
Pripremiti kod stranice za Google Ads: privola + Consent Mode v2, učitavanje GTM-a, dataLayer eventi za konverzije, spremanje izvora upita (gclid/UTM), landing stranice po usluzi, sticky mobilni CTA i tehnički popravci. **GTM container, Google Ads račun i kampanje se NE rade u kodu** – njih vlasnik postavlja ručno (sekcije 3, 4.3, 4.4, 10).

### 16.2 Opseg

**U opsegu (radi agent):**
- Sekcija 2.3 (consent), 2.4 (pravni tekstovi – nacrt), 3 (GTM u kodu), 4.2 (dataLayer, forma), 5.2 a–b (attribution), 6 (landing stranice, sticky CTA, forma), 7.1–7.5 (brzina, JSON-LD), 0.2–0.3 u kodu (OG slika, verification), čišćenje `env.example`.

**Izvan opsega (NE dirati / ne raditi):**
- Kreiranje GTM/GA4/Ads računa, konfiguracija tagova u GTM sučelju, kampanje.
- Rotacija Resend ključa (radi vlasnik) – agent samo zamjenjuje vrijednost u `env.example` placeholderom.
- Sekcija **Cijene** (`components/features/pricing.tsx`) – tekst ostaje kakav jest.
- Hard-kodiranje bilo kakvih ID-eva (`GTM-…`, `G-…`, `AW-…`) – sve ide kroz `NEXT_PUBLIC_GTM_ID`.
- Dodavanje GA4/Ads `gtag.js` direktno u kod – **samo GTM**.
- Vercel Analytics i Speed Insights ostaju nepromijenjeni.
- Vizualni redizajn postojećih sekcija – hero, kartice i forma moraju izgledati isto kao prije (osim navedenih izmjena).

### 16.3 Odluke vlasnika (zaključano)

| # | Pitanje | Odluka |
|---|---|---|
| D1 | Search Console verifikacija | Verifikacija ide preko **DNS-a** → **ukloniti** cijeli `verification` blok iz `app/layout.tsx` |
| D2 | Landing stranice | Raditi **u ovom krugu**. Agent piše hrvatski tekst na temelju postojećih tekstova sa stranice (`services`, About, recenzije). Vlasnik pregledava prije objave |
| D3 | Polje „Poruka“ u formi | **Neobavezno** (i na klijentu i na serveru) |
| D4 | Cijene „od X €“ | **Ne dirati** – bez cijena u kodu i tekstovima |
| D5 | Pravni tekstovi (`/kolacici`, `/privatnost`) | Agent piše **nacrt**, vlasnik pregledava prije deploya |
| D6 | OG slika | Generirati kodom: `app/opengraph-image.tsx` (Next.js `ImageResponse`, 1200×630, tamna pozadina `#0C0F15`, plavi akcent `#2563EB`, tekst „DJ Domza“ + „DJ za vjenčanja i evente – Zagreb“). Ukloniti `ogImage: "/og-image.jpg"` reference iz metadata da Next koristi generiranu sliku |
| D7 | Vrijednosti konverzija | U dataLayer slati `value: 50, currency: "EUR"` za formu (ostalo se postavlja u GTM-u) |

### 16.4 Pravila rada
1. **Napraviti novu granu:** `git checkout -b feature/google-ads-tracking`. Ne raditi na `master`.
2. **NE pushati.** Push na `master` automatski deploya na Vercel – deploy radi vlasnik nakon pregleda.
3. **Commit po fazi** (16.6), poruke u stilu repozitorija: `ADDED - …` / `UPDATE - …` / `FIX - …`.
4. Nikad ne commitati `.env*` datoteke ni prave ključeve.
5. **Ne izmišljati činjenice** u tekstovima (usluge, oprema, rasvjeta, brojke, cijene, putni troškovi). Dozvoljeno je samo ono što već piše na stranici: 50+ evenata, 8+ godina iskustva, Pioneer oprema, mikrofon, odgovor unutar 24 h, recenzije. Sve nesigurno označiti komentarom `{/* TODO(vlasnik): potvrditi */}` i navesti u završnom izvještaju.
6. Postojeće stilove (Tailwind klase, `card-transparent`, `Button` varijante, `SectionHeading`, `SectionBadge`) koristiti umjesto novih.
7. TypeScript strict – bez `any`.

### 16.5 Poznate zamke i kako ih riješiti

| # | Zamka | Rješenje |
|---|---|---|
| Z1 | `HashLink href="/#kontakt"` (Hero, CTA, Pricing, Footer) vodi na **početnu** stranicu i kad je korisnik na landing stranici | Proširiti `components/shared/hash-link.tsx`: ako na **trenutnoj** stranici postoji element s tim `id`-em (`document.getElementById(id)`), spriječiti navigaciju (`e.preventDefault()`) i skrolati do njega s istim offsetom; inače postojeće ponašanje. Vrijedi za sve stranice, ne samo `/` |
| Z2 | Recenzije se ne mogu filtrirati po usluzi (`role` je slobodan tekst, npr. „Direktorica“) | U `types/index.ts` dodati u `Testimonial`: `category: "vjencanje" \| "korporativni" \| "rodendan" \| "djevojacka-momacka"`. Mapiranje u `config/constants.ts`: id 1 → korporativni, 2 → korporativni, 3 → djevojacka-momacka, 4 → vjencanje, 5 → djevojacka-momacka, 6 → rodendan, 7 → djevojacka-momacka |
| Z3 | `components/layout/footer.tsx` je **server** komponenta – ne može imati `onClick` | Nova klijentska komponenta `components/shared/cookie-settings-button.tsx` (`"use client"`) koja radi `window.dispatchEvent(new Event("open-cookie-settings"))`; footer je samo renderira |
| Z4 | Consent default mora se izvršiti **prije** GTM-a | Inline `<script>` kao **prvi** element u `<head>` u `app/layout.tsx`; `<GoogleTagManager>` iz `@next/third-parties/google` učitava se poslije (afterInteractive). Ne koristiti `next/script` za consent skriptu |
| Z5 | Cookie banner je `sticky bottom-0` – sticky mobilni CTA bi se preklopio s njim | `saveConsent()` nakon spremanja radi `window.dispatchEvent(new Event("consent-saved"))`. `MobileCtaBar` se prikazuje **samo** ako postoji spremljena privola (`getSavedConsent() !== null`) ili nakon `consent-saved` eventa. Dodati `pb-20 md:pb-0` na wrapper/footer da traka ne prekriva sadržaj na dnu |
| Z6 | Stari ključ `COOKIE_CONSENT_KEY` („djdomza-cookie-notice-seen“) | Zamijeniti novim `CONSENT_STORAGE_KEY = "djdomza-consent-v1"`; ukloniti stari iz koda i iz teksta na `/kolacici` |
| Z7 | `"lint": "next lint"` – u Next.js 16 `next lint` više ne postoji | Ako `npm run lint` javi grešku, promijeniti skriptu u `"lint": "eslint ."` i provjeriti da postojeći `eslint.config.mjs` radi |
| Z8 | `@next/third-parties` mora odgovarati verziji Next.js | `npm install @next/third-parties@<ista major verzija kao next u package-lock>` |
| Z9 | PII ne smije ići u GA4 | `user_data` (email, telefon) se šalje u dataLayer samo unutar `generate_lead` eventa; u kodu dodati komentar da se u GTM-u koristi **samo** u Ads conversion tagu |
| Z10 | `generate_lead` se ne smije okinuti kod greške | Push isključivo unutar `if (result.success)` grane u `onSubmit` |
| Z11 | Korisnički unos ide u HTML emaila bez escapanja | Dodati `escapeHtml()` u `app/api/contact/route.ts` i primijeniti na sva polja (name, email, phone, eventDate, message, attribution vrijednosti) |
| Z12 | `sessionStorage`/`localStorage` mogu baciti iznimku (privatni način, blokirani podaci) | Svako čitanje/pisanje u `try/catch`; stranica mora raditi i bez storagea |
| Z13 | Hero prelazak na `next/image` može promijeniti izgled | `<Image src="/hero-bg.jpg" alt="" fill priority sizes="100vw" className="object-cover object-center" />` unutar postojećeg `absolute inset-0 z-0` diva; overlay ostaje isti |

### 16.6 Redoslijed rada (faze i commitovi)

**Faza A – Čišćenje i preduvjeti** → commit `FIX - removed secret from env.example, removed verification placeholder, added generated OG image`
- [ ] `env.example`: `RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxx`, dodati `NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX` s komentarom
- [ ] `app/layout.tsx`: ukloniti `verification` blok (D1)
- [ ] `app/opengraph-image.tsx` (D6), ukloniti statičke `og-image.jpg` reference iz `openGraph.images` / `twitter.images` i `siteConfig.ogImage`
- [ ] Popraviti lint skriptu ako treba (Z7)

**Faza B – Privola (Consent Mode v2)** → commit `ADDED - cookie consent with accept/reject/settings and Google Consent Mode v2`
- [ ] `config/constants.ts`: `CONSENT_STORAGE_KEY` (Z6)
- [ ] `lib/consent.ts` prema 2.3 c) + `consent-saved` event (Z5) + try/catch (Z12)
- [ ] `components/shared/cookie-banner/cookie-banner.tsx`: gumbi **Prihvati sve** / **Odbij** (jednako istaknuti, isti `Button` stil) / **Postavke** (prikazuje 2 checkboxa: *Analitika*, *Oglašavanje* + **Spremi odabir**); sluša `open-cookie-settings`; zadržati postojeći vizualni stil i `role="dialog"`
- [ ] `components/shared/cookie-settings-button.tsx` + link u footeru (Z3)
- [ ] Consent default skripta u `<head>` (Z4, tekst iz 2.3 a))

**Faza C – GTM i praćenje konverzija** → commit `ADDED - GTM integration, lead tracking via dataLayer, attribution capture`
- [ ] `npm install @next/third-parties` (Z8); `<GoogleTagManager>` u `app/layout.tsx`, renderira se samo ako postoji `NEXT_PUBLIC_GTM_ID`
- [ ] `lib/analytics.ts` (`trackEvent`, `normalizePhone`) prema 4.2 a)
- [ ] `components/features/contact.tsx`: `generate_lead` prema 4.2 b) (Z9, Z10); prop `defaultEventType` (4.2 d)); nova opcija `djevojacka-momacka`
- [ ] `app/api/contact/route.ts`: label `djevojacka-momacka`
- [ ] `lib/attribution.ts` prema 5.2 a) + `components/shared/attribution-capture.tsx` (`"use client"`, poziva `captureAttribution()` u `useEffect` pri promjeni `pathname`) – renderirati u `app/layout.tsx`
- [ ] Forma šalje `attribution: getAttribution()`; API: `attribution: z.record(z.string().max(500)).optional()`; u emailu blok **„Izvor upita“** (Google Ads + kampanja + gclid, ili „Direktno / organski“ ako je prazno)
- [ ] `escapeHtml()` u emailu (Z11)
- [ ] `tel:`, `wa.me`, `mailto:` linkovi ostaju obični `<a href>` – **bez** dodatnog JS-a (prate se GTM triggerima)

**Faza D – Forma (konverzija)** → commit `UPDATE - contact form message optional, trust note`
- [ ] Poruka neobavezna (D3): klijent `message: z.string().max(5000).optional()`, server isto; label bez `*`; email template preskače blok poruke ako je prazna; subject i dalje ispravan
- [ ] Iznad gumba „Pošalji upit“: kratki tekst *„Odgovor s ponudom unutar 24 h · bez obveze“* (`text-sm text-muted-foreground`)
- [ ] Placeholder telefona: „+385 99 123 4567 (za brži odgovor)“

**Faza E – Landing stranice + sticky CTA** → commit `ADDED - service landing pages, mobile sticky call/WhatsApp bar`
- [ ] `HashLink` popravak (Z1)
- [ ] `category` na recenzijama (Z2)
- [ ] `config/landing-pages.ts` – za svaku od 4 stranice: `slug`, `metaTitle` (≤ 60 znakova), `metaDescription` (≤ 155), `h1`, `intro`, `benefits[]` (4–6), `steps[]` (3: Upit → Ponuda unutar 24 h → Dogovor glazbe i detalja), `faq[]` (5–6), `testimonialCategory`, `defaultEventType`, `galleryImages[]` (podskup `galleryImages`)
- [ ] `components/features/service-landing.tsx` – sekcije redom iz 6.3 (hero s H1 + 2 gumba + 3 brojke, benefits, recenzije filtrirane po kategoriji, galerija, koraci, FAQ, `Contact` s `defaultEventType`); FAQ kao `<details>` ili postojeći stil; `FAQPage` JSON-LD
- [ ] 4 stranice (tanke, samo `metadata` + `<ServiceLanding />`):

  | Ruta | `defaultEventType` | `testimonialCategory` | H1 |
  |---|---|---|---|
  | `app/dj-za-vjencanje/page.tsx` | `vjencanje` | `vjencanje` | DJ za vjenčanje – Zagreb i okolica |
  | `app/dj-za-domjenak/page.tsx` | `korporativni` | `korporativni` | DJ za poslovne i božićne domjenke |
  | `app/dj-za-rodendan/page.tsx` | `rodendan` | `rodendan` | DJ za rođendan – 18., 30., 40., 50. i više |
  | `app/dj-za-djevojacku-i-momacku/page.tsx` | `djevojacka-momacka` | `djevojacka-momacka` | DJ za djevojačku i momačku večer |

- [ ] Svaka stranica: `alternates.canonical` na vlastiti URL, OpenGraph naslov/opis
- [ ] `app/sitemap.ts`: dodati 4 rute (`priority: 0.9`, `changeFrequency: "monthly"`)
- [ ] `components/features/services.tsx`: na svaku karticu link „Saznaj više“ → mapiranje `vjencanja → /dj-za-vjencanje`, `korporativni → /dj-za-domjenak`, `rodendani → /dj-za-rodendan`, `klubovi → /dj-za-djevojacku-i-momacku`
- [ ] `components/shared/mobile-cta-bar.tsx` (`"use client"`, `md:hidden`, fixed bottom, 2 gumba: **Nazovi** (`tel:`) i **WhatsApp** (isti URL kao u footeru – izvući `whatsappUrl` u `config/constants.ts` i koristiti na oba mjesta)), logika prikaza prema Z5; renderirati u `app/layout.tsx`
- [ ] Tekstovi prema pravilu 16.4 / 5 (bez izmišljanja, TODO oznake)

**Faza F – Brzina i strukturirani podaci** → commit `UPDATE - hero next/image, LocalBusiness JSON-LD`
- [ ] Hero na `next/image` (Z13)
- [ ] JSON-LD: `"@type": ["LocalBusiness", "EntertainmentBusiness"]`, `priceRange: "€€"`, `areaServed` kao lista (`Grad Zagreb`, `Zagrebačka županija`, `Karlovačka županija`, `Krapinsko-zagorska županija`, `Hrvatska`); **bez** `aggregateRating` (treba potvrda vlasnika)
- [ ] Opcionalno: `public/dj-domza.png` → WebP/JPG ≤ 300 KB (npr. `sharp` ako je dostupan u `node_modules`); ažurirati `src` u `about.tsx`. Ako alat nije dostupan, preskočiti i navesti u izvještaju

**Faza G – Pravni tekstovi (nacrt)** → commit `UPDATE - cookie and privacy policy drafts for GA4 and Google Ads`
- [ ] `app/kolacici/page.tsx` prema 2.4: tablica kolačića (`_ga`, `_ga_<ID>` – GA4, 2 godine; `_gcl_au`, `_gcl_aw` – Google Ads, 90 dana; `djdomza-consent-v1` – localStorage, nužno; Vercel Analytics ostaje); maknuti „ne koristimo Google Analytics / reklamne kolačiće“; prepisati objašnjenje gumba (Prihvati sve / Odbij / Postavke); spomenuti link „Postavke kolačića“ u footeru
- [ ] `app/privatnost/page.tsx`: Google Ireland Ltd. kao primatelj; pravna osnova privola; prijenos u SAD (EU-US Data Privacy Framework); enhanced conversions (hashirani email/telefon iz forme, samo uz privolu za oglašavanje); izvor upita (gclid/UTM) u emailu s upitom
- [ ] Na vrhu obje stranice u kodu komentar `{/* TODO(vlasnik): pravni pregled prije objave */}`

### 16.7 Kriteriji prihvaćanja (Definition of Done)

**Automatske provjere (agent mora pokrenuti i proći):**
- [ ] `npm run build` prolazi bez grešaka
- [ ] `npm run lint` (ili `npx eslint .`) bez novih grešaka
- [ ] `grep -rE "GTM-[A-Z0-9]{5,}|G-[A-Z0-9]{8,}|AW-[0-9]{6,}" app components lib config` → nema pogodaka
- [ ] `grep -rn "re_[A-Za-z0-9]\{20,\}" .` (bez `node_modules`, `.next`) → nema pogodaka
- [ ] `grep -rn "COOKIE_CONSENT_KEY\|verification_token_here" app components config` → nema pogodaka

**Ručna provjera u `npm run dev` / `npm start`** (agent ako ima pristup pregledniku, inače navesti u izvještaju za vlasnika), s `NEXT_PUBLIC_GTM_ID=GTM-TEST000` u `.env.local`:
- [ ] U HTML-u (`view-source`) consent default skripta je **prije** GTM skripte
- [ ] Bez spremljene privole banner se prikazuje; „Odbij“ / „Prihvati sve“ / „Postavke → Spremi“ spremaju `djdomza-consent-v1` i u `window.dataLayer` se pojavljuje `consent` update
- [ ] „Postavke kolačića“ u footeru ponovno otvara banner
- [ ] Uspješno slanje forme → u `window.dataLayer` objekt `{ event: "generate_lead", event_type, value: 50, currency: "EUR", user_data: {...} }`; slanje s validacijskom greškom → **nema** `generate_lead`
- [ ] Otvaranje `/?gclid=TEST123&utm_campaign=test` → poslati formu → u payloadu (Network tab) postoji `attribution.gclid = "TEST123"`
- [ ] Na `/dj-za-vjencanje` gumb „Zatraži ponudu“ skrola do forme **na istoj stranici**, a vrsta događaja je predodabrana na „Vjenčanje“
- [ ] Na `/` gumbi „Zatraži ponudu“ i dalje skrolaju do forme (nema regresije)
- [ ] Na mobilnoj širini (375 px) sticky traka se pojavljuje tek nakon odluke o kolačićima, ne prekriva footer
- [ ] Hero na početnoj izgleda isto kao prije
- [ ] `/sitemap.xml` sadrži 4 nove rute; `/opengraph-image` vraća sliku

### 16.8 Završni izvještaj agenta (obavezno)
Na kraju agent vraća:
1. Popis commitova na grani `feature/google-ads-tracking`.
2. Popis promijenjenih / novih datoteka.
3. Rezultate automatskih provjera iz 16.7 (stvarni output, ne „trebalo bi raditi“).
4. Koje ručne provjere su odrađene, a koje ostaju vlasniku.
5. **Sve `TODO(vlasnik)` oznake** s datotekom i linijom (tekstovi landing stranica, pravni tekstovi, nesigurne tvrdnje).
6. Što ostaje ručno vlasniku: rotacija Resend ključa, `NEXT_PUBLIC_GTM_ID` u Vercelu, GTM konfiguracija (4.3), konverzije u Adsu (4.4), Search Console DNS verifikacija (0.3), kampanje (10), QA s Tag Assistantom (11), push/deploy.
