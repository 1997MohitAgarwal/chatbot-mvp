
"use client"
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Signup(){
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-gray-800 via-purple-800 to-gray-800 text-white">
      <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <h1 className="text-5xl font-extrabold mb-6 drop-shadow-lg text-purple-300">Create Your Account</h1>
        <p className="text-lg max-w-2xl mb-8 drop-shadow-md text-gray-200">
          Join us to generate stunning HTML and CSS with AI in seconds.
        </p>
        <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg max-w-sm w-full">
          <h2 className="text-2xl font-semibold mb-4 text-purple-300">Sign Up</h2>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            className="mb-2 bg-gray-700 text-white border-purple-300"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            className="mb-2 bg-gray-700 text-white border-purple-300"
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
            className="mb-2 bg-gray-700 text-white border-purple-300"
          />
          <Button className="w-full mb-2 bg-purple-300 hover:bg-purple-400 text-gray-900">Sign Up</Button>
          <p className="text-sm">Already have an account? <Link href="/login" className="text-purple-300">Login</Link></p>
        </div>
      </div>
    </div>
  );
}
