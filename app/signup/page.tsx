"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import signUpUser from "@/lib/auth/signUpUser";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/SupabaseClient";

export default function Page() {
  const router = useRouter();
  const [name, setName] = useState("");
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
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      setMessage("All fields are required");
      return;
    }

    const result = await signUpUser(name, email, password);
    if (result?.error) {
      setMessage(result.error);
    } else {
      setMessage("signup successful");
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
          Logup to VibeLoop
        </h2>
        <form onSubmit={handleSubmit}>
          {message && (
            <p className="bg-primary font-semibold text-center mb-4 py-1">
              {message}
            </p>
          )}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            className="outline-none border border-neutral-600 p-2 w-full rounded-md text-primary-text placeholder-natural-600 mb-6 focus:text-secondary-text"
          />

          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
            className="outline-none border border-neutral-600 p-2 w-full rounded-md text-primary-text placeholder-natural-600 mb-6 focus:text-secondary-text"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            Already have an account?{" "}
            <Link className="underline text-white" href="/login">
              {" "}
              Sign in now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
