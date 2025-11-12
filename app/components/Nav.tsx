import Image from "next/image";
import React from "react";
import { HouseHeart, Search, Menu } from "lucide-react";
import Link from "next/link";

export default function Nav() {
  return (
    <nav className="h-15 flex justify-between md:justify-around items-center px-6 fixed top-0 left-0 w-full bg-[#0F0F0F] z-100">
      <div className="flex gap-2 sm:gap-6 items-center">
        <div className="text-white sm:hidden w-11 h-11 flex items-center justify-center">
          <Menu size={20} />
        </div>
        <Image
          src="/logo.png"
          alt="logo"
          width={500}
          height={500}
          className="w-9 h-9 hidden sm:block"
        />
        <Link
          href={"/"}
          className="w-11 h-11 grid place-items-center text-white"
        >
          <HouseHeart size={20} />
        </Link>
      </div>

      {/* Mobile Logo */}
      <div className="sm:hidden">
        <Image
          src="/logo.png"
          alt="logo"
          width={500}
          height={500}
          className="w-9 h-9"
        />
      </div>

      <div className="sm:flex hidden gap-2 text-secondary-text font-semibold  pr-6">
        <Link href={"/"} className="hover:text-primary-text">
          Premium
        </Link>

        <Link href={"/"} className="hover:text-primary-text">
          Support
        </Link>

        <Link href={"/"} className="hover:text-primary-text">
          Download
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <div className="w-11 h-11 grid place-items-center text-white">
          <Search className="cursor-pointer" size={20} />

          <div className="bg-background hidden items-center h-11 w-90 px-3 gap-3 text-primary-text">
            <Search size={20} />
            <input
              className="h-full w-full outline-none placeholder:text-primary-text"
              type="text"
              placeholder="What do you want to play?"
            />
          </div>
        </div>
        <Link
          href={"/login"}
          className="bg-background hover:bg-hover duration-200 cursor-pointer text-primary p-2 rounded-full"
        >
          Logout
        </Link>
      </div>
    </nav>
  );
}
