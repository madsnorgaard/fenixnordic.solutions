<script setup lang="ts">
const head = useLocaleHead({ dir: false, lang: true, seo: true })

useHead(() => ({
  htmlAttrs: { lang: head.value.htmlAttrs?.lang },
  link: head.value.link ?? [],
  meta: head.value.meta ?? [],
}))
</script>

<template>
  <div class="site">
    <SkipLink />
    <SiteHeader />
    <main id="main" tabindex="-1">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>
