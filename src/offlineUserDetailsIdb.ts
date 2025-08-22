import { openDB } from 'idb'
import { AccountProps } from './store'

const DB_NAME = 'api-user-db'
const STORE_NAME = 'api-user-store'

const dbPromise = openDB(DB_NAME, 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      db.createObjectStore(STORE_NAME)
    }
  }
})

export async function saveUserDetailsToIdb(data: AccountProps) {
  const db = await dbPromise
  return db.put(STORE_NAME, data, 'user')
}

export async function getUserDetailsFromIdb(): Promise<AccountProps> {
  const db = await dbPromise
  return db.get(STORE_NAME, 'user')
}
