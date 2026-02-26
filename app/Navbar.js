"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const { data: session, status } = useSession();
    const router = useRouter();

    return (
        <nav className="bg-[#100C08] text-[#FFFAF0] px-6 py-4 flex justify-between items-center">

            <div
                className="font-bold text-xl text-[#6B8E23] cursor-pointer"
                onClick={() => router.push("/")}
            >
                MedTech
            </div>

            <div className="flex items-center gap-6">

                {session?.user?.role === "admin" && (
                    <button onClick={() => router.push("/admin")}>
                        Dashboard
                    </button>
                )}

                {status === "loading" ? (
                    <span>Loading...</span>
                ) : session ? (
                    <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="bg-[#6B8E23] px-4 py-2 rounded-lg"
                    >
                        Logout
                    </button>
                ) : (
                    <button
                        onClick={() => router.push("/login")}
                        className="bg-[#6B8E23] px-4 py-2 rounded-lg"
                    >
                        Login
                    </button>
                )}
            </div>
        </nav>
    );
}