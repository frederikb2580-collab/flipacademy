# FlipAcademy DK

En premium kursus- og community-platform bygget med Next.js, hvor brugere kan købe lifetime adgang til et kursus om tøjflipping for 399 DKK.

## Tech Stack

- **Frontend:** Next.js 16, React, TypeScript, Tailwind CSS, Framer Motion
- **Backend:** Next.js API Routes, Prisma ORM 7
- **Database:** PostgreSQL
- **Authentication:** NextAuth.js (Credentials + Google OAuth)
- **Betaling:** Stripe Checkout
- **Email:** Resend
- **Discord:** Bot integration med automatisk rolletildeling
- **Deployment:** Vercel

## Installation

```bash
# Installer dependencies
npm install

# Generer Prisma Client
npx prisma generate

# Kør database migrationer
npx prisma migrate dev

# Start udviklingsserver
npm run dev
```

## Miljøvariabler

Opret en `.env` fil med følgende:

```env
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/flipacademy?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="din-hemmelige-nøgle"

# Google OAuth (valgfrit)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Resend (Email)
RESEND_API_KEY="re_..."
EMAIL_FROM="FlipAcademy <noreply@flipacademy.dk>"

# Discord
DISCORD_BOT_TOKEN=""
DISCORD_GUILD_ID=""
DISCORD_MEMBER_ROLE_ID=""
DISCORD_CLIENT_ID=""
DISCORD_CLIENT_SECRET=""

# UploadThing
UPLOADTHING_TOKEN=""
```

## Stripe Setup

1. Opret en [Stripe-konto](https://dashboard.stripe.com)
2. Kopiér dine API-nøgler til `.env`
3. Installer Stripe CLI og kør: `stripe listen --forward-to localhost:3000/api/stripe/webhook`
4. Kopiér webhook-signeringsnøglen til `STRIPE_WEBHOOK_SECRET`

## Discord Setup

1. Opret en Discord Application på [Discord Developer Portal](https://discord.com/developers/applications)
2. Opret en Bot under din application
3. Aktivér "Server Members Intent" og "Message Content Intent"
4. Invitér botten til din Discord-server med `Bot` og `Manage Roles` permissions
5. Opret en "Medlem" rolle i din server
6. Kopiér alle IDs til `.env`
7. Tilføj OAuth2 Redirect URI: `https://dit-domæne.dk/api/discord/callback`

## Database

Projektet bruger PostgreSQL med Prisma ORM.

```bash
# Kør migrationer
npx prisma migrate dev --name init

# Åbn Prisma Studio
npx prisma studio
```

### Opret admin-bruger

Registrer en bruger via `/register` og opdater rollen i databasen:

```sql
UPDATE "User" SET role = 'ADMIN' WHERE email = 'din@email.dk';
```

## Projektstruktur

```
src/
├── app/
│   ├── admin/               # Admin panel (11 sider)
│   ├── api/                 # API routes
│   │   ├── admin/           # Admin CRUD endpoints
│   │   ├── auth/            # NextAuth + registrering
│   │   ├── discord/         # Discord OAuth
│   │   ├── stripe/          # Checkout + webhook
│   │   └── user/            # Profil + password
│   ├── courses/[slug]/      # Kursus + lektioner
│   ├── dashboard/           # Bruger dashboard (8 sider)
│   ├── login/               # Login
│   └── register/            # Registrering
├── components/
│   ├── course/              # Kursus komponenter
│   ├── landing/             # Landing page sektioner
│   └── ui/                  # Genbrugelige UI komponenter
├── lib/                     # Auth, DB, Stripe, Discord, Email
└── types/                   # TypeScript deklarationer
```

## Vercel Deployment

1. Push projektet til GitHub
2. Importér til [Vercel](https://vercel.com)
3. Tilføj alle miljøvariabler
4. Opdater `NEXTAUTH_URL` til dit produktionsdomæne
5. Tilføj Stripe webhook: `https://dit-domæne.dk/api/stripe/webhook`

## Funktioner

- **Forside:** Hero, how-it-works, moduloversigt, målgruppe, resultater, testimonials, FAQ, pricing
- **Betaling:** Stripe Checkout, rabatkoder, affiliate tracking, automatisk brugeroprettelse
- **Dashboard:** Oversigt, kurser, Discord, profil, ordrer, downloads, favoritter, indstillinger
- **Kursus:** Moduler, lektioner (video/tekst/PDF/quiz), fremskridtssporing, downloadbare filer
- **Admin:** Dashboard, kurser CRUD, brugere, ordrer, statistik, rabatkoder, affiliates, Discord, emails, logs
- **Discord:** OAuth2 forbindelse, automatisk join + rolletildeling, rolle-fjernelse ved refundering
- **SEO:** Metadata, OpenGraph, sitemap.xml, robots.txt
