import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

declare global {
  // 개발 모드에서 HMR로 인해 커넥션이 중복 생성되는 것을 방지합니다.
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

export function getMongoClient(): Promise<MongoClient> | null {
  if (!uri) return null;
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = new MongoClient(uri).connect();
  }
  return global._mongoClientPromise;
}

export async function getClicksCollection() {
  const clientPromise = getMongoClient();
  if (!clientPromise) return null;
  const client = await clientPromise;
  const dbName = process.env.MONGODB_DB ?? "linknamu";
  return client
    .db(dbName)
    .collection<{ linkId: string; count: number }>("clicks");
}
