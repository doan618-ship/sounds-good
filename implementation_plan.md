# Implementation Plan - Refactor Music Review Web App to Astro SSG

Refactor the current music review web app draft into a fast, minimalist, content-first static site built with the **Astro Framework**. The app will leverage **Astro Content Collections** with **Zod validation** for Markdown review posts, SVG-rendered 6-axis **spectrum rating radar charts**, lazy-loaded **Spotify iFrame embeds**, and a **GitHub Actions workflow** for automated GitHub Pages deployment.

---

## User Review Required

> [!NOTE]
> **Architectural Transition**: The project will be refactored from a vanilla JS draft to a modern **Astro Static Site Generation (SSG)** structure. All review content will reside in structured Markdown files with frontmatter Zod validation.

> [!IMPORTANT]
> **Design Philosophy**: Minimalist, old-school, content-first aesthetic using the **Inter** typeface, high-contrast monochrome (black/grey/white) typography, and subtle CSS gradient accents derived from each album's artwork. Zero heavy JavaScript libraries or unnecessary animations.

---

## Open Questions

- **GitHub Pages Domain Configuration**: Do you plan to host the site on a custom domain (e.g. `reviews.yourdomain.com`) or a standard GitHub Pages subdirectory URL (e.g. `https://<username>.github.io/<repository>/`)? We will configure `astro.config.mjs` with an adaptable `site` and `base` setting.

---

## Proposed Changes

### Configuration & Project Setup

#### [NEW] [package.json](file:///d:/Review%20web%20app/package.json)
- Define dependencies for `astro`, `@astrojs/check`, `typescript`, and Zod validation tools.

#### [NEW] [astro.config.mjs](file:///d:/Review%20web%20app/astro.config.mjs)
- Configure Astro in SSG output mode, set up `site` URL for custom domain or GitHub Pages deployment.

#### [NEW] [tsconfig.json](file:///d:/Review%20web%20app/tsconfig.json)
- Setup TypeScript configuration extending `astro/tsconfigs/strict`.

#### [NEW] [.github/workflows/deploy.yml](file:///d:/Review%20web%20app/.github/workflows/deploy.yml)
- GitHub Actions workflow triggering on push to `main` branch to automatically build Astro SSG and deploy to GitHub Pages.

---

### Content Collections

#### [NEW] [src/content/config.ts](file:///d:/Review%20web%20app/src/content/config.ts)
- Define `reviews` Content Collection with Zod schema validating frontmatter:
  - `title` (string)
  - `artist` (string)
  - `releaseYear` (number or string)
  - `rating` (number, average score)
  - `coverImage` (string)
  - `spotifyId` (string, track or album ID)
  - `pubDate` (date)
  - `tags` (array of strings)
  - `summary` (string)
  - `spectrumRating` (array of 6 numbers over 10: Melody & Harmony, Production & Mixing, Lyrical Depth, Cohesiveness & Concept, Originality, Cultural Impact)

#### [NEW] [src/content/reviews/to-pimp-a-butterfly.md](file:///d:/Review%20web%20app/src/content/reviews/to-pimp-a-butterfly.md)
#### [NEW] [src/content/reviews/ok-computer.md](file:///d:/Review%20web%20app/src/content/reviews/ok-computer.md)
#### [NEW] [src/content/reviews/blond.md](file:///d:/Review%20web%20app/src/content/reviews/blond.md)
- Realistic sample Markdown review posts complete with full spectrum ratings, tags, Spotify IDs, and detailed write-ups.

---

### Styling & Layouts

#### [NEW] [src/styles/global.css](file:///d:/Review%20web%20app/src/styles/global.css)
- Implement minimalist CSS design system using the **Inter** font family, crisp black (`#0a0a0a`), dark charcoal (`#18181b`), muted border grey (`#27272a`), clean white text (`#f4f4f5`), and utility styles for album gradient accents.

#### [NEW] [src/layouts/BaseLayout.astro](file:///d:/Review%20web%20app/src/layouts/BaseLayout.astro)
- Primary HTML shell including Google Inter font imports, SEO meta tags, header navigation bar, and clean minimal footer.

---

### Components

#### [NEW] [src/components/Header.astro](file:///d:/Review%20web%20app/src/components/Header.astro)
- Clean, high-contrast navigation bar with site title and section links.

#### [NEW] [src/components/Footer.astro](file:///d:/Review%20web%20app/src/components/Footer.astro)
- Old-school minimalist footer with copyright and RSS feed notice.

#### [NEW] [src/components/ReviewCard.astro](file:///d:/Review%20web%20app/src/components/ReviewCard.astro)
- Lightweight review list card displaying album cover, title, artist, rating score badge, tags, publication date, and summary excerpt.

#### [NEW] [src/components/SpectrumRadar.astro](file:///d:/Review%20web%20app/src/components/SpectrumRadar.astro)
- Static, zero-JS inline SVG radar chart visualizing the 6 rating dimensions (Melody & Harmony, Production & Mixing, Lyrical Depth, Cohesiveness & Concept, Originality, Cultural Impact).

#### [NEW] [src/components/SpotifyEmbed.astro](file:///d:/Review%20web%20app/src/components/SpotifyEmbed.astro)
- Native responsive Spotify iFrame player with `loading="lazy"` attribute for optimized page load speeds.

---

### Pages

#### [NEW] [src/pages/index.astro](file:///d:/Review%20web%20app/src/pages/index.astro)
- Home page querying `getCollection('reviews')`, sorted by `pubDate` (newest first).
- Minimalist static tag filtering UI allowing users to filter reviews by tag.

#### [NEW] [src/pages/reviews/[...slug].astro](file:///d:/Review%20web%20app/src/pages/reviews/[...slug].astro)
- Dynamic static route implementing `getStaticPaths()` for all Markdown posts.
- Header displaying album cover, title, artist, release year, overall rating badge, and tags.
- Dynamic subtle gradient backdrop derived from album theme.
- Embedded `<SpectrumRadar />` and `<SpotifyEmbed />`.
- Clean typography rendering of rendered Markdown article content (`<Content />`).

---

### Cleanup Legacy Files

#### [DELETE] [index.html](file:///d:/Review%20web%20app/index.html)
#### [DELETE] [js/](file:///d:/Review%20web%20app/js/)
#### [DELETE] [styles/](file:///d:/Review%20web%20app/styles/)
- Remove unused legacy vanilla draft files.

---

## Verification Plan

### Automated Verification
- Run `npx astro check` to validate TypeScript and Zod Content Collection schemas.
- Run `npm run build` (or `npx astro build`) to confirm Static Site Generation completes with 0 errors.

### Manual Verification
- Run `npm run preview` to start local preview server.
- Verify homepage renders all 3 sample reviews sorted by `pubDate` (newest first).
- Test tag filtering link mechanics.
- Inspect individual review pages (`/reviews/to-pimp-a-butterfly`, `/reviews/ok-computer`, etc.) to confirm SVG radar charts, Spotify embeds, and typography look sharp and load instantly.
