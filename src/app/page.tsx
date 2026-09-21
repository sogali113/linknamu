import Profile from "@/components/Profile";
import LinkList from "@/components/LinkList";
import ThemeToggle from "@/components/ThemeToggle";
import { links, profile } from "@/data/links";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col px-4 py-8 sm:py-12">
      {/* 배경 블러 원형 장식 */}
      <div aria-hidden className="bg-orb bg-orb-1" />
      <div aria-hidden className="bg-orb bg-orb-2" />

      <div className="glass-card flex flex-1 flex-col px-5 py-6 sm:px-8 sm:py-8">
        <header className="flex justify-end">
          <ThemeToggle />
        </header>
        <div className="mt-2 flex flex-1 flex-col items-center">
          <Profile profile={profile} />
          <LinkList links={links} />
        </div>
        <footer className="mt-10 text-center text-xs text-zinc-500 dark:text-zinc-500">
          © 2026 {profile.name}
        </footer>
      </div>
    </main>
  );
}
