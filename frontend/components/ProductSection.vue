<script setup lang="ts">
const t = useT()
const { el, isVisible } = useReveal()
</script>

<template>
  <section id="product" :ref="el" :class="['product-section reveal', { 'in-view': isVisible }]">
    <div class="container">
      <p class="label">{{ t.product.label }}</p>

      <div class="product-grid">
        <div class="product-text">
          <h2 class="product-name">{{ t.product.name }}</h2>
          <p class="product-heading">{{ t.product.heading }}</p>
          <div class="product-paragraphs">
            <p v-for="(para, i) in t.product.paragraphs" :key="i">{{ para }}</p>
          </div>
          <p class="product-status">
            <span class="status-dot" aria-hidden="true" />
            {{ t.product.status }}
          </p>
        </div>

        <ul class="product-points">
          <li v-for="(point, i) in t.product.points" :key="i" class="point-item">
            <div class="point-accent" aria-hidden="true" />
            <h3 class="point-title">{{ point.title }}</h3>
            <p class="point-body">{{ point.body }}</p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.product-section {
  padding: var(--section-py) 0;
  border-top: 1px solid var(--border);
}

.product-section > .container > .label {
  margin-bottom: clamp(2rem, 4vw, 3rem);
}

.product-grid {
  display: grid;
  grid-template-columns: 58fr 42fr;
  gap: clamp(3rem, 6vw, 6rem);
  align-items: start;
}

/* Left column */
.product-name {
  font-family: var(--font-display);
  font-weight: 300;
  font-size: clamp(2.5rem, 5vw, 3.75rem);
  color: var(--accent);
  letter-spacing: -0.01em;
  line-height: 1;
  margin-bottom: 1rem;
}

.product-heading {
  font-family: var(--font-display);
  font-weight: 300;
  font-size: clamp(1.25rem, 2.5vw, 1.75rem);
  color: var(--text);
  line-height: 1.3;
  margin-bottom: 2rem;
}

.product-paragraphs {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.product-paragraphs p {
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 300;
  color: var(--text-muted);
  line-height: 1.8;
}

.product-status {
  display: flex;
  align-items: baseline;
  gap: 0.625rem;
  margin-top: 2rem;
  font-family: var(--font-body);
  font-size: 0.8125rem;
  font-weight: 400;
  letter-spacing: 0.01em;
  color: var(--text);
  line-height: 1.6;
}

.status-dot {
  flex-shrink: 0;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: var(--accent);
  transform: translateY(-0.1rem);
  animation: status-pulse 2.5s ease-in-out infinite;
}

@keyframes status-pulse {
  0%, 100% { opacity: 0.4; box-shadow: 0 0 0 0 color-mix(in srgb, var(--accent) 40%, transparent); }
  50%       { opacity: 1;   box-shadow: 0 0 0 4px transparent; }
}

/* Right column */
.product-points {
  list-style: none;
  border: 1px solid var(--border);
}

.point-item {
  padding: 1.75rem 1.75rem;
  border-bottom: 1px solid var(--border);
  transition: background 0.2s ease;
  position: relative;
}
.point-item:last-child { border-bottom: none; }
.point-item:hover { background: var(--surface); }

.point-accent {
  width: 1.75rem;
  height: 2px;
  background: var(--accent);
  border-radius: 1px;
  margin-bottom: 1rem;
  transition: width 0.3s var(--ease-out-expo);
}
.point-item:hover .point-accent { width: 3rem; }

.point-title {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: 1.125rem;
  color: var(--text);
  line-height: 1.2;
  margin-bottom: 0.5rem;
}

.point-body {
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 300;
  color: var(--text-muted);
  line-height: 1.65;
}

@media (max-width: 768px) {
  .product-grid {
    grid-template-columns: 1fr;
  }
  .product-points {
    margin-top: 1rem;
  }
}
</style>
