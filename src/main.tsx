import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'
import App from './App.tsx'

import './index.css'
import './customBootstrap.scss'

createRoot(document.getElementById('root')!).render(<App />)

registerSW({ immediate: true })
