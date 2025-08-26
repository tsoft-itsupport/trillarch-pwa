import { openDB, IDBPDatabase } from 'idb'
import { AccountProps } from './store'

const DB_NAME = 'api-user-db'
const STORE_NAME = 'api-user-store'

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

export async function saveUserDetailsToIdb(data: AccountProps) {
  const db = await getDb()
  return db.put(STORE_NAME, data, 'user')
}

export async function getUserDetailsFromIdb(): Promise<AccountProps> {
  const db = await getDb()
  return db.get(STORE_NAME, 'user')
}

export function closeUserDb() {
  if (dbInstance) {
    dbInstance.close()
    dbInstance = null
    console.log('Closed api-user-db')
  }
}
