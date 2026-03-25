<script setup lang="ts">
const t = useT()
const { el, isVisible } = useReveal()
</script>

<template>
  <section id="about" :ref="el" :class="['about-section reveal', { 'in-view': isVisible }]">
    <div class="container">
      <p class="label">{{ t.about.label }}</p>

      <!-- Phoenix -->
      <div class="about-grid">
        <div class="about-text">
          <h2 class="about-heading">{{ t.about.heading }}</h2>
          <div class="about-paragraphs">
            <p v-for="(para, i) in t.about.paragraphs" :key="i">{{ para }}</p>
          </div>
        </div>
        <div class="about-stats">
          <div v-for="(stat, i) in t.about.stats" :key="i" class="stat-item">
            <span class="stat-value">{{ stat.value }}</span>
            <span class="stat-label">{{ stat.label }}</span>
          </div>
        </div>
      </div>

      <div class="about-divider" aria-hidden="true" />

      <!-- Mads -->
      <div class="about-grid">
        <div class="about-text">
          <h2 class="about-heading">{{ t.about.mads.heading }}</h2>
          <div class="about-paragraphs">
            <p v-for="(para, i) in t.about.mads.paragraphs" :key="i">{{ para }}</p>
          </div>
        </div>
        <div class="about-stats">
          <div v-for="(stat, i) in t.about.mads.stats" :key="i" class="stat-item">
            <span class="stat-value">{{ stat.value }}</span>
            <span class="stat-label">{{ stat.label }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-section {
  padding: var(--section-py) 0;
  border-top: 1px solid var(--border);
}

.about-section > .container > .label {
  margin-bottom: clamp(2rem, 4vw, 3rem);
}

.about-divider {
  height: 1px;
  background: var(--border);
  margin: clamp(3rem, 5vw, 5rem) 0;
}

.about-grid {
  display: grid;
  grid-template-columns: 58fr 42fr;
  gap: clamp(3rem, 6vw, 6rem);
  align-items: start;
}

/* Left column */
.about-heading {
  font-family: var(--font-display);
  font-weight: 300;
  font-size: clamp(2rem, 4vw, 3rem);
  color: var(--text);
  margin-bottom: 2rem;
}

.about-paragraphs {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.about-paragraphs p {
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 300;
  color: var(--text-muted);
  line-height: 1.8;
}

/* Right column */
.about-stats {
  display: flex;
  flex-direction: column;
  gap: 0;
  border: 1px solid var(--border);
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  padding: 1.75rem 1.75rem;
  border-bottom: 1px solid var(--border);
  transition: background 0.2s ease;
}
.stat-item:last-child { border-bottom: none; }
.stat-item:hover { background: var(--surface); }

.stat-value {
  font-family: var(--font-display);
  font-weight: 300;
  font-size: 2rem;
  color: var(--accent);
  line-height: 1;
  letter-spacing: -0.01em;
}

.stat-label {
  font-family: var(--font-body);
  font-size: 0.8125rem;
  font-weight: 300;
  color: var(--text-muted);
  line-height: 1.4;
}

@media (max-width: 768px) {
  .about-grid {
    grid-template-columns: 1fr;
  }
  .about-stats {
    margin-top: 1rem;
  }
}
</style>
