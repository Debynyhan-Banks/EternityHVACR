# Half Moon Bakery case study — review candidate

Prepared September 28, 2026 from Sites version 107 / 1be91ede08bcb2c92b7c678a88cef3d973b2ffa9. Not published.

## Page and supporting changes

New path: /projects/half-moon-bakery-walk-in-cooler-repair. Links from /projects and /services/commercial-refrigeration. Request-service action uses the existing commercial-refrigeration prefill; call link uses the approved public number. Existing page templates and navy/orange styling are reused.

The article includes the customer and confirmed job address, nitrogen/bubble leak detection, refrigerant recovery, service-port replacement, recharge, and 34°F box temperature with normal on/off cycling observed during the visit. Article and BreadcrumbList JSON-LD describe the same visible facts. A self canonical and sitemap entry are included. No review rating or HowTo schema is added. The new public path is explicitly allowlisted for the existing sanitized analytics; no private path or free-text field is added.

## Sources and factual boundaries

Source: the owner's firsthand account and two photos supplied in this conversation. The owner explicitly confirmed Half Moon Bakery moved to 2203 Chester Ave, Cleveland, OH 44114 after older listings showed other locations. Owner confirmation is the source for the new address; public directories were not edited.

The owner described desired box temperature minus evaporator TD to estimate SST, and ambient plus 15°F as an SCT reference for this job. Public copy describes the operating checks without promoting ambient plus 15°F as a universal charging rule or inventing measured pressures. Condensing conditions and appropriate targets depend on equipment and operating conditions. No refrigerant, exact nitrogen test PSI, charge mass, measured SST/SCT, superheat/subcooling, evacuation depth, test duration or leak-free hold result was supplied. None is claimed. The photos do not independently establish 34°F; that result is attributed to the technician's account. Dates in photo filenames are not asserted as repair/completion dates.

## Photographs

Originals remain unchanged in Downloads:
- IMG_20260724_093536092_AE.jpg — equipment overview, 5,278,291 bytes.
- IMG_20260726_111651709_AE.jpg — service-port assembly, 3,188,931 bytes.

Owner explicitly authorized standard image conversion. Pillow EXIF-transpose and Lanczos resizing produced WebP quality 82 copies without cropping, retouching or generated details. Visible watermarks remain. Web copies contain no embedded EXIF/GPS metadata. Only web copies are included in the website.

| Image | 720px copy | 1200px copy |
|---|---:|---:|
| Condensing unit | 98,892 bytes | 238,190 bytes |
| Service port | 58,860 bytes | 121,568 bytes |

Images are 720x1279 and 1200x2132. The main photo uses responsive picture sources; gallery photos are lazy loaded. The originals total about 8.47MB; the two mobile copies total 157,752 bytes. The original framing is retained in all asset files and the case-study gallery. Existing project/service card layouts may display a cropped preview.

## Validation

- Fresh production build and all 36 rendered/API tests passed, including metadata validation for all 26 sitemap URLs.
- All 21 existing browser tests passed, including analytics privacy and service-prefill coverage.
- TypeScript passed. Final lint completed with no errors and 15 existing image warnings.
- Final page smoke checks passed at 390x900 and 1440x900: one H1, confirmed address and 34°F visible, responsive hero and gallery images loaded, no horizontal overflow, correct service-request URL and commercial/refrigeration prefill, and incoming links from both supporting pages.
- Desktop/mobile hero and gallery screenshots were inspected. Full photo framing and visible watermarks are retained in the gallery.
- No form was submitted; external requests were blocked during the local page smoke checks.
- Evidence: /private/tmp/eternity-half-moon-final-test.log, /private/tmp/eternity-half-moon-browser.log, /private/tmp/eternity-half-moon-types.log, /private/tmp/eternity-half-moon-final-lint.log, and /private/tmp/half-moon-hero-1440.png.
- Whitespace checks passed before commit. This is locally tested work, not a live deployment or indexing result.

## Release boundary

Prepare/review only. No deployment or external account/profile changes. Approval must cover publishing the named bakery, confirmed address, technician-reported result and supplied photographs. Rollback is reverting this case-study commit; no database migration is involved.
