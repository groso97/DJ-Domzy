export const siteConfig = {
  name: "DJ Domza",
  description: "DJ za nezaboravne zabave - vjenčanja, rođendani, korporativni eventi i klubovi",
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
  { href: "#usluge", label: "Usluge" },
  { href: "#o-meni", label: "O meni" },
  { href: "#kontakt", label: "Kontakt" },
] as const;

export const services = [
  {
    id: "vjencanja",
    title: "Vjenčanja",
    description: "Vaš najvažniji dan zaslužuje savršenu glazbenu kulisu – od prvog plesa do zadnje pjesme na podiju. Individualan pristup, pažljivo odabrana glazba i vrhunska oprema garantiraju atmosferu koju će vaši gosti pamtiti. Vi slavite ljubav, a ja se brinem da plesni podij bude pun do samog kraja.",
    icon: "Heart",
  },
  {
    id: "rodendani",
    title: "Rođendani",
    description: "Bilo da slavite 18., 30., 40. ili veliki jubilej – atmosfera se prilagođava vama i vašoj ekipi. Od bezvremenskih klasika do aktualnih hitova, podij se puni od prve minute. Vi slavite godine i uspomene, a ja se brinem da zabava traje do zadnje sekunde.",
    icon: "Cake",
  },
  {
    id: "korporativni",
    title: "Korporativni eventi",
    description: "Nakon uspješnih projekata i dugih sastanaka, vrijeme je za opuštanje i dobru energiju. Nudim profesionalnu glazbenu podršku za korporativne evente, domjenke i proslave – uz savršenu ravnotežu elegancije i zabave. Od ugodne pozadine za networking do rasplesanog after partyja – vaš event ostavlja snažan dojam.",
    icon: "Building2",
  },
  {
    id: "klubovi",
    title: "Djevojačke i momačke večeri",
    description: "Zadnji \"dan slobode\" zaslužuje večer koja se pamti. Najveći hitovi, klasici i party bangeri podižu atmosferu do maksimuma. Vi ludujete bez kočnica, a ja se brinem da podij gori do jutra.",
    icon: "Sparkles",
  },
] as const;

export const testimonials = [
  {
    id: 1,
    name: "Marina Mihoković Dvorski",
    role: "Direktorica",
    location: "Veliko polje",
    date: "19.12.2025",
    content: "DJ Domza bio je odličan izbor za naš božićni poslovni domjenak! Glazbeni program prilagodio je našim smjernicama, ali i željama zaposlenika, pritom vješto održavajući balans koji je bio potreban da se večer održi na visokoj razini. Izuzetno vedar, angažiran i profesionalan, DJ Domagoj dobio je jednoglasne pohvale naših zaposlenika, a mi ćemo ga bez sumnje ponovno angažirati za buduće događaje i sa punim povjerenjem ga preporučujemo!",
    rating: 5,
  },
  {
    id: 2,
    name: "Petra K.",
    role: "Rođendan",
    location: "Split",
    date: "15.07.2024",
    content: "Večer je bila jednostavno nezaboravna zahvaljujući DJ Domzi! Od početka do kraja večeri osjećala sam se kao da sam na najboljem partyju ikad. Glazba je bila savršeno odabrana – od retro hitova koji su podsjetili na moje tinejdžerske dane do najnovijih banger-a koji su rasplesali cijelu ekipu. DJ Domza je stvarno imao osjećaj za publiku i pratio energiju sobe u svakom trenutku. Svi moji prijatelji i obitelj su bili oduševljeni, a ja ću se ovaj dan sjećati još dugo! Hvala ti za savršenu večer!",
    rating: 5,
  },
  {
    id: 3,
    name: "Marko Vrdoljak",
    role: "Rođendan",
    location: "Zagreb",
    date: "22.11.2024",
    content: "Organizirao sam rođendan za svoju ekipu i DJ Domza je bio savršen izbor! Od samog početka komunikacije bio je profesionalan i razumio je što tražim. Na samom eventu pokazao je nevjerojatnu energiju i osjećaj za publiku – znao je kada pustiti hitove koji će rasplesati sve, a kada malo smanjiti tempo. Glazba je bila mješavina svih generacija, što je bilo savršeno jer smo imali goste različitih godina. Cijela večer je bila nezaboravna, a svi su mi komentirali kako je DJ bio odličan. Definitivno ću ga pozvati i za sljedeću proslavu!",
    rating: 5,
  },
] as const;
