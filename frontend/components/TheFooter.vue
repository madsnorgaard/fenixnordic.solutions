<script setup lang="ts">
const t = useT()
const { el: magMark } = useMagnetic(0.3)
</script>

<template>
  <footer class="footer">
    <div class="container footer-inner">
      <a ref="magMark" href="#" aria-label="Back to top" class="footer-mark">
        <PhoenixMark :size="40" />
      </a>
      <span class="footer-reg">{{ t.footer.reg }}</span>
      <span class="footer-copy">{{ t.footer.copy }}</span>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--border);
  padding: 1.75rem 0;
}

.footer-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

.footer-reg,
.footer-copy {
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 300;
  letter-spacing: 0.04em;
  color: var(--text-dim);
}

.footer-mark {
  display: flex;
  align-items: center;
  color: var(--accent);
  opacity: 0.5;
  text-decoration: none;
  animation: ember-glow 4s ease-in-out infinite;
  will-change: filter, opacity;
}

.footer-mark:hover {
  opacity: 1;
  animation: none;
  filter: drop-shadow(0 0 8px color-mix(in srgb, var(--accent) 60%, transparent));
}

@keyframes ember-glow {
  0%, 100% { opacity: 0.5; filter: none; }
  50%       { opacity: 0.72; filter: drop-shadow(0 0 6px color-mix(in srgb, var(--accent) 40%, transparent)); }
}

@media (max-width: 640px) {
  .footer-inner {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.375rem;
  }
}
</style>
