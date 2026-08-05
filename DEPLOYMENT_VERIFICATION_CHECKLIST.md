# Deployment Verification Checklist

## Before Commit

- [ ] Run `powershell -ExecutionPolicy Bypass -File tools/validate-site.ps1`.
- [ ] Review `git status --short` and exclude unrelated working files.
- [ ] Confirm every new page has a unique title, description, canonical URL, Open Graph image, `main` landmark, and one `h1`.
- [ ] Confirm internal routes and images resolve through the local HTTP server.
- [ ] Check the homepage, Death Spiral, Systems, Aircraft Hangar, Downloads, Development, Games, and Community routes.
- [ ] Check Black Oaths, EINVIGI, Oaths & Banners, From the Werks, and Forge Files.
- [ ] Verify mobile navigation with keyboard, click/tap, and Escape.
- [ ] Check 360px, 390px, 768px, 1024px, 1440px, and wide-desktop layouts.
- [ ] Confirm no product is described as available without a real destination.
- [ ] Confirm external links use `target="_blank"` and `rel="noopener noreferrer"` when appropriate.

## After Push

- [ ] Confirm GitHub Pages deployment completed.
- [ ] Verify `https://www.hexwerksstudios.com/` serves the new stylesheet version.
- [ ] Open each primary route on the live domain.
- [ ] Verify the Death Spiral cover, Black Oaths images, EINVIGI images, and Oaths & Banners images load.
- [ ] Test the Death Spiral Force Builder link.
- [ ] Test Discord, Instagram, Facebook, and Reddit links.
- [ ] Verify `sitemap.xml` and `robots.txt` are public.
- [ ] Confirm Raven-Scribe opens and its knowledge files load from nested routes.
- [ ] Check the browser console for missing resources or JavaScript errors.
- [ ] Confirm mobile navigation does not overflow or trap focus.
