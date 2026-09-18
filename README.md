# Yanrey Romaine Estrada — Portfolio

Personal portfolio site. React, TypeScript, Vite, Tailwind CSS, Framer Motion.

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck + production build into dist/
npm run preview  # serve the production build
npm run lint
```

## Where the content lives

All content is data, kept separate from presentation so it can be edited
without touching components:

| File | Holds |
| --- | --- |
| `src/data/site.ts` | Name, title, contact details, navigation, hero and about copy |
| `src/data/skills.ts` | Skill categories |
| `src/data/projects.ts` | Projects, tech stacks, contribution statements |
| `src/data/experience.ts` | Experience, education, certifications |

### Content rules

Every claim on the site must be verifiable. No invented metrics, project
counts, years of experience, clients, or awards.

Two wording points matter in particular:

- The Cisco entry is training, not a professional certification. It reads
  "CCNA: Switching, Routing, and Wireless Essentials" and must never be
  shortened to "CCNA Certified".
- Each project states Yanrey's actual level of involvement. Contribution
  wording should not be inflated.

## Assets in `public/`

- `resume.pdf` — the A4 CV offered for download. Replace this file to update
  the CV; keep it consistent with the site content.
- `certificates/` — certificate scans shown in the certifications section.
  These are **public display copies**. On the TESDA image the QR code is
  blurred and the certificate number and ULI are covered by solid opaque
  bars, since the QR encodes the same number. The unmodified originals are
  kept privately in `assets-src/originals/`, which is git-ignored and never
  published.
- `og-image.png` — social preview card.

The site intentionally carries no personal portrait; the hero leads with the
professional copy and the code panel.

## Image preparation

Originals live in git-ignored `assets-src/`; `public/` holds only the
web-optimised copies.

```bash
pip install pillow
python3 scripts/prepare_images.py
```

```
assets-src/certificates/*.jpg   ->  public/certificates/*.jpg
```

The script only corrects EXIF orientation, downscales, and compresses. A
certificate's wording, numbers, dates, logos and signatures are never altered.

> Do not put the private certificate originals in `assets-src/certificates/`
> — anything in that folder is processed straight into the published
> `public/certificates/`. Unredacted originals belong in
> `assets-src/originals/`.

## Contact form

`src/lib/contact.ts` has a single `ENDPOINT` constant, currently `null`. While
it is null the form opens the visitor's own mail client with the message
prefilled, and the UI says so rather than claiming a message was sent. Set
`ENDPOINT` to a URL accepting a JSON POST to enable real submissions; nothing
else needs to change.

## Notes

- Dark mode is the default; the toggle stores the choice in `localStorage`.
- Animations are self-driven per element rather than inherited from a
  staggering parent. See the comment in `src/lib/motion.ts` for why.
- `prefers-reduced-motion` is respected via `MotionConfig` and a CSS fallback.

## Deploy

Vercel, using `vercel.json`. Update the canonical URL and Open Graph URLs in
`index.html` if the production domain changes.
