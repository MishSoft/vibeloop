"use client";

import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Play,
  SkipForward,
  SkipBack,
  Repeat,
  ListMusic,
  Volume2,
  Pause,
  VolumeX,
} from "lucide-react";
import { PlayerContext } from "@/layouts/FrontendLayout";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [previousVolume, setPreviousVolume] = useState(0);

  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("player context must be within a provider");
  }

  const { isQueueModalOpen, setQueueModalOpen } = context;

  // --- Play / Pause Toggle ---
  const togglePlayButton = () => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  // --- Track Time Update ---
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 0);
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateTime);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateTime);
    };
  }, []);

  // --- Volume Change ---
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume / 100;
  }, [volume]);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseInt(e.target.value);
    setVolume(vol);
    if (audioRef.current) audioRef.current.volume = vol / 100;
  };

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(previousVolume);
      if (audioRef.current) audioRef.current.volume = previousVolume / 100;
    } else {
      setPreviousVolume(volume);
      setVolume(0);
      if (audioRef.current) audioRef.current.volume = 0;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-[#0F0F0F]/95 backdrop-blur-md border-t border-[#222] z-50 px-4 py-3 shadow-lg">
      <audio src="/music.mp3" ref={audioRef}></audio>

      <div className="max-w-8xl w-[95%] mx-auto flex flex-col lg:flex-row items-center justify-between gap-3">
        {/* Song Info */}
        <div className="flex items-center gap-4">
          <Image
            src="/coverImage.avif"
            alt="cover image"
            width={300}
            height={300}
            className="w-14 h-14 object-cover rounded-md"
          />
          <div className="flex flex-col">
            <p className="text-primary-text font-semibold truncate text-sm">
              Bicycle
            </p>
            <p className="text-secondary-text text-xs truncate">Emmanuel</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-2 max-w-[400px] w-full">
          <div className="flex items-center gap-4">
            <button className="text-secondary-text hover:text-primary transition">
              <SkipBack size={20} />
            </button>
            <button
              onClick={togglePlayButton}
              className="bg-primary hover:scale-105 transition-transform w-10 h-10 rounded-full flex items-center justify-center text-black"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button className="text-secondary-text hover:text-primary transition">
              <SkipForward size={20} />
            </button>
          </div>

          {/* Seek Bar */}
          <div className="flex items-center gap-2 w-full">
            <span className="text-secondary-text text-xs font-mono">
              {formatTime(currentTime)}
            </span>
            <input
              type="range"
              min={0}
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1 rounded-lg bg-zinc-700 accent-primary appearance-none"
            />
            <span className="text-secondary-text text-xs font-mono">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Volume + Extras */}
        <div className="flex items-center gap-3">
          <button className="text-secondary-text hover:text-primary transition">
            <Repeat size={18} />
          </button>
          <button
            onClick={() => setQueueModalOpen(!isQueueModalOpen)}
            className="text-secondary-text hover:text-primary transition"
          >
            <ListMusic size={18} />
          </button>
          <button
            onClick={toggleMute}
            className="text-secondary-text hover:text-primary transition"
          >
            {volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
          <input
            type="range"
            min={0}
            max={100}
            value={volume}
            onChange={handleVolumeChange}
            className="w-24 h-1 accent-primary bg-zinc-700 rounded-lg appearance-none"
          />
        </div>
      </div>
    </div>
  );
}
