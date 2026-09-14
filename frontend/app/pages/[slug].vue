<script setup lang="ts">
const route = useRoute()
const { t, locale } = useI18n()
const localePath = useLocalePath()

const collection = computed(() => (locale.value === 'da' ? 'content_da' : 'content_en'))

const { data: page } = await useAsyncData(`case:${route.path}`, () =>
  queryCollection(collection.value).path(route.path).first(),
)

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

useSeoMeta({
  title: `${page.value.title}: ${page.value.product}`,
  description: page.value.description,
  ogType: 'article',
})

defineOgImageComponent('CaseStudy', {
  title: page.value.title,
  product: page.value.product,
  kicker: page.value.kicker,
})
</script>

<template>
  <article v-if="page" class="case">
    <header class="case__hero frame">
      <p class="ash">{{ page.kicker }}</p>
      <h1 class="case__title">{{ page.title }}</h1>
      <p class="case__lede">{{ page.lede }}</p>
      <Fact>{{ page.facts }}</Fact>
    </header>

    <div class="frame spine-grid case__grid">
      <div class="spine-head case__spine">
        <span class="case__product">{{ page.product }}</span>
        <NuxtLink :to="`${localePath('/')}#products`">{{ t('case.back') }}</NuxtLink>
      </div>
      <ContentRenderer :value="page" class="prose spine-body case__prose" />
    </div>

    <footer class="case__end frame">
      <h2 class="case__end-title">{{ page.cta.heading }}</h2>
      <p class="lede">{{ page.cta.lede }}</p>
      <div class="cluster">
        <AppButton :to="page.cta.primary.href">{{ page.cta.primary.label }}</AppButton>
        <AppButton v-if="page.cta.secondary" :to="page.cta.secondary.href" variant="quiet">
          {{ page.cta.secondary.label }}
        </AppButton>
      </div>
      <p v-if="page.footnote" class="muted case__footnote">{{ page.footnote }}</p>
    </footer>
  </article>
</template>
