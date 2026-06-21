import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { deletePostAction } from "./action";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PostDetailPage({ params }: Readonly<Props>) {
  // Next.js 16 최신 비동기 파라미터 안전 수령 기법 적용
  const resolvedParams = await params;
  const postId = parseInt(resolvedParams.id, 10);

  const post = await prisma.post.findUnique({
    where: { id: postId },
  });

  if (!post) notFound();

  const deleteActionWithId = deletePostAction.bind(null, postId);

  return (
    <div className="max-w-xl mx-auto mt-12 p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <Link href="/" className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg hover:bg-slate-200">
          ← 목록으로
        </Link>
        <div className="flex items-center space-x-2">
          <Link href={`/post/${post.id}/edit`} className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg hover:bg-indigo-100">
            ✏️ 이 글 수정하기
          </Link>
          <form action={deleteActionWithId}>
            <button type="submit" className="text-xs font-bold text-rose-600 bg-rose-50 px-3 py-1.5 rounded-lg hover:bg-rose-100">
              🗑️ 이 글 삭제하기
            </button>
          </form>
        </div>
      </div>
      
      <article>
        <h1 className="text-3xl font-black text-slate-900 mb-4">{post.title}</h1>
        <p className="text-slate-700 text-base leading-relaxed whitespace-pre-wrap">{post.content}</p>
      </article>
    </div>
  );
}