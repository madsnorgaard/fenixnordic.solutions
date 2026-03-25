<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps<{ active?: boolean }>()

interface Particle { baseX: number; baseY: number; char: string; op: number; bdur: string; bdel: string }

// Two-tongue Firefox-style flame silhouette.
// Left tongue (x≈24–51, y≈4–33) and right tongue (x≈50–80, y≈8–35) are
// separated by a valley in the upper centre, merge from y≈36 down.
const BASE: [number, number, string][] = [
  // ── left tongue ────────────────────────────────────────────
  [38,  4, "'"],
  [34,  9, '/'], [42,  9, '\\'],
  [30, 14, '/'], [37, 13, '^'], [45, 14, '\\'],
  [27, 19, '/'], [34, 18, '.'], [42, 18, '|'], [49, 19, '\\'],
  [24, 24, '/'], [31, 23, '.'], [38, 22, '*'], [46, 23, '.'], [52, 24, '\\'],
  [23, 29, '/'], [29, 28, '.'], [36, 28, '.'], [43, 27, '^'], [50, 28, '\\'],

  // ── right tongue (starts lower, slightly shorter) ──────────
  [63,  8, "'"],
  [59, 13, '/'], [67, 13, '\\'],
  [55, 18, '/'], [62, 17, '^'], [70, 18, '\\'],
  [52, 23, '/'], [59, 22, '.'], [66, 22, '|'], [74, 23, '\\'],
  [50, 28, '/'], [57, 27, '.'], [64, 27, '*'], [71, 27, '.'], [78, 28, '\\'],
  [49, 33, '/'], [55, 32, '.'], [62, 32, '.'], [69, 31, '^'], [76, 32, '\\'],

  // ── merge — tongues join, full width ───────────────────────
  [21, 38, '/'], [27, 37, '.'], [33, 37, '.'], [39, 36, '*'], [45, 36, '.'],
  [51, 36, '|'], [57, 36, '.'], [63, 36, '*'], [69, 37, '.'], [75, 37, '.'], [82, 38, '\\'],

  [19, 44, '/'], [25, 43, '.'], [31, 43, '.'], [37, 42, '*'], [43, 42, '.'],
  [49, 41, '^'], [55, 42, '.'], [61, 42, '*'], [67, 43, '.'], [73, 43, '.'], [80, 44, '\\'],

  // ── body ───────────────────────────────────────────────────
  [17, 50, '/'], [23, 49, '.'], [29, 49, '*'], [35, 48, '.'], [41, 48, '.'],
  [48, 48, '|'], [54, 48, '.'], [60, 48, '.'], [66, 49, '*'], [72, 49, '.'], [79, 49, '.'], [84, 50, '\\'],

  [16, 56, '~'], [22, 55, '.'], [28, 55, '*'], [34, 54, '.'], [40, 54, '.'],
  [47, 54, '|'], [53, 54, '.'], [59, 54, '.'], [65, 55, '*'], [71, 55, '.'], [77, 55, '~'],

  [17, 62, '/'], [23, 61, '.'], [29, 61, '*'], [35, 60, '.'], [41, 60, '.'],
  [48, 60, '|'], [54, 60, '.'], [60, 60, '.'], [66, 61, '*'], [72, 61, '.'], [79, 61, '.'], [84, 62, '\\'],

  // ── base ───────────────────────────────────────────────────
  [18, 68, '~'], [24, 67, '.'], [30, 67, '.'], [36, 66, '*'], [42, 66, '.'],
  [49, 66, '|'], [55, 66, '.'], [61, 66, '*'], [67, 67, '.'], [73, 67, '.'], [80, 68, '~'],

  [22, 73, '~'], [28, 72, '.'], [34, 72, '.'], [40, 71, '*'], [46, 71, '.'],
  [52, 71, '|'], [58, 71, '.'], [64, 71, '*'], [70, 72, '.'], [76, 72, '~'],

  // ── stray sparks outside silhouette ────────────────────────
  [13, 23, "'"], [86, 31, '`'], [88, 50, '.'], [9, 58, '.'], [90, 65, "'"],
]

const containerRef  = ref<HTMLElement>()
const charRefs      = new Array<HTMLElement | null>(BASE.length).fill(null)
const particles     = ref<Particle[]>([])

const RADIUS   = 200   // px — pull influence radius
const STRENGTH = 0.48  // pull magnitude (mirrors useMagnetic ≈ 0.38 but per-char)

let lastX = -9999
let lastY = -9999
let heroHovered = false
let frameScheduled = false

// ── apply magnetic pull to all chars ─────────────────────────
function applyPulls() {
  frameScheduled = false
  if (!containerRef.value) return
  const rect = containerRef.value.getBoundingClientRect()

  charRefs.forEach((el, i) => {
    if (!el) return
    const p = particles.value[i]
    if (!p) return

    const charX = rect.left + (p.baseX / 100) * rect.width
    const charY = rect.top  + (p.baseY / 100) * rect.height
    const dx    = lastX - charX
    const dy    = lastY - charY
    const dist  = Math.sqrt(dx * dx + dy * dy)

    if (dist < RADIUS && heroHovered) {
      const infl  = Math.pow(1 - dist / RADIUS, 2)   // quadratic falloff
      const pullX = (dx * infl * STRENGTH).toFixed(1)
      const pullY = (dy * infl * STRENGTH).toFixed(1)
      el.style.transition = 'transform 0.12s ease'
      el.style.transform  = `translate(calc(-50% + ${pullX}px), calc(-50% + ${pullY}px))`
    } else {
      el.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
      el.style.transform  = 'translate(-50%, -50%)'
    }
  })
}

// ── snap all chars back to origin (spring) ───────────────────
function snapBack() {
  charRefs.forEach(el => {
    if (!el) return
    el.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
    el.style.transform  = 'translate(-50%, -50%)'
  })
}

function onMouseMove(e: MouseEvent) {
  lastX = e.clientX
  lastY = e.clientY
  if (!frameScheduled) {
    frameScheduled = true
    requestAnimationFrame(applyPulls)
  }
}

// React to parent's hero hover state
watch(() => props.active, val => {
  heroHovered = !!val
  if (!val) snapBack()
})

onMounted(() => {
  particles.value = BASE.map(([x, y, char]) => ({
    baseX: x as number,
    baseY: y as number,
    char:  char as string,
    op:    0.35 + Math.random() * 0.55,
    bdur:  (2.5 + Math.random() * 3.5).toFixed(2) + 's',
    bdel:  -(Math.random() * 6).toFixed(2) + 's',
  }))
  window.addEventListener('mousemove', onMouseMove, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
})
</script>

<template>
  <div ref="containerRef" class="ascii-flame" aria-hidden="true">
    <span
      v-for="(p, i) in particles"
      :key="i"
      :ref="(el) => { if (el) charRefs[i] = el as HTMLElement }"
      class="fc"
      :style="{
        left:    p.baseX + '%',
        top:     p.baseY + '%',
        '--op':  p.op.toFixed(2),
        '--bdur': p.bdur,
        '--bdel': p.bdel,
      }"
    >{{ p.char }}</span>
  </div>
</template>

<style scoped>
.ascii-flame {
  position: relative;
  width: 300px;
  height: 540px;
  font-family: 'Courier New', Courier, monospace;
  font-size: 1.0625rem;
  color: currentColor;
  user-select: none;
  pointer-events: none;
}

.fc {
  position: absolute;
  transform: translate(-50%, -50%);
  opacity: var(--op);
  /* breathe affects opacity only — transform is owned by JS */
  animation: breathe var(--bdur) var(--bdel) infinite ease-in-out;
  will-change: transform, opacity;
}

@keyframes breathe {
  0%, 100% { opacity: var(--op); }
  50%       { opacity: calc(var(--op) * 0.28); }
}
</style>
