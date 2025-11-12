import Image from "next/image";
import Nav from "./components/Nav";
import SideBar from "./components/SideBar";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <Nav />
      <main>
        <SideBar />
      </main>
    </div>
  );
}
