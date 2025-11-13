import Image from "next/image";
import Nav from "./components/Nav";
import SideBar from "./components/SideBar";
import AllSongs from "./components/AllSongs";
import MusicPlayer from "./components/MusicPlayer";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <Nav />
      <main>
        <SideBar />
        <MusicPlayer />
        <AllSongs />
      </main>
    </div>
  );
}
