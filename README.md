# jplaines.com

Personal IT, cybersecurity, and AI security portfolio for Jorden Plaines.

## Site structure

- `/` — introduction, selected work, approach, direction, and contact
- `/work/windows-network-exposure-smb-hardening` — evidence-led technical case study

The case study uses a curated set of original lab screenshots. Each caption is
limited to what the visible evidence supports, and the project’s limitations
remain part of the published page.

## Local development

Requires Node.js 22.13 or later.

```bash
npm install
npm run dev
```

## Validation

```bash
npm run lint
npm run build
npm test
npm run build:pages
```

## GitHub Pages

`npm run build:pages` creates a verified static export in `docs/`, including
the custom-domain and no-Jekyll files GitHub Pages needs. GitHub Pages serves
that directory at [jplaines.com](https://jplaines.com).

## Content sources

- Public lab images: `public/images/lab/`
- Social preview: `public/og.png`
- Icon generator: `scripts/generate-icons.py`

Do not publish the retired project PDF or reintroduce claims removed by the
evidence audit.
