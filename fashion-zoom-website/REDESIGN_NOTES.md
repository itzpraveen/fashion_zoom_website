# Fashion Zoom — Redesign v1

This drop includes a **modern, responsive landing page** built with your existing Vite + React + Tailwind + shadcn/ui stack. It keeps your current assets and component system, but raises clarity, aesthetics, and conversion.

## What's included
- `src/App.redesigned.jsx` — NEW landing page with:
  - Sticky/blur header, mobile nav, clearer IA
  - Hero with CTA (Apply / Watch Reels)
  - What we do (Academy, Magazine, Events, Productions)
  - Courses grid
  - Horizontal portfolio scroller
  - Upcoming event section (Onam sample)
  - Admissions lead form + quick contact
  - Clean footer (Explore, Contact, Newsletter)
- `index.seo.html` — Example `index.html` with **SEO/Open Graph** tags you can merge.

## How to preview (non-destructive)
1. Open `src/main.jsx` and change:
   ```diff
   - import App from './App.jsx'
   + import App from './App.redesigned.jsx'
   ```
2. Run locally:
   ```bash
   pnpm install   # or npm i / yarn
   pnpm dev       # http://localhost:5173
   ```

## Ship it
If you like the redesign, either keep `App.redesigned.jsx` as your entry, or copy its sections back into `App.jsx` (recommended once finalized).

## SEO & Social (important)
- Replace head in `index.html` using `index.seo.html` as reference:
  - Title, description, canonical URL
  - Open Graph (`og:*`) + Twitter cards
  - Favicons
- Add `robots.txt` and `sitemap.xml` (via your host/CI).

## Performance & Quality checklist
- [ ] Convert large JPEGs to AVIF/WebP; export multiple sizes and add `srcSet`
- [ ] Add `loading="lazy"` for below-the-fold images
- [ ] Compress images (ImageOptim / Squoosh)
- [ ] Use font-display: swap (Google Fonts) / or system fonts
- [ ] Install analytics (GTM or Plausible)
- [ ] Add form submit (Netlify / API) + spam honeypot
- [ ] A11y: alt text, color contrast, focus states, semantic `h1..h3`

## Content suggestions
- Courses: add prices (or “request prospectus”), batch dates, and a 1‑page PDF syllabus
- Portfolio: 12 best shots; group by runway / editorial / campaigns
- Reels: embed top 6 IG reels as a grid
- Testimonials: 3 alumni quotes with headshots
- Admissions: FAQ + call scheduling link

---

**Need more?** I can split this into routes (Home, Courses, Portfolio, Magazine, Events, Admissions) with React Router or migrate to Next.js for SSR/SEO. 
