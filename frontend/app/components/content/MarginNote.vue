<script setup lang="ts">
withDefaults(defineProps<{
  term: string
  /** `ember` for a qualification that matters, `ash` for a quiet running note. */
  tone?: 'ember' | 'ash'
}>(), { tone: 'ember' })
</script>

<template>
  <aside :class="['margin-note', { 'margin-note--cool': tone === 'ash' }]">
    <span class="margin-note__term">{{ term }}</span>
    <slot mdc-unwrap="p" />
  </aside>
</template>
