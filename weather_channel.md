# Data Dive Bar — 1990s Weather Channel Page

## Concept

Recreate the 1990s overnight Weather Channel experience as a page on datadivebar.com. Think: doppler radar for Ohio with rotating closeups of thunderstorm cells of interest, smooth jazz in the background, retro CRT aesthetics. A "set it and forget it" ambient display you could leave running on a screen all night.

---

## Instructions for Claude Code

**Look at the repo structure of this project first to understand the site's tech stack, build process, and how pages are organized.**

Then build a new "/weather" page that recreates the 1990s overnight Weather Channel experience for Ohio. Here's what it needs:

### Radar Map

- Full-screen interactive map using Leaflet centered on Ohio
- Overlay NWS NEXRAD radar reflectivity tiles from the Iowa Environmental Mesonet (IEM) ridge radar imagery or the NWS radar tile service
- Auto-refresh radar data every 2-3 minutes
- Smooth animated auto-panning: the "camera" should slowly drift across Ohio, and when areas of high reflectivity (storm cells) are detected, it should smoothly zoom in on them for 15-20 seconds before moving to the next area of interest. If nothing interesting is happening, slowly pan across the full state view

### Retro Weather Channel Aesthetic

- Dark blue/teal background gradients behind the map
- Subtle CRT scan line overlay effect via CSS
- Serif or classic sans-serif fonts (think 1993 TWC)
- Bottom chyron bar showing current conditions text: temperature, humidity, wind for major Ohio cities, scrolling or rotating
- Top bar with current date/time updating live
- Subtle vignette effect on the edges

### Audio

- Embedded audio player (can be minimal/hidden) that auto-plays royalty-free smooth jazz on loop
- Include 2-3 royalty-free tracks or use a single long ambient smooth jazz track. Source from Free Music Archive or similar. Include the audio files in the repo or link to freely licensed hosted versions
- Give the user a mute/unmute toggle styled to match the retro aesthetic

### Current Conditions Data

- Pull current weather data for 4-5 major Ohio cities (Columbus, Cleveland, Cincinnati, Toledo, Akron) from the free NWS api.weather.gov API (no key needed)
- Display in the scrolling chyron bar at the bottom, cycling through cities

### Data Dive Bar Branding

- Keep it consistent with the rest of the site's voice and branding
- Small "Data Dive Bar Weather Desk" bug/logo in the corner

### Constraints

- Everything must use free, no-API-key-required data sources
- Page should work as a long-running ambient display

### Success Criteria

The page is complete when ALL of the following are true:

1. The Leaflet map loads centered on Ohio with working NEXRAD radar tile overlay
2. Radar data auto-refreshes every 2-3 minutes
3. The auto-camera logic smoothly pans/zooms to areas of high reflectivity, or drifts across the state when weather is calm
4. The retro Weather Channel aesthetic is fully applied — scan lines, vignette, dark blue/teal gradients, serif fonts, top clock bar, bottom chyron
5. The chyron scrolls/rotates real current conditions (temp, humidity, wind) for Columbus, Cleveland, Cincinnati, Toledo, and Akron pulled from api.weather.gov
6. Smooth jazz audio plays on loop with a working mute/unmute toggle
7. The page is consistent with the rest of the Data Dive Bar site's build process and can be accessed at /weather
8. The page runs indefinitely as an ambient display without errors or memory leaks

**Keep working on this until you're completely done. Do not stop, do not pause. No hacks, no shortcuts, no giving up. Validate each piece works before moving to the next. Add this success criteria to your todo list as a reminder.**

---

## Technical Discussion & Architecture Notes

### Data Sources (All Free, No API Key)

- **Radar tiles:** NWS NEXRAD via Iowa Environmental Mesonet (IEM) ridge radar imagery or NWS radar tile service
- **Current conditions:** NWS api.weather.gov — free, no key needed
- **Map rendering:** Leaflet or Mapbox GL JS for smooth animated panning/zooming

### Storm Cell Auto-Camera Logic

The key feature is a virtual "camera director" that:

1. Scans the radar reflectivity data for areas of high intensity
2. Identifies storm cells of interest based on reflectivity thresholds
3. Smoothly pans and zooms the map view to those regions on a timer (15-20 sec per cell)
4. When no interesting weather is happening, slowly drifts across the full Ohio state view
5. This logic will likely need tuning after the first pass

### Retro Styling Details

- Dark blue/teal gradients (classic TWC color palette)
- CRT scan line overlay (CSS pseudo-elements or repeating-linear-gradient)
- Serif or classic sans-serif fonts (1993 TWC era)
- Vignette effect on screen edges
- Scrolling/rotating chyron bar at bottom
- Live clock/date display at top

### Audio Approach

- Royalty-free smooth jazz (Free Music Archive, YouTube Audio Library, or similar)
- Loop continuously
- Mute/unmute toggle in retro style
- Auto-play with user interaction fallback (browsers block autoplay without interaction)

---

## Future Possibility: 24/7 YouTube Live Stream

If desired, this could also be pushed as a 24/7 YouTube live stream. Architecture would be:

1. A script that periodically grabs fresh radar frames and detects interesting cells
2. ffmpeg compositing those frames + smooth jazz audio into a continuous RTMP stream to YouTube
3. A systemd service or Docker container keeping it alive

### YouTube Stream Requirements

- **720p30:** ~2.5–4 Mbps sustained upload
- **1080p30:** ~4.5–6 Mbps sustained upload
- Weather radar (mostly static with slow pans) can get away with lower bitrates due to low motion complexity
- Could run on the P520 workstation or even an M920q mini PC

### Trade-offs

| Approach | Pros | Cons |
|---|---|---|
| **Web page on datadivebar.com** | Less infrastructure, looks better, interactive, easy to add DDB branding touches | Requires visitor to open the page |
| **YouTube live stream** | Discoverable, shareable, runs independently | More ops overhead, 24/7 process to babysit, upload bandwidth dependent |

**Recommendation:** Start with the web page. The YouTube stream can be added later as a separate project if desired.
