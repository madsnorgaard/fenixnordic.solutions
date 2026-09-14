<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: t('meta.title'),
  description: t('meta.description'),
})

defineOgImageComponent('Default', {
  title: `${t('hero.line1')} ${t('hero.line2')}`,
  description: t('hero.lede'),
})
</script>

<template>
  <div>
    <HomeHero />
    <HomeHow />
    <HomeServices />
    <HomeProducts />
    <HomeCases />
    <HomeWho />
    <HomeContact />
  </div>
</template>
