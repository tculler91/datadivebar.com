# CLAUDE.md

## Project Overview

datadivebar.com is a fun, interactive data visualization website hosted on GitHub Pages. Each page tells a data story through a dive bar-themed experience. The vibe is "what if a data scientist opened a dive bar."

## Tech Stack

- Pure HTML, CSS, JavaScript (no frameworks)
- D3.js for data visualizations
- No build tools, no package managers
- Hosted on GitHub Pages

## Project Structure

- `index.html` – Main landing page
- `americas-deadliest-animal/` – Data viz about America's deadliest animals
- `bar_invaders/` – Space Invaders-style data game
- `barcade/` – Arcade-themed interactive data experiences
- `CNAME` – Custom domain config pointing to datadivebar.com

## Design Guidelines

- Dark backgrounds with neon/bright accent colors
- Dive bar + arcade aesthetic throughout
- Playful, irreverent tone in all copy
- Data should be accurate even when the presentation is whimsical
- Mobile responsive when feasible

## Code Conventions

- Vanilla JavaScript only — no TypeScript, no React, no frameworks
- Each page/experience is self-contained in its own directory
- CSS in `<style>` tags or inline within HTML files
- Keep things simple, fun, and weird
- No unnecessary abstractions or over-engineering

## Deployment

- Push to `main` branch to auto-deploy via GitHub Pages
- `CNAME` file maps to datadivebar.com
- Test locally by opening HTML files directly in a browser
