<script setup lang="ts">
const props = defineProps<{
  src: string
  src2x?: string
  width: number | string
  height: number | string
  alt: string
  /** Loads eagerly. Use for the first figure on a page. */
  eager?: boolean
}>()

const srcset = computed(() => props.src2x ? `${props.src} 1x, ${props.src2x} 2x` : undefined)
</script>

<template>
  <figure class="figure">
    <img
      :src="src"
      :srcset="srcset"
      :width="width"
      :height="height"
      :alt="alt"
      :loading="eager ? 'eager' : 'lazy'"
      decoding="async"
    >
    <figcaption v-if="$slots.default">
      <slot mdc-unwrap="p" />
    </figcaption>
  </figure>
</template>
