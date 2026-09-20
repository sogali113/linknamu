"use client";

import { useEffect, useState } from "react";
import LinkCard from "./LinkCard";
import type { LinkItem } from "@/data/links";

export default function LinkList({ links }: { links: LinkItem[] }) {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    fetch("/api/clicks")
      .then((r) => (r.ok ? r.json() : {}))
      .then(setCounts)
      .catch(() => {});
  }, []);

  const handleClick = (id: string) => {
    // 화면을 먼저 갱신하고 서버에 기록합니다. 새 탭으로 이동하므로 keepalive로 보냅니다.
    setCounts((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 }));
    fetch("/api/clicks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ linkId: id }),
      keepalive: true,
    }).catch(() => {});
  };

  return (
    <ul className="mt-10 flex w-full flex-col gap-5">
      {links.map((link) => (
        <li key={link.id}>
          <LinkCard
            link={link}
            count={counts[link.id]}
            onClick={handleClick}
          />
        </li>
      ))}
    </ul>
  );
}
