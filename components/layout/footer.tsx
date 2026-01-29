import Link from "next/link";
import { Instagram, Facebook, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { Separator } from "@/components/ui/separator";
import { siteConfig, navLinks } from "@/config/constants";

const socialLinks = [
  { href: siteConfig.links.instagram, icon: Instagram, label: "Instagram" },
  { href: siteConfig.links.facebook, icon: Facebook, label: "Facebook" },
  { href: siteConfig.links.youtube, icon: Youtube, label: "YouTube" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 text-left">
          {/* Brand */}
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground max-w-xs">
              DJ za nezaboravne događaje. Vjenčanja, rođendani,
              korporativni eventi i klubovi.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-all hover:bg-primary hover:text-primary-foreground hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Brze poveznice</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Kontakt</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  {siteConfig.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                Zagreb, Hrvatska
              </li>
            </ul>
          </div>

          
          {/* Legal */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Pravno</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privatnost"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Politika privatnosti
                </Link>
              </li>
              <li>
                <Link
                  href="/uvjeti"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Uvjeti korištenja
                </Link>
              </li>
              <li>
                <Link
                  href="/kolacici"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Kolačići
                </Link>
              </li>
            </ul>
          </div>
        </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="my-8 h-px w-full bg-white/20 shadow-[0_0_8px_rgba(255,255,255,0.15)]"></div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>
            Made with care by{" "}
            <a
              href="https://algo-solutions.net/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              ALGO Solutions
            </a>
          </p>
          <p>© {currentYear} DJ Domza. Sva prava pridržana.</p>
        </div>
        </div>
      </div>
    </footer>
  );
}
