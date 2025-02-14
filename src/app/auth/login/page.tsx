"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setMessage("Invalid credentials. Try again.");
    } else {
      setMessage("Login successful! Redirecting...");
      setTimeout(() => router.push("/chatbot"), 1500);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 to-gray-700 text-white">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 shadow-lg rounded-2xl">
        <h2 className="text-3xl font-bold text-center">Welcome Back</h2>
        {message && <p className="text-center text-red-400">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 pr-12"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 top-5 flex items-center text-gray-400 hover:text-white"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-500 hover:bg-purple-600 transition-all text-white font-semibold p-3 rounded-lg"
          >
            Login
          </button>
        </form>

        <div className="text-sm text-center text-gray-400">
        <p>Don&apos;t forget to sign in!</p>{" "}
          <Link href="/auth/signup" className="text-purple-400 hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
