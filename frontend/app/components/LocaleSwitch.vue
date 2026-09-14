<script setup lang="ts">
const { t, locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
</script>

<template>
  <div class="locale" role="group" :aria-label="t('nav.language')">
    <NuxtLink
      v-for="l in locales"
      :key="l.code"
      :to="switchLocalePath(l.code)"
      :hreflang="l.language"
      :lang="l.code"
      :aria-current="l.code === locale ? 'true' : undefined"
    >
      {{ l.name }}
    </NuxtLink>
  </div>
</template>
