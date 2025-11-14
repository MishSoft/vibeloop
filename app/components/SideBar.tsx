"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Plus, LibraryBig } from "lucide-react";
import Item from "./Item";
import useUserSession from "@/custom-hooks/useUserSession";
import { LoaderCircle } from "lucide-react";

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { loading, session } = useUserSession();

  const handleSideBar = () => setIsOpen(!isOpen);
  if (loading)
    return (
      <aside
        className={`
          fixed top-16 left-0 h-[calc(100vh-4rem)] w-72 
          bg-[#0D0D0D]/90 backdrop-blur-xl border-r border-border 
          shadow-xl shadow-black/30 
          flex items-center justify-center
          transition-transform duration-300
          overflow-y-auto scrollbar-thin scrollbar-thumb-[#1CFF82]/20
          z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <div className="text-secondary-text flex flex-col gap-2 items-center justify-center">
          <LoaderCircle size={20} className="animate-spin" />
          <h2 className="text-md">Loading...</h2>
        </div>
      </aside>
    );

  return (
    <>
      {session ? (
        <div>
          {/* SIDEBAR */}
          <aside
            className={`
          fixed top-16 left-0 h-[calc(100vh-4rem)] w-72 
          bg-[#0D0D0D]/90 backdrop-blur-xl border-r border-border 
          shadow-xl shadow-black/30 
          transition-transform duration-300
          overflow-y-auto scrollbar-thin scrollbar-thumb-[#1CFF82]/20
          z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between py-3 px-4
          border-b border-border mb-3"
            >
              <h2 className="text-primary-text text-sm font-semibold">
                Your Library
              </h2>

              <Link
                href="/upload-song"
                className="p-1 rounded-full text-primary hover:bg-hover transition"
              >
                <Plus size={18} />
              </Link>
            </div>

            {/* Library Items */}
            <div className="flex flex-col gap-2 px-4 pb-6">
              <Item />
              <Item />
              <Item />
              <Item />
            </div>
          </aside>

          {/* Toggle Button (Mobile Only) */}
          <button
            onClick={handleSideBar}
            className="
          fixed lg:hidden bottom-5 left-5 
          w-12 h-12 rounded-full grid place-items-center 
          bg-surface border border-border text-primary-text
          hover:border-primary hover:text-primary transition 
          backdrop-blur-xl 
          shadow-lg shadow-black/40
          z-50
        "
          >
            <LibraryBig size={18} />
          </button>
        </div>
      ) : (
        <div>
          {/* SIDEBAR */}
          <aside
            className={`
          fixed top-16 left-0 h-[calc(100vh-4rem)] w-72 
          bg-[#0D0D0D]/90 backdrop-blur-xl border-r border-border 
          shadow-xl shadow-black/30 
          transition-transform duration-300
          overflow-y-auto scrollbar-thin scrollbar-thumb-[#1CFF82]/20
          z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
          >
            <div className="py-8 text-center">
              <Link
                href={"/login"}
                className="bg-white px-6 py-2 rounded-full font-semibold hover:bg-secondary-text"
              >
                Login
              </Link>
              <p className="mt-4 text-white">Login to view your library</p>
            </div>
          </aside>

          {/* Toggle Button (Mobile Only) */}
          <button
            onClick={handleSideBar}
            className="
          fixed lg:hidden bottom-5 left-5 
          w-12 h-12 rounded-full grid place-items-center 
          bg-surface border border-border text-primary-text
          hover:border-primary hover:text-primary transition 
          backdrop-blur-xl 
          shadow-lg shadow-black/40
          z-50
        "
          >
            <LibraryBig size={18} />
          </button>
        </div>
      )}
    </>
  );
}
