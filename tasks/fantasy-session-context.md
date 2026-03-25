# Fantasy Baseball Multiplayer — Session Context

## What Was Accomplished
1. Full codebase exploration completed
2. Existing `fantasy/index.html` thoroughly analyzed (1183 lines, single-player CPU-opponent vibes-based fantasy)
3. Master 10-step plan written to `tasks/todo.md`
4. Step 1 design finalized but not yet coded

## Current State of fantasy/index.html
- Single-player experience: user drafts against CPU teams
- "Vibes-based" scoring: SAUCE, BEEF, FILTH, BYRD, MOYER (proprietary metrics)
- Uses MLB Stats API (`statsapi.mlb.com/api/v1`) with CORS proxy fallback
- Snake draft, H2H category matchup simulation, standings, trash talk
- 4-12 team leagues, all CPU opponents
- Self-contained single HTML file (project convention)
- Fonts: Playfair Display, JetBrains Mono, DM Sans, Press Start 2P
- Color scheme: neon-green (#69f0ae), neon-orange (#FF6B0A), dark-bg (#0E1A2B)

## What Step 1 Needs to Build (NOT YET STARTED)
Complete rewrite of fantasy/index.html into a Sleeper-style mobile-first app:

### Auth System (localStorage-based, Supabase-ready)
- User registration: email, password, display name, team emoji
- Login screen with remember me
- Password hashing (bcrypt.js from CDN or SHA-256 via Web Crypto API)
- Session management via localStorage
- Designed so auth calls can swap to Supabase in Step 2

### UI Shell (Sleeper-inspired)
- Dark theme: background ~#1B1D28, accent green ~#52D17C
- Bottom tab navigation: Home, Matchup, League, Players, More
- SVG icons for tabs (no icon library dependency)
- Screen-based SPA routing (show/hide divs, like current phase system)
- iOS safe area insets (env(safe-area-inset-bottom))
- Touch-optimized: 44px minimum tap targets
- Smooth slide/fade transitions between screens
- Pull-to-refresh gesture support (stretch goal)

### Screens to Build
1. **Splash** — App logo, "Fantasy Vibes League" branding, loading animation
2. **Login** — Email + password fields, "Create Account" link, forgot password
3. **Register** — Email, password, confirm password, display name, pick team emoji
4. **Home Dashboard** — Welcome message, league card (or "Create/Join League" CTA), recent activity feed placeholder, quick stats
5. **My Team** — Roster overview placeholder (populated in Step 4)
6. **Matchup** — Current matchup placeholder (populated in Step 5)
7. **League** — Standings placeholder, league members (populated in Step 6)
8. **Players** — Player search/browse placeholder (populated in Step 4)
9. **Settings/More** — Profile, logout, app info

### Design References (Sleeper App Style)
- Very dark backgrounds with subtle card elevation
- Bright green for primary actions/CTAs
- Gray text hierarchy (white > light gray > medium gray > dark gray)
- Rounded cards with subtle borders
- Avatar emojis (baseball themed: ⚾🏟️🧢🦅🐻🔥💀👑🎯🍺)
- Clean sans-serif font (DM Sans works well)
- Monospace for stats/numbers (JetBrains Mono)
- Minimal use of color — mostly monochrome with green highlights
- Bottom sheet modals for actions
- Swipe gestures where appropriate

### Project Conventions (from CLAUDE.md)
- Single self-contained HTML file
- No frameworks, no build tools, no TypeScript
- CDN only for external dependencies
- Dive bar + arcade aesthetic (adapted to Sleeper clean style)
- Dark backgrounds with neon accents
- Mobile responsive

## Key Files
- `fantasy/index.html` — THE file to rewrite (currently 1183 lines)
- `tasks/todo.md` — Master plan with all 10 steps
- `tasks/lessons.md` — Past lessons (NWS API, audio, CSS patterns)
- `CLAUDE.md` — Project conventions and workflow rules
- `index.html` — Main landing page (links to /fantasy/)

## Data Architecture (for Supabase in Step 2+)
- `users` — id, email, display_name, avatar_emoji, created_at
- `leagues` — id, name, commissioner_id, size, scoring_type, draft_date, settings_json
- `league_members` — league_id, user_id, team_name, team_emoji, draft_position
- `rosters` — id, league_member_id, player_mlb_id, roster_position, is_bench
- `matchups` — id, league_id, week, team_a_id, team_b_id, scores_json
- `draft_picks` — id, league_id, round, pick_number, league_member_id, player_mlb_id
- `transactions` — id, league_id, type, details_json, timestamp
- `messages` — id, league_id, user_id, content, timestamp

## Git Info
- Working branch: `claude/multiplayer-fantasy-baseball-sqgTU`
- Remote: `origin/claude/multiplayer-fantasy-baseball-sqgTU` exists
- Main branch: `origin/main`
- Last merge on main: PR #79 (retro media player visualizer)
