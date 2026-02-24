"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const router = useRouter();

    async function handleLogin(e) {
        e.preventDefault();

        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (res.ok) {
            // 🔥 Save logged in user in localStorage
            localStorage.setItem("user", JSON.stringify(data.user));

            setMessage("Login successful!");

            // 🔥 Redirect based on role
            if (data.user.role === "admin") {
                router.push("/admin");
            } else {
                router.push("/");
            }
        } else {
            setMessage(data.message || "Login failed");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-green-100">
            <div className="bg-white shadow-xl rounded-xl p-8 w-96">
                <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
                    MedTech Login
                </h2>

                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Enter Email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border px-4 py-2 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <input
                        type="password"
                        placeholder="Enter Password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border px-4 py-2 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Login
                    </button>
                </form>

                {message && (
                    <p className="mt-4 text-center text-red-500">{message}</p>
                )}
            </div>
        </div>
    );
}