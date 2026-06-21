"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// 게시글 삭제 액션
export async function deletePostAction(postId: number) {
  try {
    await prisma.post.delete({ where: { id: postId } });
  } catch (error) {
    console.error("삭제 실패:", error);
    throw new Error("삭제에 실패했습니다.");
  }
  revalidatePath("/");
  redirect("/");
}

// 게시글 수정 액션
export async function updatePostAction(postId: number, formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  try {
    await prisma.post.update({
      where: { id: postId },
      data: { title, content },
    });
  } catch (error) {
    console.error("수정 실패:", error);
    throw new Error("수정에 실패했습니다.");
  }
  revalidatePath("/");
  revalidatePath(`/post/${postId}`);
  redirect(`/post/${postId}`);
}