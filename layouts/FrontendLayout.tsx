"use client";
import MusicPlayer from "@/app/components/MusicPlayer";
import Nav from "@/app/components/Nav";
import Queue from "@/app/components/Queue";
import SideBar from "@/app/components/SideBar";
import React, { createContext, useState } from "react";

type PlayerContextType = {
  isQueueModalOpen: boolean;
  setQueueModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PlayerContext = createContext<PlayerContextType | undefined>(
  undefined
);

export default function FrontendLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [isQueueModalOpen, setQueueModalOpen] = useState(false);
  return (
    <PlayerContext.Provider value={{ isQueueModalOpen, setQueueModalOpen }}>
      <div className="min-h-screen">
        {/* Nav */}
        <Nav />
        <main>
          <SideBar />
          <Queue />
          <MusicPlayer />
          {children}
        </main>
      </div>
    </PlayerContext.Provider>
  );
}
