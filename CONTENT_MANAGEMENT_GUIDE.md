# Hexwerks Website Content Management Guide

The site is plain HTML with lightweight structured data. Public facts must come from approved studio material or explicit user direction.

## Add A Game

1. Add a game object to `data/site-content.js` under `games`.
2. Provide: `name`, `slug`, `summary`, `status`, `href`, `image`, `imageAlt`, `featured`, and `sortOrder`.
3. Use a real image stored under `images/<game-slug>/`.
4. Create a dedicated page only when enough verified copy and media exist.
5. Add the route to `sitemap.xml` and `ROUTE_MAP.md`.
6. Never invent availability, prices, release dates, or rules links.

## Add A System

1. Add the system to `data/site-content.js` under `systems`.
2. Provide: `name`, `slug`, `summary`, `status`, `href`, `category`, and `sortOrder`.
3. Create `/systems/<slug>/index.html` using an existing system page as the structural template.
4. Separate the reusable system from its game-specific product family.
5. Record unsupported specifications as missing content rather than estimating them.

## Add An Aircraft

1. Confirm the exact aircraft variant, physical product format, scale, and public purchase destination with the studio.
2. For a verified physical listing, add an object to `aircraft` in `data/site-content.js` with `name`, `slug`, `scale`, `format`, `status`, `href`, and `sortOrder`. The current four records use the shared `store.href`; `store.verifiedOn` records the verification date, not live stock status.
3. Keep purchase cards text-only until matching product photography is approved. Existing prototype photographs must not be presented as photos of a specific sale item. Refer customers to eBay for product photos, current availability, prices, shipping, and listing contents.
4. Death Spiral's official tabletop scale is **1/144**, matching the physical resin miniatures in the eBay store, as clarified by the studio on October 27, 2026. Aircraft listings do not make the tabletop game, digital game, prototype HexAxis equipment, or print files released products.
5. For a future detailed aircraft profile, verify its historical identity and tabletop role, store authentic media under `images/death-spiral/aircraft/<slug>/`, and use `templates/aircraft-detail-page.html.template`. Replace every placeholder, remove unsupported sections, and add a route only when the page exists. Avoid copied historical passages.

## Add A Download

1. Confirm that the exact file is approved for public release.
2. Use a stable, descriptive filename under `downloads/`.
3. Add a `downloads` entry in `data/site-content.js` with title, version, type, updated date, status, URL, and game/system relationship.
4. Check the file in Git and verify the public URL after deployment.
5. Do not expose working exports merely because they exist locally.

## Add A Development Post

1. Add a short entry under `updates` in `data/site-content.js`.
2. Create `/development/<slug>/index.html` using `development/building-death-spiral/index.html` as the article template.
3. Give the page a unique title, description, canonical URL, Open Graph metadata, breadcrumb, one `h1`, and factual status.
4. Use authentic workshop images when available and add meaningful alt text.
5. Add the route to `sitemap.xml` and `ROUTE_MAP.md`.

## Shared Navigation And Social Links

Edit navigation and official social destinations only in `data/site-content.js`. `site.js` renders the shared header and footer across the site.

## Status Language

Use only statuses supported by the repository or current studio direction, such as `Prototype`, `In development`, `Core rules in draft`, `Needs content`, or `Ask on Discord`. Do not use `Available` until a real public destination is verified.
