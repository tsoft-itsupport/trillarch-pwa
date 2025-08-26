import { openDB, IDBPDatabase } from 'idb'

const DB_NAME = 'offline-requests-db'
const STORE_NAME = 'requests'

let dbInstance: IDBPDatabase | null = null

async function getDB() {
  if (!dbInstance) {
    dbInstance = await openDB(DB_NAME, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, {
            keyPath: 'id',
            autoIncrement: true
          })
        }
      }
    })
  }
  return dbInstance
}

export async function queueRequest(request: any) {
  const db = await getDB()
  await db.add(STORE_NAME, request)
}

export async function getQueuedRequests() {
  const db = await getDB()
  return db.getAll(STORE_NAME)
}

export async function deleteRequest(id: any) {
  const db = await getDB()
  await db.delete(STORE_NAME, id)
}

// 👇 Add this to safely close the DB
export function closeOfflineDb() {
  if (dbInstance) {
    dbInstance.close()
    dbInstance = null
    console.log('Closed offline-requests-db')
  }
}
