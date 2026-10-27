import { nextTick, onBeforeUnmount, onMounted, ref, useId } from 'vue'
import { embedExelyWidget } from '../services/exelyRuntime'

export function useExelyWidget(type) {
  const container = ref(null)
  const containerId = ref(`be-${type}-${useId()}`)
  const baseContainerId = containerId.value
  const loading = ref(true)
  const unavailable = ref(false)
  let observer
  let timer
  let active = true
  let retryCount = 0

  function inspect() {
    if (!active || !container.value?.querySelector('iframe, form, input, button, a')) return
    loading.value = false
    unavailable.value = false
    window.clearTimeout(timer)
  }

  function mountWidget() {
    loading.value = true
    unavailable.value = false
    observer?.disconnect()
    observer = new MutationObserver(inspect)
    observer.observe(container.value, { childList: true, subtree: true })
    timer = window.setTimeout(() => {
      if (!active || !loading.value) return
      loading.value = false
      unavailable.value = true
    }, 30000)
    embedExelyWidget(type, containerId.value).catch(() => {
      if (!active) return
      window.clearTimeout(timer)
      loading.value = false
      unavailable.value = true
    })
    inspect()
  }

  async function retry() {
    if (loading.value || !active) return
    loading.value = true
    unavailable.value = false
    window.clearTimeout(timer)
    observer?.disconnect()
    container.value.replaceChildren()
    containerId.value = `${baseContainerId}-retry-${++retryCount}`
    await nextTick()
    if (active) mountWidget()
  }

  onMounted(mountWidget)
  onBeforeUnmount(() => {
    active = false
    observer?.disconnect()
    window.clearTimeout(timer)
  })

  return { container, containerId, loading, unavailable, retry }
}
