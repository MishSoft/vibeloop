"use client";

import React from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { SongType } from "@/types/song";

interface SongProps {
  title: string;
  artist: string;
  image: string;
  startPlaying: (songs: SongType[], index: number) => void;
  index: number;
  song: SongType[];
}

export default function Song({
  title,
  artist,
  image,
  index,
  song,
  startPlaying,
}: SongProps) {
  return (
    <div
      onClick={() => startPlaying(song, index)}
      className="
        relative bg-surface rounded-lg overflow-hidden cursor-pointer group 
        hover:shadow-[0_0_15px_#1CFF82]/30 hover:scale-105 transition-all duration-300
      "
    >
      {/* Cover Image */}
      <Image
        src={image}
        alt="cover image"
        width={300}
        height={300}
        className="w-full h-52 object-cover"
        loader={({ src }) => src}
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
          {title}
        </p>
        <p className="text-secondary-text text-xs truncate">{artist}</p>
      </div>
    </div>
  );
}
