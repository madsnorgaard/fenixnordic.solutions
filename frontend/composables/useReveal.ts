export const useReveal = (threshold = 0.12) => {
  const el = ref<HTMLElement | null>(null)
  const isVisible = ref(false)

  onMounted(() => {
    if (!el.value) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isVisible.value = true
          observer.disconnect()
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' },
    )

    observer.observe(el.value)
    onUnmounted(() => observer.disconnect())
  })

  return { el, isVisible }
}
