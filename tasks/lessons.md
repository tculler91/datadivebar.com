# Lessons Learned

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
