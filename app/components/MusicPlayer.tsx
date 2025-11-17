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
  Repeat1,
} from "lucide-react";
import { PlayerContext } from "@/layouts/FrontendLayout";
import { motion, AnimatePresence } from "framer-motion";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [previousVolume, setPreviousVolume] = useState(0);
  const [repeatSong, setRepeatSong] = useState(false);

  const context = useContext(PlayerContext);
  if (!context) throw new Error("PlayerContext must be within a provider");

  const {
    isQueueModalOpen,
    setQueueModalOpen,
    currentMusic,
    playNext,
    playPrev,
  } = context;

  const togglePlayButton = () => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

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

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentMusic) return;

    const playAudio = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.log("Error:", error);
        setIsPlaying(false);
      }
    };

    playAudio();
  }, [currentMusic]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      if (repeatSong) {
        audio.currentTime = 0;
        audio.play();
      } else {
        playNext();
      }
    };

    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, [playNext, repeatSong]);

  if (!currentMusic) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-[#121212]/95 backdrop-blur-lg border-t border-[#222] z-50 px-4 py-3 shadow-2xl">
      <audio src={currentMusic.audio_url || ""} ref={audioRef}></audio>

      <div className="max-w-8xl w-[95%] mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Song Info */}
        <div className="flex items-center gap-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMusic.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-4"
            >
              <Image
                src={currentMusic.cover_image_url || ""}
                alt="cover image"
                width={300}
                height={300}
                className="w-14 h-14 object-cover rounded-md shadow-md"
              />
              <div className="flex flex-col overflow-hidden">
                <p className="text-white font-semibold truncate">
                  {currentMusic.title}
                </p>
                <p className="text-gray-400 text-sm truncate">
                  {currentMusic.artist}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-2 w-full max-w-[400px]">
          <div className="flex items-center gap-6">
            <button
              onClick={playPrev}
              className="text-gray-400 hover:text-[#F93493] transition-transform duration-300 hover:scale-110"
            >
              <SkipBack size={22} />
            </button>
            <motion.button
              onClick={togglePlayButton}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.1 }}
              className="w-12 h-12 bg-[#F93493] rounded-full flex items-center justify-center shadow-lg text-black transition-all"
            >
              {isPlaying ? <Pause size={22} /> : <Play size={22} />}
            </motion.button>
            <button
              onClick={playNext}
              className="text-gray-400 hover:text-[#F93493] transition-transform duration-300 hover:scale-110"
            >
              <SkipForward size={22} />
            </button>
          </div>

          {/* Seek Bar */}
          <div className="flex items-center gap-2 w-full mt-1">
            <span className="text-gray-400 text-xs font-mono">
              {formatTime(currentTime)}
            </span>
            <input
              type="range"
              min={0}
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1 rounded-lg accent-[#F93493] bg-gray-700 appearance-none"
            />
            <span className="text-gray-400 text-xs font-mono">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Volume + Extras */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setRepeatSong(!repeatSong)}
            className={`transition-transform duration-300 hover:scale-110 ${
              repeatSong ? "text-[#F93493]" : "text-gray-400"
            }`}
          >
            {repeatSong ? <Repeat1 size={18} /> : <Repeat size={18} />}
          </button>

          <button
            onClick={() => setQueueModalOpen(!isQueueModalOpen)}
            className="text-gray-400 hover:text-[#F93493] transition-transform duration-300 hover:scale-110"
          >
            <ListMusic size={18} />
          </button>

          <button
            onClick={toggleMute}
            className="text-gray-400 hover:text-[#F93493] transition-transform duration-300 hover:scale-110"
          >
            {volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>

          <input
            type="range"
            min={0}
            max={100}
            value={volume}
            onChange={handleVolumeChange}
            className="w-28 h-1 accent-[#F93493] bg-gray-700 rounded-lg appearance-none"
          />
        </div>
      </div>
    </div>
  );
}
