<script setup lang="ts">
const props = withDefaults(defineProps<{
  to?: string
  variant?: 'primary' | 'quiet'
  type?: 'button' | 'submit'
  disabled?: boolean
}>(), { to: undefined, variant: 'primary', type: 'button', disabled: false })

const isExternal = computed(() => !!props.to && /^https?:\/\//.test(props.to))
const isFile = computed(() => !!props.to && /\.html$/.test(props.to))
const classes = computed(() => ['button', `button--${props.variant}`])
</script>

<template>
  <a
    v-if="to && (isExternal || isFile)"
    :href="to"
    :class="classes"
    :target="isExternal || isFile ? '_blank' : undefined"
    rel="noopener"
  >
    <slot />
  </a>
  <NuxtLink v-else-if="to" :to="to" :class="classes">
    <slot />
  </NuxtLink>
  <button v-else :type="type" :class="classes" :disabled="disabled">
    <slot />
  </button>
</template>
