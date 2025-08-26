import { useEffect, useState, useRef } from 'react'
import { Button } from 'react-bootstrap'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>
}

const App = () => {
  const [isInstallable, setIsInstallable] = useState(false)
  const installPromptEvent = useRef<BeforeInstallPromptEvent | null>(null)

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      const promptEvent = e as BeforeInstallPromptEvent
      e.preventDefault()

      installPromptEvent.current = promptEvent
      setIsInstallable(true)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt
      )
    }
  }, [])

  const handleInstallClick = async () => {
    const promptEvent = installPromptEvent.current
    if (!promptEvent) return

    await promptEvent.prompt()

    const choiceResult = await promptEvent.userChoice
    console.log(`User response: ${choiceResult.outcome}`)

    if (choiceResult.outcome === 'accepted') {
      installPromptEvent.current = null
      setIsInstallable(false) // Hide button if accepted
    }
  }

  return (
    <div>
      {isInstallable && (
        <Button variant="link" onClick={handleInstallClick}>
          Install App
        </Button>
      )}
    </div>
  )
}

export default App
