"use client";

import type { LinkItem } from "@/data/links";

type Props = {
  link: LinkItem;
  count?: number;
  onClick?: (id: string) => void;
};

export default function LinkCard({ link, count, onClick }: Props) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => onClick?.(link.id)}
      className="flex w-full items-center justify-between rounded-2xl border border-zinc-200 bg-white px-5 py-4 text-base font-medium shadow-sm transition hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
    >
      <span>{link.title}</span>
      {typeof count === "number" && (
        <span className="text-xs tabular-nums text-zinc-500 dark:text-zinc-400">
          {count.toLocaleString("ko-KR")} 클릭
        </span>
      )}
    </a>
  );
}
