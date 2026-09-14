import type en from '~~/i18n/locales/en'

type Messages = typeof en

/**
 * Typed access to one branch of the locale dictionary as plain data.
 * `tm()` returns the raw message tree; every leaf is resolved with `rt()`,
 * so components can iterate arrays of objects instead of calling `t()` per key.
 */
export function useCopy<K extends keyof Messages>(key: K) {
  const { tm, rt, locale } = useI18n()

  function resolve(node: unknown): unknown {
    if (Array.isArray(node)) return node.map(resolve)
    if (typeof node === 'function' || typeof node === 'string') return rt(node as never)
    if (node && typeof node === 'object') {
      const ast = node as { t?: unknown, type?: unknown }
      if ((ast.t === 0 || ast.type === 0) && ('b' in node || 'body' in node)) return rt(node as never)
      return Object.fromEntries(Object.entries(node).map(([k, v]) => [k, resolve(v)]))
    }
    return node
  }

  return computed(() => {
    void locale.value
    return resolve(tm(key)) as Messages[K]
  })
}
