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
  message: z.string().min(10, "Poruka mora imati najmanje 10 znakova"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    const { name, email, phone, eventType, eventDate, message } = validatedData;

    const emailContent = `
      <h2>Nova poruka s web stranice DJ Domza</h2>
      <hr />
      <p><strong>Ime:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${phone ? `<p><strong>Telefon:</strong> ${phone}</p>` : ""}
      <p><strong>Vrsta događaja:</strong> ${eventType}</p>
      ${eventDate ? `<p><strong>Datum događaja:</strong> ${eventDate}</p>` : ""}
      <hr />
      <p><strong>Poruka:</strong></p>
      <p>${message.replace(/\n/g, "<br />")}</p>
    `;

    const { error } = await resend.emails.send({
      from: "DJ Domza Web <noreply@djdomza.hr>",
      to: process.env.CONTACT_TO_EMAIL || "info@djdomza.hr",
      replyTo: email,
      subject: `Nova poruka od ${name} - ${eventType}`,
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
