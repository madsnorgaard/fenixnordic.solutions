<script setup lang="ts">
const props = defineProps<{
  href: string
  target?: string
}>()

const external = computed(() => /^https?:\/\//.test(props.href))
</script>

<template>
  <a
    v-if="external"
    :href="href"
    :target="target || '_blank'"
    rel="noopener"
  >
    <slot />
  </a>
  <NuxtLink v-else :to="href">
    <slot />
  </NuxtLink>
</template>
