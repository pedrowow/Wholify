import { openDB, type IDBPDatabase } from 'idb';

export interface DBSchema {
  settings: {
    key: string;
    value: any;
  };
  notifications: {
    key: string;
    value: {
      id: string;
      moduleId: string;
      time: string;
      enabled: boolean;
    };
  };
  logs: {
    key: string;
    value: {
      id: string;
      date: string;
      moduleId: string;
      status: 'completed' | 'snoozed' | 'missed';
      note?: string;
    };
  };
}

const DB_NAME = 'wholify_db';
const DB_VERSION = 1;

let dbPromise: Promise<IDBPDatabase<DBSchema>>;

export const getDB = () => {
  if (!dbPromise) {
    dbPromise = openDB<DBSchema>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        db.createObjectStore('settings');
        db.createObjectStore('notifications', { keyPath: 'id' });
        db.createObjectStore('logs', { keyPath: 'id' });
      },
    });
  }
  return dbPromise;
};

export const settingsService = {
  async get(key: string) {
    const db = await getDB();
    return db.get('settings', key);
  },
  async set(key: string, value: any) {
    const db = await getDB();
    return db.put('settings', value, key);
  }
};
