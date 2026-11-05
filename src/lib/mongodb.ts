import { MongoClient, type Db } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB ?? "studiospace";

/**
 * Returns the MongoDB database, or `null` when no `MONGODB_URI` is configured.
 * The connection promise is cached on `globalThis` so it survives HMR in dev.
 */
export async function getDb(): Promise<Db | null> {
  if (!uri) return null;

  const g = globalThis as typeof globalThis & {
    __mongoClientPromise?: Promise<MongoClient>;
  };

  if (!g.__mongoClientPromise) {
    const client = new MongoClient(uri);
    g.__mongoClientPromise = client.connect();
  }

  const client = await g.__mongoClientPromise;
  return client.db(dbName);
}

export const isMongoConfigured = Boolean(uri);
