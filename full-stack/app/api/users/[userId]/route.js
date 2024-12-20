

import { connectdb } from "@/app/lib/db";
import { posts } from "@/app/lib/model/post";

import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req,context) {
  
   const {userId} = await context.params;
   const datauser =  userId.replace('%40','@');
    await connectdb();
   const data = await posts.findOne({email:datauser});
  

 
    return NextResponse.json({ok:data});
}