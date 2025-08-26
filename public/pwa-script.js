window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault() // IMPORTANT: Prevent automatic prompt
  window.pwaDeferredPrompt = e
  window.dispatchEvent(new Event('pwa:available')) // Optional: for reactivity
})

window.addEventListener('appinstalled', () => {
  window.pwaDeferredPrompt = null
})
