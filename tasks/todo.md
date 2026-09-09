# Fantasy Baseball Multiplayer Overhaul
## datadivebar.com/fantasy/ — Sleeper-Style Multiplayer Fantasy Baseball

### Vision
Full multiplayer fantasy baseball league for up to 10 real players. User accounts with login/password. Sleeper-style mobile-first UI. Complete fantasy experience: drafts, rosters, matchups, waivers, trades, chat.

---

## Master Plan — 10 Steps

### Step 1: App Shell & Auth (CURRENT)
- [x] Mobile-first Sleeper-style UI shell
- [x] Bottom tab navigation (Home, Matchup, League, Players, More)
- [x] Auth screens: Login, Register, Forgot Password
- [x] localStorage-based auth (designed for Supabase upgrade)
- [x] Home dashboard with league overview
- [x] Team profile creation (name, avatar/emoji)
- [x] Sleeper dark theme with green accents
- [x] PWA-ready viewport and touch optimizations

### Step 2: League Management
- [ ] Create League screen (name, size 4-10, scoring type, draft date)
- [ ] Join League via invite code
- [ ] League settings (commissioner controls)
- [ ] League lobby showing all members
- [ ] Commissioner tools: set draft order, adjust settings
- [ ] Supabase integration for persistent data

### Step 3: Real-Time Draft Room
- [ ] Snake draft with real-time multiplayer (Supabase Realtime)
- [ ] Draft lobby with countdown timer
- [ ] Player search and filtering in draft
- [ ] Auto-draft for disconnected/AFK users
- [ ] Draft pick timer (configurable 30s-120s)
- [ ] Live draft board showing all picks
- [ ] Post-draft recap and grades

### Step 4: Roster & Lineup Management
- [ ] Full roster view with starting lineup and bench
- [ ] Roster positions: C, 1B, 2B, 3B, SS, OF×3, UTIL, SP×2, RP×2, BN×3, IL×2
- [ ] Set/lock lineups before first pitch
- [ ] Player cards with stats, news, projections
- [ ] Roster alerts (injured players in lineup, empty slots)

### Step 5: Matchups & Live Scoring
- [ ] Weekly H2H matchup view
- [ ] Live scoring pulling from MLB Stats API
- [ ] Category-by-category comparison
- [ ] Scoring notifications for big plays
- [ ] Matchup history and head-to-head records

### Step 6: Standings & Schedule
- [ ] Full season standings with W-L-T record
- [ ] Playoff bracket (top 4 or 6 teams)
- [ ] Complete season schedule
- [ ] Clinching scenarios
- [ ] Points-for/points-against tracking

### Step 7: Waiver Wire & Free Agency
- [ ] Waiver priority system (inverse of standings)
- [ ] FAAB (Free Agent Acquisition Budget) option
- [ ] Add/Drop interface
- [ ] Waiver claim queue
- [ ] Free agent search with filters

### Step 8: Trade System
- [ ] Propose trades (player-for-player, multi-player)
- [ ] Trade review period (24-48 hrs)
- [ ] League vote on trades (optional)
- [ ] Commissioner veto power
- [ ] Trade history log

### Step 9: Social Features
- [ ] League chat (real-time messaging)
- [ ] Activity feed (transactions, scores, trash talk)
- [ ] @ mentions and reactions
- [ ] Matchup trash talk thread
- [ ] Weekly recap / newsletter

### Step 10: Polish & PWA
- [ ] Service worker for offline support
- [ ] Push notifications via web push API
- [ ] Add to Home Screen prompt
- [ ] Performance optimization
- [ ] Onboarding tutorial for new users
- [ ] Season awards and trophies

---

## Architecture Notes

### Tech Stack
- Vanilla HTML/CSS/JS (no frameworks) per project convention
- Supabase for auth, database, and realtime (CDN include)
- MLB Stats API for player data and live scoring
- localStorage for offline/draft state caching
- Single self-contained HTML file per project convention

### Data Model (Supabase)
- `users` — id, email, display_name, avatar_emoji, created_at
- `leagues` — id, name, commissioner_id, size, scoring_type, draft_date, settings_json
- `league_members` — league_id, user_id, team_name, team_emoji, draft_position
- `rosters` — id, league_member_id, player_mlb_id, roster_position, is_bench
- `matchups` — id, league_id, week, team_a_id, team_b_id, scores_json
- `draft_picks` — id, league_id, round, pick_number, league_member_id, player_mlb_id
- `transactions` — id, league_id, type (trade/add/drop/waiver), details_json, timestamp
- `messages` — id, league_id, user_id, content, timestamp

### Scoring Options
- H2H Categories (default): Win categories head-to-head each week
- H2H Points: Total points head-to-head each week
- Roto: Season-long rotisserie standings
- Vibes Mode: The Brofessor's proprietary metrics (SAUCE, BEEF, FILTH, etc.)
