import FrontendLayout from "@/layouts/FrontendLayout";
import AllSongs from "./components/AllSongs";
// import AllSongs from "./login/components/AllSongs";

export default function Home() {
  return (
    <FrontendLayout>
      <div className="min-h-screen">
        <AllSongs />
      </div>
    </FrontendLayout>
  );
}
