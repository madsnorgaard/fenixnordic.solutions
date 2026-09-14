<script setup lang="ts">
defineProps<{
  id: string
  /** The running head. Short, sentence case. It is the section heading. */
  heading: string
  /** The one statement the section makes, set large. */
  lede?: string
}>()
</script>

<template>
  <section :id="id" class="section spine-grid frame" :aria-labelledby="`${id}-head`">
    <h2 :id="`${id}-head`" class="spine-head">{{ heading }}</h2>
    <div class="spine-body">
      <p v-if="lede" class="section__lede">{{ lede }}</p>
      <slot />
    </div>
  </section>
</template>
