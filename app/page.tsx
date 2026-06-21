// src/app/page.tsx
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function HomePage() {
  // Prisma 7 최신 초고속 엔진으로 글 전체 목록 조회
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-2xl mx-auto mt-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-black text-slate-800 tracking-tight">📝 풀스택 블로그 피드</h1>
        <Link href="/post-create" className="bg-indigo-600 text-white text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-indigo-700 transition-all shadow-md">
          새 글 쓰기
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="text-center text-slate-400 py-12 text-sm">아직 작성된 게시글이 없습니다.</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <article key={post.id} className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <Link href={`/post/${post.id}`} className="block group">
                <h2 className="text-lg font-bold text-slate-800 group-hover:text-indigo-600 transition-colors mb-2">
                  {post.title}
                </h2>
              </Link>
              <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-4">{post.content}</p>
              <div className="text-[11px] font-medium text-slate-400 font-mono">
                {new Date(post.createdAt).toLocaleDateString()}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}