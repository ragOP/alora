# Sale DE – Modular layout

This folder is split so you can work on the page section by section.

## Files

- **main.html** – Shell page: same head, one `<main>` with placeholders. Use this as the entry point when you want to load sections from component files.
- **index.html** – Original single-file page (unchanged). Use this if you prefer one file or need to open via `file://`.
- **load-components.js** – Loads each section HTML into the placeholders in `main.html` (runs on `DOMContentLoaded`).
- **jasmie.css** – Single CSS file for footer section and CTA (button "SICHERE DIR 50% RABAT", sticky bar, mobile spacing). Used by both `main.html` and `index.html`. Edit footer/button styles only here.
- **components/** – One HTML fragment per section (hero, overview, testimonials, pricing, FAQ, **footer-legal**, etc.). Edit these to optimize or change content; `main.html` will show the updated sections when loaded.

## Component list (order in main.html)

1. hero-intro  
2. content-overview  
3. product-intro  
4. testimonials-proof  
5. clinical-evidence  
6. how-it-works  
7. recovery-framework  
8. program-breakdown  
9. benefits-summary  
10. social-proof  
11. offer-details  
12. pricing-options  
13. faqs  
14. guarantee  
15. final-cta  
16. checkout-assurance  
17. footer-legal  

## How to use

- **With a local server** (recommended): serve this folder (e.g. `npx serve .` from the repo root or from `sale-de`). Open `main.html`; components will load via `fetch`.
- **Without a server**: open `index.html` directly. Component loading in `main.html` will not work from `file://` because of browser security rules.

To optimize a section, edit the corresponding file in `components/` and refresh `main.html` (when served over HTTP).
