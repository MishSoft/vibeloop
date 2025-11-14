"use client";

import Image from "next/image";
import React from "react";
import { Trash } from "lucide-react";
import { supabase } from "@/lib/SupabaseClient";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { SongType } from "@/types/song";

type ItemProps = {
  userId: string | undefined;
};

export default function Item({ userId }: ItemProps) {
  const queryClient = useQueryClient();
  const getUserSongs = async () => {
    const { error, data } = await supabase
      .from("song")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      console.log("UserSong Error", error.message);
    }

    return data;
  };

  const {
    data: songs,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryFn: getUserSongs,
    queryKey: ["userSongs"],
  });

  if (isLoading)
    return <h1 className="text-center text-secondary-text ">Loading...</h1>;

  if (isError)
    return <h1 className="text-center text-secondary-text">{error.message}</h1>;

  const deleteSong = async (
    songPath: string,
    imagePath: string,
    songId: number
  ) => {
    const { error: imageError } = await supabase.storage
      .from("cover-images")
      .remove([imagePath]);

    if (imageError) {
      console.log("ImageError", imageError.message);
      return;
    }

    const { error: audioError } = await supabase.storage
      .from("song")
      .remove([songPath]);

    if (audioError) {
      console.log("AudioError", audioError.message);
    }

    const { error: deleteError } = await supabase
      .from("song")
      .delete()
      .eq("id", songId);

    if (deleteError) {
      console.log("SongDeleteError", deleteError.message);
      return;
    }

    queryClient.invalidateQueries({ queryKey: ["allSongs"] });
    queryClient.invalidateQueries({ queryKey: ["userSongs"] });
  };

  return (
    <div>
      {songs?.map((song: SongType) => {
        return (
          <div
            key={song.id}
            className="
        flex justify-between items-center p-2 rounded-lg 
        cursor-pointer group
        hover:bg-[#181818] hover:shadow-[0_0_10px_#1CFF82]/20 transition-all duration-300
      "
          >
            {/* Cover + Info */}
            <div className="flex items-center gap-3">
              <Image
                src={song.cover_image_url}
                width={300}
                height={300}
                alt="cover-image"
                className="w-10 h-10 object-cover rounded-md"
              />
              <div className="flex flex-col">
                <p className="text-primary-text text-sm font-semibold">
                  {song.title}
                </p>
                <p className="text-secondary-text text-xs">{song.artist}</p>
              </div>
            </div>

            {/* Trash Button (Visible on hover) */}
            <button
              onClick={() =>
                deleteSong(song.audio_url, song.cover_image_url, song.id)
              }
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
      })}
    </div>
  );
}
