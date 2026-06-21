// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { auth, signOut } from "@/auth";

export const metadata: Metadata = {
  title: "Next.js 16 & Prisma 7 풀스택 블로그",
  description: "Vercel 배포 최적화 버전",
};

export default async function RootLayout({
  children,
  modal, // 8단계 병렬 라우팅 모달 슬롯 Props수령
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  const session = await auth();

  async function handleSignOut() {
    "use server";
    await signOut({ redirectTo: "/" });
  }

  return (
    <html lang="ko">
      <body className="bg-slate-50 text-slate-900 antialiased">
        <header className="bg-white border-b border-slate-100 sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-4 h-16 flex justify-between items-center">
            <Link href="/" className="font-black text-lg text-indigo-600 tracking-tight">
              🚀 AUTH BLOG
            </Link>

            <div className="flex items-center space-x-4 text-sm font-medium">
              {session ? (
                <>
                  <span className="text-slate-600">
                    🙋‍♂️ <strong className="text-slate-800 font-bold">{session.user?.name}</strong>님
                  </span>
                  <form action={handleSignOut}>
                    <button type="submit" className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-2 rounded-xl hover:bg-slate-200 transition-colors">
                      로그아웃
                    </button>
                  </form>
                </>
              ) : (
                <Link href="/login" className="text-xs font-bold text-white bg-indigo-600 px-3 py-2 rounded-xl hover:bg-indigo-700 transition-colors">
                  로그인하기
                </Link>
              )}
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-8">{children}</main>
        {modal} {/* 인터셉팅 모달이 피드 위에 얹어질 전역 슬롯 */}
      </body>
    </html>
  );
}