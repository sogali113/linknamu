# 링크나무 🌳

내 모든 링크를 한 페이지에 모아두고, 하나의 URL로 공유하는 Link in Bio 서비스입니다.

## 기술 스택

- Next.js 14 (App Router) · TypeScript
- Tailwind CSS
- MongoDB Atlas (클릭 수 저장)
- Vercel (배포)

## 시작하기

```bash
npm install
cp .env.local.example .env.local   # MONGODB_URI 입력
npm run dev
```

http://localhost:3000 에서 확인합니다. `MONGODB_URI`가 없어도 페이지는 동작하며, 클릭 수 집계만 비활성화됩니다.

## 구조

- `src/data/links.ts` : 프로필과 링크 목록 (여기만 수정하면 됩니다)
- `src/components/` : Profile, LinkCard, LinkList, ThemeToggle
- `src/app/api/clicks/route.ts` : 클릭 수 조회(GET) / 증가(POST) API
- `src/lib/mongodb.ts` : MongoDB 클라이언트
