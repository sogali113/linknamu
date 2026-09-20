import { NextResponse } from "next/server";
import { getClicksCollection } from "@/lib/mongodb";
import { links } from "@/data/links";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET: 링크별 클릭 수 조회
export async function GET() {
  const col = await getClicksCollection();
  if (!col) return NextResponse.json({});
  const docs = await col.find({}).toArray();
  const counts = Object.fromEntries(docs.map((d) => [d.linkId, d.count]));
  return NextResponse.json(counts);
}

// POST: 링크 클릭 수 1 증가
export async function POST(req: Request) {
  let linkId: unknown;
  try {
    ({ linkId } = await req.json());
  } catch {
    return NextResponse.json({ error: "잘못된 요청" }, { status: 400 });
  }
  if (typeof linkId !== "string" || !links.some((l) => l.id === linkId)) {
    return NextResponse.json({ error: "존재하지 않는 링크" }, { status: 400 });
  }

  const col = await getClicksCollection();
  if (!col) {
    return NextResponse.json({ error: "MONGODB_URI 미설정" }, { status: 503 });
  }
  const result = await col.findOneAndUpdate(
    { linkId },
    { $inc: { count: 1 } },
    { upsert: true, returnDocument: "after" },
  );
  return NextResponse.json({ linkId, count: result?.count ?? 1 });
}
