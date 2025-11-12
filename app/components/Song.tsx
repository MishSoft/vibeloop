import React from "react";
import Image from "next/image";
import { Play } from "lucide-react";

export default function Song() {
  return (
    <div className="bg-background relative p-3 group cursor-pointer rounded-md hover:bg-hover">
      <Image
        src={"/coverImage.avif"}
        alt="cover image"
        width={300}
        height={300}
        className="w-full h-50 object-cover rounded-md"
      />
      <div className="mt-2">
        <button className="absolute cursor-pointer hover:backdrop-blur-sm p-5 bg-primary/30 backdrop-blur-2xl duration-200 group-hover:opacity-100 opacity-0 rounded-full text-white left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Play />
        </button>
        <p className="text-primary-text font-sans text-md">
          Rain on Marble Streets
        </p>
        <p className="text-secondary-text text-sm">By the Lanterns</p>
      </div>
    </div>
  );
}
