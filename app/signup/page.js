"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {

    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignup = async () => {

        if (!name || !email || !password) {
            setMessage("Please fill all fields");
            return;
        }

        setLoading(true);

        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                password,
            }),
        });

        const data = await res.json();

        setLoading(false);
        setMessage(data.message);

        if (res.ok) {
            setTimeout(() => {
                router.push("/login");
            }, 1500);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#100C08]">

            <div className="bg-[#FFFAF0] w-full max-w-md p-8 rounded-2xl shadow-2xl">

                <h2 className="text-3xl font-bold text-center text-[#6B8E23] mb-6">
                    Create Your Account
                </h2>

                <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full border p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#6B8E23]"
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full border p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#6B8E23]"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border p-3 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-[#6B8E23]"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={handleSignup}
                    disabled={loading}
                    className="w-full bg-[#6B8E23] text-white py-3 rounded-lg font-semibold hover:bg-[#556B2F] transition"
                >
                    {loading ? "Creating Account..." : "Sign Up"}
                </button>

                {message && (
                    <p className="text-center mt-4 text-green-600">
                        {message}
                    </p>
                )}

                <p className="text-center mt-6 text-sm text-gray-700">
                    Already have an account?
                    <Link
                        href="/login"
                        className="text-[#6B8E23] font-semibold ml-1"
                    >
                        Login
                    </Link>
                </p>

            </div>
        </div>
    );
}