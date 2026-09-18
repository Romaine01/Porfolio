import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * Canonical public URL, used for the canonical link, Open Graph/Twitter tags,
 * JSON-LD and the sitemap. Keeping it in one place stops those from drifting
 * apart when the domain changes.
 *
 * Vercel exposes the production domain as VERCEL_PROJECT_PRODUCTION_URL, so a
 * deployment picks up the real domain automatically. Override locally with
 * SITE_URL when needed.
 */
const SITE_URL = (
  process.env.SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'https://yanreyestrada.vercel.app')
).replace(/\/+$/, '')

/** Replaces %SITE_URL% in index.html and emits a matching sitemap.xml. */
function siteUrl(): Plugin {
  return {
    name: 'site-url',
    transformIndexHtml(html) {
      return html.replaceAll('%SITE_URL%', SITE_URL)
    },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`,
      })
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), siteUrl()],
})
