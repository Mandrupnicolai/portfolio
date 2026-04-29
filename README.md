# Nicolai Uhre Mandrup — Portfolio

> Personal portfolio site built with vanilla HTML, CSS, and JavaScript. Deployed automatically to GitHub Pages via GitHub Actions.

🌐 **Live site:** [mandrupnicolai.github.io/portfolio](https://mandrupnicolai.github.io/portfolio)

---

## About

This is my personal portfolio showcasing my projects, technical skills, and experience as a full-stack software engineer. Currently completing my MSc in Software Engineering at Aalborg University (2026).

---

## Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Markup | HTML5 | Semantic, accessible, no build step |
| Styling | CSS3 (custom properties, grid, flexbox) | Zero dependencies, full control |
| Scripting | Vanilla JavaScript | Lightweight, no framework overhead |
| Hosting | GitHub Pages | Free, fast, integrates with CI/CD |
| CI/CD | GitHub Actions | Auto-deploys on every push to `main` |

---

## Project Structure

```
portfolio/
├── index.html                  # Single-page portfolio
├── assets/
│   ├── css/
│   │   └── style.css           # All styles (CSS custom properties, responsive)
│   └── js/
│       └── main.js             # Scroll reveal, nav behaviour, interactions
├── .github/
│   └── workflows/
│       └── deploy.yml          # CI/CD: validate HTML → deploy to Pages
└── README.md
```

---

## Deployment Pipeline

Every push to `main` triggers the GitHub Actions workflow:

```
push to main
     │
     ▼
┌─────────────┐
│  Validate   │  html-validate checks index.html
│    HTML     │
└──────┬──────┘
       │ pass
       ▼
┌─────────────┐
│   Deploy    │  actions/deploy-pages uploads to GitHub Pages
│  to Pages   │
└──────┬──────┘
       │
       ▼
  Live at mandrupnicolai.github.io/portfolio
```

---

## Local Development

No build tools required. Just open the file directly:

```bash
# Option 1 — open directly in browser
start index.html

# Option 2 — serve locally with Node
npx serve .

# Option 3 — serve locally with Python
python -m http.server 8080
```

---

## Contact

- **Email:** nicolai.uhre.com@gmail.com
- **LinkedIn:** [linkedin.com/in/nicolai-uhre-mandrup](https://linkedin.com/in/nicolai-uhre-mandrup-526288220)
- **Phone:** +45 60 78 83 53
