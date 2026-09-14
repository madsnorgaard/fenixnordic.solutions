// Extracts base64 WebP screenshots embedded in a self-contained HTML case
// study into real files under public/media, deduplicated by content hash, at
// 1x and 2x widths. Prints a map of file, width, height and alt text per locale.
//
// The original static case studies that seeded public/media are in git history
// at the pre-redesign tag (frontend/public/aabenforms.html and aabenintra.html).
//
// usage: node scripts/extract-case-media.mjs [--src dir] [--map out.json]
import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import sharp from 'sharp'

const SOURCES = ['aabenforms', 'aabenintra']
const WIDTH_1X = 960
const arg = name => (process.argv.includes(name) ? process.argv[process.argv.indexOf(name) + 1] : null)
const mapOut = arg('--map')
const srcDir = arg('--src') || 'media-src'

const slug = s => s
  .toLowerCase()
  .normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '')
  .slice(0, 48)

const map = {}

for (const name of SOURCES) {
  const file = resolve(srcDir, `${name}.html`)
  if (!existsSync(file)) {
    console.warn(`skip ${name}: ${file} missing`)
    continue
  }
  const html = readFileSync(file, 'utf8')
  const outDir = resolve('public/media', name)
  mkdirSync(outDir, { recursive: true })

  // Locale block boundaries: every image belongs to the nearest preceding block.
  const blocks = [...html.matchAll(/<div class="i18n" lang="(da|en)"/g)].map(m => ({ lang: m[1], at: m.index }))
  const langAt = pos => blocks.filter(b => b.at < pos).at(-1)?.lang ?? 'da'

  const seen = new Map()
  let order = 0
  for (const m of html.matchAll(/<img\s+src="data:image\/webp;base64,([A-Za-z0-9+/=]+)"([^>]*)>/g)) {
    const [, b64, attrs] = m
    const alt = /alt="([^"]*)"/.exec(attrs)?.[1] ?? ''
    const lang = langAt(m.index)
    const hash = createHash('sha1').update(b64).digest('hex').slice(0, 10)
    if (!seen.has(hash)) {
      seen.set(hash, { index: ++order, b64, alt: {} })
    }
    seen.get(hash).alt[lang] = alt
  }

  map[name] = []
  for (const { index, b64, alt } of seen.values()) {
    const buf = Buffer.from(b64, 'base64')
    const meta = await sharp(buf).metadata()
    const base = `${String(index).padStart(2, '0')}-${slug(alt.en || alt.da || 'figure')}`
    const w1 = Math.min(WIDTH_1X, meta.width)
    const w2 = Math.min(WIDTH_1X * 2, meta.width)
    const p1 = resolve(outDir, `${base}.webp`)
    const p2 = resolve(outDir, `${base}@2x.webp`)
    const r1 = await sharp(buf).resize({ width: w1 }).webp({ quality: 82 }).toFile(p1)
    if (w2 > w1) {
      await sharp(buf).resize({ width: w2 }).webp({ quality: 80 }).toFile(p2)
    }
    map[name].push({
      src: `/media/${name}/${base}.webp`,
      src2x: w2 > w1 ? `/media/${name}/${base}@2x.webp` : null,
      width: r1.width,
      height: r1.height,
      sourceWidth: meta.width,
      alt,
    })
    console.log(`${name}: ${base}.webp ${r1.width}x${r1.height} (source ${meta.width}x${meta.height})`)
  }
}

if (mapOut) {
  writeFileSync(mapOut, JSON.stringify(map, null, 2))
  console.log('map written to', mapOut)
}
