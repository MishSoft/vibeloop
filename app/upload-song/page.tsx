"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/SupabaseClient";
import useUserSession from "@/custom-hooks/useUserSession";
import { LoaderCircle } from "lucide-react";

export default function UploadPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const { session } = useUserSession();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.push("/");
      } else {
        setPageLoading(false);
      }
    });
  }, [router]);

  if (pageLoading) return null;

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!title.trim() || !artist.trim() || !audioFile || !coverFile) {
      setMessage("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      const timestamp = Date.now();

      const imagePath = `/${timestamp}_${coverFile.name}`;
      const { error: imgError } = await supabase.storage
        .from("cover-images")
        .upload(imagePath, coverFile);

      if (imgError) {
        setMessage(imgError.message);
        setLoading(false);
        return;
      }

      const {
        data: { publicUrl: imageUrl },
      } = supabase.storage.from("cover-images").getPublicUrl(imagePath);

      const audioPath = `/${timestamp}_${audioFile.name}`;
      const { error: audioError } = await supabase.storage
        .from("songs")
        .upload(audioPath, audioFile);

      if (audioError) {
        setMessage(audioError.message);
        setLoading(false);
        return;
      }

      const {
        data: { publicUrl: audioURL },
      } = supabase.storage.from("songs").getPublicUrl(audioPath);

      const { error: insertErr } = await supabase.from("song").insert({
        title,
        artist,
        cover_image_url: imageUrl,
        audio_url: audioURL,
        user_id: session?.user.id,
      });

      if (insertErr) {
        setMessage(insertErr.message);
        setLoading(false);
        return;
      }

      setTitle("");
      setArtist("");
      setCoverFile(null);
      setAudioFile(null);
      setMessage("Song uploaded successfully!");

      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (err) {
      console.log("Catched Error:", err);
    }

    // აქ შეგიძლია ლოგიკა დაემატოს ფაილების დასატვირთად
  };

  return (
    <div className="h-screen flex justify-center items-center w-full bg-gradient-to-b from-[#0D0D0D] via-[#121212]/80 to-[#0F0F0F]">
      <div className="bg-[#0D0D0D]/90 backdrop-blur-xl flex flex-col items-center px-6 lg:px-12 py-8 rounded-2xl max-w-[400px] w-[90%] shadow-lg border border-[#1C1C1C]">
        <Image
          src={"/logo.png"}
          alt="logo image"
          width={300}
          height={300}
          className="w-14 h-14 mb-2 rounded-lg"
        />
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Upload to VibeLoop
        </h2>

        <form onSubmit={handleUpload} className="w-full flex flex-col gap-4">
          {message && (
            <p className="bg-green-600/30 text-white font-semibold text-center py-1 rounded-md">
              {message}
            </p>
          )}

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Title"
            className="outline-none border border-[#2C2C2C] p-3 w-full rounded-xl text-white bg-[#121212]/60 placeholder-gray-400 focus:border-[#1CFF82] focus:ring-1 focus:ring-[#1CFF82] transition"
          />

          <input
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            type="text"
            placeholder="Artist"
            className="outline-none border border-[#2C2C2C] p-3 w-full rounded-xl text-white bg-[#121212]/60 placeholder-gray-400 focus:border-[#1CFF82] focus:ring-1 focus:ring-[#1CFF82] transition"
          />

          <div className="flex flex-col gap-2">
            <label className="text-white font-semibold">Audio File</label>
            <input
              type="file"
              accept="audio/*"
              onChange={(e) => setAudioFile(e.target.files?.[0] || null)}
              className="outline-none border border-[#2C2C2C] p-3 w-full rounded-xl text-white bg-[#121212]/60 focus:border-[#1CFF82] focus:ring-1 focus:ring-[#1CFF82] transition"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-white font-semibold">Cover Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setCoverFile(e.target.files?.[0] || null)}
              className="outline-none border border-[#2C2C2C] p-3 w-full rounded-xl text-white bg-[#121212]/60 focus:border-[#1CFF82] focus:ring-1 focus:ring-[#1CFF82] transition"
            />
          </div>

          <button
            type="submit"
            className={`w-full p-3 rounded-xl text-white font-semibold transition-all duration-200 ${
              loading
                ? "bg-[#1CFF82]/30 cursor-not-allowed"
                : "bg-linear-to-r from-[#1CFF82] to-[#0DFFB0] hover:scale-105 shadow-lg"
            } flex items-center justify-center`}
          >
            {loading ? (
              <LoaderCircle size={20} className="animate-spin" />
            ) : (
              "Add Song"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
