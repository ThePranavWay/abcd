# Organizer level mapping — do not publish as participant instructions

Main `/play` is registration, login and the investigation dashboard; it is not a completion. `/` is the launch landing.

- `/attacks` (file `public/attacks.html`): Level 1
- `/investigate` (file `public/investigate.html`): Level 2
- `/next` (file `public/next.html`): Level 3
- `/later` (file `public/later.html`): Level 4

Main does not link to these pages. Vercel cleanUrls redirects .html addresses to clean paths; local Flask serves both forms. Level document content/design is retained. Shared helper uses authenticated cookie sessions and server-side completion endpoints. Open visible level pages check team progress about every 4 seconds and reveal if a teammate has completed that level.

Password normalization is unchanged: 1 trims; 2 and 4 trim and uppercase; 3 is exact. Original digest defaults are retained and match across the four levels. Optional private LEVEL_N_PASSWORD_SHA256 environment overrides remain supported. Do not expose actual answers in frontend code.

Completion is unique per entry and level, not per device/member. Repeated correct submissions are idempotent. Server never accepts a user-submitted entry/admission to select who receives completion credit.

Existing document source is sent to the browser and is not fully confidential from source inspection. The app protects completion authority, not hidden HTML document secrecy.
