<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref<HTMLCanvasElement>()

let ctx: CanvasRenderingContext2D | null = null
let raf = 0
let W = 0, H = 0, dpr = 1
let mouseX = -9999, mouseY = -9999

interface Particle {
  x: number; y: number
  vx: number; vy: number
  baseVy: number
  radius: number
  baseOpacity: number
  phase: number; freq: number; amp: number
  isEmber: boolean
  pulsePhase: number
  colorBase: string  // pre-baked "r,g,b" — avoids per-frame lerp
  flashTimer: number
}

interface Burst {
  x: number; y: number
  vx: number; vy: number
  life: number; maxLife: number
}

const TOTAL   = 120
const REPEL_R = 130
const REPEL_F = 2.8
const SPRING  = 0.016
const LINE_D  = 90              // max px between connected particles
const LINE_D2 = LINE_D * LINE_D
const LINE_DH2 = (LINE_D * 0.5) ** 2  // near-pair threshold

let particles: Particle[] = []
let bursts:    Burst[]    = []

// Pre-allocated flat line-segment buffers — avoids GC per frame
const nearBuf = new Float32Array(4000)   // up to 1000 near segments × 4 coords
const farBuf  = new Float32Array(8000)   // up to 2000 far  segments × 4 coords
let nearLen = 0, farLen = 0

// Color temperature: cold ember → brand → hot amber
// cold  rgb(130, 40, 12)   slow / large particles
// base  rgb(196, 98, 42)   #c4622a brand
// hot   rgb(255,175, 62)   fast / small / embers
function heatColor(t: number): string {
  const r = Math.round(130 + t * (255 - 130))
  const g = Math.round( 40 + t * (175 -  40))
  const b = Math.round( 12 + t * ( 62 -  12))
  return `${r},${g},${b}`
}

function spawn(p: Particle, randomY = false) {
  p.x          = Math.random() * W
  p.y          = randomY ? Math.random() * H : H + Math.random() * 40
  p.baseVy     = -(Math.random() * 0.45 + 0.15)
  p.vx         = (Math.random() - 0.5) * 0.3
  p.vy         = p.baseVy
  p.isEmber    = Math.random() < 0.18
  p.radius     = p.isEmber ? Math.random() * 1.6 + 1.2 : Math.random() * 0.9 + 0.4
  p.baseOpacity= p.isEmber ? Math.random() * 0.45 + 0.2 : Math.random() * 0.28 + 0.08
  p.phase      = Math.random() * Math.PI * 2
  p.freq       = Math.random() * 0.018 + 0.004
  p.amp        = Math.random() * 0.35 + 0.08
  p.pulsePhase = Math.random() * Math.PI * 2
  p.flashTimer = 0
  // faster = hotter; embers skew warmer
  const t = Math.min(1, Math.abs(p.baseVy) / 0.6) * 0.65 + (p.isEmber ? 0.35 : 0)
  p.colorBase  = heatColor(Math.min(1, t))
}

function init() {
  particles = Array.from({ length: TOTAL }, () => {
    const p = {} as Particle
    spawn(p, true)
    return p
  })
}

function addBurst(bx: number, by: number) {
  for (let i = 0; i < 18; i++) {
    const angle = Math.random() * Math.PI * 2
    const speed = Math.random() * 3 + 1.2
    bursts.push({
      x: bx, y: by,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 2.2,  // bias upward
      life: 0,
      maxLife: 38 + Math.floor(Math.random() * 28),
    })
  }
}

function tick() {
  if (!ctx || !W || !H) { raf = requestAnimationFrame(tick); return }
  ctx.clearRect(0, 0, W * dpr, H * dpr)

  // ── Connection lines ────────────────────────────────────────────────
  // Single O(n²) pass, fill two pre-allocated buffers by distance bucket
  nearLen = farLen = 0
  for (let i = 0; i < particles.length; i++) {
    const pi = particles[i]
    for (let j = i + 1; j < particles.length; j++) {
      const pj  = particles[j]
      const ddx = pi.x - pj.x
      const ddy = pi.y - pj.y
      const d2  = ddx * ddx + ddy * ddy
      if (d2 < LINE_D2) {
        if (d2 < LINE_DH2) {
          nearBuf[nearLen++] = pi.x; nearBuf[nearLen++] = pi.y
          nearBuf[nearLen++] = pj.x; nearBuf[nearLen++] = pj.y
        } else {
          farBuf[farLen++] = pi.x; farBuf[farLen++] = pi.y
          farBuf[farLen++] = pj.x; farBuf[farLen++] = pj.y
        }
      }
    }
  }

  ctx.lineWidth = 0.5 * dpr

  if (nearLen > 0) {
    ctx.strokeStyle = 'rgba(196,98,42,0.13)'
    ctx.beginPath()
    for (let k = 0; k < nearLen; k += 4) {
      ctx.moveTo(nearBuf[k]   * dpr, nearBuf[k+1] * dpr)
      ctx.lineTo(nearBuf[k+2] * dpr, nearBuf[k+3] * dpr)
    }
    ctx.stroke()
  }

  if (farLen > 0) {
    ctx.strokeStyle = 'rgba(196,98,42,0.05)'
    ctx.beginPath()
    for (let k = 0; k < farLen; k += 4) {
      ctx.moveTo(farBuf[k]   * dpr, farBuf[k+1] * dpr)
      ctx.lineTo(farBuf[k+2] * dpr, farBuf[k+3] * dpr)
    }
    ctx.stroke()
  }

  // ── Burst particles ─────────────────────────────────────────────────
  bursts = bursts.filter(b => {
    b.life++
    if (b.life >= b.maxLife) return false
    b.vx *= 0.91
    b.vy  = b.vy * 0.91 - 0.07
    b.x  += b.vx
    b.y  += b.vy
    const t   = b.life / b.maxLife
    const bop = (1 - t * t) * 0.95
    const r   = Math.max(0.4, (1 - t * 0.45) * 2.4)
    ctx!.beginPath()
    ctx!.arc(b.x * dpr, b.y * dpr, r * 3.5 * dpr, 0, Math.PI * 2)
    ctx!.fillStyle = `rgba(255,175,62,${(bop * 0.1).toFixed(2)})`
    ctx!.fill()
    ctx!.beginPath()
    ctx!.arc(b.x * dpr, b.y * dpr, r * dpr, 0, Math.PI * 2)
    ctx!.fillStyle = `rgba(255,175,62,${bop.toFixed(2)})`
    ctx!.fill()
    return true
  })

  // ── Main particles ──────────────────────────────────────────────────
  for (const p of particles) {
    // Mouse repulsion
    const dx   = p.x - mouseX
    const dy   = p.y - mouseY
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist < REPEL_R && dist > 0.1) {
      const force = (1 - dist / REPEL_R) ** 2 * REPEL_F
      p.vx += (dx / dist) * force * 0.06
      p.vy += (dy / dist) * force * 0.06
    }

    // Sway + spring back to base drift
    p.phase += p.freq
    p.vx += (Math.sin(p.phase) * p.amp - p.vx) * SPRING
    p.vy += (p.baseVy - p.vy) * SPRING

    // Move
    p.x += p.vx
    p.y += p.vy

    // Occasional random flash (embers only)
    if (p.isEmber && p.flashTimer <= 0 && Math.random() < 0.0007) {
      p.flashTimer = 18
    }

    // Opacity: fade in at bottom, fade out near top
    const norm    = p.y / H
    const fadeIn  = Math.min(1, (1 - norm + 0.12) * 7)
    const fadeOut = norm < 0.3 ? (norm / 0.3) ** 1.4 : 1
    let op = p.baseOpacity * fadeIn * fadeOut

    // Flash brightens the ember temporarily
    if (p.flashTimer > 0) {
      p.flashTimer--
      op = Math.min(1, op + p.flashTimer * 0.045)
    }

    if (op < 0.005) { if (p.y < -20 || p.x < -60 || p.x > W + 60) spawn(p); continue }
    if (p.y < -20 || p.x < -60 || p.x > W + 60) spawn(p)

    const opC = Math.min(1, op)
    const cb  = p.colorBase

    if (p.isEmber) {
      p.pulsePhase += 0.04
      const r = Math.max(0.3, p.radius + Math.sin(p.pulsePhase) * 0.4)
      // outer halo
      ctx.beginPath()
      ctx.arc(p.x * dpr, p.y * dpr, r * 3 * dpr, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${cb},${(opC * 0.1).toFixed(2)})`
      ctx.fill()
      // bright core
      ctx.beginPath()
      ctx.arc(p.x * dpr, p.y * dpr, r * dpr, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${cb},${opC.toFixed(2)})`
      ctx.fill()
    } else {
      ctx.beginPath()
      ctx.arc(p.x * dpr, p.y * dpr, p.radius * dpr, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${cb},${opC.toFixed(2)})`
      ctx.fill()
    }
  }

  raf = requestAnimationFrame(tick)
}

function resize() {
  if (!canvasRef.value) return
  const el = canvasRef.value.parentElement!
  W = el.offsetWidth
  H = el.offsetHeight
  dpr = Math.min(window.devicePixelRatio || 1, 2)
  canvasRef.value.width        = W * dpr
  canvasRef.value.height       = H * dpr
  canvasRef.value.style.width  = W + 'px'
  canvasRef.value.style.height = H + 'px'
}

function onMouseMove(e: MouseEvent) {
  if (!canvasRef.value) return
  const rect = canvasRef.value.getBoundingClientRect()
  mouseX = e.clientX - rect.left
  mouseY = e.clientY - rect.top
  if (mouseX < 0 || mouseX > W || mouseY < 0 || mouseY > H) {
    mouseX = mouseY = -9999
  }
}

function onMouseLeave() {
  mouseX = mouseY = -9999
}

function onClick(e: MouseEvent) {
  if (!canvasRef.value) return
  const rect = canvasRef.value.getBoundingClientRect()
  const cx = e.clientX - rect.left
  const cy = e.clientY - rect.top
  if (cx >= 0 && cx <= W && cy >= 0 && cy <= H) {
    addBurst(cx, cy)
  }
}

function onTouchStart(e: TouchEvent) {
  if (!canvasRef.value || !e.touches.length) return
  const rect = canvasRef.value.getBoundingClientRect()
  const cx = e.touches[0].clientX - rect.left
  const cy = e.touches[0].clientY - rect.top
  if (cx >= 0 && cx <= W && cy >= 0 && cy <= H) {
    addBurst(cx, cy)
  }
}

onMounted(() => {
  if (!canvasRef.value) return
  ctx = canvasRef.value.getContext('2d')
  resize()
  init()
  tick()

  window.addEventListener('resize',     resize,       { passive: true })
  window.addEventListener('mousemove',  onMouseMove,  { passive: true })
  window.addEventListener('click',      onClick)
  window.addEventListener('touchstart', onTouchStart, { passive: true })
  canvasRef.value.closest('.hero')?.addEventListener('mouseleave', onMouseLeave)
})

onUnmounted(() => {
  cancelAnimationFrame(raf)
  window.removeEventListener('resize',     resize)
  window.removeEventListener('mousemove',  onMouseMove)
  window.removeEventListener('click',      onClick)
  window.removeEventListener('touchstart', onTouchStart)
})
</script>

<template>
  <canvas ref="canvasRef" class="hero-particles" />
</template>

<style scoped>
.hero-particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}
</style>
