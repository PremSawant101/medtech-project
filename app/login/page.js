"use client";

import { signIn, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (status === "authenticated") {
            if (session.user.role === "admin") {
                router.push("/admin");
            } else {
                router.push("/");
            }
        }
    }, [status, session, router]);

    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#100C08] text-white">
                Loading...
            </div>
        );
    }

    const handleLogin = async () => {
        await signIn("credentials", {
            email,
            password,
            redirect: false,
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#100C08]">
            <div className="w-full max-w-md bg-[#FFFAF0] rounded-2xl shadow-2xl p-8">
                <h2 className="text-3xl font-bold text-center text-[#6B8E23] mb-6">
                    MedTech Login
                </h2>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-2 border rounded-lg mb-4"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-2 border rounded-lg mb-6"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={handleLogin}
                    className="w-full bg-[#6B8E23] text-white py-2 rounded-lg mb-4"
                >
                    Login
                </button>

                <div className="text-center mb-4">OR</div>

                <button
                    onClick={() => signIn("google")}
                    className="w-full border py-2 rounded-lg"
                >
                    Continue with Google
                </button>
                <p className="text-center mt-4">
                    Don't have account?
                    <span
                        onClick={() => router.push("/signup")}
                        className="text-[#6B8E23] cursor-pointer ml-1"
                    >
                        Sign Up
                    </span>
                </p>
            </div>
        </div>
    );
}