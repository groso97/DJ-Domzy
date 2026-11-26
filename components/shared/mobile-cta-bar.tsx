"use client";

import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/shared/whatsapp-icon";
import { siteConfig, whatsappUrl } from "@/config/constants";
import { getSavedConsent } from "@/lib/consent";

const phoneHref = `tel:${siteConfig.contact.phone.replace(/\s/g, "")}`;

/**
 * Sticky call / WhatsApp bar for phones (< 768px).
 * Shown only after the visitor has made a cookie decision so it never overlaps the cookie banner.
 * Links are plain <a href>, so GTM click triggers (tel: / wa.me) track them without extra JS.
 */
export function MobileCtaBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (getSavedConsent() !== null) setVisible(true);

    const onSaved = () => setVisible(true);
    // Banner re-opened from the footer: hide the bar until a new decision is saved.
    const onReopen = () => setVisible(false);
    window.addEventListener("consent-saved", onSaved);
    window.addEventListener("open-cookie-settings", onReopen);
    return () => {
      window.removeEventListener("consent-saved", onSaved);
      window.removeEventListener("open-cookie-settings", onReopen);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-[#0C0F15]/95 backdrop-blur-md px-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
      role="region"
      aria-label="Brzi kontakt"
    >
      <div className="mx-auto flex max-w-md gap-3">
        <a
          href={phoneHref}
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-primary text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-colors active:bg-primary/90"
        >
          <Phone className="h-5 w-5" aria-hidden />
          Nazovi
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl border-2 border-primary bg-transparent text-base font-semibold text-primary transition-colors active:bg-primary/10"
        >
          <WhatsAppIcon size={20} />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
