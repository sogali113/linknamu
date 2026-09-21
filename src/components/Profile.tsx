import Image from "next/image";
import type { Profile as ProfileType } from "@/data/links";

export default function Profile({ profile }: { profile: ProfileType }) {
  return (
    <section className="flex flex-col items-center text-center">
      <div className="avatar-ring fade-up" style={{ animationDelay: "0s" }}>
        <Image
          src={profile.avatar}
          alt={`${profile.name} 프로필 사진`}
          width={144}
          height={144}
          unoptimized
          priority
          className="h-36 w-36 rounded-full bg-zinc-200 object-cover dark:bg-zinc-800"
        />
      </div>
      <h1
        className="fade-up mt-5 text-[28px] font-bold leading-tight"
        style={{ animationDelay: "0.1s" }}
      >
        {profile.name}
      </h1>
      <p
        className="fade-up mt-2 text-sm tracking-wide text-zinc-600 dark:text-zinc-400"
        style={{ animationDelay: "0.2s" }}
      >
        {profile.bio}
      </p>
      <div
        className="fade-up mt-3 flex flex-wrap justify-center gap-2"
        style={{ animationDelay: "0.2s" }}
      >
        <span className="pill">
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            className="h-3.5 w-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 21s-6-5.33-6-10a6 6 0 1 1 12 0c0 4.67-6 10-6 10z" />
            <circle cx="12" cy="11" r="2.5" />
          </svg>
          {profile.location}
        </span>
        <span className="pill">
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            className="h-3.5 w-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="7" width="20" height="14" rx="2" />
            <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
          </svg>
          {profile.role}
        </span>
      </div>
    </section>
  );
}
