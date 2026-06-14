<script setup lang="ts">
const t = useT()
const { el, isVisible } = useReveal()
</script>

<template>
  <section id="cases" :ref="el" :class="['cases-section reveal', { 'in-view': isVisible }]">
    <div class="container">
      <p class="label">{{ t.cases.label }}</p>
      <h2 class="cases-heading">{{ t.cases.heading }}</h2>

      <template v-for="(item, c) in t.cases.items" :key="c">
        <div v-if="c > 0" class="case-divider" aria-hidden="true" />
        <div class="case-grid">
          <div class="case-text">
            <h3 class="case-name">{{ item.name }}</h3>
            <p class="case-tag">{{ item.tag }}</p>
            <div class="case-paragraphs">
              <p v-for="(para, i) in item.paragraphs" :key="i">{{ para }}</p>
            </div>
            <a
              v-if="item.link"
              :href="item.link.url"
              class="case-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ item.link.label }}
              <span class="link-arrow" aria-hidden="true">→</span>
            </a>
          </div>

          <ul class="case-meta">
            <li v-for="(m, i) in item.meta" :key="i" class="meta-item">
              <span class="meta-label">{{ m.label }}</span>
              <span class="meta-value">{{ m.value }}</span>
            </li>
          </ul>
        </div>
      </template>
    </div>
  </section>
</template>

<style scoped>
.cases-section {
  padding: var(--section-py) 0;
  border-top: 1px solid var(--border);
}

.cases-heading {
  font-family: var(--font-display);
  font-weight: 300;
  font-size: clamp(2rem, 4vw, 3rem);
  color: var(--text);
  margin-bottom: clamp(2.5rem, 5vw, 4rem);
}

.case-divider {
  height: 1px;
  background: var(--border);
  margin: clamp(3rem, 5vw, 5rem) 0;
}

.case-grid {
  display: grid;
  grid-template-columns: 58fr 42fr;
  gap: clamp(3rem, 6vw, 6rem);
  align-items: start;
}

/* Left column */
.case-name {
  font-family: var(--font-display);
  font-weight: 300;
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  color: var(--text);
  letter-spacing: -0.01em;
  line-height: 1.1;
  margin-bottom: 0.75rem;
}

.case-tag {
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 2rem;
}

.case-paragraphs {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.case-paragraphs p {
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 300;
  color: var(--text-muted);
  line-height: 1.8;
}

.case-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1.75rem;
  font-family: var(--font-body);
  font-size: 0.8125rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  color: var(--accent);
  transition: color 0.2s ease;
}
.case-link:hover { color: var(--accent-light); }

.link-arrow {
  font-size: 0.875rem;
  transition: transform 0.2s ease;
}
.case-link:hover .link-arrow { transform: translateX(3px); }

/* Right column */
.case-meta {
  list-style: none;
  border: 1px solid var(--border);
}

.meta-item {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  padding: 1.5rem 1.75rem;
  border-bottom: 1px solid var(--border);
  transition: background 0.2s ease;
}
.meta-item:last-child { border-bottom: none; }
.meta-item:hover { background: var(--surface); }

.meta-label {
  font-family: var(--font-body);
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--text-dim);
}

.meta-value {
  font-family: var(--font-body);
  font-size: 0.9375rem;
  font-weight: 300;
  color: var(--text);
  line-height: 1.4;
}

@media (max-width: 768px) {
  .case-grid {
    grid-template-columns: 1fr;
  }
  .case-meta {
    margin-top: 1rem;
  }
}
</style>
