import { connectdb } from "@/app/lib/db";
import { posts } from "@/app/lib/model/post";


import { NextResponse } from "next/server";

export async function GET() {
  
  
 
    await connectdb();
   const data = await posts.find();
  

 
    return NextResponse.json({data});
}