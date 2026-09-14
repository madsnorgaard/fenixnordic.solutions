// Converts the flow recordings in media-src/ (GIF) into WebM, MP4 and a WebP
// poster under public/media/flows. Sources stay in media-src as the master.
//
// usage: node scripts/convert-flows.mjs [name ...]
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readdirSync, statSync } from 'node:fs'
import { basename, resolve } from 'node:path'
import ffmpeg from 'ffmpeg-static'

const srcDir = resolve('media-src')
const outDir = resolve('public/media/flows')
mkdirSync(outDir, { recursive: true })

const only = process.argv.slice(2)
const gifs = readdirSync(srcDir)
  .filter(f => f.endsWith('.gif'))
  .filter(f => only.length === 0 || only.includes(basename(f, '.gif')))

if (gifs.length === 0) {
  console.error('no GIF sources found in media-src/')
  process.exit(1)
}

const run = args => execFileSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', ...args], { stdio: 'inherit' })
const evenScale = 'fps=12,scale=trunc(iw/2)*2:trunc(ih/2)*2'
const mb = p => (statSync(p).size / 1024 / 1024).toFixed(2)

for (const gif of gifs) {
  const name = basename(gif, '.gif')
  const input = resolve(srcDir, gif)
  const webm = resolve(outDir, `${name}.webm`)
  const mp4 = resolve(outDir, `${name}.mp4`)
  const poster = resolve(outDir, `${name}.webp`)

  run(['-i', input, '-vf', evenScale, '-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', '36', '-row-mt', '1', '-an', webm])
  run(['-i', input, '-vf', evenScale, '-c:v', 'libx264', '-crf', '26', '-preset', 'slow', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an', mp4])
  run(['-i', input, '-vf', 'scale=trunc(iw/2)*2:trunc(ih/2)*2', '-frames:v', '1', '-c:v', 'libwebp', '-quality', '80', poster])

  console.log(`${name}: webm ${mb(webm)} MB, mp4 ${mb(mp4)} MB, poster ${existsSync(poster) ? 'ok' : 'missing'}`)
}
