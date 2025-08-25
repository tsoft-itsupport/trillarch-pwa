import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'

const InstallPWAButton: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [isInstallable, setIsInstallable] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  const isAlreadyInstalled = () =>
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as any).standalone === true

  useEffect(() => {
    const alreadyInstalled = isAlreadyInstalled()
    setIsInstalled(alreadyInstalled)
    console.log('App already installed?', alreadyInstalled)

    const handleBeforeInstallPrompt = (e: any) => {
      console.log('beforeinstallprompt event fired')
      e.preventDefault()
      setDeferredPrompt(e)
      setIsInstallable(true)
    }

    if (!alreadyInstalled) {
      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }

    const handleAppInstalled = () => {
      console.log('PWA was installed')
      setIsInstallable(false)
      setDeferredPrompt(null)
      setIsInstalled(true)
    }

    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      console.log('No deferred install prompt available')
      return
    }

    deferredPrompt.prompt()

    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt')
    } else {
      console.log('User dismissed the install prompt')
    }

    setDeferredPrompt(null)
    setIsInstallable(false)
  }

  return (
    !isInstalled &&
    isInstallable && (
      <Button variant="link" onClick={handleInstallClick}>
        Install App
      </Button>
    )
  )
}

export default InstallPWAButton
