import Link from "next/link";
import { Instagram, Mail, Phone, MapPin } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { WhatsAppIcon } from "@/components/shared/whatsapp-icon";
import { siteConfig, navLinks } from "@/config/constants";

const whatsappNumber = siteConfig.contact.phone.replace(/\s/g, "").replace("+", "");
const whatsappMessage = encodeURIComponent("Pozdrav! Zanima me ponuda za DJ usluge.");
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

const socialLinks = [
  { href: siteConfig.links.instagram, icon: Instagram, label: "Instagram" },
  { href: whatsappUrl, icon: WhatsAppIcon, label: "WhatsApp" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/50 border-t">
      <div className="content-width py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 text-center md:text-left">
          {/* Brand */}
          <div className="space-y-5 flex flex-col items-center md:items-start">
            <Logo />
            <p className="text-sm md:text-base text-muted-foreground max-w-xs leading-relaxed">
              DJ za nezaboravne događaje. Vjenčanja, rođendani,
              korporativni eventi i klubovi.
            </p>
            <div className="flex gap-3 justify-center md:justify-start">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-all hover:bg-primary hover:text-primary-foreground hover:scale-110 [&_svg]:text-primary [&:hover_svg]:text-primary-foreground"
                  aria-label={social.label}
                >
                  {social.label === "WhatsApp" ? (
                    <WhatsAppIcon size={22} />
                  ) : (
                    <social.icon className="h-5 w-5" />
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-semibold text-xl mb-5">Brze poveznice</h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm md:text-base text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-semibold text-xl mb-5">Kontakt</h3>
            <ul className="space-y-4 flex flex-col items-center md:items-start">
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-center gap-3 text-sm md:text-base text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="h-5 w-5 shrink-0" />
                  {siteConfig.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 text-sm md:text-base text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone className="h-5 w-5 shrink-0" />
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm md:text-base text-muted-foreground">
                <MapPin className="h-5 w-5 shrink-0" />
                Zagreb, Hrvatska
              </li>
            </ul>
          </div>

          
          {/* Legal */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-semibold text-xl mb-5">Pravno</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/privatnost"
                  className="text-sm md:text-base text-muted-foreground hover:text-primary transition-colors"
                >
                  Politika privatnosti
                </Link>
              </li>
              <li>
                <Link
                  href="/uvjeti"
                  className="text-sm md:text-base text-muted-foreground hover:text-primary transition-colors"
                >
                  Uvjeti korištenja
                </Link>
              </li>
              <li>
                <Link
                  href="/kolacici"
                  className="text-sm md:text-base text-muted-foreground hover:text-primary transition-colors"
                >
                  Kolačići
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="my-10 h-px w-full bg-white/20 shadow-[0_0_8px_rgba(255,255,255,0.15)]"></div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm md:text-base text-muted-foreground">
          <p>© {currentYear} DJ Domza. Sva prava pridržana.</p>
          <p>
            Made with care by{" "}
            <a
              href="https://algo-solutions.net/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors font-medium"
            >
              ALGO Solutions
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
