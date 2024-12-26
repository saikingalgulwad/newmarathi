

import { connectdb } from "@/lib/db";
import { songs } from "@/lib/model/song";
import { NextResponse } from "next/server";


export async function GET() {


    await connectdb();
   const data = await songs.find();
 

  
 
    return NextResponse.json({data});
}