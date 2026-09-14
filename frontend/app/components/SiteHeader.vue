<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <header class="header">
    <div class="frame header__inner">
      <NuxtLink :to="localePath('/')" class="header__brand">
        <PhoenixMark :size="16" />
        <span>{{ site.short }}</span>
      </NuxtLink>
      <nav class="header__nav" :aria-label="t('nav.label')">
        <LocaleSwitch />
        <NuxtLink :to="`${localePath('/')}#contact`">{{ t('nav.contact') }}</NuxtLink>
      </nav>
    </div>
  </header>
</template>
