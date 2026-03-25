# Saugat Poudel – Portfolio

Personal portfolio website for **Saugat Poudel**, AI/ML Engineer.

Live at: [saugatpoudel.me](https://saugatpoudel.me)

---

## Tech Stack

| Layer      | Technology                            |
|------------|---------------------------------------|
| Markup     | Semantic HTML5                        |
| Styles     | Vanilla CSS with custom properties    |
| Scripts    | Vanilla JavaScript (ES5-compatible)   |
| Hosting    | GitHub Pages (custom domain via CNAME)|
| Forms      | formsubmit.co (no backend required)   |

No build tools, no frameworks, no dependencies — just clean static files.

---

## Project Structure

```
/
├── index.html                  # Main single-page application
├── 404.html                    # Custom 404 page
├── manifest.json               # PWA manifest
├── CNAME                       # GitHub Pages custom domain
├── robots.txt                  # Search engine directives
├── sitemap.xml                 # SEO sitemap
├── .gitattributes              # Git line ending / binary config
│
├── styles/
│   ├── base.css                # Design tokens, reset, typography
│   ├── utilities.css           # Layout helpers, animations, fade-in
│   ├── nav.css                 # Navbar + social sidebar + mobile menu
│   ├── hero.css                # Hero landing section
│   ├── about.css               # Two-column about grid
│   ├── experience.css          # Expandable experience cards
│   ├── education.css           # Education cards
│   ├── certifications.css      # Certification badge grid
│   ├── projects-cards.css      # Project card grid + animated banners
│   ├── projects-modal.css      # Project detail modal
│   ├── skills.css              # Skill pill groups
│   └── contact.css             # Contact form + footer
│
├── js/
│   ├── main.js                 # Nav, scroll, fade-in, exp-card toggle, image fallbacks
│   └── projects.js             # Project banners, particles, modal
│
└── assets/
    ├── favicon.png
    ├── images/
    │   ├── profile/            # Profile photo (me.png)
    │   ├── logos/              # Company/institution logos
    │   └── resume/             # Resume SVG icon
    └── documents/
        ├── Resume_Saugat.pdf
        └── certificates/       # PDF certificates
```

---

## Local Development

No build step required. Serve directly from the project root:

```bash
# Python (built-in)
python3 -m http.server 3000

# Node (via npx)
npx serve .
```

Then open `http://localhost:3000` in your browser.

---

## Adding New Content

### New Project

In `index.html`, add a new `<article class="proj-card ...">` inside `.projects-grid`.
Copy an existing card and update:
- `data-bullets` — pipe-separated `||` bullet points
- `data-github` / `data-demo` — action button links
- `.proj-badge` text — category label
- `.proj-name-main` text — project title
- `.proj-title-row h3` — card heading
- `.proj-summary` — one-line description
- `.proj-tech span` elements — technology pills

The JS in `projects.js` auto-assigns a color palette and adds floating particles.

### New Section

1. Add a `<section class="section" id="new-section">` in `index.html`
2. Create `styles/new-section.css` for its styles
3. Add `<link rel="stylesheet" href="styles/new-section.css">` in the `<head>`
4. Add a nav link `<li><a href="#new-section">Label</a></li>` in the navbar

---

## Deployment

Push to the `main` branch — GitHub Pages deploys automatically.

Custom domain is configured via the `CNAME` file pointing to `saugatpoudel.me`.
