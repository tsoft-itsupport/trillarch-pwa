import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'
import App from './App.tsx'

import './index.css'
import './customBootstrap.scss'

const updateSW: any = registerSW({
  onNeedRefresh() {
    console.log('New version available — applying update')
    if (typeof updateSW === 'function') {
      updateSW(true)
    }
  },
  onOfflineReady() {
    console.log('App is ready for offline use')
  },
  onRegistered(swReg) {
    console.log('Service Worker registered:', swReg)
  },
  onRegisterError(err) {
    console.error('Service Worker registration error:', err)
  }
})

createRoot(document.getElementById('root')!).render(<App />)
