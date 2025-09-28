import React, { useState } from "react";
import { motion } from "framer-motion";

const MOCK_PLAYLISTS = {
  happy: [
    { song: "Happy - Pharrell Williams", artist: "Pharrell", cover: "https://i.scdn.co/image/ab67616d0000b2739b9f7df0b2e2b6b3d6a9d3d6" },
    { song: "Can't Stop the Feeling - Justin Timberlake", artist: "Justin Timberlake", cover: "https://i.scdn.co/image/ab67616d0000b2736a6b8b2a7f4b3c1a2d3e4f5a" }
  ],
  sad: [
    { song: "Someone Like You - Adele", artist: "Adele", cover: "https://i.scdn.co/image/ab67616d0000b273333333333333333333333333" },
    { song: "Skinny Love - Bon Iver", artist: "Bon Iver", cover: "https://i.scdn.co/image/ab67616d0000b273444444444444444444444444" }
  ]
};

export default function App() {
  const [mood, setMood] = useState("happy");
  const [playlist, setPlaylist] = useState(MOCK_PLAYLISTS["happy"]);
  const [art, setArt] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setPlaylist(MOCK_PLAYLISTS[mood]);
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: `Album cover for mood: ${mood}` })
      });
      const data = await res.json();
      setArt(data.url);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-pink-500 flex flex-col items-center justify-center text-white p-6">
      <h1 className="text-4xl font-bold mb-6">🎵 Mood-to-Music Generator</h1>

      <div className="flex gap-4 mb-6">
        {["happy", "sad"].map((m) => (
          <motion.button
            whileHover={{ scale: 1.1 }}
            key={m}
            onClick={() => setMood(m)}
            className={`px-4 py-2 rounded-full ${mood === m ? "bg-white text-black" : "bg-black text-white"}`}
          >
            {m}
          </motion.button>
        ))}
      </div>

      <button
        onClick={handleGenerate}
        className="bg-white text-black px-6 py-3 rounded-2xl font-semibold hover:bg-gray-200"
      >
        Generate Playlist & Cover
      </button>

      <div className="mt-8">
        {loading && <p>🎨 Generating cover art...</p>}
        {art && <img src={art} alt="AI Cover" className="w-64 h-64 rounded-xl shadow-lg mb-4" />}
      </div>

      <div className="grid gap-4 mt-6">
        {playlist.map((track, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2 }}
            className="flex items-center gap-4 bg-black/30 p-4 rounded-xl"
          >
            <img src={track.cover} alt={track.song} className="w-16 h-16 rounded-lg" />
            <div>
              <p className="font-semibold">{track.song}</p>
              <p className="text-sm opacity-80">{track.artist}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
