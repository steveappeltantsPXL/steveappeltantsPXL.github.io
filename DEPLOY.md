# Deploying your new portfolio to steveappeltantspxl.github.io

This folder is a **ready-to-publish** static site. It contains everything the
live site needs — no build step, no Node, no API token, no `.env`.

```
index.html            ← your portfolio (was Portfolio.html, renamed)
assets/styles.css     ← all styling
assets/app.js         ← theme toggle, scroll, nav
.nojekyll             ← tells GitHub Pages to serve files as-is
```

GitHub Pages serves whatever `index.html` sits at the **root** of your
`steveappeltantsPXL.github.io` repository. So you just need these files at the
root of that repo.

---

## Option A — GitHub website (no tools, easiest)

1. Go to your repo: https://github.com/steveappeltantsPXL/steveappeltantsPXL.github.io
2. Delete the **old** `index.html` (and the now-unused `assets/js`, `assets/css`,
   `assets/data`, `.env` if you like — the new site doesn't use them).
3. Click **Add file → Upload files**.
4. Drag in `index.html`, the `assets/` folder, and `.nojekyll` from THIS folder.
5. Commit (write a message like "Rebuild portfolio").
6. Wait ~1 minute, then open https://steveappeltantspxl.github.io/ and hard-refresh
   (Ctrl/Cmd + Shift + R).

## Option B — Git command line

```bash
git clone https://github.com/steveappeltantsPXL/steveappeltantsPXL.github.io.git
cd steveappeltantsPXL.github.io

# remove old site (keep .git, README, LICENSE, robots.txt, sitemap.xml, 404.html if you want them)
rm -f index.html
rm -rf assets/js assets/css assets/data

# copy the new files from this deploy folder into the repo root, then:
git add -A
git commit -m "Rebuild portfolio (static)"
git push
```

---

## Keep / replace notes
- **Keep:** `robots.txt`, `sitemap.xml`, `404.html`, `LICENSE`, `README.md`,
  `.nojekyll` — these still apply.
- **Safe to delete:** `assets/js`, `assets/css`, `assets/data`, `.env`,
  `.env.example` — the new site is fully static and doesn't read them.
- **OG image:** the old meta referenced `assets/images/og-image.png`, which was
  missing. The new `index.html` uses text-only social meta. If you want a link
  preview image later, drop a 1200×630 PNG in `assets/images/` and I'll wire it up.

## Things you may still want to give me
- A real social-preview (OG) image.
- A headshot, if you ever want one in the hero (currently text-only by design).
- Confirm the **Digitaal Zorgkompas** staging link is OK to keep public — it's a
  `staging.` URL and may change.
