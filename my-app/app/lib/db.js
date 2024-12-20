import mongoose from "mongoose"

export const connectdb = async()=>{
    try{
        await mongoose.connect("mongodb+srv://saiprasad:uZKwV12KLJaUNtyX@cluster0.gcvpc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    }catch(error){
     console.log(error);
    }

}

  
