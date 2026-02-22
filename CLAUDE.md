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
- `weather/` – 1990s Weather Channel-style ambient radar display for Ohio
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

## Workflow Orchestration

### 1. Plan Mode Default
- Enter plan mode for ANY non-trivial task (3+ steps or architectural decisions)
- If something goes sideways, STOP and re-plan immediately – don't keep pushing
- Use plan mode for verification steps, not just building
- Write detailed specs upfront to reduce ambiguity

### 2. Subagent Strategy
- Use subagents liberally to keep main context window clean
- Offload research, exploration, and parallel analysis to subagents
- For complex problems, throw more compute at it via subagents
- One task per subagent for focused execution

### 3. Self-Improvement Loop
- After ANY correction from the user: update `tasks/lessons.md` with the pattern
- Write rules for yourself that prevent the same mistake
- Ruthlessly iterate on these lessons until mistake rate drops
- Review lessons at session start for relevant project

### 4. Verification Before Done
- Never mark a task complete without proving it works
- Diff behavior between main and your changes when relevant
- Ask yourself: "Would a staff engineer approve this?"
- Run tests, check logs, demonstrate correctness

### 5. Demand Elegance (Balanced)
- For non-trivial changes: pause and ask "is there a more elegant way?"
- If a fix feels hacky: "Knowing everything I know now, implement the elegant solution"
- Skip this for simple, obvious fixes – don't over-engineer
- Challenge your own work before presenting it

### 6. Autonomous Bug Fixing
- When given a bug report: just fix it. Don't ask for hand-holding
- Point at logs, errors, failing tests – then resolve them
- Zero context switching required from the user
- Go fix failing CI tests without being told how

## Task Management

1. **Plan First**: Write plan to `tasks/todo.md` with checkable items
2. **Verify Plans**: Check in before starting implementation
3. **Track Progress**: Mark items complete as you go
4. **Explain Changes**: High-level summary at each step
5. **Document Results**: Add review section to `tasks/todo.md`
6. **Capture Lessons**: Update `tasks/lessons.md` after corrections

## Core Principles

- **Simplicity First**: Make every change as simple as possible. Impact minimal code.
- **No Laziness**: Find root causes. No temporary fixes. Senior developer standards.
- **Minimal Impact**: Changes should only touch what's necessary. Avoid introducing bugs.

## Weather Desk (`weather/`)

A 1990s Weather Channel-inspired ambient radar display for Ohio. Designed as a "set it and forget it" page you can leave running on a screen all night.

### What It Does

- Full-screen Leaflet map centered on Columbus, OH with dark CartoDB base tiles
- Live NEXRAD radar reflectivity overlay via Iowa Environmental Mesonet (IEM) tile service, auto-refreshing every 2.5 minutes
- Bottom chyron cycles through real-time conditions (temperature, humidity, wind, description) for 5 Ohio cities: Columbus, Cleveland, Cincinnati, Toledo, and Akron
- Weather data pulled from the free NWS `api.weather.gov` API (no key required), refreshed every 10 minutes
- NWS severe weather alert banner for Ohio (tornado, severe thunderstorm, flash flood)
- Live clock and date display in the top bar
- Smooth jazz audio stream from SomaFM (Ill Street Blues) with play/mute toggle
- Radar opacity controls (On / 50% / Off)
- Subtle vignette overlay for a CRT-like feel

### Key Technical Details

- **Single file**: `weather/index.html` — fully self-contained, no build step
- **External dependencies**: Leaflet 1.9.4 (CDN), Google Fonts (IBM Plex Mono, Playfair Display)
- **Data sources**: IEM NEXRAD tiles, NWS observations API, NWS alerts API — all free, no API keys
- **Audio**: SomaFM streaming (not bundled files); multiple fallback stream URLs
- **Spec file**: `weather_channel.md` in repo root contains the original design spec and future plans (e.g., potential 24/7 YouTube live stream)
