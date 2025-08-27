"use client";

export default function Loading() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-b from-black via-[#0f172a] to-black text-center px-4">
      {/* Neon Circle Loader */}
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 rounded-full border-4 border-red-500 border-t-transparent animate-spin drop-shadow-[0_0_20px_rgba(239,68,68,0.8)]"></div>
        <div className="absolute inset-6 rounded-full bg-gradient-to-r from-red-500 to-pink-600 animate-pulse"></div>
      </div>

      {/* Rap vibe loading text */}
      <p className="mt-8 text-xl md:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-600 tracking-wide animate-pulse">
        Loading your song... 🎧
      </p>

      <p className="mt-2 text-gray-400 text-sm md:text-base italic">
        Get ready to vibe with the next beat 🔥
      </p>
    </div>
  );
}
