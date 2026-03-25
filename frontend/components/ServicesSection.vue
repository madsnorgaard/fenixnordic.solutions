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

      <div class="rule" style="margin-bottom: 0;" />

      <ul class="services-list">
        <li
          v-for="(item, i) in t.services.items"
          :key="i"
          class="service-row"
        >
          <span class="row-number" aria-hidden="true">{{ item.number }}</span>
          <div class="row-accent" aria-hidden="true" />
          <h3 class="row-title">{{ item.title }}</h3>
          <p class="row-body">{{ item.body }}</p>
        </li>
      </ul>
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

.services-list {
  list-style: none;
}

.service-row {
  display: grid;
  grid-template-columns: 3rem 1px 18rem 1fr;
  grid-template-rows: auto;
  align-items: start;
  gap: 0 2.5rem;
  padding: 2.5rem 0;
  border-bottom: 1px solid var(--border);
  transition: background 0.2s ease;
  position: relative;
}

.service-row::after {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--surface-hover);
  opacity: 0;
  transition: opacity 0.2s ease;
  pointer-events: none;
}
.service-row:hover::after {
  opacity: 1;
}

.row-number {
  font-family: var(--font-body);
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.16em;
  color: var(--text-dim);
  padding-top: 0.3rem;
  grid-column: 1;
  grid-row: 1;
}

.row-accent {
  grid-column: 2;
  grid-row: 1 / 3;
  width: 1px;
  align-self: stretch;
  background: linear-gradient(to bottom, var(--accent), transparent);
  transition: background 0.3s ease;
  min-height: 4rem;
}
.service-row:hover .row-accent {
  background: linear-gradient(to bottom, var(--accent-light), transparent);
}

.row-title {
  grid-column: 3;
  grid-row: 1;
  font-family: var(--font-display);
  font-weight: 400;
  font-size: clamp(1.25rem, 2vw, 1.625rem);
  color: var(--text);
  line-height: 1.2;
  letter-spacing: 0;
}

.row-body {
  grid-column: 4;
  grid-row: 1;
  font-family: var(--font-body);
  font-size: 0.9375rem;
  font-weight: 300;
  color: var(--text-muted);
  line-height: 1.75;
  padding-top: 0.2rem;
}

@media (max-width: 900px) {
  .service-row {
    grid-template-columns: 3rem 1px 1fr;
    gap: 0 1.5rem;
  }
  .row-body {
    grid-column: 3;
    grid-row: 2;
    padding-top: 0.75rem;
  }
}

@media (max-width: 560px) {
  .service-row {
    grid-template-columns: 2.5rem 1px 1fr;
    gap: 0 1.25rem;
    padding: 2rem 0;
  }
  .row-title {
    font-size: 1.25rem;
  }
}
</style>
