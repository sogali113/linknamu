import Profile from "@/components/Profile";
import LinkList from "@/components/LinkList";
import ThemeToggle from "@/components/ThemeToggle";
import { links, profile } from "@/data/links";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col px-4 py-8 sm:py-12">
      <header className="flex justify-end">
        <ThemeToggle />
      </header>
      <div className="mt-4 flex flex-1 flex-col items-center">
        <Profile profile={profile} />
        <LinkList links={links} />
      </div>
      <footer className="mt-12 text-center text-xs text-zinc-400 dark:text-zinc-600">
        🌳 링크나무
      </footer>
    </main>
  );
}
