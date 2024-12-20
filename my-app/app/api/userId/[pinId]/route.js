import { connectdb } from "@/app/lib/db";
import { posts } from "@/app/lib/model/post";

import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req,context) {
  
   const {pinId} = await context.params;
 
    await connectdb();
   const data = await posts.findById(pinId);
  

 
    return NextResponse.json({ok:data});
}