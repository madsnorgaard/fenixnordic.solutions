<script setup lang="ts">
const t = useT()
</script>

<template>
  <footer class="footer">
    <div class="container footer-inner">
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

@media (max-width: 640px) {
  .footer-inner {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.375rem;
  }
}
</style>
