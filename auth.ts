import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "이메일", type: "email", placeholder: "user@example.com" },
        password: { label: "비밀번호", type: "password" }
      },
      async authorize(credentials) {
        // 프로덕션 실무에서는 DB 조회 후 암호 대조를 수행합니다 (여기서는 임시 마스터 계정)
        if (credentials?.username === "admin@test.com" && credentials?.password === "1234") {
          return { id: "1", name: "관리자강사님", email: "admin@test.com" };
        }
        return null;
      }
    })
  ],
  callbacks: {
    // proxy.ts 문지기가 로그인 여부를 판단하게 만들어주는 신분 증명 콜백
    authorized({ auth }) {
      return !!auth;
    },
  },
  pages: {
    signIn: "/login", // 커스텀 로그인 페이지 매핑
  }
});