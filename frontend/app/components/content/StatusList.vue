<script setup lang="ts">
defineProps<{
  /** Render as a log: monospace on a raised ground. For real traces only. */
  log?: boolean
}>()
</script>

<template>
  <ul :class="['status', { 'status--log': log }]">
    <slot />
  </ul>
</template>
