import { connectdb } from "@/lib/db";
import { songs } from "@/lib/model/song";
import Image from "next/image";
import names from "@/public/logo1.png";
import Listes from "@/components/Listes";
import MusicPlayer from "@/components/MusicPlayer";
import Link from "next/link";

// Server action to fetch songs based on query
export async function searchSongs(query: string) {
  await connectdb();

  if (!query) {
    // Return all songs if no query is provided
    return await songs.find();
  }

  // Perform a case-insensitive search using MongoDB's $regex
  const data = await songs.find({
    songName: { $regex: query, $options: "i" },
  });

  return data; // will always be [] if nothing found
}

export default async function Home({ searchParams }) {
  const query = searchParams?.query || ""; 
  const cards = await searchSongs(query);
  cards.reverse(); // reverse only works on arrays

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      {/* Navbar */}
      <nav className="bg-gray-800 shadow-md py-4">
        <div className="container mx-auto px-4 flex flex-wrap justify-between items-center">
          <Link href={"/"}>
            <Image
              src={names}
              alt="logo"
              width={60}
              height={60}
              className="m-0 p-0 rounded-lg"
            />
          </Link>
          <form
            method="get"
            className="flex flex-wrap mt-4 sm:mt-0 sm:flex-nowrap w-full sm:w-auto"
          >
            <input
              type="text"
              name="query"
              defaultValue={query}
              placeholder="Search..."
              className="bg-gray-700 text-white rounded-lg px-4 py-2 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2 sm:mt-0 sm:ml-2 w-full sm:w-auto"
            >
              Search
            </button>
          </form>
        </div>
      </nav>

      {/* Cards Grid + Player */}
      <div className="flex flex-col items-center justify-center py-10">
        {cards.length === 0 ? (
          // 🔹 If no songs found
          <div className="text-center text-gray-400 text-xl">
            🚫 No songs found for “{query}”
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl px-4">
              {cards.map((card) => (
                <Link href={`/open/${card._id}`} key={card._id}>
                  <Listes card={card} />
                </Link>
              ))}
            </div>

            {/* 🔹 Pass playlist only if not empty */}
            <div className="w-full max-w-4xl mt-8 px-4">
              <MusicPlayer playlist={cards} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
