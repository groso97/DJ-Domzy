export const siteConfig = {
  name: "DJ Domza",
  description: "DJ za nezaboravne zabave - vjenčanja, rođendani, korporativni eventi i klubovi",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://djdomza.hr",
  ogImage: "/og-image.jpg",
  links: {
    instagram: "https://instagram.com/djdomza",
    facebook: "https://facebook.com/djdomza",
    youtube: "https://youtube.com/@djdomza",
    soundcloud: "https://soundcloud.com/djdomza",
  },
  contact: {
    email: "info@djdomza.hr",
    phone: "+385 99 424 2425",
  },
};

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
    description: "Savršena glazbena kulisa za najvažniji dan vašeg života. Od ceremonije do zadnjeg plesa.",
    icon: "Heart",
  },
  {
    id: "rodendani",
    title: "Rođendani",
    description: "Zabava koja se pamti! Prilagođavam playlistu svim generacijama i ukusima.",
    icon: "Cake",
  },
  {
    id: "korporativni",
    title: "Korporativni eventi",
    description: "Profesionalna glazbena pratnja za team buildinge, proslave i poslovne događaje.",
    icon: "Building2",
  },
  {
    id: "klubovi",
    title: "Klubovi & Festivali",
    description: "Energična atmosfera i vrhunski zvuk koji pokreće plesni podij.",
    icon: "Music4",
  },
] as const;

export const testimonials = [
  {
    id: 1,
    name: "Marija i Ivan",
    role: "Vjenčanje, Zagreb",
    content: "DJ Domza je napravio naše vjenčanje nezaboravnim! Savršen odabir glazbe i nevjerojatna energija cijelu noć.",
    rating: 5,
  },
  {
    id: 2,
    name: "Petra K.",
    role: "30. rođendan, Split",
    content: "Od prve do zadnje pjesme - sve je bilo savršeno! Definitivno preporučujem za svaku zabavu.",
    rating: 5,
  },
  {
    id: 3,
    name: "Tech Solutions d.o.o.",
    role: "Korporativna proslava",
    content: "Profesionalan pristup i odlična komunikacija. Naši zaposlenici su oduševljeni!",
    rating: 5,
  },
] as const;
