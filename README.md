# Steve Appeltants - Interactive Portfolio

A modern, responsive portfolio website showcasing professional experience, skills, projects, and GitHub repositories. Built with Vue.js and hosted on GitHub Pages.

## Project Structure

```
steveappeltantsPXL.github.io/
├── index.html              # Main HTML file with Vue.js app
├── 404.html                # Custom error page
├── CNAME                   # Custom domain configuration
├── robots.txt              # Search engine optimization
├── sitemap.xml             # XML sitemap for search engines
├── README.md               # This file
├── assets/
│   ├── css/
│   │   └── styles.css      # Extracted stylesheet (308 lines)
│   ├── js/
│   │   └── app.js          # Vue.js application logic (110 lines)
│   └── images/
│       ├── favicon.ico     # Favicon (to be added)
│       └── og-image.png    # Open Graph image for social sharing (to be added)
├── docs/
│   └── Softwaremanager.pdf # Portfolio reference document
└── .gitignore              # Git ignore configuration
```

## Features

- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Interactive Sections**:
  - Hero section with smooth animations
  - Technical skills categorized by proficiency
  - Professional experience timeline
  - Education background
  - Featured projects with code samples
  - GitHub projects integration (auto-loads from API)
  - Contact buttons (GitHub, LinkedIn, Email)
- **SEO Optimized**:
  - Meta tags for search engines
  - Open Graph tags for social sharing
  - XML sitemap
  - robots.txt configuration
- **Performance**:
  - External CSS and JavaScript (better caching)
  - Resource preconnection for faster loading
  - CDN-hosted Vue.js library

## Getting Started

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/steveappeltantsPXL/steveappeltantsPXL.github.io.git
   cd steveappeltantsPXL.github.io
   ```

2. Open `index.html` in your browser:
   - On Windows: Double-click `index.html`
   - Or start a local server: `python -m http.server 8000` (Python 3)
   - Then navigate to `http://localhost:8000`

3. To modify content, edit `assets/js/app.js` and update the `config` object with your information.

### Deployment

The portfolio is automatically deployed to GitHub Pages when you push to the `main` branch.

## Custom Domain Setup

The site is configured to use a custom domain via the `CNAME` file.

### To use with your own domain:

1. **Update CNAME file**:
   ```bash
   echo "yourdomain.com" > CNAME
   ```

2. **Configure DNS records** with your domain registrar:
   - **Option A - A Records** (recommended):
     - Add A record pointing to: `185.199.108.153`
     - Add A record pointing to: `185.199.109.153`
     - Add A record pointing to: `185.199.110.153`
     - Add A record pointing to: `185.199.111.153`

   - **Option B - CNAME Record**:
     - Add CNAME record pointing to: `steveappeltantspxl.github.io`

3. **GitHub Pages Settings**:
   - Go to your repository settings
   - Navigate to "Pages" section
   - Verify custom domain is set
   - Enable "Enforce HTTPS"

4. **Wait for DNS propagation** (can take 5-30 minutes)

5. **Test your domain**:
   - Visit `https://yourdomain.com`
   - Check SSL certificate status (should be "Secure")

## Customization

### Updating Portfolio Content

Edit `assets/js/app.js` and modify the `config` object:

```javascript
config: {
    name: 'Your Name',
    title: 'Your Title',
    bio: 'Your bio text...',
    email: 'your.email@example.com',
    github: 'yourgithubusername/',
    linkedin: 'https://www.linkedin.com/in/yourprofile/',

    // Skills, experience, education, etc.
}
```

### Styling

All styles are in `assets/css/styles.css`. The site uses:
- CSS Grid and Flexbox for layout
- CSS Custom Properties for consistency
- Glassmorphism design with backdrop filters
- Responsive design with media queries

### Adding Profile Images

1. Create your images (recommended sizes):
   - Favicon: 32x32px (favicon.ico)
   - OG Image: 1200x630px (og-image.png)

2. Place in `assets/images/`

3. Update references in `index.html` if paths change

## SEO Features

- **Meta Tags**: Description, keywords, author
- **Open Graph**: Optimal previews on social media (Twitter, Facebook, LinkedIn)
- **robots.txt**: Guides search engines and blocks unnecessary crawling
- **sitemap.xml**: Helps search engines discover and index your portfolio
- **Canonical URL**: Prevents duplicate content issues

## Performance Optimization

- External CSS and JS allow browser caching
- Resource preconnection reduces DNS lookups
- Vue.js loaded from CDN for faster delivery
- Minified assets ready for production

## GitHub API Integration

The portfolio automatically fetches and displays your GitHub projects. Configure in `assets/js/app.js`:

```javascript
featuredRepos: [
    'your-repo-1',
    'your-repo-2',
    'your-repo-3'
]
```

The GitHub API will fetch data for these repositories and display:
- Repository name and description
- Programming language
- Star count
- Fork count
- Link to repository

## Responsive Design Breakpoints

- **Mobile**: < 768px (single column layout)
- **Tablet**: 768px - 1024px (adjusted spacing)
- **Desktop**: > 1024px (full layout)

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

### GitHub API Not Loading
- Check if repos exist and names are correct
- GitHub API has rate limits (60 requests/hour unauthenticated)
- Check browser console for errors (F12)

### Styles Not Loading
- Clear browser cache (Ctrl+Shift+Delete)
- Verify `assets/css/styles.css` exists
- Check browser console for 404 errors

### Custom Domain Not Working
- Wait for DNS propagation (up to 30 minutes)
- Verify CNAME file contains only your domain
- Check GitHub Pages settings confirm custom domain

## Technologies Used

- **Frontend Framework**: Vue.js 3.3.4
- **Styling**: CSS3 with Glassmorphism effects
- **Hosting**: GitHub Pages
- **APIs**: GitHub REST API
- **Fonts**: Google Fonts (Inter)

## License

This portfolio is personal and custom-built. Feel free to use as inspiration for your own portfolio.

## Contact

- Email: steve.appeltants@outlook.com
- LinkedIn: https://www.linkedin.com/in/steve-appeltants/
- GitHub: https://github.com/steveappeltantsPXL/

---

**Last Updated**: February 2026
**Status**: Active & Maintained
