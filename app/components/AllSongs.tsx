"use client";

import Song from "./Song";

export default function AllSongs() {
  return (
    <div className="min-h-[90vh] bg-background pt-20 pb-8 px-4 lg:ml-80 lg:px-6">
      {/* Section Title */}
      <h2 className="text-2xl font-semibold text-primary-text mb-6">
        New Songs
      </h2>

      {/* Songs Grid */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        <Song />
        <Song />
        <Song />
        <Song />
        <Song />
        <Song />
      </div>
    </div>
  );
}
