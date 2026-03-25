<script setup lang="ts">
import { ref, onMounted } from 'vue'

defineProps<{ active?: boolean }>()

interface Particle { x: number; y: number; char: string; tx: string; ty: string; rot: string; dur: string; delay: string; op: string }

const particles = ref<Particle[]>([])

// Asymmetric double-tongue flame — irregular edges, no perfect diagonals
const BASE: [number, number, string][] = [
  // === left tongue (primary, leans left) ===
  [40,  2, "'"],
  [36,  6, '/'], [41,  5, '^'], [47,  6, '\\'],
  [33, 11, '/'], [39, 10, '.'], [44, 10, '|'], [50, 11, '\\'],

  // === right spark (secondary, offset right) ===
  [64,  4, "'"],
  [60,  8, '/'], [65,  7, '`'], [69,  8, '\\'],
  [57, 13, '/'], [63, 12, '^'], [68, 13, '\\'],

  // === tongues merge — deliberately uneven ===
  [30, 17, '~'], [37, 16, '/'], [42, 15, '.'], [47, 14, '|'], [52, 14, '~'], [58, 15, '.'], [64, 16, '\\'], [70, 17, '~'],
  [27, 22, '/'], [33, 21, '.'], [39, 20, '*'], [45, 19, '.'], [50, 19, '^'], [56, 20, '.'], [62, 21, '`'], [67, 22, '\\'],

  // === mid-upper — jagged left edge, smoother right ===
  [23, 28, '~'], [30, 27, '/'], [36, 26, '.'], [42, 25, '.'], [47, 25, '|'], [53, 25, '.'], [59, 26, '*'], [65, 27, '\\'], [72, 28, '~'],
  [20, 34, '/'], [27, 33, '.'], [34, 32, '*'], [40, 31, '.'], [46, 30, '.'], [50, 30, '^'], [55, 31, '.'], [61, 32, '.'], [68, 33, '\\'],

  // === mid — wider, chars loosely scattered inside ===
  [17, 40, '~'], [24, 39, '/'], [31, 38, '.'], [37, 37, '*'], [43, 36, '.'], [48, 36, '~'], [53, 36, '~'], [59, 37, '.'], [65, 38, '*'], [71, 39, '\\'], [77, 40, '~'],
  [14, 46, '/'], [22, 45, '.'], [29, 44, '.'], [35, 43, '*'], [41, 42, '.'], [47, 42, '`'], [53, 42, '.'], [59, 43, '*'], [65, 44, '.'], [72, 45, '.'], [79, 46, '\\'],

  // === lower — wide, uneven inner texture ===
  [12, 52, '~'], [19, 51, '/'], [27, 50, '.'], [34, 49, '*'], [40, 48, '.'], [46, 48, '~'], [50, 48, '^'], [55, 48, '~'], [61, 49, '.'], [68, 50, '*'], [75, 51, '\\'], [82, 52, '~'],
  [10, 58, '.'], [17, 57, '.'], [24, 56, '/'], [31, 55, '.'], [38, 54, '*'], [44, 54, '.'], [50, 54, '|'], [56, 54, '.'], [62, 55, '*'], [69, 56, '\\'], [76, 57, '.'], [83, 58, '.'],

  // === stray sparks — chars outside the body silhouette ===
  [15, 24, "'"], [82, 29, '`'], [88, 44, '.'], [8, 48, '.'], [87, 58, "'"],
]

onMounted(() => {
  particles.value = BASE.map(([x, y, char]) => ({
    x, y, char,
    tx:    ((Math.random() * 22 - 11).toFixed(1))  + 'px',
    ty:    (-(Math.random() * 14 + 3).toFixed(1))  + 'px',
    rot:   ((Math.random() * 36 - 18).toFixed(1))  + 'deg',
    dur:   ((Math.random() * 2.8 + 1.8).toFixed(2)) + 's',
    delay: (-(Math.random() * 5).toFixed(2))        + 's',
    op:    (0.35 + Math.random() * 0.55).toFixed(2),
  }))
})
</script>

<template>
  <div class="ascii-flame" :class="{ active }" aria-hidden="true">
    <span
      v-for="(p, i) in particles"
      :key="i"
      class="fc"
      :style="{
        left:    p.x + '%',
        top:     p.y + '%',
        '--tx':  p.tx,
        '--ty':  p.ty,
        '--rot': p.rot,
        '--dur': p.dur,
        '--del': p.delay,
        '--op':  p.op,
      }"
    >{{ p.char }}</span>
  </div>
</template>

<style scoped>
.ascii-flame {
  position: relative;
  width: 300px;
  height: 560px;
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
  animation: breathe calc(var(--dur) * 1.8) var(--del) infinite ease-in-out;
  will-change: transform, opacity;
}

.ascii-flame.active .fc {
  animation: drift var(--dur) var(--del) infinite ease-in-out;
}

@keyframes breathe {
  0%, 100% { opacity: var(--op); transform: translate(-50%, -50%); }
  50%       { opacity: calc(var(--op) * 0.3); transform: translate(-50%, -50%); }
}

@keyframes drift {
  0%   { transform: translate(-50%, -50%) rotate(0deg);                                                                              opacity: var(--op); }
  20%  { transform: translate(calc(-50% + var(--tx)),           calc(-50% + var(--ty) * 0.4)) rotate(calc(var(--rot) * 0.6));        opacity: calc(var(--op) * 1.4); }
  50%  { transform: translate(calc(-50% + var(--tx) * -0.55),  calc(-50% + var(--ty)))        rotate(var(--rot));                    opacity: var(--op); }
  78%  { transform: translate(calc(-50% + var(--tx) * 0.3),    calc(-50% + var(--ty) * 0.5)) rotate(calc(var(--rot) * -0.45));      opacity: calc(var(--op) * 0.7); }
  100% { transform: translate(-50%, -50%) rotate(0deg);                                                                              opacity: var(--op); }
}
</style>
