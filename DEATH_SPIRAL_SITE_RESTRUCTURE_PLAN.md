# Death Spiral Site Restructure Plan

## Current Architecture

- Plain HTML, CSS, and JavaScript served from the repository root.
- GitHub Pages deployment from the `main` branch with the custom domain `www.hexwerksstudios.com` defined in `CNAME`.
- No package manager, template engine, static-site generator, lint configuration, test runner, or production build step.
- Six public HTML files use duplicated navigation and footer markup.
- `styles.css` contains the full visual system and page-specific styles.
- `raven-scribe.js` provides a static, read-only FAQ assistant backed by Markdown knowledge files in `data/`.
- GoatCounter is the only third-party page script.

## Existing Pages And Routes

Routes that must remain available:

- `/` - current homepage
- `/black-oaths.html` - Black Oaths
- `/einvigi.html` - EINVIGI
- `/oaths-and-banners.html` - Oaths & Banners
- `/from-the-forge.html` - From the Werks
- `/forge-files.html` - Forge Files

Existing in-page anchors such as `#games`, `#downloads`, `#about`, and `#contact` will be replaced by full routes where appropriate. Compatibility links will be preserved where practical.

## Available Assets

- Studio logo: `IMG_2698.jpeg`
- General legacy studio image: `IMG_2696.jpeg`
- Death Spiral legacy cover: `images/death-spiral/death-spiral-cover-no-tagline.jpg`
- Death Spiral primary graphic and prototype photography: `images/death-spiral/*.webp`
- Black Oaths cover, hero, and ten miniature photographs
- EINVIGI cover and eight tabletop photographs
- Oaths & Banners warband and battle photographs
- No verified HexFlight model photographs, HexAxis photographs, battlefield photographs, aircraft renders, accessory photographs, or individual Death Spiral aircraft images are currently stored in the repository.
- The untracked `downloads/` directory contains multiple EINVIGI working and public-named PDFs. Existing website copy does not currently approve those files for public download, so the new Downloads page will not expose them until publication approval is explicit.

## Content And Link Audit

- Official community links are present and consistent:
  - Discord: `https://discord.gg/AYHMBYaMqc`
  - Facebook: `https://www.facebook.com/HexwerksStudios`
  - Instagram: `https://www.instagram.com/hexwerks.studios/`
  - Reddit: `https://www.reddit.com/user/Hexwerksstudios/`
- Contact email: `contact@hexwerksstudios.com`
- Death Spiral Force Builder: `https://death-spiral-force-builder.jaykymm666.chatgpt.site`
- No store destination or commerce route exists. Store will not be added to navigation.
- Navigation and footer markup are duplicated and inconsistent across pages.
- The homepage currently treats Death Spiral as a secondary project.
- Existing Downloads copy says files are not published even though local, untracked PDFs exist.
- Existing pages use repeated card, button, status, and gallery patterns, but do not share structured content.
- Several visual rules are repeated across desktop and mobile media queries.

## Proposed Primary Navigation

1. Home
2. Death Spiral
3. Systems
4. Games
5. Downloads
6. Development
7. Community

Death Spiral will receive a restrained flagship marker in navigation. Store will remain absent until a real destination exists.

## Proposed Page Hierarchy

- `/`
- `/death-spiral/`
- `/death-spiral/aircraft/`
- `/systems/`
- `/systems/hexflight/`
- `/systems/hexaxis/`
- `/systems/modular-battlefield/`
- `/systems/accessories/`
- `/games/`
- `/downloads/`
- `/development/`
- `/development/building-death-spiral/`
- `/community/`
- Existing `.html` game and studio routes preserved.

## Shared Components

Because the repository has no build system, components will be implemented with semantic HTML patterns, shared CSS classes, and minimal progressive-enhancement JavaScript:

- Shared site header and accessible mobile navigation
- Shared multi-column footer
- Editorial hero
- Section heading
- Product family panel
- System card
- Aircraft card and empty-state template
- Status badge
- Development card
- Download card
- Roadmap list
- Call-to-action band
- Breadcrumbs
- Responsive media frame
- Raven-Scribe launcher and dialog

Navigation, social links, games, systems, aircraft, downloads, and development updates will be centralized in `data/site-content.js`. `site.js` will render the shared header/footer and data-backed collections. Static page copy will remain in HTML for search visibility and graceful degradation.

## Content To Preserve

- Black Oaths description, status, rules summary, and miniature gallery
- EINVIGI description, duel loop, status, and gallery
- Oaths & Banners description and gallery
- Omens & Ravens and Hoist the Black development-stage references
- From the Werks equipment, disclosure, credits, and licensing notes
- Forge Files rights and personal-use licensing language
- Raven-Scribe knowledge and read-only behavior
- Verified social links, Discord invite, contact email, and Force Builder destination

## Placeholder Content Needed

The site will use explicit editorial empty states instead of invented product content for:

- Named Death Spiral aircraft roster and individual aircraft pages
- Aircraft nationality, period, tabletop identity, and model status
- HexFlight photographs, renders, scale, compatibility details, and print guidance
- HexAxis photographs, diagrams, attachment method, altitude mechanism, assembly guidance, and compatibility details
- Modular battlefield photographs, final product name, connection method, tile dimensions, and environment roadmap
- Accessory photographs, exact component list, print files, and release status
- Death Spiral rules download, missions, campaigns, solo rules, and public playtest files
- Commercial availability, pricing, licenses, and storefront links

## Accessibility Requirements

- Semantic landmarks and one page-level `h1`
- Keyboard-operable mobile navigation with `aria-expanded` and Escape handling
- Visible `:focus-visible` treatment
- Minimum 44px interactive targets on touch layouts
- Descriptive alt text for real imagery
- Decorative imagery hidden from assistive technology
- Adequate foreground/background contrast
- Status conveyed in text rather than color alone
- Reduced-motion support
- Correct form labels and external-link labeling
- No hover-only information

## Responsive Behavior

- Navigation collapses to an accessible menu below tablet width.
- Heroes use stable min/max dimensions and preserve the Death Spiral cover subject.
- Product families move from editorial split layouts to a single column.
- Card grids collapse from three or four columns to two, then one.
- Long system names use constrained type sizes and natural wrapping.
- Buttons stack and fill available width on small mobile screens.
- Galleries use fixed aspect ratios and `object-fit` rules without hiding key subjects.
- Wide tables are avoided; roadmap and download data use stacked lists.

## Deployment Constraints

- GitHub Pages must continue to serve the site without Node, server-side includes, or runtime APIs.
- New routes use directory-based `index.html` files and root-relative links for clean URLs on the custom domain.
- Existing `.html` routes remain intact.
- No secrets or API keys may be added.
- No heavy dependency or JavaScript framework will be introduced.
- A PowerShell validation script will check internal links, images, page metadata, and basic HTML requirements.

## Phased Implementation Order

1. Create shared content data, site shell, design tokens, and mobile navigation.
2. Rebuild the homepage around Death Spiral and the printable ecosystem.
3. Create the Death Spiral flagship page and Aircraft Hangar.
4. Create the Systems landing page and four system detail pages.
5. Create Games, Downloads, Development, and Community routes.
6. Connect preserved pages to the new navigation and footer.
7. Update Raven-Scribe knowledge and nested-route loading.
8. Add sitemap, robots file, canonical metadata, documentation, and validation tooling.
9. Run route, asset, accessibility, responsive, and deployment checks before review.
