<script setup lang="ts">
import { ref, onMounted } from 'vue'

defineProps<{ active?: boolean }>()

interface Particle { x: number; y: number; char: string; tx: string; ty: string; rot: string; dur: string; delay: string; op: string }

const particles = ref<Particle[]>([])

// Flame silhouette: [x%, y%, char]  — narrows toward tip (top), widens at base
const BASE: [number, number, string][] = [
  // tip
  [50,  3, "'"],
  // row 2
  [44,  8, '/'], [56,  8, '\\'],
  // row 3
  [41, 14, '/'], [50, 13, '^'], [59, 14, '\\'],
  // row 4
  [37, 20, '~'], [44, 19, '.'], [50, 18, '|'], [56, 19, '.'], [63, 20, '~'],
  // row 5
  [33, 26, '/'], [40, 25, '*'], [46, 24, '.'], [50, 23, '^'], [54, 24, '.'], [60, 25, '*'], [67, 26, '\\'],
  // row 6
  [29, 32, '~'], [36, 31, '/'], [42, 30, '.'], [47, 29, '.'], [50, 29, '|'], [53, 29, '.'], [58, 30, '.'], [64, 31, '\\'], [71, 32, '~'],
  // row 7
  [25, 38, '/'], [32, 37, '.'], [38, 36, '*'], [43, 35, '.'], [47, 34, '.'], [50, 34, '^'], [53, 34, '.'], [57, 35, '.'], [62, 36, '*'], [68, 37, '.'], [75, 38, '\\'],
  // row 8
  [21, 45, '~'], [28, 44, '/'], [34, 43, '.'], [40, 42, '.'], [45, 41, '*'], [49, 40, '.'], [51, 40, '.'], [55, 41, '*'], [60, 42, '.'], [66, 43, '.'], [72, 44, '\\'], [79, 45, '~'],
  // row 9
  [17, 52, '/'], [24, 51, '.'], [30, 50, '*'], [36, 49, '.'], [42, 48, '.'], [47, 47, '~'], [50, 47, '|'], [53, 47, '~'], [58, 48, '.'], [64, 49, '.'], [70, 50, '*'], [76, 51, '.'], [83, 52, '\\'],
  // base
  [14, 59, '~'], [21, 58, '.'], [27, 57, '/'], [34, 56, '.'], [40, 55, '*'], [46, 54, '.'], [50, 54, '^'], [54, 54, '.'], [60, 55, '*'], [66, 56, '.'], [73, 57, '\\'], [79, 58, '.'], [86, 59, '~'],
]

onMounted(() => {
  particles.value = BASE.map(([x, y, char]) => ({
    x, y, char,
    tx:    ((Math.random() * 18 - 9).toFixed(1))   + 'px',
    ty:    (-(Math.random() * 12 + 3).toFixed(1))  + 'px',
    rot:   ((Math.random() * 32 - 16).toFixed(1))  + 'deg',
    dur:   ((Math.random() * 2.5 + 2).toFixed(2))  + 's',
    delay: (-(Math.random() * 5).toFixed(2))       + 's',
    op:    (0.3 + Math.random() * 0.6).toFixed(2),
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
  width: 210px;
  height: 370px;
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

/* hover: organic drift */
.ascii-flame.active .fc {
  animation: drift var(--dur) var(--del) infinite ease-in-out;
}

@keyframes breathe {
  0%, 100% { opacity: var(--op); transform: translate(-50%, -50%); }
  50%       { opacity: calc(var(--op) * 0.35); transform: translate(-50%, -50%); }
}

@keyframes drift {
  0%   { transform: translate(-50%, -50%) rotate(0deg);                                                                             opacity: var(--op); }
  20%  { transform: translate(calc(-50% + var(--tx)),          calc(-50% + var(--ty) * 0.4)) rotate(calc(var(--rot) * 0.6));        opacity: calc(var(--op) * 1.4); }
  50%  { transform: translate(calc(-50% + var(--tx) * -0.55), calc(-50% + var(--ty)))        rotate(var(--rot));                    opacity: var(--op); }
  78%  { transform: translate(calc(-50% + var(--tx) * 0.3),   calc(-50% + var(--ty) * 0.5)) rotate(calc(var(--rot) * -0.45));      opacity: calc(var(--op) * 0.75); }
  100% { transform: translate(-50%, -50%) rotate(0deg);                                                                             opacity: var(--op); }
}
</style>
