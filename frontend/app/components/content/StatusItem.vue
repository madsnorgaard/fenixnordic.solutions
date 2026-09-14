<script setup lang="ts">
defineProps<{
  state: 'done' | 'failed' | 'partial' | 'missing'
  label: string
}>()
</script>

<template>
  <li class="status__item" :data-state="state">
    <span class="status__state">{{ label }}</span>
    <div class="status__body">
      <slot mdc-unwrap="p" />
    </div>
  </li>
</template>
