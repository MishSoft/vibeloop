"use client";

import Image from "next/image";
import Link from "next/link";
import { HouseHeart, Search, Menu } from "lucide-react";
import useUserSession from "@/custom-hooks/useUserSession";
import { useRouter } from "next/navigation";
import LogoutUser from "@/lib/auth/logoutUser";

export default function Nav() {
  const router = useRouter();
  const { session, loading } = useUserSession();

  const handleLogOut = async () => {
    const result = await LogoutUser();
    if (!result?.error) router.push("/");
  };

  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-gradient-to-r from-[#0F0F0F]/80 via-[#121212]/60 to-[#0F0F0F]/80 backdrop-blur-xl border-b border-[rgba(255,255,255,0.08)] flex items-center justify-between px-5 md:px-10 z-50">
      {/* LEFT */}
      <div className="flex items-center gap-4 md:gap-8">
        <button className="sm:hidden text-gray-400 hover:text-[#F93493] transition">
          <Menu size={22} />
        </button>

        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="logo"
            width={40}
            height={40}
            className="rounded-lg opacity-90"
          />
        </Link>

        <Link
          href="/"
          className="hidden sm:grid place-items-center w-10 h-10 text-gray-400 hover:text-[#F93493] transition"
        >
          <HouseHeart size={20} />
        </Link>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        <div className="relative group">
          <Search
            size={20}
            className="text-gray-400 cursor-pointer group-hover:text-[#F93493] transition"
          />
          <div className="absolute right-0 top-0 translate-y-12 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.12)] rounded-xl h-11 w-64 flex items-center gap-3 px-3 text-gray-200 transition-all duration-300 shadow-[0_4px_30px_rgba(255,255,255,0.05)]">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search music..."
              className="w-full bg-transparent outline-none placeholder-gray-400 text-gray-100 focus:ring-1 focus:ring-[#F93493]/50 focus:border-[#F93493]/50 rounded-md px-1 py-0.5"
            />
          </div>
        </div>

        {!loading &&
          (session ? (
            <button
              onClick={handleLogOut}
              className="px-4 py-2 rounded-full text-gray-200 font-semibold border border-[rgba(255,255,255,0.25)] hover:bg-[rgba(255,255,255,0.1)] hover:text-[#F93493] transition"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 rounded-full text-gray-200 font-semibold border border-[rgba(255,255,255,0.25)] hover:bg-[rgba(255,255,255,0.1)] hover:text-[#F93493] transition"
            >
              Login
            </Link>
          ))}
      </div>
    </nav>
  );
}
