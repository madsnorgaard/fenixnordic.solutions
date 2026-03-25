export const useMagnetic = (strength = 0.38) => {
  const el = ref<HTMLElement | null>(null)

  onMounted(() => {
    const btn = el.value
    if (!btn) return

    // Ensure button has a transition for the return snap
    btn.style.transition = 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)'

    const onMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) * strength
      const dy = (e.clientY - cy) * strength
      btn.style.transform = `translate(${dx}px, ${dy}px)`
      btn.style.transition = 'transform 0.1s ease'
    }

    const onLeave = () => {
      btn.style.transform = 'translate(0, 0)'
      btn.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
    }

    btn.addEventListener('mousemove', onMove)
    btn.addEventListener('mouseleave', onLeave)

    onUnmounted(() => {
      btn.removeEventListener('mousemove', onMove)
      btn.removeEventListener('mouseleave', onLeave)
    })
  })

  return { el }
}
