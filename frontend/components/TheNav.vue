<script setup lang="ts">
const { locale, setLocale } = useLocale()
const t = useT()
const { el: magCta } = useMagnetic(0.3)

const isScrolled = ref(false)

onMounted(() => {
  const handler = () => { isScrolled.value = window.scrollY > 72 }
  window.addEventListener('scroll', handler, { passive: true })
  onUnmounted(() => window.removeEventListener('scroll', handler))
})
</script>

<template>
  <nav :class="['nav', { scrolled: isScrolled }]" role="navigation" aria-label="Main navigation">
    <div class="nav-inner container">
      <a href="/" class="wordmark" aria-label="Fenix Nordic Solutions home">
        <PhoenixMark :size="16" class="wordmark-mark" />
        Fenix Nordic
      </a>

      <div class="nav-controls">
        <div class="lang-toggle" role="group" aria-label="Language selection">
          <button
            :class="['lang-btn', { active: locale === 'en' }]"
            @click="setLocale('en')"
            aria-label="Switch to English"
          >EN</button>
          <span class="lang-sep" aria-hidden="true">|</span>
          <button
            :class="['lang-btn', { active: locale === 'da' }]"
            @click="setLocale('da')"
            aria-label="Skift til dansk"
          >DA</button>
        </div>
        <a ref="magCta" href="#contact" class="btn-primary nav-cta">{{ t.nav.contact }}</a>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 1.25rem 0;
  transition: background 0.3s ease, padding 0.3s ease, border-color 0.3s ease;
  border-bottom: 1px solid transparent;
}

.nav.scrolled {
  background: rgba(11, 11, 16, 0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 0.875rem 0;
  border-bottom-color: var(--border);
}

.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.wordmark {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  font-family: var(--font-display);
  font-weight: 300;
  font-size: 1.0625rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--text);
  transition: color 0.2s ease;
  flex-shrink: 0;
}
.wordmark:hover { color: var(--accent-light); }
.wordmark-mark {
  color: var(--accent);
  flex-shrink: 0;
  transition: color 0.2s ease;
}
.wordmark:hover .wordmark-mark { color: var(--accent-light); }

.nav-controls {
  display: flex;
  align-items: center;
  gap: 1.75rem;
}

.lang-toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.lang-btn {
  font-family: var(--font-body);
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.16em;
  color: var(--text-muted);
  transition: color 0.2s ease;
  padding: 0.25rem 0;
}
.lang-btn:hover { color: var(--text); }
.lang-btn.active {
  color: var(--text);
  border-bottom: 1px solid var(--accent);
}

.lang-sep {
  font-size: 0.625rem;
  color: var(--text-dim);
  user-select: none;
}

.nav-cta {
  font-size: 0.75rem;
  padding: 0.625rem 1.25rem;
}

@media (max-width: 480px) {
  .nav-cta { display: none; }
}
</style>
