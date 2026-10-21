# Changes from the supplied repository

Source commit: c2122feaa6b661a629c2dcf1b433cf47cb37002c.

## Theme integration

Added public/zodiac-theme.css, public/zodiac-theme.js and locally bundled reference font families/licenses. Added the two theme tags at the end of the head of index.html, play.html, organizer.html and event-ended.html. Their original page content, form IDs, scripts, dates and existing closing gate remain in place.

## Backend consistency repair

The supplied app.py imported `advanced`, but advanced.py was absent. The supplied frontend app.js and schema.sql were already the separate four-level/podium versions. The complete package therefore restores the matching four-level backend (version 4), retains the supplied /play route and scheduled event-ending hook, and does not add any extra levels or advanced module.

## Preserved byte-for-byte

- All four original level HTML files and level-session.js.
- public/app.js, public/organizer.js, public/style.css and public/event-redirect.js.
- storage.py, schema.sql and vercel.json.
- Original images/fonts/assets from the supplied repository.

preservation-sha256.json records the protected public-file hashes. The main case image source is retained.

## Tests and documentation

Added four-level podium regressions and integrated theme/launch/ending tests. Main-page assertions now check play.html, because index.html is the launch landing. Build validation now includes play/end inline scripts plus the new theme/closing scripts. Updated the outdated v2/new-event deployment documents so installation does not instruct a reset.

Only the additive four-level podium SQL migration is supplied. The obsolete destructive legacy reset SQL file is intentionally omitted; no database operations were performed.

## Not changed or performed

No live repository push, Vercel deployment, database migration, account deletion, signing-key/password rotation, real participant export or public winner publication. No .git directory, real .env, local database, signing key or test-browser state is included in the archive.
