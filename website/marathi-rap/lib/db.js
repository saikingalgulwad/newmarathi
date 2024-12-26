


import mongoose from "mongoose"

export const connectdb = async()=>{
    try{
        await mongoose.connect('mongodb+srv://saiprasad:uZKwV12KLJaUNtyX@cluster0.gcvpc.mongodb.net/song?retryWrites=true&w=majority&appName=Cluster0')
    }catch(e){
        console.log(e);
    }
}

  