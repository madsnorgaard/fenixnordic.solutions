<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{ error: NuxtError }>()
const { t } = useI18n()
const localePath = useLocalePath()

useSeoMeta({ title: t('error.title'), robots: 'noindex' })
</script>

<template>
  <NuxtLayout>
    <section class="frame error-page" aria-labelledby="error-title">
      <p class="ash">{{ error.statusCode }}</p>
      <h1 id="error-title">{{ t('error.title') }}</h1>
      <p class="muted">{{ t('error.body') }}</p>
      <AppButton :to="localePath('/')" variant="quiet">{{ t('error.home') }}</AppButton>
    </section>
  </NuxtLayout>
</template>
