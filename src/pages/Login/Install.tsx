import { useState, useEffect, ReactNode } from 'react'
import { Button } from 'react-bootstrap'

interface ICustomPwaWindow extends Window {
  pwaDeferredPrompt?: {
    readonly userChoice: Promise<{
      outcome: 'accepted' | 'dismissed'
      platform: string
    }>
    prompt: () => Promise<void>
  }
}

declare let window: ICustomPwaWindow

const InstallPWAButton = (): ReactNode => {
  const [isShowButton, setIsShowButton] = useState(false)

  useEffect(() => {
    // Check initially
    setIsShowButton(!!window.pwaDeferredPrompt)

    // Listen for custom event dispatched when prompt is available
    const onPromptAvailable = () => {
      setIsShowButton(true)
    }

    window.addEventListener('pwa:available', onPromptAvailable)

    // Cleanup
    return () => {
      window.removeEventListener('pwa:available', onPromptAvailable)
    }
  }, [])

  const handleClick = async (): Promise<void> => {
    if (window.pwaDeferredPrompt) {
      await window.pwaDeferredPrompt.prompt()
      const { outcome } = await window.pwaDeferredPrompt.userChoice
      if (outcome === 'accepted') {
        setIsShowButton(false)
      }
    }
  }

  if (!isShowButton) {
    return null
  }

  return (
    <Button variant="link" onClick={handleClick} title="Install">
      Install
    </Button>
  )
}

export default InstallPWAButton
