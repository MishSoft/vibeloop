"use client";

import { PlayerContext } from "@/layouts/FrontendLayout";
import { SongType } from "@/types/song";
import Image from "next/image";
import React, { useContext, useState } from "react";

export default function Queue() {
  const context = useContext(PlayerContext);
  const [index, setIndex] = useState(0);

  if (!context) {
    throw new Error("player context must be withn a provider");
  }

  const {
    isQueueModalOpen,
    currentMusic,
    currentIndex,
    queue,
    setCurrentIndex,
    setQueue,
  } = context;

  const startPlayingSong = (songs: SongType[], index: number) => {
    setCurrentIndex(index);
    setQueue(songs);
  };

  if (!isQueueModalOpen) return null;

  return (
    <div
      className="
        fixed top-16 right-5 z-50 max-w-[300px] w-full h-[75vh] 
    bg-[#0D0D0D]/90 backdrop-blur-xl border border-border 
    rounded-lg p-4 overflow-y-auto shadow-lg queue-scroll
      "
    >
      {/* Title */}
      <h2 className="text-primary-text font-bold text-lg mb-4">Queue</h2>

      {/* Now Playing */}
      <div className="mb-6">
        <h3 className="text-white font-semibold mb-3">Now Playing</h3>
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#181818] hover:shadow-[0_0_10px_#1CFF82]/20 transition cursor-pointer">
          {currentMusic && (
            <Image
              src={currentMusic?.cover_image_url}
              alt="cover image"
              width={300}
              height={300}
              className="w-10 h-10 object-cover rounded-md"
            />
          )}
          <div className="flex flex-col">
            <p
              className={` ${
                currentIndex === index ? "text-primary" : "text-primary-text"
              } font-semibold text-sm truncate`}
            >
              {currentMusic?.title}
            </p>
            <p className="text-secondary-text text-xs truncate">
              {currentMusic?.artist}
            </p>
          </div>
        </div>
      </div>

      {/* Queue List */}
      <div className="flex flex-col gap-2">
        <h3 className="text-white font-semibold mb-3">Queue List</h3>
        {queue.map((song: SongType, index) => {
          return (
            <div
              onClick={() => {
                startPlayingSong(queue, index);
                setIndex(index);
              }}
              key={song.id}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#181818] hover:shadow-[0_0_10px_#1CFF82]/20 transition cursor-pointer"
            >
              <Image
                src={song.cover_image_url}
                alt="cover image"
                width={300}
                height={300}
                className="w-10 h-10 object-cover rounded-md"
              />
              <div className="flex flex-col">
                <p
                  className={` font-semibold ${
                    currentIndex === index
                      ? "text-primary"
                      : "text-primary-text"
                  } text-sm truncate`}
                >
                  {song.title}
                </p>
                <p className="text-secondary-text text-xs truncate">
                  {song.artist}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
