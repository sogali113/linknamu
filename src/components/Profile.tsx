import Image from "next/image";
import type { Profile as ProfileType } from "@/data/links";

export default function Profile({ profile }: { profile: ProfileType }) {
  return (
    <section className="flex flex-col items-center text-center">
      <Image
        src={profile.avatar}
        alt={`${profile.name} 프로필 사진`}
        width={144}
        height={144}
        unoptimized
        priority
        className="h-36 w-36 rounded-full bg-zinc-200 object-cover shadow-md ring-4 ring-white dark:bg-zinc-800 dark:ring-zinc-900"
      />
      <h1 className="mt-5 text-xl font-bold">{profile.name}</h1>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
        {profile.bio}
      </p>
    </section>
  );
}
