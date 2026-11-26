import type { LandingPageData } from "@/types";

/**
 * Content for the service landing pages (Google Ads final URLs).
 *
 * RULE: only claims that already exist elsewhere on the site are used (50+ evenata, 8+ godina,
 * Pioneer oprema, razglas, ZAMP, odgovor unutar 24 h, recenzije). Anything uncertain is marked
 * with TODO(vlasnik) and must be confirmed before going live.
 */

const steps: LandingPageData["steps"] = [
  {
    title: "Pošaljite upit",
    description:
      "Ispunite formu, nazovite ili pošaljite poruku na WhatsApp – recite mi datum i vrstu događaja.",
  },
  {
    title: "Ponuda unutar 24 h",
    description:
      "Javljam vam se unutar 24 sata s ponudom prilagođenom vašem događaju, bez obveze.",
  },
  {
    title: "Dogovor glazbe i detalja",
    description:
      "Nakon potvrde zajedno dogovaramo glazbu, tijek večeri i sve detalje.",
  },
];

// TODO(vlasnik): potvrditi odgovor o nastupima izvan Zagreba (lokacije su preuzete iz recenzija:
// Duga Resa, Otočac) i dodati informaciju o putnim troškovima ako ih ima.
const faqLocation = {
  question: "Nastupate li i izvan Zagreba?",
  answer:
    "Da, nastupi su održani i izvan Zagreba (npr. Duga Resa, Otočac). Javite mi lokaciju svog događaja i datum, pa ćemo zajedno dogovoriti sve detalje.",
};

const faqOffer = {
  question: "Koliko brzo dobivam ponudu?",
  answer:
    "Na svaki upit odgovaram unutar 24 sata s ponudom prilagođenom vašem događaju. Ponuda je bez obveze.",
};

const faqPrice = {
  question: "Koliko košta DJ?",
  answer:
    "Svaki događaj je jedinstven pa se cijena formira individualno – ovisno o vrsti događaja, lokaciji, trajanju angažmana, potrebnoj tehničkoj opremi i posebnim zahtjevima. Nakon zaprimanja osnovnih informacija šaljem ponudu s jasno iskazanom ukupnom cijenom.",
};

const faqEquipment = {
  question: "Koju opremu koristite?",
  answer:
    "Nastupam na Pioneer DJ opremi, uz profesionalni razglas i kompletnu audio opremu prilagođenu prostoru događaja.",
};

const faqCopyright = {
  question: "Jesu li autorska prava regulirana?",
  answer: "Da, autorska prava su regulirana (ZAMP).",
};

export const landingPages = {
  vjencanje: {
    slug: "dj-za-vjencanje",
    metaTitle: "DJ za vjenčanje Zagreb i okolica | DJ Domza",
    metaDescription:
      "DJ za vjenčanje u Zagrebu i okolici – od prvog plesa do zadnje pjesme. 8+ godina iskustva, 5★ recenzije. Zatražite ponudu unutar 24 h.",
    h1: "DJ za vjenčanje – Zagreb i okolica",
    intro:
      "Vaš najvažniji dan zaslužuje savršenu glazbenu kulisu – od prvog plesa do zadnje pjesme na podiju. Individualan pristup, pažljivo odabrana glazba i vrhunska oprema garantiraju atmosferu koju će vaši gosti pamtiti.",
    benefitsTitle: "Što dobivate na vašem vjenčanju",
    benefits: [
      "Glazba od prvog plesa do posljednjeg takta",
      "Personalizirani glazbeni koncept prema vašim željama",
      "Vođenje programa i jasna struktura večeri",
      "Profesionalni razglas i audio oprema prilagođena prostoru",
      "Koordinacija s fotografom i ostalim izvođačima",
      "Fleksibilnost i prilagodba atmosferi – podij pun do samog kraja",
    ],
    steps,
    faq: [
      faqOffer,
      faqPrice,
      {
        question: "Mogu li sam birati glazbu za vjenčanje?",
        answer:
          "Naravno. Glazbeni program prilagođavam vašim željama, a sve dogovaramo unaprijed – od prvog plesa do završnice večeri.",
      },
      faqEquipment,
      faqLocation,
      faqCopyright,
    ],
    testimonialCategory: "vjencanje",
    defaultEventType: "vjencanje",
    gallerySrcs: [
      "/gallery/dj-domza-nastup.jpg",
      "/gallery/dj-domza-mikrofon.jpg",
      "/gallery/dj-domza-pioneer.jpg",
    ],
  },

  domjenak: {
    slug: "dj-za-domjenak",
    metaTitle: "DJ za božićni i poslovni domjenak | DJ Domza",
    metaDescription:
      "DJ za poslovne i božićne domjenke, korporativne evente i proslave – elegancija i zabava u pravom omjeru. Ponuda unutar 24 h, bez obveze.",
    h1: "DJ za poslovne i božićne domjenke",
    intro:
      "Nakon uspješnih projekata i dugih sastanaka, vrijeme je za opuštanje i dobru energiju. Nudim profesionalnu glazbenu pratnju za korporativne evente, domjenke i proslave – uz savršenu ravnotežu elegancije i zabave.",
    benefitsTitle: "Što dobivate na vašem domjenku",
    benefits: [
      "Od ugodne pozadine za networking do rasplesanog after partyja",
      "Glazbeni program usklađen sa smjernicama tvrtke i željama zaposlenika",
      "Vođenje programa, najave i prilagodba protokolu večeri",
      "Profesionalni razglas i audio oprema prilagođena prostoru",
      "Balans koji odgovara svim kolegama",
      "Regulirana autorska prava (ZAMP)",
    ],
    steps,
    faq: [
      faqOffer,
      faqPrice,
      {
        question: "Možete li uskladiti glazbu s protokolom našeg domjenka?",
        answer:
          "Da. Glazbeni program prilagođavam smjernicama tvrtke i željama zaposlenika te protokolu tijekom večeri, a sve dogovaramo unaprijed.",
      },
      faqEquipment,
      faqLocation,
      faqCopyright,
    ],
    testimonialCategory: "korporativni",
    defaultEventType: "korporativni",
    gallerySrcs: [
      "/gallery/dj-domza-adventski-event.jpg",
      "/gallery/dj-domza-nastup.jpg",
      "/gallery/dj-domza-pult.jpg",
    ],
  },

  rodendan: {
    slug: "dj-za-rodendan",
    metaTitle: "DJ za rođendan – 18., 30., 40., 50. | DJ Domza",
    metaDescription:
      "DJ za rođendan – 18., 30., 40., 50. ili veliki jubilej. Od klasika do aktualnih hitova, podij pun od prve minute. Zatražite ponudu unutar 24 h.",
    h1: "DJ za rođendan – 18., 30., 40., 50. i više",
    intro:
      "Bilo da slavite 18., 30., 40. ili veliki jubilej – atmosfera se prilagođava vama i vašoj ekipi. Od bezvremenskih klasika do aktualnih hitova, podij se puni od prve minute.",
    benefitsTitle: "Što dobivate na vašem rođendanu",
    benefits: [
      "Glazba prilagođena vama i vašoj ekipi",
      "Od bezvremenskih klasika do aktualnih hitova",
      "Podij pun od prve minute, zabava do zadnje sekunde",
      "Profesionalni razglas i audio oprema prilagođena prostoru",
      "Fleksibilnost i prilagodba atmosferi tijekom večeri",
    ],
    steps,
    faq: [
      faqOffer,
      faqPrice,
      {
        question: "Mogu li tražiti pjesme po želji?",
        answer:
          "Da. Glazbu prilagođavam gostima i vašim željama – dogovorimo se unaprijed ili tijekom večeri.",
      },
      faqEquipment,
      faqLocation,
      faqCopyright,
    ],
    testimonialCategory: "rodendan",
    defaultEventType: "rodendan",
    gallerySrcs: [
      "/gallery/dj-domza-mikrofon.jpg",
      "/gallery/dj-domza-pult.jpg",
      "/gallery/dj-domza-pioneer.jpg",
    ],
  },

  djevojackaMomacka: {
    slug: "dj-za-djevojacku-i-momacku",
    metaTitle: "DJ za djevojačku i momačku večer | DJ Domza",
    metaDescription:
      "DJ za djevojačku i momačku večer – najveći hitovi, klasici i party bangeri. Podij gori do jutra. Zatražite ponudu unutar 24 h, bez obveze.",
    h1: "DJ za djevojačku i momačku večer",
    intro:
      "Zadnji \"dan slobode\" zaslužuje večer koja se pamti. Najveći hitovi, klasici i party bangeri podižu atmosferu do maksimuma. Vi ludujete bez kočnica, a ja se brinem da podij gori do jutra.",
    benefitsTitle: "Što dobivate na vašoj večeri",
    benefits: [
      "Najveći hitovi, klasici i party bangeri",
      "Ispunjavanje vaših glazbenih želja",
      "Mikrofon za pjevanje – atmosfera koju gosti pamte",
      "Profesionalni razglas i audio oprema prilagođena prostoru",
      "Energija koja se održava do kraja večeri",
    ],
    steps,
    faq: [
      faqOffer,
      faqPrice,
      {
        question: "Mogu li birati pjesme za našu večer?",
        answer:
          "Da. Pjesme se dogovaraju unaprijed, a želje gostiju ispunjavam i tijekom večeri.",
      },
      faqEquipment,
      faqLocation,
      faqCopyright,
    ],
    testimonialCategory: "djevojacka-momacka",
    defaultEventType: "djevojacka-momacka",
    gallerySrcs: [
      "/gallery/dj-domza-mikrofon.jpg",
      "/gallery/dj-domza-pult.jpg",
      "/gallery/dj-domza-nastup.jpg",
    ],
  },
} satisfies Record<string, LandingPageData>;

export type LandingPageKey = keyof typeof landingPages;
