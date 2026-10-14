"use client";

import { useEffect, useState } from "react";
import LinkCard from "./LinkCard";
import type { LinkItem } from "@/data/links";

type Counts = Record<string, number>;

// 모든 링크를 0회로 채운 초기값 (데이터를 받기 전까지 표시)
function zeroCounts(links: LinkItem[]): Counts {
  return Object.fromEntries(links.map((l) => [l.id, 0]));
}

export default function LinkList({ links }: { links: LinkItem[] }) {
  const [counts, setCounts] = useState<Counts>(() => zeroCounts(links));

  // 페이지가 열릴 때 모든 링크의 현재 클릭 수를 한 번에 가져옵니다.
  useEffect(() => {
    let cancelled = false;
    fetch("/api/clicks")
      .then((r) => (r.ok ? r.json() : null))
      .then((data: Counts | null) => {
        if (!cancelled && data) setCounts((c) => ({ ...c, ...data }));
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const handleClick = (id: string) => {
    // 화면을 먼저 +1 하고 서버에 기록합니다. 새 탭으로 이동하므로 keepalive로 보냅니다.
    setCounts((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 }));
    fetch("/api/clicks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ linkId: id }),
      keepalive: true,
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { linkId: string; count: number } | null) => {
        // 서버가 돌려준 실제 값으로 맞춥니다.
        if (data && typeof data.count === "number") {
          setCounts((c) => ({ ...c, [data.linkId]: data.count }));
        }
      })
      .catch(() => {});
  };

  return (
    <ul className="mt-8 flex w-full flex-col gap-3">
      {links.map((link, i) => (
        <li key={link.id}>
          <LinkCard
            link={link}
            count={counts[link.id] ?? 0}
            onClick={handleClick}
            delay={`${0.3 + i * 0.1}s`}
          />
        </li>
      ))}
    </ul>
  );
}
