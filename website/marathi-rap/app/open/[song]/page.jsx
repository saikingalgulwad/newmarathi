
import SongPlayer from '@/components/OneSong';
import { connectdb } from '@/lib/db';
import { songs } from '@/lib/model/song';
import React from 'react'
import names from '@/public/logo1.png'
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

 async function page({params}) {
    const {song}=await params;
    await connectdb();
      const cards = await songs.findById(song);
 
  return (
    <div >
<div className="bg-gray-900 min-h-screen text-white">
      {/* Navbar */}
      <nav className="bg-gray-800 shadow-md py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
      <Link href={'/'} >   <Image src={names} alt="logo" width={60} height={60} className="m-0 p-0 rounded-lg" /></Link>
     <Link href={'/'}><Button>Home</Button></Link>
        </div>
      </nav>

      <div className="flex items-center justify-center py-10">
      <SongPlayer Image={cards.file} file={cards.song} songName={cards.songName}/>
  
  </div>
 </div>


   
    </div>
  )
}

export default page
