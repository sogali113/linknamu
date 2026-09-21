export type Profile = {
  name: string;
  bio: string;
  avatar: string;
  location: string;
  role: string;
};

export type LinkItem = {
  id: string;
  title: string;
  url: string;
};

export const profile: Profile = {
  name: "방회석",
  bio: "플스택 개발자 | 요즘에는 ai 개발에 관심이 많아요",
  avatar: "/avatar.jpg",
  location: "서울",
  role: "플스택 개발자",
};

export const links: LinkItem[] = [
  { id: "github", title: "GitHub", url: "https://github.com" },
  { id: "blog", title: "블로그", url: "https://velog.io" },
  { id: "instagram", title: "Instagram", url: "https://instagram.com" },
];
