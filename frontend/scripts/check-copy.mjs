// Copy gate: no em dashes anywhere in source, locale key parity, no vue-i18n
// syntax characters in messages, heading parity between content locales.
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative, resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const problems = []

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry)
    if (['node_modules', '.nuxt', '.output', '.data', 'public'].includes(entry)) continue
    if (statSync(p).isDirectory()) walk(p, out)
    else if (/\.(ts|vue|css|md|mjs|json|yml|yaml|conf)$/.test(entry) || entry === 'Dockerfile') out.push(p)
  }
  return out
}

// 1. Em dashes
for (const file of [...walk(root), resolve(root, '..', 'README.md')]) {
  const text = readFileSync(file, 'utf8')
  text.split('\n').forEach((line, i) => {
    if (line.includes('\u2014')) problems.push(`${relative(root, file)}:${i + 1}: em dash`)
  })
}

// 2. Locale parity and message syntax
const en = (await import('../i18n/locales/en.ts')).default
const da = (await import('../i18n/locales/da.ts')).default

function shape(obj, path = '') {
  const keys = []
  for (const [k, v] of Object.entries(obj)) {
    const p = path ? `${path}.${k}` : k
    if (Array.isArray(v)) {
      keys.push(`${p}[${v.length}]`)
      v.forEach((item, i) => { if (item && typeof item === 'object') keys.push(...shape(item, `${p}[${i}]`)) })
    }
    else if (v && typeof v === 'object') keys.push(...shape(v, p))
    else {
      keys.push(p)
      if (typeof v === 'string' && /[@|{}]/.test(v)) problems.push(`message ${p} contains a vue-i18n syntax character (@ | { })`)
    }
  }
  return keys
}
const enKeys = new Set(shape(en))
const daKeys = new Set(shape(da))
for (const k of enKeys) if (!daKeys.has(k)) problems.push(`da.ts missing ${k}`)
for (const k of daKeys) if (!enKeys.has(k)) problems.push(`en.ts missing ${k}`)

// 3. Content heading parity
const contentDir = resolve(root, 'content')
try {
  const enDocs = readdirSync(join(contentDir, 'en')).filter(f => f.endsWith('.md'))
  for (const doc of enDocs) {
    const enText = readFileSync(join(contentDir, 'en', doc), 'utf8')
    let daText
    try { daText = readFileSync(join(contentDir, 'da', doc), 'utf8') }
    catch { problems.push(`content/da/${doc} missing`); continue }
    const count = (t, re) => (t.match(re) || []).length
    for (const [label, re] of [['headings', /^#{2,3} /gm], ['components', /^::[a-z]/gm], ['figures', /^::(case-figure|flow-video)/gm]]) {
      const a = count(enText, re)
      const b = count(daText, re)
      if (a !== b) problems.push(`content/${doc}: ${label} en=${a} da=${b}`)
    }
  }
}
catch {
  // no content directory yet
}

if (problems.length) {
  console.error(problems.join('\n'))
  console.error(`\n${problems.length} problem(s)`)
  process.exit(1)
}
console.log('copy check passed')
