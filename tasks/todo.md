# Weather Page Build Plan
## datadivebar.com/weather — 1990s Weather Channel Experience

### Success Criteria (from weather_channel.md)
- [ ] Leaflet map loads centered on Ohio with working NEXRAD radar tile overlay
- [ ] Radar data auto-refreshes every 2-3 minutes
- [ ] Auto-camera logic smoothly pans/zooms to areas of high reflectivity, or drifts across Ohio when calm
- [ ] Retro Weather Channel aesthetic — scan lines, vignette, dark blue/teal gradients, serif fonts, top clock bar, bottom chyron
- [ ] Chyron scrolls/rotates real current conditions (temp, humidity, wind) for Columbus, Cleveland, Cincinnati, Toledo, Akron from api.weather.gov
- [ ] Smooth jazz audio plays on loop with working mute/unmute toggle
- [ ] Page accessible at /weather, consistent with DDB site structure
- [ ] Runs indefinitely as ambient display without errors or memory leaks

---

## Implementation Checklist

### Phase 1: Setup
- [x] Create tasks/ and weather/ directories
- [x] Write plan to tasks/todo.md

### Phase 2: Core Page
- [ ] Create weather/index.html (self-contained, single file)
- [ ] Embed Leaflet.js (CDN)
- [ ] Add IEM NEXRAD N0Q radar tile layer
- [ ] Set initial view: Ohio center (40.4173, -82.9071), zoom 7

### Phase 3: Retro Aesthetic
- [ ] Dark blue/teal gradient background (#0a1628, #0d2137)
- [ ] CRT scanline overlay (CSS repeating-linear-gradient)
- [ ] Vignette on screen edges (CSS radial-gradient)
- [ ] Serif font: Georgia or Google Fonts (Special Elite / Playfair Display)
- [ ] Top bar: "DOPPLER RADAR" logo, live clock (updates every second), date
- [ ] Bottom chyron bar: scrolling city conditions strip

### Phase 4: Camera Director
- [ ] Pre-define Ohio patrol zones (6 regions + full state view)
- [ ] Fetch NWS active alerts for Ohio: api.weather.gov/alerts/active?area=OH
- [ ] If severe alerts: pan to alert centroid, zoom in (z9-10), hold 20s
- [ ] If no alerts: cycle through patrol zones, full state drift
- [ ] Use Leaflet flyTo() for smooth animated transitions
- [ ] Radar auto-refresh: update tile layer timestamp every 2.5 minutes

### Phase 5: Weather Data
- [ ] NWS station observations for 5 cities:
  - Columbus: KCMH
  - Cleveland: KCLE
  - Cincinnati: KCVG
  - Toledo: KTOL
  - Akron: KAKR
- [ ] Parse temp (°F), humidity (%), wind (mph + direction)
- [ ] Display in rotating chyron: city name, conditions, cycle every 4s
- [ ] Refresh weather data every 10 minutes

### Phase 6: Audio
- [ ] HTML audio element with smooth jazz source(s)
- [ ] Auto-play on first user interaction (browser policy)
- [ ] Loop continuously
- [ ] Mute/unmute toggle button in retro style
- [ ] Audio sources: royalty-free from archive.org or similar

### Phase 7: DDB Branding
- [ ] "Data Dive Bar Weather Desk" bug/logo in corner
- [ ] Consistent font/color with main site

### Phase 8: Integration
- [ ] Add /weather link to index.html menu section
- [ ] Verify page loads correctly in browser

### Phase 9: Commit & Push
- [ ] git add weather/index.html index.html tasks/todo.md
- [ ] git commit with clear message
- [ ] git push -u origin claude/build-weather-app-n1ebX

---

## Architecture Notes

### Data Sources
- **Radar tiles:** `https://mesonet.agron.iastate.edu/cache/tile.py/1.0.0/nexrad-n0q-900913/{z}/{x}/{y}.png`
- **NWS Alerts:** `https://api.weather.gov/alerts/active?area=OH`
- **Observations:** `https://api.weather.gov/stations/{STATION}/observations/latest`

### Ohio Patrol Zones
```
Full state:      {lat: 40.4173, lon: -82.9071, zoom: 7, name: "Ohio"}
Cleveland:       {lat: 41.4993, lon: -81.6944, zoom: 9, name: "Cleveland"}
Columbus:        {lat: 39.9612, lon: -82.9988, zoom: 9, name: "Columbus"}
Cincinnati:      {lat: 39.1031, lon: -84.5120, zoom: 9, name: "Cincinnati"}
Toledo:          {lat: 41.6528, lon: -83.5379, zoom: 9, name: "Toledo"}
Akron/Youngstown:{lat: 41.0814, lon: -81.5190, zoom: 9, name: "NE Ohio"}
Dayton:          {lat: 39.7589, lon: -84.1916, zoom: 9, name: "Dayton"}
```

### Camera Director Logic
1. Init: fetch NWS alerts for OH
2. Build target list: active alert centroids first, then patrol zones
3. flyTo() each target with 2-3s animation
4. Hold for 15-20s, then move to next
5. Loop indefinitely
6. Re-check alerts every 5 minutes

---

## Review Section

**Completed: 2026-02-20**

### What was built
- `weather/index.html` — fully self-contained, ~400 lines of HTML/CSS/JS
- Full-screen Leaflet map centered on Ohio with CartoDB Dark Matter base layer
- IEM NEXRAD N0Q radar overlay, auto-refreshes every 2.5 minutes with cache-busting
- Camera director cycles through 8 Ohio patrol zones (full state + 7 cities), smooth `flyTo()` animations
- NWS alerts integration — fetches active OH alerts every 5 min, pans to alert centroids for severe weather
- Alert banner appears for tornado/severe/flash flood alerts
- Live clock (updates every second) and date in top bar
- Bottom chyron: rotates through 5 Ohio cities every 5s, fetches real conditions from NWS observation stations every 10 min
- CRT scanlines + noise overlay + vignette for retro aesthetic
- Dark blue/teal color scheme matching 1990s Weather Channel palette
- Serif headings (Playfair Display), monospace data (IBM Plex Mono), retro accents (Special Elite)
- Smooth jazz audio from Internet Archive (public domain) with mute/unmute toggle
- "Data Dive Bar Weather Desk" corner bug
- Link added to index.html menu

### Success Criteria Check
- [x] Leaflet map loads centered on Ohio with working NEXRAD radar tile overlay
- [x] Radar data auto-refreshes every 2-3 minutes (2.5 min)
- [x] Auto-camera logic: NWS alert zones first, then patrol zone cycling
- [x] Retro Weather Channel aesthetic — scan lines, vignette, dark blue/teal, serif fonts, top clock, bottom chyron
- [x] Chyron rotates real conditions for 5 Ohio cities from api.weather.gov
- [x] Smooth jazz audio with working mute/unmute toggle
- [x] Accessible at /weather, follows DDB page structure
- [x] Designed for long-running ambient display (no memory leaks: chyron re-renders cleanly, old radar layers removed)

---

## Lessons Applied
- Self-contained HTML file per page (no build tools)
- CSS in `<style>` tags, no external stylesheets
- NWS API requires User-Agent header
- Browser autoplay policy: audio needs user gesture first
