"use client";

import { useRouter } from "next/navigation";

export function ModalCloseButton() {
  const router = useRouter();
  return (
    <button 
      onClick={() => router.back()} // 브라우저 히스토리를 뒤로 돌려 자연스러운 스크롤 위치 및 모달 오프셋 회복
      className="text-slate-400 hover:text-slate-600 bg-slate-50 hover:bg-slate-100 p-2 rounded-full transition-colors text-sm"
    >
      ✕
    </button>
  );
}