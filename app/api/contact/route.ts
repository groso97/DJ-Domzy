import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  name: z.string().min(2, "Ime mora imati najmanje 2 znaka"),
  email: z.string().email("Unesite ispravnu email adresu"),
  phone: z.string().optional(),
  eventType: z.string().min(1, "Odaberite vrstu događaja"),
  eventDate: z.string().optional(),
  message: z.string().max(5000, "Poruka može imati najviše 5000 znakova").optional(),
  attribution: z.record(z.string().max(500)).optional(),
});

const eventTypeLabels: Record<string, string> = {
  vjencanje: "Vjenčanje",
  rodendan: "Rođendan",
  korporativni: "Korporativni event",
  "djevojacka-momacka": "Djevojačka / momačka večer",
  klub: "Klub / Festival",
  "privatna-zabava": "Privatna zabava",
  ostalo: "Ostalo",
};

/** Escapes user-supplied text before it is placed into the HTML email. */
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Human-readable "where did this enquiry come from" line (plain text, escaped by the caller). */
function buildSourceText(attribution?: Record<string, string>) {
  const a = attribution ?? {};
  const clickId = a.gclid
    ? `gclid: ${a.gclid}`
    : a.gbraid
      ? `gbraid: ${a.gbraid}`
      : a.wbraid
        ? `wbraid: ${a.wbraid}`
        : "";
  const fromAds = Boolean(clickId) || a.utm_medium === "cpc";

  const parts: string[] = [];
  if (fromAds) parts.push("Google Ads");
  else if (a.utm_source) parts.push(a.utm_medium ? `${a.utm_source} / ${a.utm_medium}` : a.utm_source);
  if (a.utm_campaign) parts.push(`kampanja: ${a.utm_campaign}`);
  if (a.utm_term) parts.push(`ključna riječ: ${a.utm_term}`);
  if (clickId) parts.push(clickId);
  if (a.landing_page) parts.push(`ulazna stranica: ${a.landing_page}`);

  return parts.length ? parts.join(" · ") : "Direktno / organski";
}

function buildEmailHtml(data: {
  name: string;
  email: string;
  phone?: string;
  eventType: string;
  eventDate?: string;
  message?: string;
  attribution?: Record<string, string>;
}) {
  const { name, email, phone, eventType, eventDate, message, attribution } = data;

  const eventLabel = escapeHtml(eventTypeLabels[eventType] || eventType);
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safePhone = phone ? escapeHtml(phone) : "";
  const safeDate = eventDate ? escapeHtml(eventDate) : "";
  const safeMessage = message ? escapeHtml(message).replace(/\r?\n/g, "<br>") : "";
  const sourceText = escapeHtml(buildSourceText(attribution));

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0C0F15;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #0C0F15;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 560px; margin: 0 auto; background: linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(10, 17, 31, 0.95) 100%); border: 1px solid rgba(37, 99, 235, 0.2); border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);">
          <tr>
            <td style="padding: 32px 40px 24px; border-bottom: 1px solid rgba(37, 99, 235, 0.15);">
              <div style="display: inline-block; padding: 6px 14px; background: rgba(37, 99, 235, 0.15); border-radius: 8px; margin-bottom: 16px;">
                <span style="font-size: 11px; font-weight: 600; letter-spacing: 0.08em; color: #60A5FA;">KONTAKT FORMA</span>
              </div>
              <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: #ffffff; letter-spacing: -0.02em;">Nova poruka s web stranice</h1>
              <p style="margin: 8px 0 0; font-size: 15px; color: #94A3B8;">DJ Domza Eventi</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px 40px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
                    <span style="font-size: 12px; color: #64748B; text-transform: uppercase; letter-spacing: 0.05em;">Ime i prezime</span>
                    <p style="margin: 4px 0 0; font-size: 16px; font-weight: 500; color: #f1f5f9;">${safeName}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
                    <span style="font-size: 12px; color: #64748B; text-transform: uppercase; letter-spacing: 0.05em;">Email</span>
                    <p style="margin: 4px 0 0; font-size: 16px;"><a href="mailto:${safeEmail}" style="color: #60A5FA; text-decoration: none;">${safeEmail}</a></p>
                  </td>
                </tr>
                ${safePhone ? `
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
                    <span style="font-size: 12px; color: #64748B; text-transform: uppercase; letter-spacing: 0.05em;">Telefon</span>
                    <p style="margin: 4px 0 0; font-size: 16px;"><a href="tel:${safePhone}" style="color: #60A5FA; text-decoration: none;">${safePhone}</a></p>
                  </td>
                </tr>
                ` : ""}
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
                    <span style="font-size: 12px; color: #64748B; text-transform: uppercase; letter-spacing: 0.05em;">Vrsta događaja</span>
                    <p style="margin: 4px 0 0; font-size: 16px; font-weight: 500; color: #f1f5f9;">${eventLabel}</p>
                  </td>
                </tr>
                ${safeDate ? `
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
                    <span style="font-size: 12px; color: #64748B; text-transform: uppercase; letter-spacing: 0.05em;">Datum događaja</span>
                    <p style="margin: 4px 0 0; font-size: 16px; font-weight: 500; color: #f1f5f9;">${safeDate}</p>
                  </td>
                </tr>
                ` : ""}
                ${safeMessage ? `
                <tr>
                  <td style="padding: 16px 0 0;">
                    <span style="font-size: 12px; color: #64748B; text-transform: uppercase; letter-spacing: 0.05em;">Poruka</span>
                    <div style="margin-top: 8px; padding: 16px; background: rgba(37, 99, 235, 0.08); border-radius: 10px; border-left: 3px solid #2563EB;">
                      <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #cbd5e1;">${safeMessage}</p>
                    </div>
                  </td>
                </tr>
                ` : ""}
                <tr>
                  <td style="padding: 16px 0 0;">
                    <span style="font-size: 12px; color: #64748B; text-transform: uppercase; letter-spacing: 0.05em;">Izvor upita</span>
                    <p style="margin: 4px 0 0; font-size: 14px; line-height: 1.5; color: #94A3B8; word-break: break-all;">${sourceText}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 40px 32px; border-top: 1px solid rgba(255, 255, 255, 0.06);">
              <p style="margin: 0; font-size: 12px; color: #64748B;">Odgovori direktno na ovaj email za kontakt s klijentom.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    const { name, email, phone, eventType, eventDate, message, attribution } = validatedData;

    const emailContent = buildEmailHtml({
      name,
      email,
      phone,
      eventType,
      eventDate,
      message,
      attribution,
    });

    const eventLabel = eventTypeLabels[eventType] || eventType;
    const { error } = await resend.emails.send({
      from: "DJ Domza <noreply@djdomza-eventi.hr>",
      to: process.env.CONTACT_TO_EMAIL || "booking@djdomza-eventi.hr",
      replyTo: email,
      // Strip line breaks from user input so it cannot inject extra header lines
      subject: `Nova poruka od ${name.replace(/[\r\n]+/g, " ")} - ${eventLabel}`,
      html: emailContent,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { success: false, error: "Greška pri slanju emaila" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Poruka uspješno poslana!" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error("Contact form error:", error);
    return NextResponse.json(
      { success: false, error: "Došlo je do greške. Pokušajte ponovo." },
      { status: 500 }
    );
  }
}
