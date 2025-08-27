"use client";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-b from-black via-[#0f172a] to-black text-center px-4">
      {/* Graffiti style 404 */}
      <h1 className="text-7xl md:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-600 drop-shadow-[0_0_25px_rgba(239,68,68,0.8)] animate-pulse">
        404
      </h1>

      {/* Rapper style line */}
      <p className="mt-4 text-xl md:text-2xl font-bold text-gray-300 uppercase tracking-wide">
        Yo! This track got lost 🎤
      </p>

      <p className="mt-2 text-gray-400 text-sm md:text-base italic">
        But don’t stop the beat — head back home 🎶
      </p>

      {/* Back Home button */}
      <a
        href="/"
        className="mt-8 inline-block rounded-full bg-gradient-to-r from-red-500 to-pink-600 px-8 py-3 text-lg font-semibold text-white shadow-[0_0_20px_rgba(255,0,0,0.7)] hover:scale-105 transition"
      >
        Back to Home
      </a>
    </div>
  );
}
