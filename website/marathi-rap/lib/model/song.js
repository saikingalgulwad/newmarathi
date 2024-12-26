import mongoose from "mongoose";

const songModel = new mongoose.Schema({
   song:String,
   songName:String,
   file:String

  
});
export const songs = mongoose.models.songs || mongoose.model("songs",songModel);