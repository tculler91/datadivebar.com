# Landing refresh — 2026-09-08

- [x] Archive all three investigations, source documents, previous landing page, and article-derived trivia outside the published site.
- [x] Redesign the landing page for sports and music editorial coverage, with an honest empty publishing state and retained experiences.
- [x] Validate links and publishing exclusions; publish through existing GitHub Pages and verify old URLs return 404.

Archive remains readable in the public repository per owner instruction. Existing GitHub Pages hosting and vanilla HTML architecture are retained.

## Validation

Homepage links and fragment targets pass. All archived article files match their original Git bytes. Public preview excludes articles and archive. `git diff --check` passes. GitHub Pages configuration verified: legacy Jekyll, main branch, root, datadivebar.com. Live publishing checks passed: homepage and artwork 200; all three old article directories and index.html URLs, trivia, and archive URLs 404; all six retained experience destinations 200. Final audit also archived an unused duplicate Brofessor profile image.

## Artwork

Built-in image generation produced `images/deep-cuts-editorial.jpg`. Brief: gritty black-and-white photocopy collage of a floodlit baseball stadium, vinyl turntable and concert amplifier, with one vermilion torn-paper strip; no text, logos or identifiable people.

## Atmospheric revision

Replaced the flat masthead/grid with a full-width cinematic listening-bar hero, navy shadows, orange accents, expressive serif type, fine grain, staggered image-led coverage panels, and a back-room directory. Upcoming stories remain labeled; archives remain excluded. Added reduced-motion handling. Static link, image, fragment, and archive checks pass. Artwork: built-in image generation; dark listening bar with turntable and distant baseball television, warm practical lighting, no people or text. Final asset: images/after-hours-bar.jpg.
