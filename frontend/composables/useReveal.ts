export const useReveal = (threshold = 0.12) => {
  const isVisible = ref(false)

  const el = (element: HTMLElement | null) => {
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isVisible.value = true
          observer.disconnect()
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' },
    )

    observer.observe(element)
  }

  return { el, isVisible }
}
