"use client";

import React from "react";
import Image from "next/image";
import { Play } from "lucide-react";

export default function Song() {
  return (
    <div
      className="
        relative bg-surface rounded-lg overflow-hidden cursor-pointer group 
        hover:shadow-[0_0_15px_#1CFF82]/30 hover:scale-105 transition-all duration-300
      "
    >
      {/* Cover Image */}
      <Image
        src="/coverImage.avif"
        alt="cover image"
        width={300}
        height={300}
        className="w-full h-52 object-cover"
      />

      {/* Play Button Overlay */}
      <button
        className="
          absolute inset-0 flex items-center justify-center 
          bg-primary/30 backdrop-blur-md opacity-0 group-hover:opacity-100 
          transition-opacity duration-300 rounded-full text-white
        "
      >
        <Play size={28} />
      </button>

      {/* Song Info */}
      <div className="p-2">
        <p className="text-primary-text font-semibold text-sm truncate">
          Rain on Marble Streets
        </p>
        <p className="text-secondary-text text-xs truncate">By the Lanterns</p>
      </div>
    </div>
  );
}
