# Portfolio (Astro)

Production-ready Astro portfolio with bilingual (Arabic/English) pages, structured SEO metadata, and static deployment support.

## Stack
- Astro 5 (static output)
- Plain CSS + Astro components
- Static assets served from `public/`

## Project Structure
- `src/pages/` - all route pages
- `src/components/` - shared layout pieces (`HomeLikeHeader`, `HomeLikeFooter`)
- `public/` - static assets (`image.png`, `favicon.svg`, `projects.json`, `site-i18n.js`, SEO files)
- `dist/` - generated build output (deploy target)

## Local Development
```bash
npm install
npm run dev
```

## Production Build
```bash
npm run build
```

Build output is generated in:
- `dist/`

## Firebase Hosting Deployment
This repo is configured for static Astro deployment on Firebase Hosting.

### 1) Set your Firebase project id
Edit `.firebaserc` and replace:
- `your-firebase-project-id`

### 2) Deploy
```bash
npm install
npm run build
firebase deploy
```

## Notes
- Hosting serves from `dist` (configured in `firebase.json`).
- No SPA rewrite is used (multi-page static Astro routes).
- Cache headers are configured for long-lived static assets and revalidated HTML.
