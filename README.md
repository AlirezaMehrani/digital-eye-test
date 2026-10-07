# Horizon Properties

A premium real estate website: hero search, featured property carousel, editorial about and
services sections, an interactive portfolio browser with filters, and full property detail
pages with gallery, agent contact and viewing requests.

## Stack

- Next.js 14 (App Router) + React 18 + TypeScript
- Plain CSS Modules with a design-token layer in `app/globals.css` (no CSS framework)
- No backend, database or external API — all content is static data

## Run locally

Requires Node.js 18+:

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

## Run in the Base44 sandbox

```bash
docker compose -f docker-compose.base44.yml up -d --build
```

Runs the dev server on host port 3000 from the cloned source (dependencies are synced by
`npm ci` on start). See `AGENTS.md` for details.

## Project structure

```
app/
  layout.tsx                 fonts, metadata, shared header + footer
  page.tsx                   homepage: hero → about → featured → services → why → team → CTA
  globals.css                design tokens, base styles, shared primitives
  data/site.ts               properties, agents, services, why-choose-us content
  lib/properties.ts          formatting, filtering, sorting, derived lists
  components/                one folder-level component per section + CSS module
  properties/page.tsx        portfolio browser (search + filters + sort)
  properties/[slug]/page.tsx property detail (gallery, features, agent, similar)
```

## Editing content

Add or change properties in `app/data/site.ts`. Each entry drives the homepage carousel,
the portfolio browser, filters, the detail page and the similar-properties list. Images are
referenced by Unsplash photo id and rendered responsively by `app/components/SmartImage.tsx`.

## Notes

- Saved properties are kept in `localStorage`.
- The enquiry dialog and newsletter form validate and confirm client-side only — connect
  them to a backend before relying on submissions.
