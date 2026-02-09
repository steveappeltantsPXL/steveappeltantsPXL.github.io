# Steve Appeltants - Portfolio & CV

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-success)](https://steveappeltantspxl.github.io/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Professional portfolio and curriculum vitae for Steve Appeltants – Software Manager and Bachelor Applied Science student specializing in healthcare technology and enterprise solutions.

## 🚀 Live Site

Visit the live portfolio: [https://steveappeltantspxl.github.io/](https://steveappeltantspxl.github.io/)

## 📋 About

This portfolio showcases:
- **Professional Experience** in software management and development
- **Technical Skills** in Java, Kotlin, .NET, and modern web technologies
- **Education** from University College PXL in Applied Informatics
- **Featured Projects** including healthcare interoperability and enterprise solutions
- **Dynamic GitHub Integration** for showcasing the latest repositories

## 🛠 Tech Stack

### Frontend
- **Vue.js 3** – Reactive JavaScript framework
- **Vanilla CSS** – Custom styling with CSS variables
- **HTML5** – Semantic markup

### Features
- 📱 Fully responsive design
- 🎨 Java/Kotlin/C# themed color scheme
- 🔄 Dynamic GitHub repository integration
- 📊 Interactive project timeline
- 🚀 Fast loading with CDN resources
- ♿ Accessible navigation
- 🎯 SEO optimized with structured data

## 🔐 GitHub API Token Setup

This portfolio dynamically fetches and displays your latest GitHub repositories using the GitHub API. To enable this feature with a higher rate limit, you need to configure a GitHub Personal Access Token:

### Option 1: Secure Setup (Recommended) – Using GitHub Actions

The project includes a GitHub Actions workflow that securely injects a token at deployment time:

1. **Create a Personal Access Token:**
   - Go to GitHub Settings → Developer settings → Personal access tokens (classic)
   - Click "Generate new token (classic)"
   - Give it a name (e.g., "Portfolio GitHub Token")
   - Select scopes: `public_repo`, `read:user`
   - Click "Generate token" and **copy it immediately** (you won't see it again)

2. **Add Token as Repository Secret:**
   - Go to your repository settings → Secrets and variables → Actions → New repository secret
   - Name: `GITHUB_PAT`
   - Value: Paste your Personal Access Token
   - Click "Add secret"

3. **How It Works:**
   - When you push to `main`, GitHub Actions automatically:
     - Checks out your code
     - Injects your token from the secret
     - Deploys to GitHub Pages
   - Your actual token is **never** committed to the repository
   - Only GitHub Actions and GitHub Pages servers see it

### Option 2: Manual Setup

If you don't want to use GitHub Actions, you can add the token directly to `assets/js/app.js`:

1. Open `assets/js/app.js`
2. Find the line: `githubToken: '__GITHUB_TOKEN_PLACEHOLDER__'`
3. Replace with: `githubToken: 'your-actual-token-here'`

**Note:** This exposes your token in the public repository. Regenerate the token regularly and delete it if security is compromised.

### API Rate Limits

- **Without Token:** 60 requests/hour (very limiting)
- **With Token:** 5,000 requests/hour (sufficient for regular updates)

## 📁 Project Structure