import Image from "next/image";
import React from "react";
import { Trash } from "lucide-react";

export default function Item() {
  return (
    <div className="flex justify-between group items-center cursor-pointer mb-4 p-2 rounded-lg hover:bg-hover">
      <div className="flex items-center gap-2">
        <Image
          src="/coverImage.avif"
          width={300}
          height={300}
          className=" w-10 h-10 object-cover rounded-md"
          alt="cover-image"
        />
        <div>
          <p className="text-primary-text text-sm font-semibold">
            Midnight Echos
          </p>
          <p className="text-secondary-text text-xs">By Neon Skyline</p>
        </div>
      </div>
      <button className="text-red-500 cursor-pointer p-1 hover:bg-hover opacity-0 duration-200 group-hover:opacity-100">
        <Trash size={15} />
      </button>
    </div>
  );
}
