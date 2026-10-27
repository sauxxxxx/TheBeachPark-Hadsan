import assert from 'node:assert/strict'
import test from 'node:test'

async function createRuntime(t) {
  const scripts = []
  const previousWindow = Object.getOwnPropertyDescriptor(globalThis, 'window')
  const previousDocument = Object.getOwnPropertyDescriptor(globalThis, 'document')
  t.after(() => {
    if (previousWindow) Object.defineProperty(globalThis, 'window', previousWindow)
    else delete globalThis.window
    if (previousDocument) Object.defineProperty(globalThis, 'document', previousDocument)
    else delete globalThis.document
  })
  Object.defineProperty(globalThis, 'window', { value: { setTimeout, clearTimeout }, configurable: true })
  Object.defineProperty(globalThis, 'document', { value: {
    createElement: () => ({ dataset: {}, remove() {} }),
    head: { appendChild: (script) => scripts.push(script) },
  }, configurable: true })
  const runtime = await import(`../src/services/exelyRuntime.js?test=${Math.random()}`)
  return { runtime, scripts }
}

test('loads one provider script and queues distinct hero/footer/reputation widgets', async (t) => {
  const { runtime, scripts } = await createRuntime(t)
  const first = runtime.embedExelyWidget('search-form', 'hero-search')
  const second = runtime.embedExelyWidget('search-form', 'footer-search')
  const third = runtime.embedExelyWidget('reputation-widget', 'stay-reputation')
  assert.equal(scripts.length, 1)
  assert.equal(scripts[0].src, 'https://ph-ibe.hopenapi.com/integration/loader.js')
  assert.deepEqual(window.bookingengine.integration.__cq.map((entry) => entry[0]), ['setContext', 'embed', 'embed', 'embed'])
  assert.deepEqual(window.bookingengine.integration.__cq.slice(1).map((entry) => entry[2].container), ['hero-search', 'footer-search', 'stay-reputation'])
  window.bookingengine.integration.loaded = true
  scripts[0].onload()
  await Promise.all([first, second, third])
})

test('uses Exely’s live queue interface when a visitor changes Vue pages', async (t) => {
  const { runtime, scripts } = await createRuntime(t)
  const loading = runtime.initializeExely()
  window.bookingengine.integration.loaded = true
  scripts[0].onload()
  await loading
  const commands = []
  const providerQueue = { concat(entries) { commands.push(...entries); return this } }
  window.bookingengine.integration.__cq = providerQueue
  await runtime.embedExelyWidget('search-form', 'new-route-search')
  assert.deepEqual(commands, [['embed', 'search-form', { container: 'new-route-search' }]])
  assert.equal(scripts.length, 1)
})

test('tries the supplied fallback hosts when the first host fails', async (t) => {
  const { runtime, scripts } = await createRuntime(t)
  const loading = runtime.initializeExely()
  scripts[0].onerror()
  assert.equal(scripts[1].src, 'https://ibe.hopenapi.com/integration/loader.js')
  window.bookingengine.integration.loaded = true
  scripts[1].onload()
  await loading
})

test('reports a loader outage and allows a later attempt', async (t) => {
  const { runtime, scripts } = await createRuntime(t)
  const loading = runtime.initializeExely()
  const rejected = assert.rejects(loading, /could not be reached/)
  scripts[0].onerror()
  scripts[1].onerror()
  assert.equal(scripts[2].src, 'https://ibe.behopenapi.com/integration/loader.js')
  scripts[2].onerror()
  await rejected
  const retry = runtime.initializeExely()
  assert.equal(scripts.length, 4)
  window.bookingengine.integration.loaded = true
  scripts[3].onload()
  await retry
  assert.equal(window.bookingengine.integration.__cq.filter((entry) => entry[0] === 'setContext').length, 1)
})
