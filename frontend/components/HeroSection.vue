<script setup lang="ts">
const t = useT()
const { el: magContact } = useMagnetic()
const { el: magServices } = useMagnetic(0.25)
</script>

<template>
  <section class="hero" aria-label="Hero">
    <div class="hero-accent-bar" aria-hidden="true" />

    <div class="hero-inner container">
      <p class="hero-label hero-anim d1">{{ t.hero.label }}</p>

      <h1 class="hero-headline">
        <span class="hero-line hero-anim d2">{{ t.hero.line1 }}</span>
        <span class="hero-line hero-anim d3">{{ t.hero.line2 }}</span>
        <span v-if="t.hero.line3" class="hero-line hero-anim d4">{{ t.hero.line3 }}</span>
      </h1>

      <p class="hero-tagline hero-anim d5">{{ t.hero.tagline }}</p>

      <div class="hero-ctas hero-anim d6">
        <a ref="magServices" href="#services" class="btn-ghost">
          {{ t.hero.cta_services }}
          <span class="arrow" aria-hidden="true">↓</span>
        </a>
        <a ref="magContact" href="#contact" class="btn-primary">{{ t.hero.cta_contact }}</a>
      </div>
    </div>

    <div class="hero-scroll-hint hero-anim d5" aria-hidden="true">
      <div class="scroll-line" />
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  align-items: center;
  padding: 8rem 0 5rem;
  overflow: hidden;
}

/* Vertical ember accent bar — left edge */
.hero-accent-bar {
  position: absolute;
  left: var(--px);
  top: 20%;
  bottom: 20%;
  width: 1px;
  background: linear-gradient(
    to bottom,
    transparent,
    var(--accent) 30%,
    var(--accent) 70%,
    transparent
  );
  opacity: 0.6;
}

/* Subtle radial glow behind headline */
.hero::before {
  content: '';
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70vw;
  height: 60vh;
  background: radial-gradient(ellipse at center, var(--accent-glow) 0%, transparent 65%);
  pointer-events: none;
}

.hero-inner {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: calc(var(--px) + 2rem);
}

.hero-label {
  font-family: var(--font-body);
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 2rem;
}

.hero-headline {
  display: flex;
  flex-direction: column;
  font-family: var(--font-display);
  font-weight: 300;
  font-size: clamp(3.75rem, 9vw, 8rem);
  line-height: 1.0;
  letter-spacing: -0.02em;
  color: var(--text);
  margin-bottom: 2.25rem;
}

.hero-line {
  display: block;
}

.hero-tagline {
  font-family: var(--font-body);
  font-size: clamp(1rem, 1.5vw, 1.125rem);
  font-weight: 300;
  color: var(--text-muted);
  max-width: 42ch;
  line-height: 1.65;
  margin-bottom: 3rem;
}

.hero-ctas {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.arrow {
  font-size: 0.875rem;
  transition: transform 0.2s ease;
}
.btn-ghost:hover .arrow {
  transform: translateY(3px);
}

/* Scroll hint — thin animated line at bottom center */
.hero-scroll-hint {
  position: absolute;
  bottom: 2.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.scroll-line {
  width: 1px;
  height: 3rem;
  background: linear-gradient(to bottom, var(--accent), transparent);
  animation: scroll-pulse 2.5s ease-in-out infinite;
}

@keyframes scroll-pulse {
  0%, 100% { opacity: 0.2; transform: scaleY(0.6); transform-origin: top; }
  50%       { opacity: 0.7; transform: scaleY(1);   transform-origin: top; }
}

@media (max-width: 768px) {
  .hero-inner {
    padding-left: var(--px);
  }
  .hero-accent-bar {
    display: none;
  }
  .hero-ctas {
    gap: 0.75rem;
  }
}

@media (max-width: 480px) {
  .hero-ctas .btn-ghost { display: none; }
}
</style>
