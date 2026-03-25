<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps<{ active?: boolean }>()

interface Particle { baseX: number; baseY: number; char: string; op: number; bdur: string; bdel: string }

// Particle chars only — no /\|^~ which create a tree silhouette.
// Shape: two thin elongated tongues, widest in the middle body (~y 55%),
// base narrows again — an oval with a split top, not a triangle.
const BASE: [number, number, string][] = [
  // ── left tongue — thin, tall ───────────────────────────────
  [40,  3, "'"],
  [37,  8, '.'], [43,  8, "'"],
  [35, 13, '.'], [40, 12, '*'], [46, 13, '.'],
  [34, 18, '.'], [39, 17, '.'], [44, 17, '*'], [49, 18, '.'],
  [33, 23, '.'], [38, 22, '*'], [43, 22, '.'], [48, 22, '.'],
  [32, 28, '.'], [37, 27, '.'], [42, 27, '*'], [47, 27, '.'], [52, 28, '.'],
  [31, 33, '.'], [36, 32, '.'], [41, 32, '*'], [46, 32, '.'], [51, 33, '.'],

  // ── right tongue — slightly shorter, starts lower ──────────
  [61,  7, "'"],
  [58, 12, '.'], [64, 12, "'"],
  [55, 17, '.'], [61, 16, '*'], [67, 17, '.'],
  [53, 22, '.'], [59, 21, '.'], [65, 21, '*'], [71, 22, '.'],
  [51, 27, '.'], [57, 26, '*'], [63, 26, '.'], [69, 26, '.'],
  [50, 32, '.'], [56, 31, '.'], [62, 31, '*'], [67, 31, '.'], [74, 32, '.'],
  [49, 37, '.'], [55, 36, '.'], [61, 36, '*'], [67, 36, '.'], [74, 37, '.'],

  // ── merge — tongues join, start spreading wide ─────────────
  [28, 41, '.'], [34, 40, '*'], [39, 40, '.'], [44, 40, '.'],
  [50, 40, '*'], [55, 40, '.'], [61, 40, '.'], [66, 40, '*'], [72, 41, '.'], [78, 41, '.'],

  [24, 46, '.'], [29, 45, '.'], [34, 45, '*'], [39, 45, '.'], [44, 44, '.'],
  [50, 44, '*'], [55, 44, '.'], [60, 44, '.'], [66, 45, '*'], [71, 45, '.'],
  [76, 45, '.'], [82, 46, '.'],

  // ── body — widest here, then narrows again ─────────────────
  [20, 51, '.'], [25, 51, '*'], [30, 50, '.'], [36, 50, '.'], [41, 50, '*'],
  [46, 50, '.'], [51, 49, '*'], [56, 50, '.'], [61, 50, '.'], [66, 50, '*'],
  [71, 51, '.'], [76, 51, '.'], [82, 51, '.'],

  [17, 56, '.'], [22, 56, '.'], [28, 55, '*'], [33, 55, '.'], [38, 55, '.'],
  [43, 55, '*'], [48, 55, '.'], [53, 54, '*'], [58, 55, '.'], [63, 55, '.'],
  [68, 55, '*'], [73, 55, '.'], [79, 56, '.'], [84, 56, '.'],

  [19, 61, '.'], [24, 61, '*'], [30, 61, '.'], [35, 60, '.'], [40, 60, '*'],
  [45, 60, '.'], [50, 60, '*'], [55, 60, '.'], [60, 60, '.'], [65, 61, '*'],
  [70, 61, '.'], [75, 61, '.'], [81, 61, '.'],

  // ── base — NARROWER than body (not a triangle) ─────────────
  [23, 66, '.'], [28, 66, '*'], [33, 66, '.'], [38, 65, '.'], [43, 65, '*'],
  [48, 65, '.'], [53, 65, '*'], [58, 65, '.'], [63, 65, '.'], [68, 66, '*'],
  [73, 66, '.'], [78, 66, '.'],

  [27, 72, '.'], [32, 72, '*'], [37, 71, '.'], [42, 71, '.'], [47, 71, '*'],
  [52, 71, '.'], [57, 71, '.'], [62, 72, '*'], [67, 72, '.'], [73, 72, '.'],

  // ── stray sparks outside body ──────────────────────────────
  [13, 28, "'"], [87, 35, "'"], [11, 53, '.'], [90, 50, '.'], [86, 64, "'"],
]

const containerRef  = ref<HTMLElement>()
const charRefs      = new Array<HTMLElement | null>(BASE.length).fill(null)
const particles     = ref<Particle[]>([])

const RADIUS   = 200
const STRENGTH = 0.48

let lastX = -9999
let lastY = -9999
let heroHovered = false
let frameScheduled = false

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
      const infl  = Math.pow(1 - dist / RADIUS, 2)
      el.style.transition = 'transform 0.12s ease'
      el.style.transform  = `translate(calc(-50% + ${(dx * infl * STRENGTH).toFixed(1)}px), calc(-50% + ${(dy * infl * STRENGTH).toFixed(1)}px))`
    } else {
      el.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
      el.style.transform  = 'translate(-50%, -50%)'
    }
  })
}

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

watch(() => props.active, val => {
  heroHovered = !!val
  if (!val) snapBack()
})

onMounted(() => {
  particles.value = BASE.map(([x, y, char]) => ({
    baseX: x as number,
    baseY: y as number,
    char:  char as string,
    op:    0.4 + Math.random() * 0.5,
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
  font-size: 1.125rem;
  color: currentColor;
  user-select: none;
  pointer-events: none;
}

.fc {
  position: absolute;
  transform: translate(-50%, -50%);
  opacity: var(--op);
  animation: breathe var(--bdur) var(--bdel) infinite ease-in-out;
  will-change: transform, opacity;
}

@keyframes breathe {
  0%, 100% { opacity: var(--op); }
  50%       { opacity: calc(var(--op) * 0.25); }
}
</style>
