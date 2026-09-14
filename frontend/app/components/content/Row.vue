<script setup lang="ts">
defineProps<{
  term: string
  title?: string
}>()
</script>

<template>
  <dt class="rows__term">{{ term }}</dt>
  <dd class="rows__body">
    <p v-if="title" class="rows__title">{{ title }}</p>
    <slot />
  </dd>
</template>
