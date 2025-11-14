"use client";

import { supabase } from "@/lib/SupabaseClient";
import { useQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { SongType } from "@/types/song";
import Song from "./Song";
export default function AllSongs() {
  const getAllSongs = async () => {
    const { data, error } = await supabase.from("song").select("*");

    if (error) {
      console.log("fetchAllSongsError", error.message);
    }

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

  if (isLoading)
    return (
      <div className="min-h-[90vh] bg-background pt-20 pb-8 px-4 lg:ml-80 lg:px-6">
        {/* Section Title */}
        <h2 className="text-2xl font-semibold text-primary-text mb-6">
          New Songs
        </h2>
        <LoaderCircle size={20} className="animate-spin" />
      </div>
    );

  if (isError) {
    return (
      <div className="min-h-[90vh] bg-background pt-20 pb-8 px-4 lg:ml-80 lg:px-6">
        {/* Section Title */}
        <h2 className="text-2xl font-semibold text-primary-text mb-6">
          New Songs
        </h2>
        <h2 className="text-center text-secondary-text mb-2">
          {error.message}
        </h2>
      </div>
    );
  }
  return (
    <div className="min-h-[90vh] bg-background pt-20 pb-8 px-4 lg:ml-80 lg:px-6">
      {/* Section Title */}
      <h2 className="text-2xl font-semibold text-primary-text mb-6">
        New Songs
      </h2>

      {/* Songs Grid */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {songs?.map((song: SongType) => {
          return (
            <Song
              title={song.title}
              artist={song.artist}
              image={song.cover_image_url}
              key={song.id}
            />
          );
        })}
      </div>
    </div>
  );
}
