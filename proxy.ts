export { auth as proxy } from "@/auth";

// 비회원 접근을 전면 차단할 통제 구역 주소 지정
export const config = {
  matcher: [
    "/post-create",       // 글쓰기 화면 방어
    "/post/:id/edit",     // [Prisma7 동적 라우트] 수정 화면 방어
  ],
};