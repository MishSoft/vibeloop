import Song from "./Song";

export default function AllSongs() {
  return (
    <div className="min-h-[90vh] bg-background my-15 p-4 lg:ml-80 lg:mx-4">
      <h2 className="text-2xl font-semibold text-white mb-3">New Songs</h2>
      <div className="grid gap-2  grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
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
