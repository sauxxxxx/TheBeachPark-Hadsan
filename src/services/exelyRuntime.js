import { exelyIntegration } from '../data/exelyIntegration.js'

let loaderPromise
let contextQueued = false

function integrationQueue() {
  const provider = window.bookingengine = window.bookingengine || {}
  const integration = provider.integration = provider.integration || {}
  integration.__cq = integration.__cq || []
  return integration.__cq
}

function enqueue(command) {
  // Exely replaces the initial array with its own queue interface after load.
  // concat([command]) is supported by both, as in the supplied head script.
  window.bookingengine.integration.__cq = integrationQueue().concat([command])
}

// The supplied Exely command queue accepts embeds before and after the loader
// is ready. A unique container lets hero/footer widgets coexist on Vue routes.
export function initializeExely() {
  integrationQueue()
  if (!contextQueued) {
    enqueue(['setContext', exelyIntegration.context, exelyIntegration.language])
    contextQueued = true
  }
  if (window.bookingengine.integration.loaded) return Promise.resolve()
  if (loaderPromise) return loaderPromise

  loaderPromise = new Promise((resolve, reject) => {
    function loadHost(index) {
      const host = exelyIntegration.loaderHosts[index]
      if (!host) {
        reject(new Error('The booking service could not be reached.'))
        return
      }
      const script = document.createElement('script')
      script.async = true
      script.src = `https://${host}/integration/loader.js`
      script.dataset.exelyLoader = 'true'
      const timeout = window.setTimeout(failed, 10000)
      function failed() {
        window.clearTimeout(timeout)
        script.onload = script.onerror = null
        script.remove()
        if (window.bookingengine.integration.loaded) resolve()
        else loadHost(index + 1)
      }
      script.onerror = failed
      script.onload = () => {
        window.clearTimeout(timeout)
        if (window.bookingengine.integration.loaded) resolve()
        else failed()
      }
      document.head.appendChild(script)
    }
    loadHost(0)
  }).catch((error) => {
    loaderPromise = undefined
    throw error
  })
  return loaderPromise
}

export function embedExelyWidget(type, containerId) {
  const loaded = initializeExely()
  enqueue(['embed', type, { container: containerId }])
  return loaded
}
