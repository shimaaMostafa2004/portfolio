# Abdulrahman Taher Portfolio

Static portfolio and lead-generation website for Abdulrahman Taher, focused on backend engineering services for Egypt and GCC markets.

## Overview

- Primary language is Arabic with an English toggle powered by Google Translate.
- Main goals are portfolio presentation, service discovery, regional SEO landing pages, and contact conversion.
- The site is plain HTML/CSS/JavaScript with no build step and no backend runtime in this repository.

## Main Pages

- `index.html`: home page and primary conversion page
- `services.html`: service positioning and capability breakdown
- `offers.html`: packaged offer paths for MVP, system build, and ongoing support
- `projects.html`: project gallery rendered from `projects.json`
- `blog.html`: article hub
- `backend-engineer-*.html`: country-specific landing pages for Egypt and GCC
- `web-system-development-gcc.html`: pillar/guide page

## Tech Stack

- HTML for all pages
- `styles.css` for the shared home page styling
- `script.js` for home page nav/reveal behavior
- `site-i18n.js` for language toggle, direction switching, and Google Translate integration
- `projects.json` as the data source for the project gallery
- `llms.txt` and `llms-full.txt` for AI/search-agent guidance
- `robots.txt`, `sitemap.xml`, and page-level metadata for SEO

## Local Preview

There is no install or build process.

Use any static file server from the project root, for example:

```bash
python3 -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

## Editing Guide

### Update page content

Edit the relevant `.html` file directly. Most pages are fully self-contained and include their own metadata and inline styles.

### Update homepage interactions

Edit `script.js`.

Current responsibilities:

- active section highlighting
- reveal-on-scroll animations
- topbar scroll state

### Update language behavior

Edit `site-i18n.js`.

Current responsibilities:

- persist language preference in `localStorage`
- switch `lang` and `dir`
- inject the floating language toggle
- trigger Google Translate for English mode

### Update projects

Edit `projects.json`.

Each project supports fields such as:

```json
{
  "name": "Project name",
  "image": "https://...",
  "alt_ar": "Arabic alt text",
  "alt_en": "English alt text",
  "desc_ar": "Arabic description",
  "desc_en": "English description",
  "tags": "LARAVEL // REDIS",
  "link": "https://..."
}
```

`projects.html` normalizes a few alternate key names, but keeping the JSON consistent is the safer option.

## Deployment

This repository can be deployed to any static host, including:

- GitHub Pages
- Netlify
- Vercel static hosting
- Cloudflare Pages

Minimum requirement: publish the repository root as a static site.

Production domain referenced in metadata:

```text
https://abdotaher.me/
```

## SEO Notes

- Canonical URLs are hardcoded in page metadata and should stay aligned with the production domain.
- `sitemap.xml` and `robots.txt` should be updated if URLs are added, removed, or renamed.
- Regional landing pages target country-specific search intent for Egypt, Saudi Arabia, UAE, Qatar, Kuwait, Bahrain, and Oman.
- `llms.txt` documents canonical pages and positioning for AI search surfaces.

## Content Structure

The repository contains three main content groups:

1. Conversion pages: home, services, offers, projects
2. SEO landing pages: regional backend-engineer pages
3. Editorial content: blog hub and individual articles

## Notes

- The current worktree already contains unrelated user changes in `index.html` and `site-i18n.js`.
- The previous README described a Node.js/Docker/Fly.io app, which does not match this repository's current structure.
