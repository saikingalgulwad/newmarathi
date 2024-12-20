import mongoose from "mongoose";

const postModel = new mongoose.Schema({
   title:String,
   desc:String,
   link:String,
   image:String,
   userName:String,
   email:String,
   userImage:String,
});
export const posts = mongoose.models.posts || mongoose.model("posts",postModel);