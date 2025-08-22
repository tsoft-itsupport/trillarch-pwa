import { openDB } from 'idb'
import { TaskProps } from './store'

const DB_NAME = 'api-tasks-db'
const STORE_NAME = 'api-tasks-store'

const dbPromise = openDB(DB_NAME, 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      db.createObjectStore(STORE_NAME)
    }
  }
})

export async function saveTasksToIdb(data: TaskProps[]) {
  const db = await dbPromise
  return db.put(STORE_NAME, data, 'tasks')
}

export async function getTasksFromIdb(): Promise<TaskProps[]> {
  const db = await dbPromise
  return db.get(STORE_NAME, 'tasks')
}
