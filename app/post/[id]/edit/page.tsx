import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { updatePostAction } from "../action";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PostEditPage({ params }: Readonly<Props>) {
  const resolvedParams = await params;
  const postId = parseInt(resolvedParams.id, 10);

  const post = await prisma.post.findUnique({
    where: { id: postId },
  });

  if (!post) notFound();

  const updateActionWithId = updatePostAction.bind(null, postId);

  return (
    <div className="max-w-md mx-auto mt-8 p-8 bg-white rounded-3xl shadow-xl border border-slate-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-black text-slate-800">게시글 수정하기</h1>
        <Link href={`/post/${post.id}`} className="text-xs text-slate-400 hover:underline">취소</Link>
      </div>
      
      <form action={updateActionWithId} className="space-y-4">
        <input type="text" name="title" defaultValue={post.title} className="w-full p-3 rounded-xl border text-sm" required />
        <textarea name="content" defaultValue={post.content} rows={6} className="w-full p-3 rounded-xl border text-sm" required />
        <button type="submit" className="w-full bg-slate-800 text-white py-3 rounded-xl font-bold hover:bg-slate-900 transition-colors">
          수정 완료하기
        </button>
      </form>
    </div>
  );
}