import { deleteDB } from 'idb'
import { MessageStoreProps } from '../store'
import { closeTasksDb } from '../offlineTasksIdb'
import { closeUserDb } from '../offlineUserDetailsIdb'
import { closeOfflineDb } from '../offlineQueue'

export const handleError = (
  err: any,
  showMessage: (props: MessageStoreProps) => void
) => {
  if (err.response?.status === 400) {
    return showMessage({
      message: err.response?.data?.error ?? 'Server Error',
      title: 'Error',
      type: 'error'
    })
  }

  return showMessage({
    message: 'Something went wrong',
    title: 'Error',
    type: 'error'
  })
}

const DB_NAMES = ['offline-requests-db', 'api-tasks-db', 'api-user-db']

// Utility timeout function: rejects after ms milliseconds
const timeout = (ms: number) =>
  new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error('Timeout')), ms)
  )

// Deletes a single IndexedDB with a timeout to avoid hanging
const deleteDbWithTimeout = async (name: string) => {
  try {
    console.log(`Starting deleteDB for ${name}`)
    await Promise.race([deleteDB(name), timeout(5000)]) // 5s timeout
    console.log(`Deleted IndexedDB: ${name}`)
    return { name, success: true }
  } catch (error) {
    console.error(`Failed to delete IndexedDB ${name}:`, error)
    return { name, success: false, error }
  }
}

export const resetCache = async () => {
  try {
    console.log('Reset cache started')

    // Delete all caches
    const cacheNames = await caches.keys()
    console.log('Caches found:', cacheNames)
    await Promise.all(cacheNames.map((name) => caches.delete(name)))
    console.log('Caches cleared')

    // Delete IndexedDBs sequentially with timeout & logging
    const results = []
    for (const name of DB_NAMES) {
      if (name === 'api-tasks-db') closeTasksDb()
      if (name === 'api-user-db') closeUserDb()
      if (name === 'offline-requests-db') closeOfflineDb()

      // Await each deletion before next
      results.push(await deleteDbWithTimeout(name))
    }
    console.log('IndexedDB deletion results:', results)

    // Unregister Service Workers
    if ('serviceWorker' in navigator) {
      console.log('Unregistering service workers...')
      const registrations = await navigator.serviceWorker.getRegistrations()
      await Promise.all(registrations.map((reg) => reg.unregister()))
      console.log('Service workers unregistered')
    } else {
      console.log('Service workers not supported')
    }

    console.log('Reloading page...')
    window.location.reload()
  } catch (err) {
    console.error('Error during resetCache:', err)
  }
}
