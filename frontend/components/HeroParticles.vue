<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref<HTMLCanvasElement>()

let ctx: CanvasRenderingContext2D | null = null
let raf = 0
let W = 0
let H = 0
let dpr = 1
let mouseX = -9999
let mouseY = -9999

// Brand accent: #c4622a
const R = 196, G = 98, B = 42

interface Particle {
  x: number; y: number
  vx: number; vy: number
  baseVy: number
  radius: number
  baseOpacity: number
  phase: number
  freq: number
  amp: number
  isEmber: boolean
  pulsePhase: number
}

const TOTAL   = 110
const REPEL_R = 130
const REPEL_F = 2.8
const SPRING  = 0.016

let particles: Particle[] = []

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
}

function init() {
  particles = Array.from({ length: TOTAL }, () => {
    const p = {} as Particle
    spawn(p, true)
    return p
  })
}

// Pre-built opacity lookup: 256 steps → avoids string alloc per particle per frame
// We'll build rgba strings on demand but reuse ctx state batching by alpha bucket

function tick() {
  if (!ctx || !W || !H) { raf = requestAnimationFrame(tick); return }
  ctx.clearRect(0, 0, W * dpr, H * dpr)

  // Two passes: dots first (one fillStyle per opacity bucket), embers second
  // But batching by opacity is complex — instead: minimise fillStyle switches
  // by sorting or simply reducing alloc cost with typed arrays of pre-computed ops

  // Single pass — the key perf win is avoiding createRadialGradient and reducing
  // string allocations by rounding opacity to 2 decimal places (256 → 100 buckets)
  for (const p of particles) {
    // ── mouse repulsion ──────────────────────────────────────
    const dx   = p.x - mouseX
    const dy   = p.y - mouseY
    const dist = Math.sqrt(dx * dx + dy * dy)

    if (dist < REPEL_R && dist > 0.1) {
      const force = (1 - dist / REPEL_R) * (1 - dist / REPEL_R) * REPEL_F
      p.vx += (dx / dist) * force * 0.06
      p.vy += (dy / dist) * force * 0.06
    }

    // ── sway + spring back ───────────────────────────────────
    p.phase += p.freq
    p.vx += (Math.sin(p.phase) * p.amp - p.vx) * SPRING
    p.vy += (p.baseVy - p.vy) * SPRING

    // ── move ────────────────────────────────────────────────
    p.x += p.vx
    p.y += p.vy

    // ── opacity ─────────────────────────────────────────────
    const norm    = p.y / H
    const fadeIn  = Math.min(1, (1 - norm + 0.12) * 7)
    const fadeOut = norm < 0.3 ? (norm / 0.3) ** 1.4 : 1
    const op = p.baseOpacity * fadeIn * fadeOut
    if (op < 0.005) { if (p.y < -20 || p.x < -60 || p.x > W + 60) spawn(p); continue }

    // ── respawn ──────────────────────────────────────────────
    if (p.y < -20 || p.x < -60 || p.x > W + 60) spawn(p)

    // ── draw ─────────────────────────────────────────────────
    const opClamped = Math.min(1, op)
    if (p.isEmber) {
      p.pulsePhase += 0.04
      const r = Math.max(0.3, p.radius + Math.sin(p.pulsePhase) * 0.4)
      // outer halo — low alpha
      ctx.beginPath()
      ctx.arc(p.x * dpr, p.y * dpr, r * 3 * dpr, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${R},${G},${B},${(opClamped * 0.1).toFixed(2)})`
      ctx.fill()
      // bright core
      ctx.beginPath()
      ctx.arc(p.x * dpr, p.y * dpr, r * dpr, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${R},${G},${B},${opClamped.toFixed(2)})`
      ctx.fill()
    } else {
      ctx.beginPath()
      ctx.arc(p.x * dpr, p.y * dpr, p.radius * dpr, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${R},${G},${B},${opClamped.toFixed(2)})`
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
  canvasRef.value.width  = W * dpr
  canvasRef.value.height = H * dpr
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

onMounted(() => {
  if (!canvasRef.value) return
  ctx = canvasRef.value.getContext('2d')
  resize()
  init()
  tick()

  window.addEventListener('resize',    resize,      { passive: true })
  window.addEventListener('mousemove', onMouseMove, { passive: true })
  canvasRef.value.closest('.hero')?.addEventListener('mouseleave', onMouseLeave)
})

onUnmounted(() => {
  cancelAnimationFrame(raf)
  window.removeEventListener('resize',    resize)
  window.removeEventListener('mousemove', onMouseMove)
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
