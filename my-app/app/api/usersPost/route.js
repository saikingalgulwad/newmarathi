

import { connectdb } from "@/app/lib/db";
import { posts } from "@/app/lib/model/post";


import { NextResponse } from "next/server";


export async function GET(req) {
  
   const {searchParams}=new URL(req.url);
   const userId = searchParams.get("search");


    await connectdb();
   const data = await posts.find({email:userId});
 

  
 
    return NextResponse.json({data});
}
export async function POST(req) {
    const payload = await req.json();
   
     
    await connectdb();
    
   await posts.create(payload);
   
    
    return NextResponse.json({ok:"it is ok"})
}