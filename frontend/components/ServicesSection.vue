<script setup lang="ts">
const t = useT()
const { el, isVisible } = useReveal()
</script>

<template>
  <section id="services" :ref="el" :class="['services-section reveal', { 'in-view': isVisible }]">
    <div class="container">
      <div class="section-header">
        <p class="label">{{ t.services.label }}</p>
        <h2 class="section-heading">{{ t.services.heading }}</h2>
      </div>

      <div class="rule" style="margin-bottom: 3.5rem;" />

      <div class="services-grid">
        <article
          v-for="(item, i) in t.services.items"
          :key="i"
          class="service-card"
        >
          <div class="card-top">
            <span class="card-number" aria-hidden="true">{{ item.number }}</span>
            <div class="card-accent" aria-hidden="true" />
          </div>
          <h3 class="card-title">{{ item.title }}</h3>
          <p class="card-body">{{ item.body }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.services-section {
  padding: var(--section-py) 0;
}

.section-header {
  margin-bottom: 2.5rem;
}

.section-heading {
  font-family: var(--font-display);
  font-weight: 300;
  font-size: clamp(2rem, 4vw, 3rem);
  color: var(--text);
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5px;
  background: var(--border);
  border: 1px solid var(--border);
}

.service-card {
  background: var(--bg);
  padding: 2.75rem 2.5rem;
  position: relative;
  transition: background 0.25s ease;
}
.service-card:hover {
  background: var(--surface);
}

.card-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1.75rem;
}

.card-number {
  font-family: var(--font-body);
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.16em;
  color: var(--text-dim);
}

.card-accent {
  width: 2rem;
  height: 2px;
  background: var(--accent);
  transition: width 0.3s var(--ease-out-expo);
  border-radius: 1px;
}
.service-card:hover .card-accent {
  width: 4rem;
}

.card-title {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: 1.5rem;
  letter-spacing: 0;
  color: var(--text);
  margin-bottom: 1rem;
  line-height: 1.2;
}

.card-body {
  font-family: var(--font-body);
  font-size: 0.9375rem;
  font-weight: 300;
  color: var(--text-muted);
  line-height: 1.75;
}

@media (max-width: 640px) {
  .services-grid {
    grid-template-columns: 1fr;
  }
  .service-card {
    padding: 2rem 1.5rem;
  }
}
</style>
