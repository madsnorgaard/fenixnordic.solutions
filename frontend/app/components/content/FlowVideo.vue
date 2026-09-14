<script setup lang="ts">
const props = defineProps<{
  /** Base name under /media/flows, without extension. */
  name: string
  alt: string
  /** Path to the interactive demo widget. Adds a button below the recording. */
  demo?: string
  demoLabel?: string
  width?: number | string
  height?: number | string
}>()

const base = computed(() => `/media/flows/${props.name}`)
const video = ref<HTMLVideoElement | null>(null)
const reduced = ref(false)

onMounted(() => {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  const apply = () => {
    reduced.value = mq.matches
    if (!video.value) return
    if (mq.matches) {
      video.value.pause()
      video.value.controls = true
    }
    else {
      video.value.controls = false
      video.value.play().catch(() => {})
    }
  }
  apply()
  mq.addEventListener('change', apply)
  onUnmounted(() => mq.removeEventListener('change', apply))
})
</script>

<template>
  <figure class="figure flow">
    <video
      ref="video"
      :poster="`${base}.webp`"
      :width="width"
      :height="height"
      :autoplay="!reduced"
      muted
      loop
      playsinline
      preload="metadata"
      :aria-label="alt"
    >
      <source :src="`${base}.webm`" type="video/webm">
      <source :src="`${base}.mp4`" type="video/mp4">
    </video>
    <figcaption v-if="$slots.default || demo">
      <slot mdc-unwrap="p" />
      <div v-if="demo" class="flow__actions">
        <AppButton :to="demo" variant="quiet">{{ demoLabel || $t('case.demo') }}</AppButton>
      </div>
    </figcaption>
  </figure>
</template>
