# Laksaara TMQ — Cloudflare Deployment Guide

## Quick Start

This package contains everything needed to deploy the Laksaara TMQ website on Cloudflare Pages.

### Option 1: Deploy the Pre-built Version (Fastest)

1. Go to **Cloudflare Pages** → Create a new project
2. Upload the **`dist/`** folder as your static site
3. Done! All images and assets are included.

### Option 2: Deploy from GitHub (Recommended for Future Updates)

1. Push this entire folder to a GitHub repository
2. In Cloudflare Pages, connect your GitHub repo
3. Set build command: `pnpm build`
4. Set publish directory: `dist/public`
5. Deploy!

## File Structure

```
dist/              ← Deploy THIS folder to Cloudflare Pages (contains all HTML, CSS, JS, images)
client/            ← React source code (for editing)
server/            ← Backend placeholder (not used in static deployment)
package.json       ← Dependencies
pnpm-lock.yaml     ← Lock file (use pnpm install)
```

## Local Development

If you want to edit the site locally:

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build

# Output will be in dist/public/ — ready to deploy
```

## Images

All 32 images (furniture pieces, flooring, logo) are bundled in:
- `dist/images/` (in the built version)
- `client/public/images/` (in the source)

They're optimized JPGs (~6.4 MB total) and will load on Cloudflare without issues.

## Troubleshooting

**Images not showing?**
- Make sure you're deploying the `dist/public/` folder (not just `dist/`)
- Check Cloudflare build logs for any errors

**Need to make changes?**
- Edit files in `client/src/`
- Run `pnpm build` locally
- Redeploy the `dist/public/` folder

---

**Website:** Laksaara TMQ — Premium Wood Furniture Export
**Last updated:** June 25, 2026
