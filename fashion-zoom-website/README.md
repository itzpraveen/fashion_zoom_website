## Fashion Zoom Website

React + Vite site for Fashion Zoom Magazine and Modeling Academy.

### Local Development

- Install: `pnpm install`
- Dev server: `pnpm dev`
- Production build: `pnpm build`
- Preview build: `pnpm preview`

### Deploy to GitHub Pages

This repo ships with a GitHub Actions workflow at `.github/workflows/deploy.yml`.

Steps:
- Push to `main` (or `master`).
- In GitHub → Settings → Pages → set Source to “GitHub Actions”.
- The workflow builds `dist/` and deploys to Pages.

Notes:
- Vite `base` is set to `./` for correct relative asset paths.
- Public favicon is referenced via `./favicon.ico`.

