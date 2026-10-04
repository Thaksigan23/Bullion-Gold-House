# Bullion Gold House

Premium jewellery website for Bullion Gold House (Sri Lanka).

## Stack

- Next.js App Router + TypeScript
- Tailwind CSS
- GSAP + ScrollTrigger
- Lenis smooth scrolling
- Framer Motion (menus / overlays)
- Lucide icons

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (redirects to `/en`).

## Locales

- `/en` — English (default)
- `/si` — Sinhala UI chrome (business copy remains editable / not auto-translated)

## Configure business data

Edit central config before launch:

- `src/config/site.ts` — contact, socials, commerce flag
- `src/data/goldRate.ts` — gold rates (demo until live data)
- `src/data/products.ts` — products (**DEMO CONTENT**)
- `src/data/collections.ts` — category tiles
- `src/data/content.ts` — homepage editorial content
- `src/data/navigation.ts` — menus

## Scripts

```bash
npm run lint
npm run typecheck
npm run build
```
