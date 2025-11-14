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

    if (!result?.error) {
      router.push("/");
    }
  };

  return (
    <nav
      className="fixed top-0 left-0 w-full h-16 
      bg-[#0D0D0D]/80 backdrop-blur-xl border-b border-border 
      flex items-center justify-between px-5 md:px-10 z-999"
    >
      {/* LEFT SIDE */}
      <div className="flex items-center gap-4 md:gap-8">
        {/* Mobile Menu Icon */}
        <button className="sm:hidden text-primary-text hover:text-primary transition">
          <Menu size={22} />
        </button>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="logo"
            width={40}
            height={40}
            className="w-9 h-9"
          />
        </Link>

        {/* Home Icon */}
        <Link
          href="/"
          className="hidden sm:grid place-items-center w-10 h-10 
            text-primary-text hover:text-primary transition"
        >
          <HouseHeart size={20} />
        </Link>
      </div>

      {/* CENTER LINKS (Desktop) */}
      <div className="hidden sm:flex items-center gap-6 text-secondary-text font-medium">
        <Link href="/" className="hover:text-primary transition">
          Premium
        </Link>
        <Link href="/" className="hover:text-primary transition">
          Support
        </Link>
        <Link href="/" className="hover:text-primary transition">
          Download
        </Link>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-3">
        {/* SEARCH ICON + FIELD */}
        <div className="relative group">
          <Search
            size={20}
            className="text-primary-text cursor-pointer group-hover:text-primary transition"
          />

          {/* SEARCH INPUT (Opens on hover) */}
          <div
            className="absolute right-0 top-0 translate-y-12 opacity-0 pointer-events-none 
            group-hover:opacity-100 group-hover:pointer-events-auto 
            bg-surface border border-border rounded-xl h-11 w-64 flex items-center gap-3 px-3 
            text-primary-text transition-all duration-300 shadow-lg"
          >
            <Search size={18} />
            <input
              type="text"
              placeholder="Search music..."
              className="w-full bg-transparent outline-none placeholder-secondary-text"
            />
          </div>
        </div>

        {/* LOGIN / LOGOUT BUTTON */}
        {!loading && (
          <>
            {session ? (
              <button
                onClick={handleLogOut}
                className="px-4 py-2 rounded-full text-primary border border-primary 
            hover:bg-primary cursor-pointer hover:text-black transition font-semibold"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 rounded-full text-primary border border-primary 
            hover:bg-primary hover:text-black transition font-semibold"
              >
                Login
              </Link>
            )}
          </>
        )}
      </div>
    </nav>
  );
}
