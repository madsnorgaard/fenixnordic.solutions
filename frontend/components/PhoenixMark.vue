<template>
  <svg
    :width="size"
    :height="Math.round(size * 1.4)"
    viewBox="0 0 20 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <!-- Outer flame -->
    <path
      d="M10 2 C14 7 17 13 15 19 C14 22 12 24.5 10 26 C8 24.5 6 22 5 19 C3 13 6 7 10 2 Z"
      stroke="currentColor"
      stroke-width="1.2"
      stroke-linejoin="round"
    />
    <!-- Inner ember -->
    <path
      d="M10 12 C11.5 14 12 17 11 19.5 C10.5 20.5 10 21 10 21 C10 21 9.5 20.5 9 19.5 C8 17 8.5 14 10 12 Z"
      fill="currentColor"
      opacity="0.85"
    />
  </svg>
</template>

<script setup lang="ts">
defineProps<{ size?: number }>()
withDefaults(defineProps<{ size?: number }>(), { size: 20 })
</script>
