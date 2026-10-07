# AGENTS.md

## Running the app (Base44 sandbox)

```bash
docker compose -f docker-compose.base44.yml up -d --build
```

Serves the Next.js dev server on host port `3000` (the single public entry point).

## Non-obvious notes

- **Fully self-contained front-end app.** No backend, database, queue or external API.
  No secrets or environment variables are required, and there are no migrations or
  seeds. All content comes from `app/data/site.ts`.
- **Content lives in one file.** `app/data/site.ts` exports `properties`, `agents`,
  `services` and `whyChooseUs`; `app/lib/properties.ts` holds pricing/format helpers,
  filtering, sorting and the derived city/type lists. Adding a property to the array is
  enough — listing, filters, detail route and similar-properties all pick it up.
- **Routes.** `/` (homepage composition), `/properties` (client-side filtering, with the
  filter state mirrored into the query string), `/properties/[slug]` (detail; unknown
  slugs call `notFound()`).
- **Images** are Unsplash URLs rendered through `app/components/SmartImage.tsx`, a plain
  `<img>` with a width-based `srcSet` — no image optimizer and no `next.config.js`
  remote patterns. Portrait/architecture ids are curated; verify a new id returns 200
  from `images.unsplash.com` before adding it.
- **The homepage hero is a scroll-scrubbed video**, not a background image. `app/lib/useScrollScrub.ts`
  maps scroll progress through the tall `.hero` runway onto `video.currentTime`; the media is
  only ever seeked, never played. Assets and their encoding constraints are described below.
- **`body` uses `overflow-x: clip` (with a `hidden` fallback), not `overflow-x: hidden`.**
  `hidden` makes `<body>` a scroll container, which silently breaks the hero's
  `position: sticky` stage. Do not revert it without re-checking that the hero still pins.
- **Favourites** are stored in `localStorage` (`horizon:favorites`) via
  `app/lib/useFavorites.ts`, which keeps every mounted card in sync through a window
  event.
- **The enquiry dialog and newsletter form are client-side only** — they validate input
  and show a confirmation, but nothing is persisted or emailed. Wire them to a backend
  before treating submissions as real.
- **Dependencies are in a Docker volume, not on the host.** The compose service runs
  `npm ci` on every start against the bind-mounted lockfile; host-side `npm` commands do
  not affect the running container.
- **Watcher polling is enabled** (`WATCHPACK_POLLING`, `CHOKIDAR_USEPOLLING`) because bind
  mounts do not reliably emit inotify events here. Next.js 14.2.15 has no dev-origin/Host
  gating (no `allowedDevOrigins` support), so no `next.config.js` override is needed for
  the preview proxy.
- **A newly added route directory can need a dev-server restart** before the route
  resolves; if a fresh route 404s, restart the `web` service before debugging the code.
- **Healthcheck** probes `GET /` from inside the container with the `node` binary's
  `fetch` (the image has no curl/wget guarantee).

## Hero video pipeline

The hero plays nothing — scroll position *is* the timeline. `Hero.tsx` renders a `<video>`
that `useScrollScrub` seeks inside `requestAnimationFrame`, so the source must be encoded
for fast random seeking. The original supplied clip had a **single keyframe for its whole
10s**, which makes scrubbing unusable; it must be re-encoded with a short GOP.

Media lives in `public/hero/` and is committed:

| File | Use |
| --- | --- |
| `hero-desktop.mp4` | ≥861px, H.264, 1280×720 |
| `hero-mobile.mp4` | ≤860px, H.264, 854×480 |
| `hero-desktop.webm` | VP9 alternate for the same breakpoint |
| `hero-poster.jpg` | first frame — poster, reduced-motion still, and load-in backdrop |

Re-encode (`-g 8` ≈ 3 keyframes/second; `+faststart`; no audio track):

```bash
docker run --rm -v "$PWD:/w" jrottenberg/ffmpeg:latest -y -i /w/src.mp4 -an \
  -c:v libx264 -preset slow -crf 23 -tune film -pix_fmt yuv420p \
  -g 8 -keyint_min 8 -sc_threshold 0 -movflags +faststart \
  -vf scale=1280:720 /w/hero-desktop.mp4          # 854:480 for the mobile cut
```

Check the keyframe count after any re-encode — it should be roughly `duration × 3`, not 1:

```bash
docker run --rm --entrypoint ffprobe -v "$PWD:/w" jrottenberg/ffmpeg:latest \
  -v error -select_streams v:0 -show_frames -show_entries frame=key_frame -of csv /w/hero-desktop.mp4 \
  | awk -F, '$2==1{c++} END{print "I-frames:", c}'
```

Behaviour worth knowing before changing it: reduced motion (`prefers-reduced-motion`) skips
the scrub entirely and collapses `.hero` to a static poster; if the media errors, `Hero`
swaps in the original Unsplash image and the runway collapses via `.heroStatic`. A stalled
load is revealed after `READY_TIMEOUT` rather than blocking forever.

## Verifying it works

```bash
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:3000/                       # 200
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:3000/properties              # 200
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:3000/properties/lakeside-modern-villa  # 200
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:3000/properties/nope         # 404
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:3000/hero/hero-desktop.mp4    # 200
docker compose -f docker-compose.base44.yml exec -T web npx tsc --noEmit               # clean
```

The served HTML must reference unhashed dev chunks (`/_next/static/chunks/app/page.js`);
hashed/minified bundles mean the compose is running a prebuilt build instead of the live
dev server.
