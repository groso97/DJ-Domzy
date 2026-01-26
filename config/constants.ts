export const siteConfig = {
  name: "DJ Domzy",
  description: "Profesionalni DJ za nezaboravne zabave - vjenčanja, rođendani, korporativni eventi i klubovi",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://djdomzy.hr",
  ogImage: "/og-image.jpg",
  links: {
    instagram: "https://instagram.com/djdomzy",
    facebook: "https://facebook.com/djdomzy",
    youtube: "https://youtube.com/@djdomzy",
    soundcloud: "https://soundcloud.com/djdomzy",
  },
  contact: {
    email: "info@djdomzy.hr",
    phone: "+385 99 123 4567",
  },
};

export const navLinks = [
  { href: "/", label: "Početna" },
  { href: "#usluge", label: "Usluge" },
  { href: "#o-meni", label: "O meni" },
  { href: "#galerija", label: "Galerija" },
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
    content: "DJ Domzy je napravio naše vjenčanje nezaboravnim! Savršen odabir glazbe i nevjerojatna energija cijelu noć.",
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

export const galleryImages = [
  { id: 1, src: "/gallery/event-1.jpg", alt: "DJ Domzy na vjenčanju" },
  { id: 2, src: "/gallery/event-2.jpg", alt: "Korporativni event" },
  { id: 3, src: "/gallery/event-3.jpg", alt: "Klubska noć" },
  { id: 4, src: "/gallery/event-4.jpg", alt: "Festival nastup" },
  { id: 5, src: "/gallery/event-5.jpg", alt: "Rođendanska zabava" },
  { id: 6, src: "/gallery/event-6.jpg", alt: "Privatna zabava" },
] as const;
