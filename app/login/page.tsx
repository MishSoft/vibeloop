"use client";
import loginUser from "@/lib/auth/loginUser";
import { supabase } from "@/lib/SupabaseClient";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        router.push("/");
      } else {
        setLoading(false);
      }
    });
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setMessage("All fields are required");
      return;
    }

    const result = await loginUser(email, password);

    if (result?.error) {
      setMessage(result.error);
    } else {
      setMessage("Login successful");
      setTimeout(() => {
        router.push("/");
      }, 3000);
    }
  };

  if (loading) return null;

  return (
    <div className="h-screen flex justify-center items-center w-full bg-hover">
      <div className="bg-background flex flex-col items-center  px-6 lg:px-12 py-6 rounded-md max-w-[400px] w-[90%]">
        <Image
          src={"/logo.png"}
          alt="logo image"
          width={300}
          height={300}
          className="w-11 h-11"
        />
        <h2 className="text-2xl font-bold text-white my-2 mb-4 text-center">
          Log in to VibeLoop
        </h2>
        <form onSubmit={handleLogin}>
          {message && (
            <p className="bg-primary font-semibold text-center mb-4 py-1">
              {message}
            </p>
          )}
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Your Email"
            className="outline-none border border-neutral-600 p-2 w-full rounded-md text-primary-text placeholder-natural-600 mb-6 focus:text-secondary-text"
          />

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="*******"
            className="outline-none border border-neutral-600 p-2 w-full rounded-md text-primary-text placeholder-natural-600 mb-6 focus:text-secondary-text"
          />

          <button
            type="submit"
            className="w-full  p-2 bg-primary text-white rounded-md cursor-pointer hover:bg-primary/80 duration-200"
          >
            Continue
          </button>

          <p className="text-primary-text text-center m-2 text-sm">
            Don&apos;t have an account?{" "}
            <Link className="underline text-white" href="/signup">
              {" "}
              Sign up now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
