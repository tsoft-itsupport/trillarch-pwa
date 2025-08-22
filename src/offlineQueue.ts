import { openDB } from 'idb'

const DB_NAME = 'offline-requests-db'
const STORE_NAME = 'requests'

async function getDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true })
    }
  })
}

// Save a request to IndexedDB
export async function queueRequest(request: any) {
  const db = await getDB()
  await db.add(STORE_NAME, request)
}

// Get all queued requests
export async function getQueuedRequests() {
  const db = await getDB()
  return db.getAll(STORE_NAME)
}

// Delete request after successful replay
export async function deleteRequest(id: any) {
  const db = await getDB()
  await db.delete(STORE_NAME, id)
}
