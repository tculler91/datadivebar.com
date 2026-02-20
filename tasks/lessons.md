# Lessons Learned

## Session: Weather Page Bug Fixes (2026-02-20)

### Leaflet `maxNativeZoom` is required for radar overlays
- Without `maxNativeZoom`, Leaflet requests tiles at the map's current zoom level
- IEM NEXRAD tiles top out at around z8; at z9+ the server returns empty/404 tiles
- Fix: set `maxNativeZoom: 8` so Leaflet scales z8 tiles up at higher zoom levels instead of showing nothing
- Rule: always set `maxNativeZoom` on any overlay tile layer that has a lower resolution ceiling than the base map

### Audio source URLs must be verified, not guessed
- I fabricated archive.org file paths (item IDs were plausible, filenames were not)
- Result: audio element had 3 broken sources, `play()` rejected, JS swallowed error silently
- Fix: use a known-stable live stream (SomaFM) as primary source with verified URL format
- Rule: never commit audio/media URLs without verifying they 404-check; failing sources need visible error feedback

### Audio error handling must be explicit, not silent
- Swallowing `play()` rejection with `.catch(() => {})` leaves users with a dead button
- Fix: show labeled states (TUNING IN, NO SIGNAL, PLAY, MUTE, UNMUTE) so the user always knows what happened
- Fix: allow re-attempts by not blocking with `if (audioStarted) return`
- Rule: always surface media errors to the user interface; never catch and discard them

### Absolute-positioned elements inside a flex container are fragile
- Using `position: absolute` for the center element of a flex top bar breaks at varying viewport widths
- The logo and clock were flex children; the radar label was absolute — these can overlap
- Fix: CSS grid `grid-template-columns: 1fr auto 1fr` guarantees true 3-column layout at all widths
- Rule: use CSS grid for multi-column header layouts, not flex + absolute positioning

### Sub-pixel font sizes look broken in browsers
- `0.42rem`, `0.48rem`, `0.5rem` at 16px base = 6.7px, 7.7px, 8px — too small to render cleanly
- These render as blurry or garbled text on most displays
- Rule: minimum readable font size is ~0.65rem (≈10px); avoid anything below that in UI text



## Session: Weather Page Build (2026-02-20)

### NWS API Requirements
- Always include a `User-Agent` header when calling api.weather.gov — the API will return 403 without it
- Temperature is returned in Celsius; convert to Fahrenheit with `(c * 9/5) + 32`
- Wind speed is returned in m/s; convert to mph with `ms * 2.23694`
- Station observation endpoint: `https://api.weather.gov/stations/{ID}/observations/latest`
- Alerts endpoint: `https://api.weather.gov/alerts/active?area={state}`

### Browser Audio Policy
- Browsers block audio autoplay without a user gesture — always start with `audio.paused` state
- Listen for `click` or `keydown` events on the document to trigger first play
- The `audio.play()` method returns a Promise; handle the rejection gracefully

### Leaflet for Ambient Displays
- Disable all user interaction controls (dragging, scroll zoom, etc.) for ambient displays
- Use `flyTo()` for smooth animated panning — much better than `setView()` for ambient UX
- NEXRAD radar tiles from IEM (`mesonet.agron.iastate.edu`) work well without auth
- Cache-busting the tile URL with a timestamp forces a fresh radar fetch on refresh
- Remove old tile layer before adding new one to avoid visual stacking

### Self-Contained Page Pattern
- One HTML file per experience (no separate CSS/JS files)
- All styles in `<style>` tags, all scripts inline
- CDN links for external libraries (Leaflet, Google Fonts)
- This keeps deployment simple: just push the HTML file

### CSS CRT Effect
- Use `repeating-linear-gradient` with 1-2px intervals for scanline effect
- Keep opacity very low (0.03–0.08) — subtle is more convincing
- Layer noise texture SVG on top for grain/static feel

### Chyron Rotation
- Use `opacity` transitions (not `display: none/block`) for smooth crossfades
- Mark one item `active` at a time; CSS `transition: opacity 0.8s ease` handles the fade
- Rebuild the DOM cleanly on each data refresh rather than trying to update in place
