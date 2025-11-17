"use client";

import Image from "next/image";
import React, { useContext } from "react";
import { Trash } from "lucide-react";
import { supabase } from "@/lib/SupabaseClient";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { SongType } from "@/types/song";
import { PlayerContext } from "@/layouts/FrontendLayout";

type ItemProps = {
  userId: string | undefined;
};

export default function Item({ userId }: ItemProps) {
  const context = useContext(PlayerContext);

  if (!context) {
    throw new Error("PlayerContext must be used within a PlayerProvider");
  }

  const { setQueue, setCurrentIndex } = context;
  const queryClient = useQueryClient();

  // --------------------------
  // Fetch User Songs
  // --------------------------
  const getUserSongs = async () => {
    const { error, data } = await supabase
      .from("song")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      console.log("UserSong Error", error.message);
      return [];
    }

    // შექმნა public URL
    const songsWithPublicUrl = data.map((song) => {
      const { publicUrl } = supabase.storage
        .from("songs") // bucket-ის სწორი სახელი
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
    queryFn: getUserSongs,
    queryKey: ["userSongs", userId],
    enabled: !!userId,
  });

  if (isLoading)
    return <h1 className="text-center text-secondary-text ">Loading...</h1>;

  if (isError)
    return <h1 className="text-center text-secondary-text">{error.message}</h1>;

  if (songs?.length === 0)
    return (
      <h1 className="text-center text-secondary-text">
        You have no songs in your library
      </h1>
    );

  // --------------------------
  // Delete Song
  // --------------------------
  const deleteSong = async (
    songPath: string,
    imagePath: string,
    songId: number
  ) => {
    // Delete cover image
    const { error: imageError } = await supabase.storage
      .from("cover-images")
      .remove([imagePath]);

    if (imageError) {
      console.log("ImageError", imageError.message);
      return;
    }

    // Delete audio file → bucket IS "songs"
    const { error: audioError } = await supabase.storage
      .from("songs")
      .remove([songPath]);

    if (audioError) {
      console.log("AudioError", audioError.message);
      return;
    }

    // Delete DB entry
    const { error: deleteError } = await supabase
      .from("song")
      .delete()
      .eq("id", songId);

    if (deleteError) {
      console.log("SongDeleteError", deleteError.message);
      return;
    }

    // Refresh lists
    queryClient.invalidateQueries({ queryKey: ["allSongs"] });
    queryClient.invalidateQueries({ queryKey: ["userSongs"] });
  };

  const startPlayingSong = (songs: SongType[], index: number) => {
    setCurrentIndex(index);
    setQueue(songs);
  };

  // --------------------------
  // Render
  // --------------------------
  return (
    <div>
      {songs?.map((song: SongType, index) => (
        <div
          key={song.id}
          onClick={() => startPlayingSong(songs, index)}
          className="
            flex justify-between items-center p-2 rounded-lg 
            cursor-pointer group
            transition-all duration-300

            hover:bg-[#1a1a1a]
            hover:shadow-[0_0_10px_rgba(28,255,130,0.18)]
          "
        >
          {/* Cover + Title */}
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

          {/* Delete */}
          <button
            onClick={(e) => {
              e.stopPropagation(); // ❗ prevents playing
              deleteSong(song.audio_url, song.cover_image_url, song.id);
            }}
            className="
              text-red-500 p-1 rounded-full 
              opacity-0 group-hover:opacity-100
              hover:bg-[#2a2a2a]
              transition duration-200
            "
          >
            <Trash size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
