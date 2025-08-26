import { openDB, IDBPDatabase } from 'idb'
import { TaskProps } from './store'

const DB_NAME = 'api-tasks-db'
const STORE_NAME = 'api-tasks-store'

let dbInstance: IDBPDatabase | null = null

async function getDb() {
  if (!dbInstance) {
    dbInstance = await openDB(DB_NAME, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME)
        }
      }
    })
  }
  return dbInstance
}

export async function saveTasksToIdb(data: TaskProps[]) {
  const db = await getDb()
  return db.put(STORE_NAME, data, 'tasks')
}

export async function getTasksFromIdb(): Promise<TaskProps[]> {
  const db = await getDb()
  return db.get(STORE_NAME, 'tasks')
}

export async function closeTasksDb() {
  if (dbInstance) {
    dbInstance.close()
    dbInstance = null
    console.log('Closed api-tasks-db connection')
  }
}
