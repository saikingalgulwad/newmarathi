import { connectdb } from "@/lib/db";
import { songs } from "@/lib/model/song";
import Image from "next/image";
import names from "@/public/logo1.png";
import Listes from "@/components/Listes";
import Link from "next/link";

// Server action to fetch songs based on query
export async function searchSongs(query) {
  await connectdb();

  if (!query) {
    // Return all songs if no query is provided
    return await songs.find();
  }

  // Perform a case-insensitive search using MongoDB's $regex
  return await songs.find({
    songName: { $regex: query, $options: "i" },
  });
}

export default async function Home({ searchParams }) {
  const query = searchParams?.query || ""; // Directly access searchParams without awaiting
  const cards = await searchSongs(query); // Fetch songs based on the query

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      {/* Navbar */}
      <nav className="bg-gray-800 shadow-md py-4">
        <div className="container mx-auto px-4 flex flex-wrap justify-between items-center">
      <Link href={'/'}  > <Image src={names} alt="logo" width={60} height={60} className="m-0 p-0 rounded-lg" /> </Link>
          <form method="get" className="flex flex-wrap mt-4 sm:mt-0 sm:flex-nowrap w-full sm:w-auto">
            <input
              type="text"
              name="query"
              defaultValue={query}
              placeholder="Search..."
              className="bg-gray-700 text-white rounded-lg px-4 py-2 w-full sm:w-auto  focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-2"
            >
              Search
            </button>
          </form>
        </div>
      </nav>

      {/* Cards Grid */}
      <div className="flex items-center justify-center py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl px-4">
          {cards.map((card) => (
            <Link href={`/open/${card._id}`} key={card._id}>
              <Listes card={card} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
