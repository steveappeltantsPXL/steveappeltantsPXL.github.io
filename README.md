# Steve Appeltants — Portfolio

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-success)](https://steveappeltantspxl.github.io/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Personal portfolio for **Steve Appeltants** — Software Manager with 17+ years
leading teams, building hospital interoperability, agentic AI architecture and
on-device ML.

## 🚀 Live Site

[https://steveappeltantspxl.github.io/](https://steveappeltantspxl.github.io/)

## 📋 About

A single-page portfolio covering:

- **Selected work** — Octogrid ESB (Jessa Hospital), Digitaal Zorgkompas
  (PXL Smart ICT), Visear / ASL-Translator, Project Lingo
- **Experience** — internship, IT projects and research at PXL & Jessa Hospital
- **Technical stack** — leadership, Java/Kotlin/.NET, vision & ML, DevOps
- **Approach** — engineering and leadership principles
- **Community** — Code for Belgium, Student Commission
- **Education & languages**

## 🛠 Tech Stack

Fully **static** — no framework, no build step, no API token.

- **HTML5** — semantic markup
- **CSS** — custom properties, light/dark theming, responsive grid
- **Vanilla JavaScript** — theme toggle, scroll progress, scroll-reveal,
  active-section nav
- **Google Fonts** — Space Grotesk, Newsreader, JetBrains Mono

### Features

- 🌗 Light / dark mode (remembers your choice, respects system preference)
- 📱 Fully responsive
- ♿ Accessible navigation and reduced-motion support
- 🔍 SEO + social-preview (Open Graph) meta
- ⚡ No dependencies to build or deploy — just static files

## 📁 Project Structure

```
index.html            Portfolio page
assets/styles.css      All styling
assets/app.js          Theme toggle, scroll, nav
.nojekyll              Serve files as-is on GitHub Pages
```

## 🔧 Local Preview

No build needed. Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## 🚢 Deploy

This is a GitHub **user site**, so GitHub Pages serves the `index.html` at the
repository root automatically.

```bash
git add -A
git commit -m "Update portfolio"
git push
```

Live within ~1 minute at https://steveappeltantspxl.github.io/
(hard-refresh with Ctrl/Cmd + Shift + R to clear the cache).

## 📄 License

[MIT](LICENSE) © Steve Appeltants
