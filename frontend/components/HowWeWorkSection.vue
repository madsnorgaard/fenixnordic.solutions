<script setup lang="ts">
const t = useT()
const { el, isVisible } = useReveal()
</script>

<template>
  <section id="how" :ref="el" :class="['how-section reveal', { 'in-view': isVisible }]">
    <div class="container">
      <p class="label">{{ t.how.label }}</p>
      <h2 class="how-heading">{{ t.how.heading }}</h2>

      <div class="steps-grid">
        <div
          v-for="(step, i) in t.how.steps"
          :key="i"
          class="step"
        >
          <div class="step-accent" aria-hidden="true" />
          <span class="step-number" aria-hidden="true">{{ step.number }}</span>
          <h3 class="step-title">{{ step.title }}</h3>
          <p class="step-body">{{ step.body }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.how-section {
  padding: var(--section-py) 0;
  border-top: 1px solid var(--border);
}

.how-heading {
  font-family: var(--font-display);
  font-weight: 300;
  font-size: clamp(2rem, 4vw, 3rem);
  color: var(--text);
  margin-bottom: clamp(3rem, 6vw, 5rem);
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  border: 1px solid var(--border);
}

.step {
  padding: 2.75rem 2.5rem;
  border-right: 1px solid var(--border);
  transition: background 0.25s ease;
  position: relative;
}
.step:last-child {
  border-right: none;
}
.step:hover {
  background: var(--surface);
}

.step-accent {
  width: 2rem;
  height: 2px;
  background: var(--accent);
  border-radius: 1px;
  margin-bottom: 2rem;
  transition: width 0.3s var(--ease-out-expo);
}
.step:hover .step-accent {
  width: 4rem;
}

.step-number {
  display: block;
  font-family: var(--font-body);
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.16em;
  color: var(--text-dim);
  margin-bottom: 1rem;
}

.step-title {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: 1.5rem;
  color: var(--text);
  margin-bottom: 1rem;
  line-height: 1.2;
}

.step-body {
  font-family: var(--font-body);
  font-size: 0.9375rem;
  font-weight: 300;
  color: var(--text-muted);
  line-height: 1.75;
}

@media (max-width: 768px) {
  .steps-grid {
    grid-template-columns: 1fr;
  }
  .step {
    border-right: none;
    border-bottom: 1px solid var(--border);
    padding: 2rem 1.5rem;
  }
  .step:last-child {
    border-bottom: none;
  }
}
</style>
