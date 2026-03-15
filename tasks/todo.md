# Bar Trivia Night Build Plan
## datadivebar.com/barcade/bar-trivia.html — Dive Bar Trivia Game

### Concept
Timed trivia game pulling questions from existing Data Dive Bar articles. 10 questions per round, 15-second timer visualized as a draining beer glass. Wrong answers get bartender roasts. Three difficulty tiers. Supabase leaderboard. Shareable results screen.

### Success Criteria
- [ ] 10-question timed trivia rounds with 15-second countdown per question
- [ ] Beer glass drain animation as timer visual
- [ ] 30+ questions across 3 article categories (Deadliest Animal, Brofessor, Survival)
- [ ] 3 difficulty tiers: Lightweight, Regular, Closing Time
- [ ] Snarky bartender roasts on wrong answers
- [ ] Supabase leaderboard (same pattern as Bar Invaders / Pit Viper)
- [ ] "Napkin Stats" results screen with score, accuracy, streak, speed
- [ ] Arcade cabinet card added to barcade/index.html
- [ ] Dive bar aesthetic matching existing site design
- [ ] Mobile responsive

---

## Implementation Checklist

### Phase 1: Setup
- [ ] Create barcade/bar-trivia.html (self-contained, single file)
- [ ] Update tasks/todo.md with plan

### Phase 2: Question Bank
- [ ] Build 36+ trivia questions from article data (12 per article)
- [ ] Each question: text, 4 choices, correct answer, category, difficulty, source article link
- [ ] Bartender roast lines for wrong answers (10+ unique roasts)

### Phase 3: Core Game Engine
- [ ] Title screen with difficulty selection
- [ ] Question display with 4 answer buttons
- [ ] 15-second countdown timer
- [ ] Score tracking (points = speed bonus + correctness)
- [ ] 10-question round flow with transitions
- [ ] Game over → results screen

### Phase 4: Beer Glass Timer
- [ ] SVG or CSS beer glass that drains over 15 seconds
- [ ] Color shifts from golden to empty as time runs out
- [ ] Foam/bubbles animation detail

### Phase 5: Visual Design
- [ ] Dark dive bar background matching site aesthetic
- [ ] Neon accent colors (orange, green, blue)
- [ ] Share Tech Mono / Press Start 2P fonts
- [ ] CRT scanlines + vignette overlay
- [ ] Correct/wrong answer flash effects
- [ ] Category badges on questions

### Phase 6: Results Screen ("Napkin Stats")
- [ ] Final score with rank title
- [ ] Accuracy percentage
- [ ] Best streak
- [ ] Average response time
- [ ] Category breakdown
- [ ] "Play Again" and "Leaderboard" buttons

### Phase 7: Leaderboard
- [ ] Supabase integration (same credentials as other games)
- [ ] Table: bar_trivia_scores (name, score, accuracy, difficulty, timestamp)
- [ ] Offline queue + local fallback (same pattern)
- [ ] Name entry (8 char, uppercase)

### Phase 8: Integration
- [ ] Add arcade cabinet card to barcade/index.html
- [ ] Test in browser
- [ ] Verify leaderboard works

### Phase 9: Commit & Push
- [ ] git add all changed files
- [ ] git commit with descriptive message
- [ ] git push -u origin claude/explore-new-features-CnsQk

---

## Architecture Notes

### Scoring System
- Base: 100 points per correct answer
- Speed bonus: up to +50 points based on time remaining (50 * timeLeft/15)
- Difficulty multiplier: Lightweight 1x, Regular 1.5x, Closing Time 2x
- Max possible score per question: 150 * difficulty multiplier
- Wrong answer: 0 points

### Question Categories
- 🦌 "Deadliest Animal" — animal death statistics
- ⚾ "The Brofessor" — baseball/PED statistics
- 💧 "Survival" — water/emergency preparedness stats

### Difficulty Tiers
- **Lightweight**: Easier questions, wider answer spread, more obvious wrong answers
- **Regular**: Medium difficulty, plausible distractors
- **Closing Time**: Hardest questions, very close answer values, trick questions

### Bartender Roast Examples
- "That's... not even close. You been drinking already?"
- "Wrong. I've seen better guesses from the jukebox."
- "Buddy, even the dart board knows that one."
