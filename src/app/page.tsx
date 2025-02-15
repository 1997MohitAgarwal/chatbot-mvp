"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/auth/login"); // Redirect after logout
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">

      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-500">
          Welcome to AI Chat Assistant
        </h1>
        <p className="text-lg text-gray-300 max-w-xl mx-auto">
          Experience the power of AI-driven conversations with seamless integration.
        </p>

        {/* Centered Buttons */}
        <div className="mt-10 flex items-center justify-center space-x-4">
          {status === "loading" ? (
            <p className="text-lg animate-pulse">Checking authentication...</p>
          ) : session ? (
            <>
              <Button
                onClick={() => router.push("/chatbot")}
                className="bg-blue-600 hover:bg-blue-500 px-8 py-2 rounded-full text-md font-medium transition shadow-md hover:shadow-lg"
              >
                Go to Chatbot
              </Button>
              <Button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-500 px-8 py-2 rounded-full text-md font-medium transition shadow-md hover:shadow-lg"
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              onClick={() => router.push("/auth/login")} // Navigate to login page
              className="bg-green-600 hover:bg-green-500 px-8 py-2 rounded-full text-md font-medium transition shadow-md hover:shadow-lg"
            >
              Login / Signup
            </Button>
          )}
        </div>
      </div>

      {/* Decorative Gradient Effects */}
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-purple-600 opacity-40 blur-3xl rounded-full pointer-events-none"></div>
      <div className="absolute top-16 right-16 w-40 h-40 bg-yellow-400 opacity-30 blur-2xl rounded-full pointer-events-none"></div>
    </div>
  );
}
