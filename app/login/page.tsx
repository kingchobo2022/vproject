import { signIn } from "@/auth"; // Auth.js 에서 제공하는 로그인 실행함수
import { AuthError } from "next-auth"; // 인증에러의 타입 정의
import Link from "next/link"; 
import { redirect } from "next/navigation"; // 페이지 이동 함수

export default async function LoginPage({
    searchParams,
}: {
    searchParams: Promise<{ callbackUrl?: string; error?: string }>;
}){
    const resolvedSearchParams = await searchParams;
    const callbackUrl = resolvedSearchParams.callbackUrl || "/"; 
    const error = resolvedSearchParams.error; 
    
    async function handleCredentialsLogin(formData: FormData) {
        "use server";

        try {
            await signIn("credentials", {
                username: formData.get("username"),
                password: formData.get("password"),
                redirectTo: callbackUrl,
            });
        } catch (error) {
            if (error instanceof AuthError) {
                console.error("로그인 실패 사유 : ", error.type);
                redirect(`/login?error=CredentialsSignin&callbackUrl=${encodeURIComponent(callbackUrl)}`);
            }

            throw error;
        }
    }

    return (
        <div className="min-h-[70vh] flex flex-col justify-center items-center">
            <div className="w-full max-w-sm p-8 bg-white rounded-3xl border border-slate-100 shadow-xl/5">
                <div className="text-center mb-8">
                    <Link href="/" className="font-black text-2xl text-indigo-600 tracking-tight">
                        🚀 AUTH BLOG
                    </Link>
                    <p className="text-xs text-slate-400 mt-2 font-medium">관리자 계정으로 로그인하여 블로그를 관리하세요.</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-2xl text-xs 
                         font-semibold text-center flex items-center justify-center gap-2">
                        <span>⚠️</span>
                        <span>
                            {error === "CredentialsSignin" 
                                ? "이메일 또는 비밀번호가 올바르지 않습니다."
                                : "로그인 중 오류가 발생했습니다."
                            }
                        </span>
                    </div>
                )}

                <form action={handleCredentialsLogin} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1.5 tracking-wider">이메일 주소</label>
                        <input
                            type="email"
                            name="username"
                            placeholder="admin@test.com"
                            className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-indigo-600 font-medium"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1.5 tracking-wider">비밀번호</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="********"
                            className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-indigo-600 font-mono"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-slate-900 text-white py-3.5 rounded-xl text-sm font-bold 
                        hover:bg-indigo-600 active:scale-95 transition-all shadow-md mt-2"
                    >
                        로그인 
                    </button>

                </form>
            </div>
        </div>
    )
};