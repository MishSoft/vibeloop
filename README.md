🎵 Vibeloop – Music Platform


Screenshot of your site header

Vibeloop is a modern music platform built with Next.js and Supabase. Users can:

Upload their own music

Browse music uploaded by others

Listen to the latest tracks in the "New Songs" section

Control playback (Play/Pause, Seek, Volume, Repeat)

🚀 Technologies

Frontend: Next.js, React, TypeScript, Tailwind CSS

Backend / Database: Supabase (PostgreSQL)

Icons: lucide-react

🎨 Features
User-side Features

Authentication and registration via Supabase

Music upload (cover image + audio file)

“New Songs” section – latest uploaded tracks

Full-featured music player:

Play / Pause

Seek (range slider)

Volume + Mute

Repeat

Playlist Queue

🖼 Screenshots
<img width="1896" height="867" alt="Image" src="https://github.com/user-attachments/assets/998b1a3c-004c-4d5b-9896-9b430c9bac9a" />
<img width="1918" height="865" alt="Image" src="https://github.com/user-attachments/assets/68e9f904-d464-4a26-ae9a-433f2ccb66b7" />
<img width="1897" height="867" alt="Image" src="https://github.com/user-attachments/assets/668a96a2-f29a-4128-bbcc-181a974c7b02" />
<img width="1903" height="867" alt="Image" src="https://github.com/user-attachments/assets/d25d9c68-5acf-405f-b08a-177203b94833" />
<img width="357" height="242" alt="Image" src="https://github.com/user-attachments/assets/ea3ae3c2-3061-48d7-9bbc-c1185699f52f" />
<img width="297" height="497" alt="Image" src="https://github.com/user-attachments/assets/cf95915f-aede-4a0a-9ea0-17812c86a999" />

Upload Music

⚡ Functionality
Play Music
<audio ref={audioRef} src={track.audio_url} />

Play / Pause
if(audioRef.current.paused) {
  audioRef.current.play();
} else {
  audioRef.current.pause();
}

🛠 Setup

Clone the repository:

git clone https://github.com/<your-username>/vibeloop.git
cd vibeloop


Install dependencies:

npm install
# or
yarn


Add environment variables (.env.local):

NEXT_PUBLIC_SUPABASE_URL=<YOUR_SUPABASE_URL>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<YOUR_SUPABASE_ANON_KEY>


Run the development server:

npm run dev
# or
yarn dev


Visit http://localhost:3000 in your browser.

📂 Folder Structure
vibeloop/
├─ app/
│  ├─ components/      # Player, Upload, Queue components
│  ├─ pages/           # Next.js pages
├─ lib/                # Supabase client
├─ public/             # Images, icons
├─ styles/             # Tailwind overrides
└─ README.md

💡 Future Improvements

Realtime music queue updates

User playlists

Like / favorite system

Dark / light theme toggle

📌 License

This project is licensed under the MIT License.
