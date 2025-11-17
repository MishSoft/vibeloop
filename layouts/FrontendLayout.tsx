"use client";
import React, { createContext, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SongType } from "@/types/song";
import Nav from "@/app/components/Nav";
import SideBar from "@/app/components/SideBar";
import Queue from "@/app/components/Queue";
import MusicPlayer from "@/app/components/MusicPlayer";

type PlayerContextType = {
  isQueueModalOpen: boolean;
  setQueueModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentMusic: SongType | null;
  setCurrentMusic: React.Dispatch<React.SetStateAction<SongType | null>>;
  queue: SongType[];
  setQueue: (songs: SongType[]) => void;
  playNext: () => void;
  playPrev: () => void;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  currentIndex: number;
};

export const PlayerContext = createContext<PlayerContextType | undefined>(
  undefined
);

export default function FrontendLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const queryclient = new QueryClient();
  const [isQueueModalOpen, setQueueModalOpen] = useState(false);
  const [currentMusic, setCurrentMusic] = useState<null | SongType>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [queue, setQueue] = useState<SongType[]>([]);

  const playNext = () => {
    if (currentIndex < queue.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const playPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  useEffect(() => {
    const id = setTimeout(() => {
      if (
        queue.length > 0 &&
        currentIndex >= 0 &&
        currentIndex < queue.length
      ) {
        setCurrentMusic(queue[currentIndex]);
      }
    }, 0);

    return () => clearTimeout(id);
  }, [currentIndex, queue]);

  return (
    <QueryClientProvider client={queryclient}>
      <PlayerContext.Provider
        value={{
          isQueueModalOpen,
          setQueueModalOpen,
          currentMusic,
          setCurrentMusic,
          queue,
          setQueue,
          playNext,
          playPrev,
          setCurrentIndex,
          currentIndex,
        }}
      >
        <div className="min-h-screen">
          {/* Nav */}
          <Nav />
          <main>
            <SideBar />
            <Queue />
            {currentMusic && <MusicPlayer />}
            {children}
          </main>
        </div>
      </PlayerContext.Provider>
    </QueryClientProvider>
  );
}
