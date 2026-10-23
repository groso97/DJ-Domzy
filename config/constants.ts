import type { Testimonial } from "@/types";

export const siteConfig = {
  name: "DJ Domza",
  description:
    "DJ za nezaboravne zabave - vjenčanja, rođendani, korporativni eventi i klubovi",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://djdomza-eventi.hr",
  ogImage: "/og-image.jpg",
  links: {
    instagram: "https://www.instagram.com/djdomzaeventi?igsh=dWo2OHFvbGRvMXpj",
    facebook: "https://facebook.com/djdomza",
    youtube: "https://youtube.com/@djdomza",
    soundcloud: "https://soundcloud.com/djdomza",
  },
  contact: {
    email: "booking@djdomza-eventi.hr",
    phone: "+385 99 424 2425",
  },
};

/** LocalStorage key for cookie notice – used by CookieBanner and referenced on /kolacici */
export const COOKIE_CONSENT_KEY = "djdomza-cookie-notice-seen";

export const navLinks = [
  { href: "/", label: "Početna" },
  { href: "/#usluge", label: "Usluge" },
  { href: "/#mixevi", label: "Mixevi" },
  { href: "/#o-meni", label: "O meni" },
  { href: "/#galerija", label: "Galerija" },
  { href: "/#kontakt", label: "Kontakt" },
] as const;

export const galleryImages = [
  {
    src: "/gallery/dj-domza-mikrofon.jpg",
    alt: "DJ Domza s mikrofonom uz zvučnik na događaju",
    width: 1600,
    height: 1068,
  },
  {
    src: "/gallery/dj-domza-pult.jpg",
    alt: "DJ Domza za pultom tijekom nastupa",
    width: 1200,
    height: 1600,
  },
  {
    src: "/gallery/dj-domza-adventski-event.jpg",
    alt: "DJ Domza na nastupu na otvorenom među božićnim svjetlima",
    width: 737,
    height: 980,
  },
  {
    src: "/gallery/dj-domza-pioneer.jpg",
    alt: "DJ Domza za Pioneer DJ opremom",
    width: 1536,
    height: 2048,
  },
  {
    src: "/gallery/dj-domza-nastup.jpg",
    alt: "DJ Domza u odijelu i slušalicama za pultom",
    width: 1366,
    height: 2048,
  },
] as const;

export const services = [
  {
    id: "vjencanja",
    title: "Vjenčanja",
    description:
      "Vaš najvažniji dan zaslužuje savršenu glazbenu kulisu – od prvog plesa do zadnje pjesme na podiju. Individualan pristup, pažljivo odabrana glazba i vrhunska oprema garantiraju atmosferu koju će vaši gosti pamtiti. Vi slavite ljubav, a ja se brinem da plesni podij bude pun do samog kraja.",
    icon: "Heart",
  },
  {
    id: "rodendani",
    title: "Rođendani",
    description:
      "Bilo da slavite 18., 30., 40. ili veliki jubilej – atmosfera se prilagođava vama i vašoj ekipi. Od bezvremenskih klasika do aktualnih hitova, podij se puni od prve minute. Vi slavite godine i uspomene, a ja se brinem da zabava traje do zadnje sekunde.",
    icon: "Cake",
  },
  {
    id: "korporativni",
    title: "Korporativni eventi",
    description:
      "Nakon uspješnih projekata i dugih sastanaka, vrijeme je za opuštanje i dobru energiju. Nudim profesionalnu glazbenu pratnju za korporativne evente, domjenke i proslave – uz savršenu ravnotežu elegancije i zabave. Od ugodne pozadine za networking do rasplesanog after partyja – vaš event ostavlja snažan dojam.",
    icon: "Building2",
  },
  {
    id: "klubovi",
    title: "Djevojačke i momačke večeri",
    description:
      'Zadnji "dan slobode" zaslužuje večer koja se pamti. Najveći hitovi, klasici i party bangeri podižu atmosferu do maksimuma. Vi ludujete bez kočnica, a ja se brinem da podij gori do jutra.',
    icon: "Sparkles",
  },
] as const;

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Marina Mihoković Dvorski",
    role: "Direktorica",
    location: "Veliko polje",
    date: "19.12.2025",
    content:
      "DJ Domza bio je odličan izbor za naš božićni poslovni domjenak! Glazbeni program prilagodio je našim smjernicama, ali i željama zaposlenika, pritom vješto održavajući balans koji je bio potreban da se večer održi na visokoj razini. Izuzetno vedar, angažiran i profesionalan, DJ Domagoj dobio je jednoglasne pohvale naših zaposlenika, a mi ćemo ga bez sumnje ponovno angažirati za buduće događaje i sa punim povjerenjem ga preporučujemo!",
    rating: 5,
  },
  {
    id: 2,
    name: "Sandra & Borna",
    role: "Božićni domjenak",
    location: "Rakitje",
    date: "28.12.2025.",
    content:
      "Nakon što nam je bend zbog više sile morao otkazati nastup na Božićnom domjenku, uz preporuku prijatelja angažirali smo DJ Domzu koji je savjesno i susretljivo shvatio našu situaciju, te upotpunio domjenak po našem planu. Prilagodio se maksimalno, odgovorno i sa osmijehom na licu koji se ne zaboravlja. Sve naše kolegice i kolege bili su zadovoljni njegovim repertoarom, najavama i prilagodbi protokolu tijekom večeri. Atmosfera je bila na vrhunskoj razini. Imali smo još jedno nezaboravno prigodno druženje i zabavu. DJ Domzu imamo u vidu za naše prigode koje nam dolaze uz svu preporuku svima.",
    rating: 5,
  },
  {
    id: 3,
    name: "Iva Mrakužić",
    role: "Djevojačka večer",
    location: "Villa Nikšić, Otočac",
    date: "27.9.2025.",
    content:
      "DJ Domza zna održati energiju, a pritom ostaje nenametljiv, vrlo suradljiv i maksimalno otvoren za dogovore. Dvije sam ga večeri imala priliku slušati na djevojačkim zabavama i svaki put je opravdao očekivanja. Topla preporuka za sve vrste privatnih događanja, bez razmišljanja!",
    rating: 5,
  },
  {
    id: 4,
    name: "Lina & Bruno",
    role: "Vjenčanje",
    location: "Clubhouse golf restoran",
    date: "5.9.2025.",
    content:
      "Domagoj je odlično vodio atmosferu tijekom cijele večeri i gosti su se stvarno zabavili. Prije svega divna je osoba i komunikacija s njim je bila ugodna i profesionalna, a sve je teklo glatko i bez stresa. Svakako ga preporučujem za sve privatne evente!",
    rating: 5,
  },
  {
    id: 5,
    name: "Barbara Štrucelj",
    role: "Djevojačka večer",
    location: "Country House, Duga Resa",
    date: "2.5.2026.",
    content:
      "Nakon par djevojačkih na kojima me oduševio, znala sam da ga moram imati na svojoj! Muzika top, on kao osoba još bolji. Ispunjavao nam je sve želje i davao mikrofon da pjevamo, što je atmosferu dovelo do ludila. Ako želite najbolji tulum, on je taj! Čista desetka",
    rating: 5,
  },
  {
    id: 6,
    name: "Viktorija Vancas",
    role: "Rođendan",
    content:
      "Sve pohvale za DJ Domagoja, divan i pristojan mladi čovjek koji zna i voli svoj posao. Hvala ti za veseli ugođaj na mojem ročkasu!",
    rating: 5,
  },
];
