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
    const client = new MongoClient(uri, { serverSelectionTimeoutMS: 8000 });
    global._mongoClientPromise = client.connect().catch((err) => {
      // 실패한 연결을 캐시에 남기지 않아 다음 요청에서 다시 시도합니다.
      global._mongoClientPromise = undefined;
      throw err;
    });
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

// 연결 오류를 비밀번호 등 민감한 정보 없이 사람이 읽을 수 있는 원인으로 분류합니다.
export function describeMongoError(err: unknown): { name: string; reason: string } {
  const e = err as { name?: string; code?: number; codeName?: string; message?: string };
  const name = e?.name ?? "UnknownError";
  const msg = e?.message ?? "";
  if (e?.code === 8000 || e?.codeName === "AtlasError" || /auth/i.test(msg)) {
    return { name, reason: "인증 실패: 사용자명 또는 비밀번호를 확인하세요" };
  }
  if (name === "MongoServerSelectionError" || /ENOTFOUND|ECONNREFUSED|querySrv|timed out/i.test(msg)) {
    return { name, reason: "클러스터 접속 실패: Atlas Network Access 또는 호스트명을 확인하세요" };
  }
  // 메시지에 자격 증명이 섞여 있어도 노출되지 않도록 가립니다.
  const safeMsg = msg.replace(/\/\/[^@\s]+@/g, "//***@").slice(0, 160);
  if (name === "MongoParseError") {
    return { name, reason: `연결 문자열 형식 오류 (${safeMsg})` };
  }
  return { name, reason: safeMsg };
}
