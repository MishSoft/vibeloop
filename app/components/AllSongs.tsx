"use client";

import { supabase } from "@/lib/SupabaseClient";
import { useQuery } from "@tanstack/react-query";
import { LoaderCircle, Play } from "lucide-react";
import { SongType } from "@/types/song";
import { useContext } from "react";
import { PlayerContext } from "@/layouts/FrontendLayout";
import Image from "next/image";

export default function AllSongs() {
  const context = useContext(PlayerContext);

  if (!context) {
    throw new Error("PlayerContext must be used within a PlayerProvider");
  }

  const { setQueue, setCurrentIndex } = context;

  // --- Supabase–დან ყველა სიმღერის წამოღება ---
  const getAllSongs = async () => {
    const { data, error } = await supabase.from("song").select("*");

    if (error) {
      console.log("fetchAllSongsError", error.message);
      return [];
    }

    // თუ DB-ში audio_url უკვე სრული URLა, უბრალოდ დაბრუნდეს data
    return data;
  };

  const {
    data: songs,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryFn: getAllSongs,
    queryKey: ["allSongs"],
  });

  const startPlayingSong = (songs: SongType[], index: number) => {
    setCurrentIndex(index);
    setQueue(songs);
  };

  if (isLoading)
    return (
      <div className="min-h-[90vh] bg-background pt-20 pb-8 px-4 lg:ml-80 lg:px-6">
        <h2 className="text-2xl font-semibold text-primary-text mb-6">
          New Songs
        </h2>
        <LoaderCircle size={20} className="animate-spin" />
      </div>
    );

  if (isError)
    return (
      <div className="min-h-[90vh] bg-background pt-20 pb-8 px-4 lg:ml-80 lg:px-6">
        <h2 className="text-2xl font-semibold text-primary-text mb-6">
          New Songs
        </h2>
        <h2 className="text-center text-secondary-text mb-2">
          {error.message}
        </h2>
      </div>
    );

  return (
    <div className="min-h-screen pt-10 my-15   pb-8 border border-border px-4 lg:ml-75 lg:px-6 bg-linear-to-b from-[#0F0F0F]/80 via-[#121212]/70 to-[#0F0F0F]/80">
      <h2 className="text-3xl font-bold text-gray-100 mb-6">New Songs</h2>

      <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {songs?.map((song: SongType, index) => (
          <div
            key={song.id}
            onClick={() => startPlayingSong(songs, index)}
            className="
          relative 
          bg-[rgba(255,255,255,0.05)] 
          border border-[rgba(255,255,255,0.08)] 
          rounded-2xl overflow-hidden cursor-pointer group
          transition-all duration-300
          hover:bg-[rgba(255,255,255,0.1)] 
          hover:border-[rgba(255,255,255,0.15)] 
          hover:shadow-[0_8px_25px_rgba(255,255,255,0.07)] 
          hover:-translate-y-1
        "
          >
            {/* Cover Image */}
            <Image
              src={song.cover_image_url || ""}
              alt="Cover image"
              width={300}
              height={300}
              className="w-full h-52 object-cover rounded-t-2xl group-hover:brightness-110 transition"
            />

            {/* Play Button Overlay */}
            <button
              className="
            absolute inset-0 flex items-center justify-center
            opacity-0 group-hover:opacity-100 
            transition-all duration-300
            bg-[rgba(0,0,0,0.35)] backdrop-blur-sm
          "
            >
              <div
                className="
            w-14 h-14 rounded-full 
            flex items-center justify-center 
            bg-[rgba(255,255,255,0.15)] 
            border border-[rgba(255,255,255,0.25)]
            text-white shadow-xl 
            transition-all duration-300
            group-hover:scale-110
          "
              >
                <Play size={26} />
              </div>
            </button>

            {/* Song Info */}
            <div className="p-3">
              <p className="text-gray-100 font-semibold text-sm truncate tracking-wide">
                {song.title}
              </p>
              <p className="text-gray-400 text-xs truncate mt-0.5">
                {song.artist}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
