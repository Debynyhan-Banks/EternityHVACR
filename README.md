# Eternity Mechanical Services Website

Official website repository for Eternity Mechanical Services, a Black-owned HVAC/R and mechanical contractor serving Greater Cleveland and Northeast Ohio.

- Live website: [eternityhvacr.com](https://eternityhvacr.com)
- Phone: [216-253-6468](tel:+12162536468)
- Technology: Next.js-compatible Vinext application hosted on Cloudflare through OpenAI Sites

## Project roadmap

The SEO, GEO, content and lead-generation improvement program is documented here:

- [SEO and GEO roadmap](docs/SEO-GEO-ROADMAP.md)
- [Progress tracker](docs/PROGRESS-TRACKER.md)
- [Confirmed business facts](docs/BUSINESS-FACTS.md)
- [Business information and content checklist](docs/CLIENT-CONTENT-CHECKLIST.md)

Start with the **Next action** section in the progress tracker. Update the checklist and work log as information is received and milestones are completed.

## Local development

Requirements: Node.js `>=22.13.0`.

```bash
npm install
npm run dev
npm run build
```

The primary application files are in `app/`, website assets are in `public/`, and hosting configuration is in `.openai/hosting.json`.

## Publishing discipline

1. Make one scoped change at a time.
2. Update `docs/PROGRESS-TRACKER.md` with the outcome.
3. Run `npm run build` before publishing website changes.
4. Keep all public claims, reviews, licenses and service areas factual and approved.
5. Never commit passwords, API keys, customer information or private credentials.
