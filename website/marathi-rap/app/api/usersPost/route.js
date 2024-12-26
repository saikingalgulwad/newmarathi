


import { connectdb } from "@/lib/db";
import { songs } from "@/lib/model/song";
import { NextResponse } from "next/server";


export async function GET(req) {
  
   const {searchParams}=new URL(req.url);
   const userId = searchParams.get("search");


    await connectdb();
   const data = await songs.find({songName:userId});
 

  
 
    return NextResponse.json({data});
}
export async function POST(req) {
    const payload = await req.json();
   
     
    await connectdb();
    
   await songs.create(payload);
   
    
    return NextResponse.json({ok:"it is ok"})
}