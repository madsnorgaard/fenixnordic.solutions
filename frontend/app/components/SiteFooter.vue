<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <footer class="footer">
    <div class="frame footer__inner">
      <NuxtLink :to="localePath('/')" class="footer__mark" :aria-label="t('footer.top')">
        <PhoenixMark :size="22" />
      </NuxtLink>
      <span>{{ site.name }}, CVR {{ site.cvr }}, {{ t('footer.country') }}</span>
      <span>{{ site.year }}</span>
    </div>
  </footer>
</template>
