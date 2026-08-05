# Hexwerks Studios Website

Official static website for Hexwerks Studios, deployed through GitHub Pages at [www.hexwerksstudios.com](https://www.hexwerksstudios.com).

Hexwerks Studios creates original tabletop games supported by complete printable hobby systems. Death Spiral is the flagship example, connecting WWI air-combat rules with HexFlight aircraft, HexAxis flight stands, the Death Spiral Battlefield, printable accessories, aircraft profiles, and development notes.

## Architecture

- Plain HTML, CSS, and JavaScript
- No package manager or build framework
- Directory-based clean routes for the Death Spiral ecosystem
- Existing `.html` game and studio routes preserved
- Shared navigation, footer, social links, and collection data in `data/site-content.js`
- Shared shell and mobile navigation in `site.js`
- Existing site styles in `styles.css`; new ecosystem design system in `site.css`
- Read-only Raven-Scribe assistant in `raven-scribe.js`
- GoatCounter analytics
- GitHub Pages deployment from `main` with `CNAME`

## Local Preview

From the repository root:

```powershell
python -m http.server 8000 --bind 127.0.0.1
```

Open [http://127.0.0.1:8000/](http://127.0.0.1:8000/).

## Validation

Run:

```powershell
powershell -ExecutionPolicy Bypass -File tools/validate-site.ps1
```

The validator checks HTML metadata, heading structure, internal links, referenced files, CSS image URLs, and JavaScript syntax.

## Documentation

- `DEATH_SPIRAL_SITE_RESTRUCTURE_PLAN.md`
- `ROUTE_MAP.md`
- `CONTENT_MANAGEMENT_GUIDE.md`
- `ASSET_USAGE.md`
- `CONTENT_REQUIREMENTS.md`
- `SYSTEM_NAMING_AUDIT.md`
- `DEPLOYMENT_VERIFICATION_CHECKLIST.md`

No store, price, release date, download, product status, or technical print setting should be added without a verified source and a real destination.
