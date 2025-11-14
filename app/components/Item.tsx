"use client";

import Image from "next/image";
import React from "react";
import { Trash } from "lucide-react";

export default function Item() {
  return (
    <div
      className="
        flex justify-between items-center p-2 rounded-lg 
        cursor-pointer group
        hover:bg-[#181818] hover:shadow-[0_0_10px_#1CFF82]/20 transition-all duration-300
      "
    >
      {/* Cover + Info */}
      <div className="flex items-center gap-3">
        <Image
          src="/coverImage.avif"
          width={300}
          height={300}
          alt="cover-image"
          className="w-10 h-10 object-cover rounded-md"
        />
        <div className="flex flex-col">
          <p className="text-primary-text text-sm font-semibold">
            Midnight Echos
          </p>
          <p className="text-secondary-text text-xs">By Neon Skyline</p>
        </div>
      </div>

      {/* Trash Button (Visible on hover) */}
      <button
        className="
          text-red-500 p-1 rounded-full 
          opacity-0 group-hover:opacity-100 
          hover:bg-hover transition duration-200
        "
      >
        <Trash size={15} />
      </button>
    </div>
  );
}
