// src/app/post-create/page.tsx
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default function PostCreatePage() {
  async function createPostAction(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    await prisma.post.create({
      data: { title, content },
    });

    revalidatePath("/");
    redirect("/");
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-8 bg-white rounded-3xl shadow-xl border border-slate-100">
      <h1 className="text-xl font-black mb-6">새로운 글 작성하기</h1>
      <form action={createPostAction} className="space-y-4">
        <input type="text" name="title" placeholder="제목을 입력하세요" className="w-full p-3 border rounded-xl text-sm" required />
        <textarea name="content" placeholder="내용을 입력하세요" rows={5} className="w-full p-3 border rounded-xl text-sm" required />
        <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors">
          데이터베이스에 저장하기
        </button>
      </form>
    </div>
  );
}