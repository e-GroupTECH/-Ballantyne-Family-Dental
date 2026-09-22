# Ballantyne Family Dental — Redesign Concept

A modern, conversion-focused redesign concept for [ballantynefamilydental.com](https://www.ballantynefamilydental.com/), built as a prospecting/pitch demo.

Uses the clinic's real branding (logo, hero b-roll video, team/office photography, insurance logos) pulled from the live site, restyled into a faster, more polished single-page experience.

## What changed vs. the current site

- Sticky, minimal header with click-to-call and a persistent booking CTA
- Full-bleed hero video with a clear headline, trust stats and dual CTAs
- Insurance "in-network" trust strip right under the fold
- Redesigned About / Meet the Dentist section with a floating photo layout
- Service cards with real photography, hover motion and clear next steps
- Dedicated "Why Choose Us" band (sedation, financing, insurance, availability)
- Video + photo showcase gallery
- Testimonial cards (ready to swap in live Google Reviews)
- A dedicated free-consult CTA band
- Contact section with hours, map-ready address block and a booking form
- Fully responsive (mobile nav drawer, fluid grids), fast-loading static HTML/CSS/JS — no build step required

## Structure

```
index.html            Single-page site
assets/css/style.css   All styles (CSS variables for easy re-theming)
assets/js/script.js    Mobile nav, scroll reveal, sticky header, demo form
assets/images/         Logo, team/office photos, service photos, insurance logos
assets/video/          Hero b-roll video
```

## Running locally

Any static file server works, e.g.:

```
python3 -m http.server 8080
```

Then open `http://localhost:8080/`.

## Notes

- The appointment form is a front-end demo only (no backend wired up yet) — ready to connect to the clinic's real booking system (Flexbook, etc.) or a lead-capture endpoint.
- Testimonials are placeholders in the same spirit as the reviews on the live site; swap in real, sourced reviews before shipping.
- Social links in the header/footer are placeholders pending the clinic's actual profile URLs.
