# DJ Domza - Web Stranica

Moderna web stranica za DJ Domza, profesionalnog DJ-a za vjenčanja, rođendane, korporativne evente i klubove.

## 🚀 Tehnologije

- **Framework:** Next.js 15 (App Router) + React 19
- **Jezik:** TypeScript
- **Styling:** Tailwind CSS 4 + PostCSS (@tailwindcss/postcss)
- **UI komponente:** shadcn/ui (New York stil) + Radix UI
- **Ikone:** lucide-react
- **Forme:** react-hook-form + zod + @hookform/resolvers
- **Obavijesti:** sonner
- **Email:** Resend
- **Analitika:** @vercel/analytics

## 📁 Struktura projekta

```
├── app/                    # Next.js App Router
│   ├── api/contact/        # API ruta za kontakt formu
│   ├── privatnost/         # Stranica politike privatnosti
│   ├── uvjeti/             # Stranica uvjeta korištenja
│   ├── globals.css         # Globalni stilovi
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage
│   ├── robots.ts           # Robots.txt generator
│   └── sitemap.ts          # Sitemap generator
├── components/
│   ├── features/           # Sekcije (hero, services, about, etc.)
│   ├── layout/             # Header, Footer
│   ├── shared/             # Logo, etc.
│   └── ui/                 # shadcn UI komponente
├── config/                 # Konstante i boje
├── hooks/                  # Custom React hookovi
├── lib/                    # Utility funkcije
├── types/                  # TypeScript tipovi
└── public/                 # Statički fajlovi
```

## 🛠️ Instalacija

1. Kloniraj repozitorij:
```bash
git clone https://github.com/your-username/dj-domza.git
cd dj-domza
```

2. Instaliraj dependencies:
```bash
npm install
```

3. Kopiraj env.example u .env.local i popuni varijable:
```bash
cp env.example .env.local
```

4. Pokreni development server:
```bash
npm run dev
```

5. Otvori [http://localhost:3000](http://localhost:3000)

## 🔐 Environment varijable

Potrebne environment varijable (vidi `env.example`):

| Varijabla | Opis |
|-----------|------|
| `RESEND_API_KEY` | API ključ za Resend email servis |
| `CONTACT_TO_EMAIL` | Email adresa za primanje upita |
| `NEXT_PUBLIC_SITE_URL` | URL stranice (za metadata i sitemap) |

## 📧 Postavljanje Resend emaila

1. Registriraj se na [Resend](https://resend.com)
2. Dodaj i verificiraj domenu
3. Generiraj API ključ
4. Dodaj ključ u `.env.local`

## 🎨 Prilagodba

### Boje
Uredi `config/colors.ts` i `app/globals.css` za promjenu palete boja.

### Sadržaj
Uredi `config/constants.ts` za:
- Site metadata
- Navigacijske linkove
- Usluge
- Testimoniale
- Kontakt informacije

### Slike
Dodaj slike u `public/` direktorij:
- `og-image.jpg` - Open Graph slika (1200x630px)
- `favicon.ico` - Favicon

## 🚢 Deployment

### Vercel (preporučeno)

1. Pushaj kod na GitHub
2. Importaj projekt na [Vercel](https://vercel.com)
3. Dodaj environment varijable
4. Deploy!

### Ostale platforme

Build za produkciju:
```bash
npm run build
npm start
```

## 📝 Licenca

Sva prava pridržana © DJ Domza
