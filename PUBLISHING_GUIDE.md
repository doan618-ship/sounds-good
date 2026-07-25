# SoundsGood — GitHub Pages Publishing & Deployment Guide

This guide details how to publish and deploy your **SoundsGood Music Review Archive** to **GitHub Pages** using automated GitHub Actions CI/CD workflows.

---

## 🚀 Automated Deployment to GitHub Pages

SoundsGood is built with **Astro (Static Site Generation)**. A pre-configured GitHub Actions workflow (`.github/workflows/deploy.yml`) automatically builds and deploys your site whenever you push changes to the `main` branch.

### Prerequisites
- A **GitHub Account**.
- Git installed on your computer.

---

## 📋 Step-by-Step Deployment Setup

### 1. Initialize & Push Your Repository to GitHub
If you haven't already pushed your project to GitHub:

```bash
git init
git add .
git commit -m "Initial commit of SoundsGood review app"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```

### 2. Configure GitHub Repository Settings
1. Go to your repository on GitHub: `https://github.com/<your-username>/<your-repo-name>`.
2. Click **Settings** (top navigation tab).
3. Under **Code and automation** in the left sidebar, click **Pages**.
4. Under **Build and deployment**:
   - **Source**: Select **GitHub Actions** (from the drop-down menu).
5. No extra build command configuration is required — GitHub Actions handles everything automatically!

### 3. Update `astro.config.mjs` (If deploying to a repository subpath)
If your site is hosted at `https://<your-username>.github.io/<your-repo-name>/`, update `astro.config.mjs`:

```js
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://<your-username>.github.io',
  base: '/<your-repo-name>',
  output: 'static',
});
```

*Note: If deploying to a custom domain (e.g. `https://reviews.yourdomain.com`), set `site: 'https://reviews.yourdomain.com'` and omit `base`.*

---

## 🔄 How Automated Deployment Works

1. Every time you push to the `main` branch (or manually trigger via **Actions** tab in GitHub):
   - `.github/workflows/deploy.yml` starts automatically.
   - It runs `withastro/action` to install dependencies, validate Content Collections (`astro check`), and compile static HTML files into `dist/`.
   - `actions/deploy-pages` deploys the compiled output to GitHub Pages within seconds.
2. Your live website will be accessible at:
   - `https://<your-username>.github.io/<your-repo-name>/` (or your custom domain).

---

## 📝 Adding & Managing Album Reviews

Reviews are stored as Markdown files in `src/content/reviews/`. Astro validates all frontmatter metadata using the Zod schema defined in `src/content.config.ts`.

### Create a New Review File
Add a new Markdown file (e.g., `src/content/reviews/my-album.md`):

```markdown
---
title: "Album Title"
artist: "Artist Name"
releaseYear: 2024
rating: 9.2
coverImage: "https://images.unsplash.com/photo-..."
spotifyId: "4Rzn2flUjhVjG852yaL9Zb"
pubDate: 2026-07-25
tags: ["Hip-Hop", "Jazz Fusion", "Essential"]
summary: "A brief 1-2 sentence excerpt summarizing the album."
accentColor: "rgba(34, 197, 94, 0.25)"
bgColors: ["#123820", "#261533"]
spectrumRating: [9.5, 9.0, 9.5, 9.0, 9.0, 9.0]
---

Write your full album review article here using standard Markdown syntax.

## Dynamic Production & Mixing
Detailed discussion...

## Standout Tracks
- Track 1
- Track 2
```

### Spectrum Rating 6-Axis Scale
The `spectrumRating` array consists of 6 scores out of 10.0 in the following order:
1. **Melody & Harmony**
2. **Production & Mixing**
3. **Lyrical Depth**
4. **Cohesiveness & Concept**
5. **Originality**
6. **Cultural Impact**

Once committed and pushed to `main`, GitHub Pages will update your site automatically!

---

## 🧪 Local Testing Before Publishing

Before pushing changes to GitHub, test your build locally:

```bash
# Type check and build static files
npm run build

# Preview production build locally
npm run preview
```
