# October 8, 2026 SEO audit follow-up

## Source changes

- Removed the three CodeStitch filler posts and their unused public blog listing. The reusable post layout now references existing images.
- Added one descriptive H1 to each main interior page; subordinate service and form headings follow the hierarchy.
- Updated search titles and descriptions, removed the duplicate city suffix, and kept the homepage headline.
- Introduced Alex Garcia as founder using confirmed background and location.
- Made the $399 founding-client Local Growth System the primary offer on the homepage and services page. Major SEO campaigns, website builds, automation, and physical NFC cards are separately quoted.
- Added a privacy page and linked it from both inquiry forms, the footer, and the sitemap. It describes the configured Netlify Forms, Airtable, and Google Analytics workflow.
- Added responsive hero images and matching image preloads. Banner images load eagerly. Removed the extra desktop CSS background request.
- Added explicit permanent redirect rules from the non-www domain and HTTP variants to HTTPS www.

## Asset measurements

| Asset | Width | Bytes |
| --- | ---: | ---: |
| Original hero.webp | 1365 | 1,330,172 |
| hero-640.webp | 640 | 58,898 |
| hero-960.webp | 960 | 113,778 |
| hero-1365.webp | 1365 | 194,700 |

The desktop variant is about 85% smaller. The browser chooses a candidate based on viewport width and pixel density; high-density mobile screens may use a larger variant. These are asset-size measurements, not a live speed score.

## Validation completed

- `npm ci --no-audit --no-fund` and `npm run build` passed.
- Generated HTML checks passed for all six public pages: one H1, distinct branded titles, canonical URLs, JSON-LD parsing, local links and assets, matching responsive image preloads, form privacy notices, and Netlify form fields.
- The sitemap parses and the filler blog pages no longer generate.
- Chromium checks at 390, 1440, and 1920 CSS pixels found no horizontal overflow. FAQ expansion and native form validation passed. The browser selected the 640px hero on the tested mobile viewport and the 1365px hero on desktop.
- Reviewed mobile homepage/privacy and desktop services screenshots. External scripts were blocked during local browser checks; production Analytics and form delivery remain unverified.

## Launch checks requiring production access

1. Confirm which Netlify project and repository deploy `www.clickmortar.app`. This change targets the current source in `garcialexco/Click-and-Mortar-main`; the separate `Click-and-Mortar` repository has older source.
2. After deployment, verify `https://clickmortar.app/contact/` returns a permanent redirect to `https://www.clickmortar.app/contact/`. Check HTTP variants too. Source rules alone do not prove the production redirect works.
3. Confirm `G-DEC00CTFCN` is the intended Google Analytics property. Its ownership cannot be established from the measurement ID in source.
4. Submit a clearly labeled test inquiry on each production form. Confirm Netlify acceptance and the linked Leads and Visibility Checks records in Airtable. The sync requires `AIRTABLE_TOKEN` in the deployed function environment. Remove the test records after verification.
5. Verify the property in Google Search Console, submit `https://www.clickmortar.app/sitemap.xml`, and inspect the main URLs. Confirm the removed placeholder blog URLs return 404 after a clean deployment.
6. Measure production mobile performance, including LCP, after the images are deployed.

## Authentic proof still needed

- Replace the illustrative team image on About with Alex's real founder photo when supplied. Do not present a stock or generated image as the founder.
- Add approved completed-project examples with real screenshots and an accurate description of Alex's role. Obtain client permission where needed.
- Add customer testimonials and measured outcomes only when verified and approved. Service highlights are not customer evidence.

The privacy page should be kept aligned with actual deployment settings and data handling if these change.
