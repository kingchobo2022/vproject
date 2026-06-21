// src/app/@modal/(.)post/[id]/page.tsx
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ModalCloseButton } from "./ModalCloseButton";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PostModalPage({ params }: Readonly<Props>) {
  const resolvedParams = await params;
  const postId = parseInt(resolvedParams.id, 10);

  const post = await prisma.post.findUnique({
    where: { id: postId },
  });

  if (!post) notFound();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-8 relative animate-in fade-in zoom-in-95 duration-200">
        <div className="absolute top-4 right-4">
          <ModalCloseButton />
        </div>
        <article className="mt-2">
          <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">⚡ INTERCEPTED MODAL</span>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-4 mb-2">{post.title}</h1>
          <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap mt-4">{post.content}</p>
        </article>
      </div>
    </div>
  );
}