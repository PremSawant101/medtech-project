"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./globals.css";

export default function RootLayout({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <html>
      <body>
        <nav className="bg-blue-700 text-white p-4 flex justify-between">
          <div className="font-bold text-lg cursor-pointer" onClick={() => router.push("/")}>
            MedTech
          </div>

          <div className="space-x-4">
            {user?.role === "admin" && (
              <button onClick={() => router.push("/admin")}>
                Admin
              </button>
            )}

            {user ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-1 rounded"
              >
                Logout
              </button>
            ) : (
              <button onClick={() => router.push("/login")}>
                Login
              </button>
            )}
          </div>
        </nav>

        {children}
      </body>
    </html>
  );
}