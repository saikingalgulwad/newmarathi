

import { connectdb } from "@/app/lib/db";
import { users } from "@/app/lib/model/user";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
 let data ;
    try{
    await connectdb();
      data = await users.find();
 }catch(error){
    console.log(error);
 }
    return NextResponse.json(data)
}
export async function POST(req) {
    const payload = await req.json();
     
    await connectdb();
    
    const emailuser =await users.findOne({email:payload.user.email});
    if(emailuser){
    }
    else{
         await user.create(payload.user);
        
    }
    
    return NextResponse.json({ok:"it is ok"})
}