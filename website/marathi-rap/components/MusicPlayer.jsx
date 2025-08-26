"use client";
import { useState, useRef, useEffect } from "react";

export default function MusicPlayer({ playlist }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);

  const audioRef = useRef(null);
  const currentSong = playlist[currentIndex];

  // Sync volume
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  // Update progress
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress(audio.currentTime);
      setDuration(audio.duration || 0);
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", updateProgress);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", updateProgress);
    };
  }, [currentIndex]);

  // Auto-play when song changes
  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play().catch(() => {});
    }
  }, [currentIndex, isPlaying]);

  // Play / pause toggle
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  // Next song
  const nextSong = () => {
    if (shuffle) {
      const randomIndex = Math.floor(Math.random() * playlist.length);
      setCurrentIndex(randomIndex);
    } else {
      setCurrentIndex((prev) => (prev + 1) % playlist.length);
    }
    setIsPlaying(true);
  };

  // Prev song
  const prevSong = () => {
    setCurrentIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
    setIsPlaying(true);
  };

  // Handle ended
  const handleEnded = () => {
    if (repeat) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    } else {
      nextSong();
    }
  };

  // Format mm:ss
  const fmt = (secs) => {
    if (!secs) return "0:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-[#121212] text-white p-4 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-6">
      {/* Song Info */}
      <div className="flex items-center space-x-3 w-full md:w-auto">
        <img src={currentSong.file} alt="cover" className="w-12 h-12 rounded" />
        <div>
          <h3 className="text-sm font-semibold">{currentSong.songName}</h3>
          <p className="text-xs text-gray-400">Unknown Artist</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center w-full md:w-auto md:flex-1">
        <div className="flex items-center space-x-4 mb-2">
          {/* Shuffle */}
          <button
            onClick={() => setShuffle(!shuffle)}
            style={{
              backgroundColor: shuffle ? "#10B981" : "transparent",
              color: shuffle ? "#000000" : "#9CA3AF",
            }}
            className="p-2 rounded"
          >
            🔀
          </button>

          {/* Prev */}
          <button onClick={prevSong} className="p-2 rounded hover:bg-gray-800">
            ⏮️
          </button>

          {/* Play / Pause */}
          <button
            onClick={togglePlay}
            className="bg-white text-black rounded-full px-3 py-2 hover:scale-105 transition"
          >
            {isPlaying ? "⏸️" : "▶️"}
          </button>

          {/* Next */}
          <button onClick={nextSong} className="p-2 rounded hover:bg-gray-800">
            ⏭️
          </button>

          {/* Repeat */}
          <button
            onClick={() => setRepeat(!repeat)}
            style={{
              backgroundColor: repeat ? "#10B981" : "transparent",
              color: repeat ? "#000000" : "#9CA3AF",
            }}
            className="p-2 rounded"
          >
            🔁
          </button>
        </div>

        {/* Progress bar */}
        <div className="flex items-center space-x-2 w-full max-w-md">
          <span className="text-xs text-gray-400">{fmt(progress)}</span>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={progress}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (audioRef.current) audioRef.current.currentTime = val;
              setProgress(val);
            }}
            className="flex-1"
          />
          <span className="text-xs text-gray-400">{fmt(duration)}</span>
        </div>
      </div>

      {/* Volume (hidden on mobile) */}
      <div className="hidden md:flex items-center space-x-2 w-full md:w-auto justify-center md:justify-end">
        🔊
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
        />
      </div>

      {/* Audio */}
      <audio ref={audioRef} src={currentSong.song} onEnded={handleEnded} />
    </div>
  );
}
