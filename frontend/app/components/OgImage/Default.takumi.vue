<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
  description?: string
}>(), { title: 'Fenix Nordic Solutions', description: '' })
</script>

<template>
  <div
    style="width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: space-between; padding: 64px; background: #151210; color: #f3eee3;"
  >
    <div style="display: flex; align-items: center; font-size: 28px; color: #9aa7b8;">
      Fenix Nordic
    </div>
    <div style="display: flex; flex-direction: column;">
      <div style="font-size: 92px; line-height: 0.95; font-weight: 500; letter-spacing: -2px; max-width: 1000px; color: #f3eee3;">
        {{ title }}
      </div>
      <div v-if="description" style="margin-top: 28px; font-size: 30px; line-height: 1.3; color: #a89f92; max-width: 900px;">
        {{ description }}
      </div>
    </div>
    <div style="display: flex; width: 120px; height: 6px; background: #f2763a;" />
  </div>
</template>
