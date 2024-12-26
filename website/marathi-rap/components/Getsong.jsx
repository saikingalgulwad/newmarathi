import { connectdb } from '@/lib/db'
import { songs } from '@/lib/model/song';
import Image from 'next/image';
import React from 'react'
import SongPlayer from './Song';

async function Getsong() {
await connectdb();
const data = await songs.find();


  return (
 <div>
  <h1>hello siaking</h1>
  {
    data.map((song,items)=>(
    <SongPlayer key={items} Image={song.file} songName={song.songName} file={song.song} Index={items} />
    ))
  }
 </div>
  )
}

export default Getsong
