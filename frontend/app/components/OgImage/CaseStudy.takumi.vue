<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
  product?: string
  kicker?: string
}>(), { title: '', product: '', kicker: '' })
</script>

<template>
  <div
    style="width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: space-between; padding: 64px; background: #151210; color: #f3eee3;"
  >
    <div style="display: flex; justify-content: space-between; font-size: 28px; color: #9aa7b8;">
      <span>{{ product }}</span>
      <span>Fenix Nordic</span>
    </div>
    <div style="display: flex; flex-direction: column;">
      <div style="font-size: 28px; color: #9aa7b8; margin-bottom: 24px;">
        {{ kicker }}
      </div>
      <div style="font-size: 84px; line-height: 0.98; font-weight: 500; letter-spacing: -2px; max-width: 1000px;">
        {{ title }}
      </div>
    </div>
    <div style="display: flex; width: 120px; height: 6px; background: #f2763a;" />
  </div>
</template>
