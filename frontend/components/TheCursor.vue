<script setup lang="ts">
interface Spark {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  size: number
  life: number
}

const dot = ref<HTMLElement | null>(null)
const halo = ref<HTMLElement | null>(null)
const isHovered = ref(false)
const isClicking = ref(false)
const sparks = ref<Spark[]>([])

let mouseX = 0
let mouseY = 0
let haloX = 0
let haloY = 0
let rafId = 0
let sparkId = 0

const lerp = (a: number, b: number, t: number) => a + (b - a) * t

const spawnSparks = (x: number, y: number) => {
  const count = 8
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.8
    const speed = 2.5 + Math.random() * 3.5
    sparks.value.push({
      id: sparkId++,
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 1.5,
      size: 2 + Math.random() * 3,
      life: 1,
    })
  }
}

onMounted(() => {
  const onMove = (e: MouseEvent) => {
    mouseX = e.clientX
    mouseY = e.clientY
    if (dot.value) {
      dot.value.style.transform = `translate(${mouseX}px, ${mouseY}px)`
    }
    const target = e.target as Element
    isHovered.value = !!(target.closest('a, button, label, input, textarea, [data-cursor-hover]'))
  }

  const onDown = (e: MouseEvent) => {
    isClicking.value = true
    spawnSparks(e.clientX, e.clientY)
    setTimeout(() => { isClicking.value = false }, 150)
  }

  document.addEventListener('mousemove', onMove, { passive: true })
  document.addEventListener('mousedown', onDown)

  // Spark + halo animation loop
  let last = performance.now()
  const animate = (now: number) => {
    const dt = Math.min((now - last) / 16.67, 3)
    last = now

    // Lerp halo
    haloX = lerp(haloX, mouseX, 0.12)
    haloY = lerp(haloY, mouseY, 0.12)
    if (halo.value) {
      halo.value.style.transform = `translate(${haloX}px, ${haloY}px)`
    }

    // Update sparks
    if (sparks.value.length) {
      sparks.value = sparks.value
        .map(s => ({
          ...s,
          x: s.x + s.vx * dt,
          y: s.y + s.vy * dt,
          vy: s.vy + 0.18 * dt, // gravity
          life: s.life - 0.045 * dt,
        }))
        .filter(s => s.life > 0)
    }

    rafId = requestAnimationFrame(animate)
  }
  rafId = requestAnimationFrame(animate)

  onUnmounted(() => {
    document.removeEventListener('mousemove', onMove)
    document.removeEventListener('mousedown', onDown)
    cancelAnimationFrame(rafId)
  })
})
</script>

<template>
  <ClientOnly>
    <div class="cursor-root" aria-hidden="true">
      <!-- Lagging ember halo -->
      <div ref="halo" :class="['cursor-halo', { hovered: isHovered }]" />
      <!-- Exact-tracking dot -->
      <div ref="dot" :class="['cursor-dot', { hovered: isHovered, clicking: isClicking }]" />
      <!-- Click sparks -->
      <div
        v-for="s in sparks"
        :key="s.id"
        class="spark"
        :style="{
          left: s.x + 'px',
          top: s.y + 'px',
          width: s.size + 'px',
          height: s.size + 'px',
          opacity: s.life,
          transform: `translate(-50%, -50%) scale(${s.life})`,
        }"
      />
    </div>
  </ClientOnly>
</template>

<style scoped>
.cursor-root {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;
}

.cursor-dot {
  position: fixed;
  top: 0;
  left: 0;
  width: 7px;
  height: 7px;
  margin: -3.5px 0 0 -3.5px;
  border-radius: 50%;
  background: var(--accent);
  transition: width 0.2s ease, height 0.2s ease, margin 0.2s ease, background 0.2s ease, opacity 0.15s ease;
  will-change: transform;
  pointer-events: none;
}

.cursor-dot.hovered {
  width: 5px;
  height: 5px;
  margin: -2.5px 0 0 -2.5px;
  background: var(--accent-light);
  opacity: 0.7;
}

.cursor-dot.clicking {
  width: 4px;
  height: 4px;
  margin: -2px 0 0 -2px;
  opacity: 0.5;
}

.cursor-halo {
  position: fixed;
  top: 0;
  left: 0;
  width: 38px;
  height: 38px;
  margin: -19px 0 0 -19px;
  border-radius: 50%;
  border: 1px solid rgba(196, 98, 42, 0.35);
  background: radial-gradient(circle, rgba(196, 98, 42, 0.06) 0%, transparent 70%);
  transition: width 0.25s ease, height 0.25s ease, margin 0.25s ease, border-color 0.25s ease;
  will-change: transform;
  pointer-events: none;
}

.cursor-halo.hovered {
  width: 56px;
  height: 56px;
  margin: -28px 0 0 -28px;
  border-color: rgba(196, 98, 42, 0.55);
}

.spark {
  position: fixed;
  top: 0;
  left: 0;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 4px var(--accent), 0 0 8px rgba(196, 98, 42, 0.5);
  pointer-events: none;
  will-change: transform, opacity;
}
</style>
