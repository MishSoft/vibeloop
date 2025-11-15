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

    // აქ ვქმნით public URL-ს აუდიოსთვის
    const songsWithPublicUrl = data.map((song) => {
      const { publicUrl } = supabase.storage
        .from("songs") // შენს bucket-ის სახელი
        .getPublicUrl(song.audio_url).data;

      return {
        ...song,
        audio_url: publicUrl,
      };
    });

    return songsWithPublicUrl;
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
    <div className="min-h-[90vh] bg-background pt-20 pb-8 px-4 lg:ml-80 lg:px-6">
      <h2 className="text-2xl font-semibold text-primary-text mb-6">
        New Songs
      </h2>

      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {songs?.map((song: SongType, index) => (
          <div
            key={song.id}
            onClick={() => startPlayingSong(songs, index)}
            className="
              relative bg-surface rounded-lg overflow-hidden cursor-pointer group 
              hover:shadow-[0_0_15px_#1CFF82]/30 hover:scale-105 transition-all duration-300
            "
          >
            {/* Cover Image */}
            <Image
              src={song.cover_image_url || ""}
              alt="Cover image"
              width={300}
              height={300}
              className="w-full h-52 object-cover"
            />

            {/* Play Button Overlay */}
            <button
              className="
                absolute inset-0 w-20 h-20 translate-x-[-50%] left-[50%] translate-y-[-50%] top-[50%] flex items-center justify-center 
                bg-primary/30 backdrop-blur-md opacity-0 group-hover:opacity-100 
                transition-opacity duration-300 rounded-full text-white
              "
            >
              <Play size={28} />
            </button>

            {/* Song Info */}
            <div className="p-2">
              <p className="text-primary-text font-semibold text-sm truncate">
                {song.title}
              </p>
              <p className="text-secondary-text text-xs truncate">
                {song.artist}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
