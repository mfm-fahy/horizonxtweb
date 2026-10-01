import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI || "mongodb+srv://mfmfahy_db_user:4eJq47BrBQK3LC4g@cluster0.67jhwnu.mongodb.net/horizonxt?retryWrites=true&w=majority";

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db('horizonxt');

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}
